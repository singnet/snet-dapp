export default {
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
      org_id: process.env.REACT_APP_SANDBOX_ORG_ID,
      service_id: process.env.REACT_APP_SANDBOX_SERVICE_ID,
      display_name: "Example Service",
      description: "Simple example service.",
      url: "https://github.com/singnet/example-service",
      tags: ["example", "tutorial"],
      is_available: 1,
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
              is_available: 1,
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
