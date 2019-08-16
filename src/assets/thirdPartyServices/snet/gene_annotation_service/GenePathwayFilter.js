import React from "react";
import { Grid, Checkbox, FormControlLabel, FormLabel, Switch } from "@material-ui/core";

const options = [{ label: "Reactome", value: "reactome" }];

export default class GenePathwayFilter extends React.Component {
  constructor(props) {
    super(props);
    this.namespaces = this.props.defaults.namespace;
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <FormLabel component="legend">Select pathways</FormLabel>
          {options.map(n => (
            <FormControlLabel
              key={n.value}
              value={n.value}
              control={
                <Checkbox
                  name={n.value}
                  defaultChecked={this.props.defaults.namespace.includes(n.value)}
                  onChange={e => {
                    if (e.target.checked) {
                      this.namespaces.push(e.target.name);
                    } else {
                      this.namespaces = this.namespaces.filter(n => n !== e.target.name);
                    }
                    this.props.handleFilterChanged({
                      namespace: this.namespaces,
                    });
                  }}
                />
              }
              label={n.label}
            />
          ))}
          <Grid container spacing={16}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={this.props.defaults.include_small_molecule}
                    onChange={e => {
                      this.props.handleFilterChanged({
                        include_small_molecule: e.target.checked,
                      });
                    }}
                  />
                }
                label="Small molecules"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={this.props.defaults.include_prot}
                    onChange={e => {
                      this.props.handleFilterChanged({
                        include_prot: e.target.checked,
                      });
                    }}
                  />
                }
                label="Proteins"
              />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}
