import { datasetActions } from "../actionCreators";

const initialState = {
  mainDataset: null,
  mergeDataset: null,
  exampleDatasets: [
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet 1: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet 2: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet 3: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet 4: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
  ],
  recentDatasets: [
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet Recent 1: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet Recent 2: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet Recent 3: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
    {
      datasetKey: "data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      // link: "https://ozx0e68owf.execute-api.us-east-1.amazonaws.com/download?key=data_instruct_llm_1000.zip_training@singularitynet.io_1732864358004",
      name: "DataSet Recent 4: Training data for text translation",
      size: 51234,
      tag: "Text",
    },
  ],
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
      return { ...state, recentDatasets: state.recentDatasets.map(dataset =>
          dataset.datasetKey === action.payload.datasetKey
            ? { ...dataset, additionalInfo: action.payload.additionalInfo } // Update the matched user
            : dataset
        ) };
    case datasetActions.CLEAR_RECENT_DATASETS:
      return { ...state, recentDatasets: [] };
    default:
      return state;
  }
};

export default datasetReducer;