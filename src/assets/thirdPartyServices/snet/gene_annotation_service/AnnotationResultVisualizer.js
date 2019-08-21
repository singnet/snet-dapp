import React from "react";
import * as cytoscape from "cytoscape";
import { CYTOSCAPE_COLA_CONFIG, CYTOSCAPE_STYLE } from "./visualizer.config";
import * as cola from "cytoscape-cola";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormGroup,
} from "@material-ui/core";
import {
  Shuffle,
  PhotoCameraOutlined,
  FileCopyOutlined,
  HelpOutline,
  Share,
  ExpandMore,
  ChangeHistory,
} from "@material-ui/icons";

const AnnotationColorsLight = ["#c2ddf0", "#d2cfe2", "#e6e2cb", "#E0D0E3", "#C1CEE8", "#C8DECC"];
const AnnotationColorsDark = ["#70b1dc", "#776fa9", "#b6a863", "#a06fa9", "#587bc1", "#70a97a"];

export default class AnnotationResultVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode: { node: null, position: null },
      history: [],
    };
    this.cy_wrapper = React.createRef();
    cytoscape.use(cola);
  }

  randomLayout() {
    this.layout = this.cy.layout(CYTOSCAPE_COLA_CONFIG);
    this.layout.run();
  }

  breadthFirstLayout() {
    if (this.layout) this.layout.stop();
    this.layout = this.cy.layout({ name: "breadthfirst" });
    this.layout.run();
  }

  takeScreenshot() {
    const image = this.cy.jpg();
    const link = document.createElement("a");
    link.setAttribute("href", image);
    link.setAttribute("download", "mozi-graph.jpg");
    link.click();
  }

  componentDidMount() {
    this.cy = cytoscape({
      container: this.cy_wrapper.current,
      hideEdgesOnViewport: true,
    });
    this.cy.add(this.props.graph.nodes.filter(n => n.data.group === "main" && n.data.id));
    this.toggleAnnotationVisibility(this.props.annotations[0], true);
    this.cy.style(CYTOSCAPE_STYLE.concat(this.assignColorToAnnotations()));
    this.registerEventListeners();
    this.randomLayout();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sliderWidth != this.props.sliderWidth) {
      this.randomLayout();
    }
  }

  registerEventListeners() {
    this.cy.nodes().on("mouseover", event => {
      this.setState({
        selectedNode: {
          node: event.target.data(),
          position: event.renderedPosition,
        },
      });
    });
    this.cy.nodes().on("select", event => {
      this.focusOnNode(event.target.data().id);
    });
    this.cy.nodes().on("mouseout", event => {
      this.setState({ selectedNode: { node: null, position: null } });
    });
    this.cy.nodes().on("unselect", event => {
      this.removeFocus();
    });
  }

  removeFocus() {
    this.cy.batch(() => {
      this.cy.elements().style({ opacity: 1 });
    });
  }

  assignColorToAnnotations() {
    return this.props.annotations.reduce((acc, ann, i, arr) => {
      acc.push({
        selector: 'edge[group="' + ann + '"]',
        style: {
          "line-color": AnnotationColorsLight[i],
          "text-outline-color": AnnotationColorsLight[i],
          "target-arrow-color": AnnotationColorsDark[i],
        },
      });
      acc.push({
        selector: 'node[group="' + ann + '"]',
        style: {
          "background-color": AnnotationColorsDark[i],
          color: "#fff",
          "text-outline-width": 2,
          "text-outline-color": AnnotationColorsDark[i],
        },
      });
      return acc;
    }, []);
  }

  focusOnNode(id) {
    const hood = this.cy.getElementById(id).closedNeighborhood();
    this.cy.fit(hood);
    this.cy.batch(() => {
      this.cy
        .elements()
        .difference(hood)
        .style({ opacity: 0.1 });
    });
  }

  downloadGraphJSON() {
    const json = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(this.props.graph))}`;
    const link = document.createElement("a");
    link.setAttribute("href", json);
    link.setAttribute("download", "annotation-graph.json");
    link.click();
  }

  toggleAnnotationVisibility(annotation, show) {
    show
      ? this.cy.batch(() => {
          this.cy.add(this.props.graph.nodes.filter(e => e.data.group === annotation && e.data.id));
          this.cy.add(
            this.props.graph.edges.filter(e => e.data.group === annotation && e.data.source && e.data.target)
          );
        })
      : this.cy.remove(`[group='${annotation}']`);
    this.randomLayout();
    this.registerEventListeners();
  }

  annotationPercentage(annotation) {
    return (
      (100 * this.props.graph.edges.filter(e => e.data.group === annotation).length) / this.props.graph.edges.length
    );
  }

  formatDescription(description) {
    if (description.indexOf("https://") > -1 || description.indexOf("http://") > -1) {
      return (
        <a href={description} rel="noopener noreferrer" target="_blank">
          Learn more
        </a>
      );
    }
    return description;
  }

  render() {
    console.log("width", this.props.sliderWidth);

    return (
      <div
        style={{
          minHeight: "85vh",
        }}
      >
        <Grid container>
          <Grid
            item
            cs={1}
            style={{
              position: "absolute",
              top: "60px",
              left: "15px",
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
              size="large"
            >
              <Tooltip placement="right" title="Randomize layout">
                <IconButton onClick={e => this.randomLayout()}>
                  <Shuffle />
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Breadth-first layout">
                <IconButton onClick={e => this.breadthFirstLayout()}>
                  <ChangeHistory />
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Save screenshot">
                <IconButton onClick={e => this.takeScreenshot()}>
                  <PhotoCameraOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip placement="right" title="Download scheme file">
                <IconButton onClick={e => this.props.downloadSchemeFile()}>
                  <FileCopyOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Download graph as JSON">
                <IconButton onClick={e => this.downloadGraphJSON()}>
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip
                placement="right"
                title={
                  <div>
                    <p>Use the checkboxes to the right to filter the graph by annotations.</p>
                    <p>Click on a gene node to see annotations connected to it.</p>
                    <p>Click on an annotation to see which genes it annotates.</p>
                  </div>
                }
              >
                <IconButton>
                  <HelpOutline />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                minHeight: "100vh",
                width: `${this.props.sliderWidth}`,
              }}
              ref={this.cy_wrapper}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              position: "absolute",
              top: "60px",
              right: "15px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              zIndex: 2,
            }}
          >
            <ExpansionPanel style={{ width: "100%" }}>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <h5>Annotations</h5>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormGroup>
                  {this.props.annotations.map((a, i) => (
                    <React.Fragment key={a}>
                      <FormControlLabel
                        value="0"
                        key={a}
                        control={
                          <Checkbox
                            defaultChecked={i === 0}
                            name={a.key}
                            onChange={e => this.toggleAnnotationVisibility(a, e.target.checked)}
                          />
                        }
                        label={a}
                      />
                      <div
                        style={{
                          minHeight: "5px",
                          width: "100%",
                          backgroundColor: `${AnnotationColorsLight[i]}`,
                        }}
                      >
                        <div
                          style={{
                            minHeight: "5px",
                            width: `${this.annotationPercentage(a)}%`,
                            backgroundColor: `${AnnotationColorsDark[i]}`,
                          }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </FormGroup>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        {this.state.selectedNode.node && (
          <div
            style={{
              position: "absolute",
              top: `${this.state.selectedNode.position.y}px`,
              left: `${this.state.selectedNode.position.x}px`,
              width: "350px",
              backgroundColor: "#c9e1f9",
              border: "solid 1px #87BEF5",
              padding: "5px",
              borderRadius: "3px",
            }}
          >
            <h4>{`${this.state.selectedNode.node.name} ( ${this.state.selectedNode.node.id} )`}</h4>
            <p>{this.formatDescription(this.state.selectedNode.node.definition)}</p>
          </div>
        )}
      </div>
    );
  }
}
