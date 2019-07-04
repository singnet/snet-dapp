import React from "react";

import { Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";

const filterFormStyle = {
  paddingLeft: "25px",
  marginLeft: "5px",
  borderLeft: "dashed 1px #ddd",
};

export default class AnnotationSelection extends React.Component {
  isAnnotationSelected(annotation) {
    return this.props.selectedAnnotations.some(sa => sa.name === annotation);
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Annotations:
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            {this.props.availableAnnotations.map(a => (
              <React.Fragment key={a.key}>
                <FormControlLabel
                  value="0"
                  control={
                    <Checkbox
                      name={a.key}
                      onChange={e => this.props.handleAnnotationsChanged(e.target.checked, e.target.name)}
                    />
                  }
                  label={a.name}
                />
                <br />
                {this.isAnnotationSelected(a.key) && (
                  <div style={filterFormStyle} layout="inline">
                    {a.fitlerForm(a.defaults, filter => this.props.handleFilterChanged(a.key, filter))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
