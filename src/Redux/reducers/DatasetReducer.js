import { datasetActions } from "../actionCreators";

const initialState = {
  mainDataset: null,
  mergeDataset: null,
  exampleDatasets: [],
  recentDatasets: [],
};

const datasetReducer = (state = initialState, action) => {
  switch (action.type) {
    case datasetActions.SET_MAIN_DATASET:
      return { ...state, mainDataset: action.payload };
    case datasetActions.SET_MERGE_DATASET:
      return { ...state, mergeDataset: action.payload };
    case datasetActions.SET_EXAMPLE_DATASETS:
      return { ...state, exampleDatasets: action.payload };
    case datasetActions.CLEAR_EXAMPLE_DATASETS:
      return { ...state, exampleDatasets: [] };
    case datasetActions.ADD_RECENT_DATASET:
      return { ...state, recentDatasets: [...state.recentDatasets, action.payload] };
    case datasetActions.CLEAR_RECENT_DATASETS:
      return { ...state, recentDatasets: [] };
    default:
      return state;
  }
};

export default datasetReducer;