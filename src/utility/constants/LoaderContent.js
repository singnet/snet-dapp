export const LoaderContent = {
  APP_INIT: {
    loaderHeader: "Initializing application",
    loaderText: "Initializing the application",
  },
  SIGNUP: {
    loaderHeader: "Signing Up",
    loaderText: "Please wait. we are creating an account for you",
  },
  LOGIN: {
    loaderHeader: "Logging In",
    loaderText: "Please wait while we log you in to the portal",
  },
  DELETE_USER: {
    loaderHeader: "Deleting your Account",
    loaderText: "Your user profile will be deleted",
  },
  FORGOT_PASSWORD: {
    loaderHeader: "Forgot Password",
    loaderText: "Sending you an email with the verification code",
  },
  FORGOT_PASSWORD_SUBMIT: {
    loaderHeader: "Forgot Password Submit",
    loaderText: "Resetting your password",
  },
  FREE_CALLS_GETTING: {
    loaderHeader: "Fetching Free Calls",
    loaderText: "Please wait while we fetch the free call details",
  },
  FETCH_SERVICE_DETAILS: {
    loaderHeader: "Fetching Service Details",
    loaderText: "Please wait while we fetch the service details",
  },
  FETCH_METERING_DATA: {
    loaderHeader: "Fetching usage data",
    loaderText: "Please wait,we're checking your usage data",
  },
  SERVICE_INVOKATION: (displayName) => ({
    loaderHeader: `Invoking ${displayName}`,
    loaderText: "Please wait, the AI service is computing the result",
  }),
  SIGN_OUT: {
    loaderHeader: "Signing Out",
    loaderText: "You will be signed out of the portal",
  },
  FILTER: {
    loaderHeader: "Filter",
    loaderText: "Filtering the services",
  },
  UPDATE_PROFILE: { loaderHeader: "Updating", loaderText: "Filtering the services" },
  FETCH_MM_ACC_DETAILS: {
    loaderHeader: "Fetching Metamask Account",
    loaderText: "Please wait while we retrieve your account details from Metamask",
  },
  FEEDBACK: {
    loaderHeader: "Senting your feedback",
    loaderText: "Please wait while we senting your feedback",
  },
  DEPOSIT: {
    loaderHeader: "Deposit",
    loaderText: `Depositing ${process.env.REACT_APP_TOKEN_NAME} tokens to Multi-party Escrow account`,
  },
  WITHDRAW: {
    loaderHeader: "Withdraw",
    loaderText: `Withdrawing ${process.env.REACT_APP_TOKEN_NAME} tokens from Multi-party Escrow account`,
  },
  CONNECT_METAMASK: {
    loaderHeader: "Connecting MetaMask",
    loaderText: "Please sign in using Metamask to proceed",
  },
  SETUP_CHANNEL_FOR_SERV_EXEC: {
    loaderHeader: "Setting up the Channel",
    loaderText: "Setting up the channel for service execution",
  },
  INITIATE_PAYPAL: {
    loaderHeader: "Setting up Paypal",
    loaderText: "Please wait while we redirect you to the paypal page",
  },
  FETCH_WALLET: {
    loaderHeader: "Fetching Wallet Info",
    loaderText: "Please wait. we're fetching your wallet details",
  },
  TRANSACTION_HISTORY: {
    loaderHeader: "Fetching Transaction History",
    loaderText: "Please wait while we fetch your transaction history",
  },
  FETCH_ORDER_DETAILS: {
    loaderHeader: "Fetching order details",
    loaderText: "Please wait. we're fetching your order details",
  },
  FETCH_LINKED_PROVIDERS: {
    loaderHeader: "Fetching linked providers",
    loaderText: "Please wait while we fetch all the linked providers for the selected wallet",
  },
  FETCH_PENDING_ORDER: {
    loaderHeader: "Fetching pending order",
    loaderText: "Please wait while we fetch the details of your pending order",
  },
  INIT_SERVICE_DEMO: {
    loaderHeader: "Initializing Service Demo",
    loaderText: "Please wait while we initialize the demo of the service",
  },
  FETCH_TRAINING_EXISTING_MODEL: {
    loaderHeader: "Fetching existing training models",
    loaderText: "Please wait. we're fetching existing models",
  },
  CREATE_TRAINING_MODEL: {
    loaderHeader: "Creating training models",
    loaderText: "Please wait. we're creating training models",
  },
  TRAIN_MODEL: {
    loaderHeader: "Training model",
    loaderText: "Please wait. we're training model",
  },
  DELETE_MODEL: {
    loaderHeader: "Deleting model",
    loaderText: "Please wait. we're deleting model",
  },
  UPDATE_MODEL: {
    loaderHeader: "Updating model",
    loaderText: "Please wait. we're updating model",
  },
  SET_DATASET: {
    loaderHeader: "Handling dataset",
    loaderText: "Please wait while we handle the dataset",
  },
  GET_DATASET_STATISTIC: {
    loaderHeader: "Fetching dataset statistic",
    loaderText: "Please wait while we fetch the dataset statistic",
  },
  IMPROVE_DATASET: {
    loaderHeader: "Improving dataset",
    loaderText: "Please wait while we improving the dataset",
  },
  MERGE_DATASETS: {
    loaderHeader: "Merging datasets",
    loaderText: "Please wait while we merge the datasets",
  },
};
