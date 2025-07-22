import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileAccount from "./UserProfileAccount";
// import UserProfileTransactionHistory from "./UserProfileTransactionHistory";
// import UserProfileModels from "./UserProfileModels";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

export const userProfileRoutes = {
  ACCOUNT: `/${Routes.USER_PROFILE}/account`,
  SETTINGS: `/${Routes.USER_PROFILE}/settings`,
  TRANSACTIONS: `/${Routes.USER_PROFILE}/transactions`,
  // MODELS: { path: `/${Routes.USER_PROFILE}/models`, component: () => <UserProfileModels /> },
};

const UserProfile = ({ classes, nickname, email }) => {
  const tabs = useMemo(
    () => ({
      account: {
        name: "Account",
        index: 0,
        path: userProfileRoutes.ACCOUNT,
        component: <UserProfileAccount />,
      },
      settings: {
        name: "Settings",
        index: 1,
        path: userProfileRoutes.SETTINGS,
        component: <UserProfileSettings />,
      },
      // transactions: {
      //   name: "PayPal Transactions",
      //   index: 2,
      //   path: userProfileRoutes.TRANSACTIONS,
      //   component: <UserProfileTransactionHistory />,
      // },
    }),
    []
  );

  const tabByPath = useMemo(
    () => ({
      [`${tabs.account.path}`]: "account",
      [`${tabs.settings.path}`]: "settings",
      // [`${tabs.transactions.path}`]: "transactions",
    }),
    [tabs]
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(tabs.account);

  const selectTab = useCallback(
    (tab) => {
      setActiveTab(tab);
      navigate(tab.path);
    },
    [navigate]
  );

  useEffect(() => {
    selectTab(tabs[tabByPath[`${location.pathname.toLowerCase()}`]]);
  }, [location.pathname, tabs, tabByPath, selectTab]);

  return (
    <div className={classes.UserProfileContainer}>
      <UserProfileHeader nickname={nickname} email={email} />
      <div>
        <AppBar position="static" className={classes.tabsHeader}>
          <Tabs value={activeTab.index}>
            {Object.values(tabs).map((value) => (
              <Tab key={value.name} label={value.name} onClick={() => selectTab(value)} />
            ))}
          </Tabs>
        </AppBar>
        {activeTab.component}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.userReducer.nickname,
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
