import React from "react";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileAccount from "./UserProfileAccount";
import UserProfileTransactionHistory from "./UserProfileTransactionHistory";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

export const userProfileRoutes = {
  ACCOUNT: { path: `/${Routes.USER_PROFILE}/account`, component: () => <UserProfileAccount /> },
  SETTINGS: { path: `/${Routes.USER_PROFILE}/settings`, component: () => <UserProfileSettings /> },
  TRANSACTIONS: { path: `/${Routes.USER_PROFILE}/transactions`, component: () => <UserProfileTransactionHistory /> },
};

const activeIndexEnum = {
  [`${userProfileRoutes.ACCOUNT.path}`]: 0,
  [`${userProfileRoutes.SETTINGS.path}`]: 1,
  [`${userProfileRoutes.TRANSACTIONS.path}`]: 2,
};

const tabs = [
  { name: "Account", activeIndex: 0, path: userProfileRoutes.ACCOUNT.path },
  { name: "Settings", activeIndex: 1, path: userProfileRoutes.SETTINGS.path },
  { name: "Transactions", activeIndex: 2, path: userProfileRoutes.TRANSACTIONS.path },
];

const UserProfile = ({ classes, nickname, history, location, email }) => {
  const onTabChange = (activeTab, activePath) => {
    history.push(activePath);
  };

  const activeTab = () => {
    const { pathname } = location;
    const activeIndex = activeIndexEnum[`${pathname.toLowerCase()}`];
    if (activeIndex) {
      return activeIndex;
    }
    return 0;
  };

  return (
    <div className={classes.UserProfileContainer}>
      <UserProfileHeader nickname={nickname} email={email} />
      <div>
        <AppBar position="static" className={classes.tabsHeader}>
          <Tabs value={activeTab()}>
            {tabs.map(value => (
              <Tab key={value.name} label={value.name} onClick={() => onTabChange(value.activeIndex, value.path)} />
            ))}
          </Tabs>
        </AppBar>
        <Switch>
          <Route path={userProfileRoutes.TRANSACTIONS.path} component={userProfileRoutes.TRANSACTIONS.component} />
          <Route path={userProfileRoutes.SETTINGS.path} component={userProfileRoutes.SETTINGS.component} />
          <Route path={Routes.userProfileRoutes} component={userProfileRoutes.ACCOUNT.component} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nickname: state.userReducer.nickname,
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
