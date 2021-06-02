import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Visualizer from "../visualizer";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function TabbedViz(props) {
  const [value, setValue] = useState(props.initVal);
  const classes = useStyles();
  const theme = useTheme();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar className="tabs-wrapper" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth">

        <Tab label="Main Graph" {...a11yProps(0)} disabled={props.nonGOGraph == null}/>
        <Tab label="GO" {...a11yProps(1)} disabled={props.goGraph == null}/>
      </Tabs>
      <TabPanel value={value} index={0}>
        {props.nonGOGraph && (
          <Visualizer onClose={props.close} isGO={false} graph={{ ...props.nonGOGraph.elements }}
                      annotations={props.nonGOGraph.elements.nodes
                        .reduce(
                          (acc, n) => [...acc, ...n.data.group, n.data.type],
                          [],
                        )
                        .filter((a, i, self) => a && self.indexOf(a) === i)}/>
        )}

      </TabPanel>
      <TabPanel value={value} index={1} >
        {props.goGraph && (
          <Visualizer onClose={props.close} isGO={true} graph={{ ...props.goGraph.elements }}
                      annotations={props.goGraph.elements.nodes
                        .reduce(
                          (acc, n) => [...acc, ...n.data.group, n.data.type],
                          [],
                        )
                        .filter((a, i, self) => a && self.indexOf(a) === i)}/>
        )}
      </TabPanel>z
    </AppBar>
  );
}

TabbedViz.propTypes = {
  initVal: PropTypes.number.isRequired,
  close: PropTypes.any.isRequired,
};

export default TabbedViz;
