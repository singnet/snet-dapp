import { serviceActions } from "../actionCreators";
import { defaultPaginationFilterSortSearch } from "../../utility/constants/Pagination";

const InitialServiceList = {
  services: [],
  pagination: { ...defaultPaginationFilterSortSearch },
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
    default: {
      return state;
    }
  }
};

export default serviceReducer;
