import { serviceActions } from "../actionCreators";

const InitialServiceList = {
  services: [],
  pagination: {
    q: "",
    limit: 10,
    offset: 0,
    sort_by: "display_name",
    order_by: "desc",
    total_count: 0,
  },
  serviceExecution: {
    response: {},
    serviceSpecJSON: undefined,
    protoSpec: undefined,
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
      return { ...state, serviceExecution: { ...state.serviceExecution, response: action.payload } };
    }
    case serviceActions.UPDATE_SPEC_DETAILS: {
      return {
        ...state,
        serviceExecution: {
          ...state.serviceExecution,
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
