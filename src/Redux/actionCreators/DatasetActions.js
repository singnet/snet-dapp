import { DatasetClient, DatasetEndpoints } from "../../config/DatasetClient";

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

export const getDatasetStatistic = (datasetKey) => async (dispatch) => {
  const params = new URLSearchParams([["dataset_key", datasetKey]]);
  return DatasetClient.get(DatasetEndpoints.VALIDATE_AND_ANALIZE, { params });
};

export const improveDataset = async (datasetKey, improveOptionsList) => async (dispatch) => {
  const params = {
    dataset_key: datasetKey,
    improve_options: improveOptionsList.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}),
  };
  return DatasetClient.post(DatasetEndpoints.IMPROVE, params)
    .then((response) => {
      console.log("improveDataset response.data", response.data);
    })
    .catch((error) => {
      console.error("improveDataset Error:", error);
    });
};

export const mergeDatasets = async (mainDataset, mergeDataset) => async (dispatch) => {
  const params = {
    dataset_key_base: mainDataset,
    dataset_key_additional: mergeDataset,
  };
  return DatasetClient.post(DatasetEndpoints.VALIDATE_MERGE, params)
    .then((response) => {
      console.log("mergeDatasets response.data", response.data);
    })
    .catch((error) => {
      console.error("mergeDatasets Error:", error);
    });
};

export const validateMergeDatasets = async (mainDataset, mergeDataset) => async (dispatch) => {
  const params = {
    dataset_key_base: mainDataset,
    dataset_key_additional: mergeDataset,
  };
  return DatasetClient.post(DatasetEndpoints.MERGE, params)
    .then((response) => {
      console.log("validateMergeDatasets response.data", response.data);
    })
    .catch((error) => {
      console.error("validateMergeDatasets Error:", error);
    });
};

// const res = await getDatasetStatistic("123");
// console.log('getDatasetStatistic', res)
