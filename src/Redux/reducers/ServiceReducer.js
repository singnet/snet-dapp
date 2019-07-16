import { serviceActions } from "../actionCreators";
import { defaultListingConfig } from "../../utility/constants/Pagination";

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
    default: {
      return state;
    }
  }
};

export default serviceReducer;
