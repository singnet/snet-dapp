import axios from "axios";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { startAppLoader, stopAppLoader } from "./LoaderActions";
import { getServiceClient } from "./SDKActions";

export const SET_MODEL_DETAILS = "SET_MODEL_DETAILS";
export const SET_MODELS_LIST = "SET_MODELS_LIST";
export const CLEAN_MODEL_DETAILS = "CLEAN_MODEL_DETAILS";

export const setCurrentModelDetails = (currentModelDetails) => (dispatch) => {
  dispatch({ type: SET_MODEL_DETAILS, payload: currentModelDetails });
};

export const setModelsList = (modelsList) => (dispatch) => {
  dispatch({ type: SET_MODELS_LIST, payload: modelsList });
};

export const cleanCurrentModelDetails = () => (dispatch) => {
  dispatch({ type: CLEAN_MODEL_DETAILS });
};

export const createModel = (organizationId, serviceId, address, newModelParams) => async (dispatch) => {
  console.log("createModel", organizationId, serviceId, address, newModelParams);

  try {
    dispatch(startAppLoader(LoaderContent.CREATE_TRAINING_MODEL));
    const serviceName = getServiceNameFromTrainingMethod(newModelParams?.trainingMethod);
    const params = {
      modelName: newModelParams?.trainingModelName,
      method: newModelParams?.trainingMethod,
      serviceName,
      description: newModelParams?.trainingModelDescription,
      publicAccess: !newModelParams?.isRestrictAccessModel,
      address: newModelParams?.isRestrictAccessModel ? newModelParams?.accessAddresses : [],
    };

    const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
    const createdModelData = await serviceClient.createModel(address, params);
    console.log("createdModelData: ", createdModelData);

    dispatch(setCurrentModelDetails(createdModelData));
    await dispatch(getTrainingModels(organizationId, serviceId, address));
  } catch (error) {
    // TODO
  } finally {
    dispatch(stopAppLoader());
  }
};

export const updateModel = (organizationId, serviceId, address, updateModelParams) => async (dispatch, getState) => {
  const currentModelDetails = getState().serviceTrainingReducer.currentModel;
  try {
    dispatch(startAppLoader(LoaderContent.UPDATE_MODEL));
    const params = {
      modelId: currentModelDetails.modelId,
      address,
      method: currentModelDetails.methodName,
      name: currentModelDetails.serviceName,
      dataLink: updateModelParams.dataLink,
      modelName: updateModelParams.trainingModelName,
      description: updateModelParams.trainingModelDescription,
      publicAccess: !updateModelParams.isRestrictAccessModel,
      addressList: updateModelParams.isRestrictAccessModel ? updateModelParams.accessAddresses : [],
      status: currentModelDetails.status,
      updatedDate: currentModelDetails.updatedDate,
    };

    const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
    const updateModelData = await serviceClient.updateModel(params);
    dispatch(setCurrentModelDetails(updateModelData));
    await dispatch(getTrainingModels(organizationId, serviceId, address));
  } catch (error) {
    // TODO
  } finally {
    dispatch(stopAppLoader());
  }
};

export const deleteModel =
  (organizationId, serviceId, modelId, methodName, serviceName, address) => async (dispatch) => {
    try {
      dispatch(startAppLoader(LoaderContent.DELETE_MODEL));
      const params = {
        modelId,
        method: methodName,
        address,
        name: serviceName,
      };
      const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
      await serviceClient.deleteModel(params);
      await dispatch(getTrainingModels(organizationId, serviceId, address));
      dispatch(cleanCurrentModelDetails());
    } catch (error) {
      // TODO
    } finally {
      dispatch(stopAppLoader());
    }
  };

// export const getServiceName = () => (getState) => {
//   // const { serviceDetailsReducer, serviceTrainingReducer } = getState();
//   // if (serviceTrainingReducer.serviceName) {
//   //   return serviceTrainingReducer.serviceName;
//   // }
//   const training = serviceDetailsReducer.training;
//   return getServiceNameFromTrainingMethod(training.trainingMethods[0]);
// };

const getServiceNameFromTrainingMethod = (trainingMethod) => {
  return trainingMethod.split(".")[1].split("/")[0];
};

export const getTrainingModelStatus =
  ({ organizationId, serviceId, modelId, name, method, address }) =>
  async (dispatch) => {
    console.log("getTrainingModels: ", organizationId, serviceId, modelId, method, name, address);

    try {
      dispatch(startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
      const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
      const params = {
        modelId,
        method,
        name,
        address,
      };
      const existingModelStatus = await serviceClient.getModelStatus(params);
      console.log("existingModelStatus: ", existingModelStatus);
      return existingModelStatus;
    } catch (err) {
      // TODO
    } finally {
      dispatch(stopAppLoader());
    }
  };

export const getTrainingModels = (organizationId, serviceId, address) => async (dispatch, getState) => {
  try {
    dispatch(startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
    const training = getState().serviceDetailsReducer.detailsTraining;
    const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
    const trainingMethod = training.trainingMethods[0];
    const params = {
      grpcMethod: trainingMethod,
      grpcService: getServiceNameFromTrainingMethod(trainingMethod),
      address,
    };

    const response = await serviceClient.getExistingModel(params);

    let modelsList = await Promise.all(
      response.map(async (model) => {
        const getModelStatusParams = {
          organizationId,
          serviceId,
          modelId: model.modelId,
          name: model.serviceName,
          method: model.methodName,
          address,
        };

        const numberModelStatus = await dispatch(getTrainingModelStatus(getModelStatusParams));
        return { ...model, status: modelStatus[numberModelStatus] };
      })
    );

    dispatch(setModelsList(modelsList));
    return response.flat();
  } catch (err) {
    // TODO
  } finally {
    dispatch(stopAppLoader());
  }
};

const modelStatus = {
  0: "CREATED",
  1: "IN_PROGRESS",
  2: "ERRORED",
  3: "COMPLETED",
  4: "DELETED",
};

export const publishDatasetToS3 = async (fileBlob, name) => {
  try {
    const fileKey = Date.now() + "_" + name;
    const url = `https://xim5yugo7g.execute-api.us-east-1.amazonaws.com/default/upload?key=${fileKey}`;

    let instance = axios.create({
      headers: {
        Authorization: "S1kDjcub9k78JFAyrLPsfS0yQoQ4mgmmpeWKlIoVvYsk6JVq5v4HHKvKQgZ0VdI7",
      },
    });

    const response = await instance.get(url);
    await axios.put(response.data.uploadURL, fileBlob);
    return `https://xim5yugo7g.execute-api.us-east-1.amazonaws.com/default/download?key=${fileKey}`;
  } catch (err) {
    throw new Error(err);
  }
};
