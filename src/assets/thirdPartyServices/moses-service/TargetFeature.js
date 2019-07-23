import React from "react";
import { TextField, Grid, Tooltip, FormControl, Select, MenuItem, OutlinedInput, FormLabel } from "@material-ui/core";
import { checkRequired, checkBetween } from "./utils";

export default class TargetFeatureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {
        targetFeature: null,
        filter: null,
      },
    };
  }

  updateValidationStatus() {
    this.props.setValidationStatus(Object.values(this.state.validationErrors).filter(v => v).length === 0);
  }

  validateForm(oldValues, newValues) {
    const validationErrors = Object.assign({}, this.state.validationErrors);
    let valuesChanged = false;
    if (newValues.targetFeature !== oldValues.targetFeature) {
      validationErrors.targetFeature = checkRequired(newValues.targetFeature);
      valuesChanged = true;
    }

    if (newValues.filter.value !== oldValues.filter.value || newValues.filter.name !== oldValues.filter.name) {
      if (!newValues.filter.name) {
        validationErrors.filter = null;
      } else {
        validationErrors.filter = checkRequired(newValues.filter.value) || checkBetween(newValues.filter.value, 0, 1);
      }
      valuesChanged = true;
    }

    return valuesChanged ? this.setState({ validationErrors: validationErrors }) : null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.validateForm(prevProps.defaults, this.props.defaults);
  }

  render() {
    this.updateValidationStatus();
    return (
      <div style={{ width: "100%" }}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <Tooltip title="The name of the target feature column in the dataset" placement="top-start">
                <TextField
                  label="Target feature"
                  placeholder="Target feature"
                  margin="dense"
                  variant="outlined"
                  name="targetFeature"
                  onChange={e => this.props.changeInput(e)}
                  required
                  fullWidth
                  defaultValue={this.props.defaults.targetFeature}
                  {...this.state.validationErrors.targetFeature}
                />
              </Tooltip>
            </Grid>
          </Grid>
          <FormLabel component="p" style={{ margin: "15px 0 10px 5px" }}>
            Filter
          </FormLabel>
          <Grid container spacing={8}>
            <Grid item>
              <Tooltip title="" placement="top-start">
                <FormControl variant="outlined">
                  <Select
                    onChange={e => {
                      this.props.handleFilterChange({ name: e.target.value });
                    }}
                    value={this.props.defaults.filter.name}
                    input={<OutlinedInput labelWidth={0} id="outlined-age-simple" />}
                    displayEmpty
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"accuracy"}>Accuracy</MenuItem>
                    <MenuItem value={"precision"}>Precision</MenuItem>
                    <MenuItem value={"recall"}>Recall</MenuItem>
                    <MenuItem value={"p_value"}>P-Value</MenuItem>
                    <MenuItem value={"f1_value"}>F1-Value</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>
            </Grid>
            {this.props.defaults.filter.name && (
              <Grid item>
                <TextField
                  label="Value"
                  inputProps={{
                    ref: node => {
                      this.filterValue = node;
                    },
                  }}
                  variant="outlined"
                  name="filterValue"
                  onChange={e => this.props.handleFilterChange({ value: +e.target.value })}
                  fullWidth
                  {...this.state.validationErrors.filter}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    );
  }
}
