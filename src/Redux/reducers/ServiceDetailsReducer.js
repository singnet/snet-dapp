import { serviceDetailsActions } from "../actionCreators";
import find from "lodash/find";
import first from "lodash/first";
import some from "lodash/some";

const InitialServiceDetails = {
  serviceMetadata: {
    groups: [],
  },
  freeCallsRemaining: 0,
  freeCallsAllowed: 0,
};

const serviceDetailsReducer = (state = InitialServiceDetails, action) => {
  switch (action.type) {
    case serviceDetailsActions.RESET_SERVICE_METADATA: {
      return { ...state, serviceMetadata: {} };
    }
    case serviceDetailsActions.UPDATE_SERVICE_METADATA: {
      return { ...state, serviceMetadata: { groups: action.payload.data.groups } };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_ALLOWED: {
      return { ...state, freeCallsAllowed: action.payload };
    }
    case serviceDetailsActions.UPDATE_FREE_CALLS_REMAINING: {
      return { ...state, freeCallsRemaining: action.payload };
    }
    default: {
      return state;
    }
  }
};

const groups = state => {
  return state.serviceDetailsReducer.serviceMetadata.groups;
};

export const groupInfo = state => {

  const serviceGroups = groups(state);
  const availableGroup = find(serviceGroups, ({ endpoints }) =>
    some(endpoints, endpoint => endpoint.is_available === 1)
  );
  if (availableGroup) {
    return availableGroup;
  }
  const firstGroup = first(serviceGroups);
  return firstGroup;
};

export const pricing = state => {
  const group = groupInfo(state);
  if (!group) return {};

  return find(group.pricing, price => price.default === true);
};

export default serviceDetailsReducer;
