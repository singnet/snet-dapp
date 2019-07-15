import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Session from "../../utility/constants/Session";
import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import { useStyles } from "./styles";

class UserProfile extends Component {
  state = {
    activeTab: 0,
  };

  onTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, history } = this.props;
    const { activeTab } = this.state;
    const userName = sessionStorage.getItem(Session.USERNAME);

    const tabs = [
      { name: "Settings", activeIndex: 0, component: <UserProfileSettings userName={userName} history={history} /> },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;
    return (
      <div className={classes.UserProfileContainer}>
        <UserProfileHeader userName={userName} />
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

export default withStyles(useStyles)(UserProfile);
