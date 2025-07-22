const sandboxState = {
  userReducer: {
    login: {
      isLoggedIn: true,
    },
  },
  serviceReducer: {
    serviceMethodExecution: {
      isComplete: false,
    },
    services: [],
  },
  serviceDetailsReducer: {
    details: {
      orgId: process.env.REACT_APP_SANDBOX_ORG_ID,
      serviceId: process.env.REACT_APP_SANDBOX_SERVICE_ID,
      displayName: "Example Service",
      description: "Simple example service.",
      url: "https://github.com/singnet/example-service",
      tags: [{ tag_name: "example" }, { tag_name: "tutorial" }],
      isAvailable: 1,
      groups: [
        {
          pricing: [
            {
              default: true,
              price_model: "fixed_price",
              price_in_cogs: 1,
            },
          ],
          endpoints: [
            {
              endpoint: process.env.REACT_APP_SANDBOX_SERVICE_ENDPOINT,
              isAvailable: 1,
            },
          ],
        },
      ],
    },
    freeCalls: {
      allowed: 10,
      remaining: 10,
    },
  },
};

export default sandboxState;
