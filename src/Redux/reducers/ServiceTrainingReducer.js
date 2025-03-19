import { serviceTrainingActions } from "../actionCreators";

export const modelStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CREATED: "CREATED",
  ERRORED: "ERRORED",
  DELETED: "DELETED",
};

const currentModellInitialState = {
  modelId: "",
  methodName: "",
  serviceName: "",
  description: "",
  status: "",
  updatedDate: "",
  addressList: [],
  modelName: "",
  publicAccess: false,
  dataLink: "",
};

const trainingModelInitialState = {
  currentModel: currentModellInitialState,
  modelsList: undefined,
};

const serviceTrainingReducer = (state = trainingModelInitialState, action) => {
  switch (action.type) {
    case serviceTrainingActions.SET_MODEL_DETAILS: {
      return { ...state, currentModel: action.payload };
    }
    case serviceTrainingActions.RESET_MODEL_DETAILS: {
      return { ...state, currentModel: currentModellInitialState };
    }
    case serviceTrainingActions.SET_MODELS_LIST: {
      return { ...state, modelsList: action.payload };
    }
    case serviceTrainingActions.RESET_MODEL_LIST: {
      return { ...state, modelsList: trainingModelInitialState.modelsList };
    }
    default: {
      return state;
    }
  }
};

export default serviceTrainingReducer;
