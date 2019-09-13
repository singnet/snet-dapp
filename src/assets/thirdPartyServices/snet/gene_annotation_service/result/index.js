import React, { useState, useEffect, Fragment } from "react";
import { parse, formatDistanceToNow, toDate } from "date-fns";
import { RESULT_ADDR, downloadSchemeFile } from "../service";
import TabbedTables from "../tables";
import Visualizer from "../visualizer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";
import "./style.css";

export const AnnotationStatus = {
  ACTIVE: 1,
  COMPLETED: 2,
  ERROR: -1,
};

const AnnotationResult = props => {
  const [response, setResponse] = useState(undefined);
  const [isTableShown, setTableShown] = useState(false);
  const [isVisualizerShown, setVisualizerShown] = useState(false);
  const [isFetchingResult, setFetchingResult] = useState(false);
  const { ACTIVE, COMPLETED, ERROR } = AnnotationStatus;
  const id = props.id;

  useEffect(() => {
    setFetchingResult(true);
    fetch(`${RESULT_ADDR}/status/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 2) {
          return fetch(`${RESULT_ADDR}/${id}`)
            .then(res => res.json())
            .then(result => {
              setFetchingResult(false);
              setResponse(Object.assign({}, res, { result }));
            });
        }
        setFetchingResult(false);
        setResponse({
          status: AnnotationStatus.ERROR,
          statusMessage: res.response,
        });
      });
  }, []);

  const fetchTableData = fileName => {
    fetch(`${RESULT_ADDR}/csv_file/${id}/${fileName.substr(0, fileName.length - 4)}`).then(data => {
      const res = Object.assign({}, response);
      data
        .clone()
        .text()
        .then(text => {
          res.csv_files.find(f => f.fileName === fileName).data = text;
          setResponse(res);
        });
    });
  };

  const renderActive = () => (
    <Fragment>
      <Typography variant="h6">Processing annotation</Typography>
      <Typography variant="body2">The annotation task is still processing, refresh the page to check again.</Typography>
    </Fragment>
  );

  const renderError = () => (
    <Typography variant="body2">
      {console.log(response)}
      {response.statusMessage}. Try to
      <Button color="primary">run another annotation</Button>
    </Typography>
  );

  const renderComplete = () => {
    const { nodes, edges } = response.result;
    return (
      <Fragment>
        <Typography variant="body2">
          The result contains {nodes.length} entities and {edges.length} connections between them.
        </Typography>
        <Typography variant="body2">
          This page will expire in {formatDistanceToNow(toDate(response.expire_time * 1000))}.
        </Typography>
        <div className="inline-buttons">
          <Button variant="contained" onClick={e => setTableShown(true)}>
            <TableChartOutlinedIcon style={{ marginRight: 15 }} /> View results table
          </Button>
          <Button variant="contained" onClick={() => downloadSchemeFile(id)}>
            <CloudDownloadIcon style={{ marginRight: 15 }} /> Download Scheme File
          </Button>
          <Button variant="contained" color="primary" onClick={e => setVisualizerShown(true)}>
            <VisibilityIcon style={{ marginRight: 15 }} /> Visualize the result
          </Button>
        </div>
        {/* <Typography variant="body2" className="call-to-action">
          <Button color="primary">
            <ChevronLeft />
            Run another annotation
          </Button>
        </Typography> */}
        {/* Show the visualizer */}
      </Fragment>
    );
  };

  return (
    <div className="content-wrapper">
      {/* Logo and title */}
      <div className="landing-page container">
        {response && response.status === COMPLETED && renderComplete()}
        {response && response.status === ACTIVE && renderActive()}
        {response && response.status === ERROR && renderError()}
        {/* Show loader if there is a request being processed */}
        {isFetchingResult && (
          <div className="spin-wrapper">
            <CircularProgress color="primary" size={24} style={{ marginRight: 15 }} /> Fetching results ...
          </div>
        )}
      </div>
      {isVisualizerShown && (
        <Visualizer
          graph={response.result}
          annotations={response.result.nodes
            .reduce((acc, n) => [...acc, ...n.data.group, n.data.subgroup], [])
            .filter((a, i, self) => a && self.indexOf(a) === i)}
          onClose={() => setVisualizerShown(false)}
        />
      )}
      {/* Show annotations tables */}
      {isTableShown && (
        <TabbedTables
          id={id}
          tables={response.csv_files}
          fetchTableData={fetchTableData}
          handleClose={() => setTableShown(false)}
        />
      )}
    </div>
  );
};

export default AnnotationResult;
