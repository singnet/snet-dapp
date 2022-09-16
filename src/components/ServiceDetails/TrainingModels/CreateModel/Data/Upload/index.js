import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import UploadFromLink from "./UploadFromLink";
import { useStyles } from "./styles";

const Data = ({ classes }) => {
  const [value, setValue] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
		setSelectedTab(newValue)
  };

  return (
    <UploadFromLink />
    // <AppBar position="static" className={classes.appBar}>
    //   <Tabs
    //     className={classes.tabsContainer}
    //     value={value}
    //     onChange={handleChange}
    //     variant="scrollable"
    //     indicatorColor="primary"
    //     textColor="primary"
    //     aria-label="basic tabs example"
    //   >
    //     <Tab className={classes.tab} label="Upload from link" value={0} />
    //   </Tabs>
    //   {selectedTab === 0 && ( <UploadFromLink /> )}
    // </AppBar>
  );
};

export default withStyles(useStyles)(Data);
