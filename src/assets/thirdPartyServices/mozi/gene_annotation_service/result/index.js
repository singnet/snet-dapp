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
import AssessmentIcon from "@material-ui/icons/AssessmentOutlined";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const width = document.body.clientWidth || window.screen.width;

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
  const [isSummaryShown, setSummaryShown] = useState(false);
  const [summaryTab, setSummaryTab] = useState(0);
  const [summary, setSummary] = useState(undefined);
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
      {response.statusMessage}. Try to
      <Button color="primary">run another annotation</Button>
    </Typography>
  );

  const renderComplete = () => {
    const { nodes, edges } = response.result.elements;
    return (
      <Fragment>
        <Typography variant="body2">
          The result contains {nodes.length} entities and {edges.length} connections between them.
        </Typography>
        <div className="inline-buttons">
          <Button
            variant="contained"
            onClick={e => {
              if (!summary) {
                fetch(`${RESULT_ADDR}/summary/${id}`).then(data => {
                  data
                    .clone()
                    .text()
                    .then(t => {
                      setSummary(JSON.parse(t));
                    });
                });
              }
              setSummaryShown(true);
            }}
          >
            <AssessmentIcon style={{ marginRight: 15 }} /> View summary
          </Button>
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
      </Fragment>
    );
  };

  const renderSummaryTable = tableData => {
    const rows = Object.values(tableData).reduce((acc, v) => ({ ...acc, ...v[0] }), {});
    return (
      <Table className="mozi modal-table" size="small" style={{ minWidth: width - 300 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {Object.keys(rows).map(r => (
              <TableCell>{r.split("_").join(" ")}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(tableData).map((k, i) => (
            <TableRow>
              <TableCell>{k}</TableCell>
              {Object.keys(rows).map(r => (
                <TableCell>{tableData[k][0][r] || "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderSummary = data => (
    <Modal className="mozi modal" onClose={() => setSummaryShown(false)} open={true}>
      {data ? (
        <div className="content">
          <Typography variant="body2" style={{ padding: "20px 15px" }}>
            A Reference Databases: <a href={data["A Reference Databases"]}>{data["A Reference Databases"]}</a>
          </Typography>
          <AppBar position="static" color="default">
            <Tabs indicatorColor="primary" value={summaryTab} onChange={(e, value) => setSummaryTab(value)}>
              {Object.keys(data)
                .filter((d, i) => i)
                .map((d, i) => (
                  <Tab key={`k${i}`} label={d} id={`tab${i}`} />
                ))}
            </Tabs>
            <div
              style={{
                position: "absolute",
                textAlign: "right",
                right: 15,
                top: 15,
              }}
            >
              {summary && (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    let json = JSON.stringify(summary);
                    const link = document.createElement("a");
                    let file = new Blob([json], { type: "text/json" });
                    link.href = URL.createObjectURL(file);
                    link.download = `summary.json`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                >
                  <CloudDownloadIcon style={{ marginRight: 15 }} /> Download summary JSON
                </Button>
              )}
            </div>
          </AppBar>
          {renderSummaryTable(Object.values(data)[summaryTab + 1])}
        </div>
      ) : (
        <div style={{ padding: 30 }}>
          <Typography variant="body1">
            <CircularProgress /> Fetching summary ...
          </Typography>
        </div>
      )}
    </Modal>
  );

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
          graph={JSON.parse(JSON.stringify({ ...response.result.elements }))}
          annotations={response.result.elements.nodes
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
      {isSummaryShown && renderSummary(summary)}
    </div>
  );
};

export default AnnotationResult;
