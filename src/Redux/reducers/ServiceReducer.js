import { serviceActions } from "../actionCreators";
import { defaultListingConfig, defaultActiveFilterItem } from "../../utility/constants/Pagination";

const InitialServiceList = {
  services: [],
  pagination: { ...defaultListingConfig },
  filterData: {
    org_id: [],
  },
  activeFilterItem: { ...defaultActiveFilterItem },
  serviceMethodExecution: {
    response: {},
    isComplete: false,
  },
};

const serviceReducer = (state = InitialServiceList, action) => {
  switch (action.type) {
    case serviceActions.UPDATE_PAGINATION_DETAILS: {
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    }
    case serviceActions.UPDATE_SERVICE_LIST: {
      return { ...state, services: action.payload };
    }
    case serviceActions.UPDATE_SERVICE_EXECUTION_RESPONSE: {
      return { ...state, serviceMethodExecution: { ...state.serviceMethodExecution, ...action.payload } };
    }
    case serviceActions.RESET_SERVICE_EXECUTION: {
      return { ...state, serviceMethodExecution: { ...InitialServiceList.serviceMethodExecution } };
    }

    case serviceActions.UPDATE_SPEC_DETAILS: {
      return {
        ...state,
        serviceMethodExecution: {
          ...state.serviceMethodExecution,
          serviceSpecJSON: action.payload.serviceSpecJSON,
          protoSpec: action.payload.protoSpec,
        },
      };
    }
    case serviceActions.UPDATE_FILTER_DATA: {
      return {
        ...state,
        filterData: {
          ...state.filterData,
          ...action.payload,
        },
      };
    }
    case serviceActions.UPDATE_ACTIVE_FILTER_ITEM: {
      return {
        ...state,
        activeFilterItem: { ...action.payload },
      };
    }
    case serviceActions.RESET_FILTER_ITEM: {
      return {
        ...state,
        activeFilterItem: { ...defaultActiveFilterItem },
      };
    }
    case serviceActions.UPDATE_FEEDBACK: {
      return {
        ...state,
        feedback: {
          ...state.feedback,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default serviceReducer;
