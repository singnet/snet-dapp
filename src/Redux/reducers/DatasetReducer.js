import { datasetActions } from "../actionCreators";

const initialState = {
  mainDataset: null,
  mergeDataset: null,
  exampleDatasets: [
    {
      datasetKey: "data_instruct_llm_1000_base_clean.zip_fospipakno@gufum.com_1733235148125",
      name: "DataSet 1: Training data for text translation",
      size: 287028,
      tag: "Text",
    },
  ],
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
      return { ...state, recentDatasets: [action.payload, ...state.recentDatasets] };
    case datasetActions.UPDATE_RECENT_DATASET:
      return {
        ...state,
        recentDatasets: state.recentDatasets.map((dataset) =>
          dataset.datasetKey === action.payload.datasetKey
            ? { ...dataset, additionalInfo: action.payload.additionalInfo } // Update the matched user
            : dataset
        ),
      };
    case datasetActions.CLEAR_RECENT_DATASETS:
      return { ...state, recentDatasets: [] };
    default:
      return state;
  }
};

export default datasetReducer;
