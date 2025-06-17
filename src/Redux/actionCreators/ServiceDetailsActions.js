import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions, postAPI } from "../../utility/API";
import { fetchAuthenticatedUser } from "./UserActions";
import { loaderActions } from "./";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { isEmpty } from "lodash";
import { resetCurrentModelDetails, resetModelList } from "./ServiceTrainingActions";
import { createFreecallStrategy } from "../../utility/sdk";
import { initializingSdk } from "./SDKActions";

export const UPDATE_SERVICE_DETAILS = "UPDATE_SERVICE_DETAILS";
export const RESET_SERVICE_DETAILS = "RESET_SERVICE_DETAILS";
export const UPDATE_FREE_CALLS_INFO = "UPDATE_FREE_CALLS_INFO";
export const UPDATE_TRAINING_DETAILS = "UPDATE_TRAINING_DETAILS";
export const UPDATE_FREECALL_SIGNATURE = "UPDATE_FREECALL_SIGNATURE";

const resetServiceDetails = (dispatch) => {
  dispatch({ type: RESET_SERVICE_DETAILS });
};

const setFreeCallSignature = (freeCallSignature) => (dispatch) => {
  dispatch({ type: UPDATE_FREECALL_SIGNATURE, payload: freeCallSignature });
};

const fetchServiceDetailsFailure = (err) => (dispatch) => {
  dispatch(loaderActions.stopAppLoader());
};

const fetchServiceDetailsSuccess = (serviceDetails) => (dispatch) => {
  // const enhancedServiceDetails = {
  //   ...serviceDetails,
  //   data: { ...serviceDetails.data, media: serviceDetails.data.media.map(el => ({ ...el, url: cacheS3Url(el.url) })) },
  // };
  dispatch(loaderActions.stopAppLoader());
  dispatch({ type: UPDATE_SERVICE_DETAILS, payload: serviceDetails.data });
};

const fetchServiceDetailsAPI = async (orgId, serviceId) => {
  const url = `${APIEndpoints.CONTRACT.endpoint}/org/${orgId}/service/${serviceId}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchServiceDetails = (orgId, serviceId) => async (dispatch) => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_SERVICE_DETAILS));
    dispatch(resetServiceDetails);
    dispatch(resetCurrentModelDetails());
    dispatch(resetModelList());
    const serviceDetails = await fetchServiceDetailsAPI(orgId, serviceId);
    dispatch(fetchServiceDetailsSuccess(serviceDetails));
  } catch (error) {
    dispatch(fetchServiceDetailsFailure(error));
    throw error;
  }
};

const fetchMeteringDataSuccess = (freeCallsAvailable, freeCallsTotal) => (dispatch) => {
  dispatch({
    type: UPDATE_FREE_CALLS_INFO,
    payload: {
      freeCallsTotal,
      freeCallsAvailable,
    },
  });
};

const fetchTrainingModelSuccess = (serviceTrainingData) => (dispatch) => {
  dispatch({ type: UPDATE_TRAINING_DETAILS, payload: serviceTrainingData });
};

const fetchServiceTrainingDataAPI = async (orgId, serviceId) => {
  try {
    const dataForUrl = await fetchServiceDetailsAPI(orgId, serviceId);
    const url = `${dataForUrl.data.groups[0].endpoints[0].endpoint}/heartbeat`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return {};
  }
};

export const fetchTrainingModel = (orgId, serviceId) => async (dispatch) => {
  const serviceTrainingData = await fetchServiceTrainingDataAPI(orgId, serviceId);
  dispatch(fetchTrainingModelSuccess(serviceTrainingData));
};

const getAvailableFreeCalls = (orgId, serviceId, groupId) => async (dispatch) => {
  const {
    signature,
    currentBlockNumber,
    userId,
    freeCallToken,
    signerAddress: address,
  } = await dispatch(getFreeCallSign(orgId, serviceId, groupId));

  try {
    const freecallStrategy = await createFreecallStrategy(orgId, serviceId);
    const availableFreeCalls = await freecallStrategy.getFreeCallsAvailable({
      signature,
      currentBlockNumber,
      userId,
      token: freeCallToken,
      address,
    });
    return availableFreeCalls;
  } catch (err) {
    console.error("error on getting available free calls:", err);

    throw new Error(err);
  }
};

export const getFreeCallSign = (orgId, serviceId, groupId) => async (dispatch, getState) => {
  try {
    const sdk = await dispatch(initializingSdk());
    const currentBlock = await sdk.account.getCurrentBlockNumber();
    const { email, token } = await dispatch(fetchAuthenticatedUser());
    const freeCallSignatureDetails = getState().serviceDetailsReducer.freeCallSignature;

    if (freeCallSignatureDetails.expirationBlock && freeCallSignatureDetails.expirationBlock < currentBlock) {
      return { ...freeCallSignatureDetails, userId: email };
    }
    const payload = {
      organization_id: orgId,
      service_id: serviceId,
      group_id: groupId,
    };
    const apiName = APIEndpoints.SIGNER_SERVICE.name;
    const apiOptions = initializeAPIOptions(token, payload);
    const { data: freeCallSignerResp } = await postAPI(apiName, APIPaths.SIGNER_FREE_CALL, apiOptions);

    const freeCallSignature = {
      signature: freeCallSignerResp.signature_hex,
      expirationBlock: freeCallSignerResp.expiration_block_number,
      currentBlockNumber: freeCallSignerResp.current_block_number,
      freeCallToken: freeCallSignerResp.free_call_token_hex,
      signerAddress: freeCallSignerResp.signer_address,
      userId: email,
    };
    dispatch(setFreeCallSignature(freeCallSignature));
    return freeCallSignature;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchMeteringData =
  ({ orgId, serviceId, groupId, freeCallsTotal }) =>
  async (dispatch) => {
    const freeCallsAvailable = await dispatch(getAvailableFreeCalls(orgId, serviceId, groupId));
    dispatch(fetchMeteringDataSuccess(freeCallsAvailable, freeCallsTotal));
    return { freeCallsAvailable, freeCallsTotal };
  };

export const getIsTrainingAvailable = (detailsTraining, isLoggedIn) => {
  if (isEmpty(detailsTraining)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(detailsTraining, "trainingMethods") || !detailsTraining?.trainingMethods) {
    return false;
  }

  return (
    process.env.REACT_APP_TRAINING_ENABLE === "true" &&
    Object.keys(detailsTraining.trainingMethods).length &&
    isLoggedIn
  );
};
