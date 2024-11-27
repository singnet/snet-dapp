export const SET_MAIN_DATASET = "SET_MAIN_DATASET";
export const SET_MERGE_DATASET = "SET_MERGE_DATASET";
export const SET_EXAMPLE_DATASETS = "SET_EXAMPLE_DATASETS";
export const CLEAR_EXAMPLE_DATASETS = "CLEAR_EXAMPLE_DATASETS";
export const ADD_RECENT_DATASET = "ADD_RECENT_DATASET";
export const CLEAR_RECENT_DATASETS = "CLEAR_RECENT_DATASETS";

export const setMainDataset = (dataset) => (dispatch) => {
  dispatch({
    type: SET_MAIN_DATASET,
    payload: dataset,
  });
};

export const setMergeDataset = (dataset) => (dispatch) => {
  dispatch({
    type: SET_MERGE_DATASET,
    payload: dataset,
  });
};

export const setExampleDatasets = (datasetList) => (dispatch) => {
  dispatch({
    type: SET_EXAMPLE_DATASETS,
    payload: datasetList,
  });
};

export const clearExampleDatasets = () => (dispatch) => {
  dispatch({
    type: CLEAR_EXAMPLE_DATASETS,
  });
};

export const addRecentDataset = (dataset) => (dispatch) => {
  dispatch({
    type: ADD_RECENT_DATASET,
    payload: dataset,
  });
};

export const clearRecentDatasets = () => (dispatch) => {
  dispatch({
    type: CLEAR_RECENT_DATASETS,
  });
};
