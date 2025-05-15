import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import { aws_config } from "./config/aws_config";
import theme from "./assets/Theme";
import { userActions } from "./Redux/actionCreators";
import AppLoader from "./components/common/AppLoader";
import initHotjar from "./assets/externalScripts/hotjar";
import initGDPRNotification from "./assets/externalScripts/gdpr";
import FeedbackFormModal from "@components/FeedbackFormModal";
import GlobalRouter from "./GlobalRouter";
import AppCircularLoader from "./components/common/AppCircularLoader";

Amplify.configure(aws_config);

if (process.env.REACT_APP_HOTJAR_ID && process.env.REACT_APP_HOTJAR_SV) {
  initHotjar(process.env.REACT_APP_HOTJAR_ID, process.env.REACT_APP_HOTJAR_SV);
}
initGDPRNotification();

const App = () => {
  const isInitialized = useSelector((state) => state.userReducer.isInitialized);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.fetchUserDetails());
  }, [dispatch]);

  if (!isInitialized) {
    return <AppCircularLoader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalRouter />
      <FeedbackFormModal />
      <AppLoader />
    </ThemeProvider>
  );
};

export default App;
