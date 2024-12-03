import { datasetActions } from "../actionCreators";

const initialState = {
  mainDataset: null,
  mergeDataset: null,
  exampleDatasets: [
    {
      datasetKey: "data_instruct_example_x0.5.zip_matrejukna@gufum.com_1733211488305",
      name: "DataSet 1: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_example_x1.zip_matrejukna@gufum.com_1733211612606",
      name: "DataSet 2: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_example_x2.zip_matrejukna@gufum.com_1733211645798",
      name: "DataSet 3: Training data for text translation",
      size: 51234,
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
