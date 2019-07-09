import React from "react";
import { TextField, Grid, Checkbox, FormControlLabel } from "@material-ui/core";

const namespaces = [
  { label: "Biological process", value: "biological_process" },
  { label: "Cellular component", value: "cellular_component" },
  { label: "Molecular function", value: "molecular_function" },
];

export default class GOFilter extends React.Component {
  constructor(props) {
    super(props);
    this.namespaces = this.props.defaults.namespace;
  }

  render() {
    return (
      <React.Fragment>
        <form>
          {namespaces.map(n => (
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

          <Grid spacing={24} container>
            <Grid item>
              <TextField
                label="Number of parent terms"
                placeholder="Number of parent terms"
                defaultValue={this.props.defaults.parents}
                margin="dense"
                variant="outlined"
                name="gene"
                fullWidth
                onChange={n => this.props.handleFilterChanged({ parents: n.target.value })}
              />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}
