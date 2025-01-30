import axios from "axios";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { startAppLoader, stopAppLoader } from "./LoaderActions";
import { getServiceClient } from "./SDKActions";
import { fetchAuthenticatedUser, updateMetamaskWallet } from "./UserActions";
import { modelStatus } from "../reducers/ServiceTrainingReducer";
import { DatafactoryInstanceS3, filesToS3Endpoints, TrainingInstanceS3 } from "../../config/DatasetS3Client";
// import { userActions } from ".";
export const SET_MODEL_DETAILS = "SET_MODEL_DETAILS";
export const SET_MODELS_LIST = "SET_MODELS_LIST";
export const RESET_MODEL_DETAILS = "RESET_MODEL_DETAILS";
export const RESET_MODEL_LIST = "RESET_MODEL_LIST";

export const setCurrentModelDetails = (currentModelDetails) => (dispatch) => {
  dispatch({ type: SET_MODEL_DETAILS, payload: currentModelDetails });
};

export const setModelsList = (modelsList) => (dispatch) => {
  dispatch({ type: SET_MODELS_LIST, payload: modelsList });
};

export const resetCurrentModelDetails = () => (dispatch) => {
  dispatch({ type: RESET_MODEL_DETAILS });
};

export const resetModelList = () => (dispatch) => {
  dispatch({ type: RESET_MODEL_LIST });
};

export const createModel = (organizationId, serviceId, newModelParams) => async (dispatch) => {
  try {
    dispatch(startAppLoader(LoaderContent.CREATE_TRAINING_MODEL));
    const address = await dispatch(updateMetamaskWallet());
    const serviceName = getServiceNameFromTrainingMethod(newModelParams?.trainingMethod);
    const params = {
      modelName: newModelParams?.trainingModelName,
      method: newModelParams?.trainingMethod,
      serviceName,
      description: newModelParams?.trainingModelDescription,
      publicAccess: !newModelParams?.isRestrictAccessModel,
      dataLink: newModelParams.dataLink,
      address: newModelParams?.isRestrictAccessModel ? newModelParams?.accessAddresses : [],
    };

    const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
    const createdModelData = await serviceClient.createModel(address, params);

    dispatch(setCurrentModelDetails(createdModelData));
    await dispatch(getTrainingModels(organizationId, serviceId, address));
  } catch (error) {
    // TODO
  } finally {
    dispatch(stopAppLoader());
  }
};

export const updateModel = (organizationId, serviceId, updateModelParams) => async (dispatch, getState) => {
  const currentModelDetails = getState().serviceTrainingReducer.currentModel;
  try {
    dispatch(startAppLoader(LoaderContent.UPDATE_MODEL));
    const address = await dispatch(updateMetamaskWallet());
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

export const deleteModel = (organizationId, serviceId, modelId, methodName, serviceName) => async (dispatch) => {
  try {
    dispatch(startAppLoader(LoaderContent.DELETE_MODEL));
    const address = await dispatch(updateMetamaskWallet());
    const params = {
      modelId,
      method: methodName,
      address,
      name: serviceName,
    };
    const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
    await serviceClient.deleteModel(params);
    await dispatch(getTrainingModels(organizationId, serviceId, address));
    dispatch(resetCurrentModelDetails());
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
    try {
      dispatch(startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
      const serviceClient = await dispatch(getServiceClient(organizationId, serviceId));
      const params = {
        modelId,
        method,
        name,
        address,
      };
      const numberModelStatus = await serviceClient.getModelStatus(params);
      return modelStatusByNumber[numberModelStatus];
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
    console.log("get models response: ", response);

    let modelsList = await Promise.all(
      response.map(async (model) => {
        if (model.status !== modelStatus.IN_PROGRESS && model.status !== modelStatus.CREATED) {
          return model;
        }

        const getModelStatusParams = {
          organizationId,
          serviceId,
          modelId: model.modelId,
          name: model.serviceName,
          method: model.methodName,
          address,
        };

        const newModelStatus = await dispatch(getTrainingModelStatus(getModelStatusParams));
        return { ...model, status: newModelStatus };
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

const modelStatusByNumber = {
  0: "CREATED",
  1: "IN_PROGRESS",
  2: "ERRORED",
  3: "COMPLETED",
  4: "DELETED",
};

export const publishDatasetForTraining = (fileBlob, name) => async (dispatch) => {
  try {
    const { email } = await dispatch(fetchAuthenticatedUser());
    const linkAndKeyDataset = await publishFilesToS3(fileBlob, name, TrainingInstanceS3, email);
    return linkAndKeyDataset;
  } catch (error) {
    console.log("publishing Dataset For Training error: ", error);
  }
};

export const publishDatasetForImproving = (fileBlob, name) => async (dispatch) => {
  try {
    const { email } = await dispatch(fetchAuthenticatedUser());
    const linkAndKeyDataset = await publishFilesToS3(fileBlob, name, DatafactoryInstanceS3, email);
    return linkAndKeyDataset;
  } catch (error) {
    console.log("publishing Dataset For Improving error: ", error);
  }
};

export const publishFilesToS3 = async (fileBlob, name, S3Instance, folder, email) => {
  try {
    const baseUrl = S3Instance.getUri();
    let fileKey = name + "_" + email + "_" + Date.now();
    if (folder) {
      fileKey = folder + "/" + fileKey;
    }
    const response = await S3Instance.get(filesToS3Endpoints.UPLOAD, { params: { key: fileKey } });
    await axios.put(response.data.uploadURL, fileBlob);
    return {
      url: `${baseUrl}/download?key=${fileKey}`,
      datasetKey: fileKey,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const getDatasetSizeFromS3 = async (fileKey, S3instance) => {
  return S3instance.get(filesToS3Endpoints.DOWNLOAD, { params: { key: fileKey, action: "getsize" } })
    .then((response) => {
      return response.data.fileSize;
    })
    .catch((error) => {
      console.error("mergeDatasets Error:", error);
    });
};
