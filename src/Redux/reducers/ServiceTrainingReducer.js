import { serviceTrainingActions } from "../actionCreators";

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
  modelsList: [],
};

const serviceTrainingReducer = (state = trainingModelInitialState, action) => {
  switch (action.type) {
    case serviceTrainingActions.SET_MODEL_DETAILS: {
      return { ...state, currentModel: action.payload };
    }
    case serviceTrainingActions.CLEAN_MODEL_DETAILS: {
      return { ...state, currentModel: currentModellInitialState };
    }
    case serviceTrainingActions.SET_MODELS_LIST: {
      return { ...state, modelsList: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default serviceTrainingReducer;
