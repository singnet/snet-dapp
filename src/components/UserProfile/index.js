import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import { useStyles } from "./styles";
import UserProfileAccount from "./UserProfileAccount";

const UserProfileTabs = {
  account: 0,
  settings: 1,
};

class UserProfile extends Component {
  state = {
    activeTab: 0,
  };

  componentDidMount = () => {
    const { activeTab } = this.props.match.params;
    if (activeTab && UserProfileTabs[activeTab.toLowerCase()]) {
      this.setState({ activeTab: UserProfileTabs[activeTab.toLowerCase()] });
    }
  };

  onTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, history, nickname } = this.props;
    const { activeTab } = this.state;

    const tabs = [
      { name: "Account", activeIndex: 0, component: <UserProfileAccount /> },
      { name: "Settings", activeIndex: 1, component: <UserProfileSettings history={history} /> },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;
    return (
      <div className={classes.UserProfileContainer}>
        <UserProfileHeader nickname={nickname} />
        <div>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} onClick={() => this.onTabChange(value.activeIndex)} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.nickname,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
