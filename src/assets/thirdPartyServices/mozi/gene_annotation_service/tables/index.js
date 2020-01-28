import React, { useState, useEffect, Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import { downloadCSVFile } from "../service";
import * as papa from "papaparse";
import "./style.css";
import AnchorLink from "../../../../../components/common/AnchorLink";

const parseTable = tableData => papa.parse(tableData);
const width = document.body.clientWidth || window.screen.width;

const ResultTables = props => {
  const [tab, setTab] = useState(0);
  const { handleClose, tables, fetchTableData } = props;

  useEffect(() => {
    fetchTableData(tables[tab].fileName);
  }, []);

  useEffect(() => {
    fetchTableData(tables[tab].fileName);
  }, [tab]);

  const renderGeneGOTable = () => {
    const data = tables.find(t => t.displayName === "GO").data;
    const table = parseTable(data).data;
    const genes = table[0].slice(1).filter((g, i) => table[0].indexOf(g) === i);
    const tableData = table.slice(4);
    return (
      <div>
        {genes.map((g, i) => (
          <ExpansionPanel key={g}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h6">{g}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography>{table[1][i * 6 + 1]}</Typography>
                <Typography variant="body1">
                  <AnchorLink href={`https://www.ncbi.nlm.nih.gov/gene/?term=${g}`} label={`Learn more about ${g}`} />
                </Typography>
                <Table size="small" style={{ minWidth: width - 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={2}>No</TableCell>
                      <TableCell colSpan={2}>GO molecular function</TableCell>
                      <TableCell colSpan={2}>GO biological process</TableCell>
                      <TableCell colSpan={2}>GO cellular component</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .filter(row => {
                        const values = row.slice(i * 6 + 1, i * 6 + 7);
                        return values[0] || values[1] || values[2] || values[3] || values[4] || values[5];
                      })
                      .map((row, j) => {
                        const values = row.slice(i * 6 + 1, i * 6 + 7);
                        return (
                          <TableRow key={row.name}>
                            <TableCell>{j + 1}</TableCell>
                            <TableCell>
                              <AnchorLink
                                href={`http://amigo.geneontology.org/amigo/term/${values[1]}`}
                                label={values[1]}
                              />
                            </TableCell>
                            <TableCell>{values[0]}</TableCell>
                            <TableCell>
                              <AnchorLink
                                href={`http://amigo.geneontology.org/amigo/term/${values[3]}`}
                                label={values[3]}
                              />
                            </TableCell>
                            <TableCell>{values[2]}</TableCell>
                            <TableCell>
                              <AnchorLink
                                href={`http://amigo.geneontology.org/amigo/term/${values[5]}`}
                                label={values[5]}
                              />
                            </TableCell>
                            <TableCell>{values[4]}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  };

  const renderChebi = c =>
    c ? (
      <AnchorLink href={`https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${c.slice(c.indexOf(":") + 1)}`} label={c} />
    ) : (
      c
    );

  const renderPathwayTable = () => {
    const data = tables.find(t => t.displayName === "PATHWAY").data;
    const table = parseTable(data).data;
    const pathways = table[0].slice(1).filter((g, i) => table[0].indexOf(g) === i);
    const tableData = table.slice(3);
    return (
      <div>
        {pathways.map((p, i) => (
          <ExpansionPanel key={p}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{p}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography>{table[1][i * 3 + 1]}</Typography>
                <Typography variant="body1">
                  <AnchorLink href={` http://www.reactome.org/content/detail/${p}`} label={`Learn more about ${p}`} />
                </Typography>
                <Table size="small" style={{ minWidth: width - 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Gene</TableCell>
                      <TableCell>Protien</TableCell>
                      <TableCell>Small molecule</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .filter(row => {
                        const values = row.slice(i * 3 + 1, i * 3 + 4);
                        return values[0] || values[1] || values[2];
                      })
                      .map((row, j) => {
                        const values = row.slice(i * 3 + 1, i * 3 + 4);
                        const protien = values[1]
                          .trim()
                          .split(" ")
                          .filter(s => s);
                        return (
                          <TableRow key={"row" + j}>
                            <TableCell>{j + 1}</TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                <AnchorLink
                                  href={`https://www.ncbi.nlm.nih.gov/gene/?term=${values[0]}`}
                                  label={values[0]}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Fragment>
                                {protien.length > 0 && (
                                  <Typography variant="body1">
                                    <a
                                      href={`https://www.uniprot.org/uniprot/${protien[0].slice(
                                        protien[0].indexOf(":") + 1
                                      )}`}
                                      style={{ marginRight: 15 }}
                                    >
                                      {protien[0].slice(protien[0].indexOf(":") + 1)}
                                    </a>{" "}
                                  </Typography>
                                )}
                                {protien.length > 1 && (
                                  <Typography variant="body1">
                                    <AnchorLink
                                      href={`https://www.ncbi.nlm.nih.gov/gene/?term=${protien[1]}`}
                                      label={protien[1]}
                                    />
                                  </Typography>
                                )}
                              </Fragment>
                            </TableCell>
                            <TableCell>{renderChebi(values[2])}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  };

  const renderBiogridTable = () => {
    const data = tables.find(t => t.displayName === "BIOGRID").data;
    const table = parseTable(data).data;
    const interactions = table[0].slice(1).filter((g, i) => table[0].indexOf(g) === i);
    const tableData = table.slice(3);
    return (
      <div>
        {interactions.map((b, i) => (
          <ExpansionPanel key={b}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{b}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography>{table[1][i * 6 + 1]}</Typography>
                <Typography variant="body1">
                  <AnchorLink href={`https://www.ncbi.nlm.nih.gov/gene/?term=${b}`} label={`Learn more about ${b}`} />
                </Typography>
                <Table size="small" style={{ minWidth: width - 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Interacting features</TableCell>
                      <TableCell>Pubmed ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .filter(row => {
                        const values = row.slice(i * 3 + 1, i * 3 + 4);
                        return values[0] || values[1] || values[2] || values[3];
                      })
                      .map((row, j) => {
                        const values = row.slice(i * 3 + 1, i * 3 + 4);

                        return (
                          <TableRow key={row.name}>
                            <TableCell>{j + 1}</TableCell>
                            <TableCell>{values[0] || "-"}</TableCell>

                            <TableCell>
                              <Typography variant="body1">
                                {values[1] ? (
                                  values[1].includes("Uniprot") ? (
                                    <a
                                      href={`https://www.uniprot.org/uniprot/${values[1].slice(
                                        values[1].indexOf(":") + 1
                                      )}`}
                                      style={{ marginRight: 15 }}
                                    >
                                      {values[1].slice(values[1].indexOf(":") + 1)}
                                    </a>
                                  ) : (
                                    <AnchorLink
                                      href={`https://www.ncbi.nlm.nih.gov/gene/?term=${values[1]}`}
                                      label={values[1]}
                                    />
                                  )
                                ) : (
                                  values[1]
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {values[2]
                                ? values[2]
                                    .trim()
                                    .split(",")
                                    .map(t =>
                                      t.includes("http") ? (
                                        <Typography variant="body1" key={t}>
                                          <a
                                            style={{ marginRight: 15 }}
                                            href={t}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {t.slice(t.indexOf("=") + 1, t.length)}
                                          </a>{" "}
                                        </Typography>
                                      ) : (
                                        t
                                      )
                                    )
                                : "-"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  };

  return (
    <Modal onClose={handleClose} open={true} style={{ marginLeft: 100, marginTop: 30 }}>
      <div
        style={{
          backgroundColor: "#e5e5e5",
          width: width - 200,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs indicatorColor="primary" value={tab} onChange={(e, value) => setTab(value)}>
            {tables.map(t => (
              <Tab key={t} label={t.displayName} id={t.displayName} />
            ))}
          </Tabs>
          <div
            style={{
              position: "absolute",
              textAlign: "right",
              right: 130,
              top: 10,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => downloadCSVFile(props.id, tables[tab].fileName)}
            >
              <CloudDownloadIcon style={{ marginRight: 15 }} /> Download CSV file for {tables[tab].displayName}
            </Button>
          </div>
        </AppBar>
        <div style={{ padding: 15, overflowY: "scroll", maxHeight: "90vh" }}>
          {!tables[tab].data ? (
            <div className="tabbed-table-spinner-wrapper">
              <Typography variant="body1">
                <CircularProgress /> Fetching table content ...
              </Typography>
            </div>
          ) : null}
          {tables[tab].data && tables[tab].displayName === "GO" && renderGeneGOTable()}
          {tables[tab].data && tables[tab].displayName === "PATHWAY" && renderPathwayTable()}
          {tables[tab].data && tables[tab].displayName === "BIOGRID" && renderBiogridTable()}
        </div>
      </div>
    </Modal>
  );
};

export default ResultTables;
