import { serviceActions } from "../actionCreators";
import { defaultListingConfig, defaultActiveFilterItem } from "../../utility/constants/Pagination";

const InitialServiceList = {
  services: [],
  pagination: { ...defaultListingConfig },
  serviceMethodExecution: {
    response: {},
    isComplete: false,
  },
  filterData: {
    tags: [],
    display_name: [],
    organization: [],
  },
  activeFilterItem: { ...defaultActiveFilterItem },
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
    default: {
      return state;
    }
  }
};

export default serviceReducer;
