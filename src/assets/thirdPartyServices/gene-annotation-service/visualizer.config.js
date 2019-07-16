export const MAXIMUM_GRAPH_SIZE = 1500;

export const CYTOSCAPE_COLA_CONFIG = {
  name: "cola",
  animate: true,
  maxSimulationTime: 3000,
  ungrabifyWhileSimulating: true,
  fit: true,
  padding: 10,
  randomize: true,
  avoidOverlap: true,
  handleDisconnected: true,
  nodeSpacing: 20,
  infinite: false,
};

export const CYTOSCAPE_STYLE = [
  // Node styles
  {
    selector: "node",
    css: {
      shape: "round-rectangle",
      width: "mapData(id.length, 0, 20, 50, 300)",
      height: "40",
      content: "data(id)",
      color: "#fff",
      "text-wrap": "wrap",
      "text-max-width": "350px",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#565656",
      "text-outline-color": "#565656",
      "text-outline-width": 1,
    },
  },
  {
    selector: 'node[group="biogrid_interaction_annotation"]',
    css: {
      shape: "ellipse",
      width: 75,
      height: 75,
    },
  },
  {
    selector: 'node[id^="Uni"]',
    css: {
      shape: "hexagon",
    },
  },
  {
    selector: 'node[id^="ChEBI"]',
    css: {
      shape: "diamond",
      height: 75,
    },
  },
  {
    selector: "node:selected",
    css: {
      "border-width": 5,
      "border-color": "#AAD8FF",
      "border-opacity": 1,
    },
  },
  {
    selector: 'node[group="Gene"]',
    style: {
      shape: "ellipse",
      content: "data(id)",
      height: 75,
      color: "#fff",
      "text-outline-color": "#005bcd",
      "background-color": "#005bcd",
    },
  },
  {
    selector: 'node[group="main"]',
    style: {
      shape: "ellipse",
      content: "data(id)",
      width: 75,
      height: 75,
      color: "#fff",
      "background-color": "#005bcd",
      "text-outline-color": "#005bcd",
    },
  },
  // Edge styles
  {
    selector: "edge",
    css: {
      "curve-style": "haystack",
      "line-color": "#ccc",
      width: 4,
    },
  },
  {
    selector: "edge[group='gene_go_annotation']",
    css: {
      "curve-style": "straight",
      "target-arrow-shape": "triangle",
      "target-arrow-fill": "filled",
    },
  },
];
