import React from "react";
import { TextField, Grid, Tooltip } from "@material-ui/core";
import { checkRequired, checkMin, checkBetween } from "./utils";

export default class CrossValidationOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {
        folds: null,
        randomSeed: null,
        testSize: null,
      },
    };
  }

  updateValidationStatus() {
    this.props.setValidationStatus(Object.values(this.state.validationErrors).filter(v => v).length === 0);
  }

  validateForm(oldValues, newValues) {
    const validationErrors = Object.assign({}, this.state.validationErrors);
    let valuesChanged = false;
    if (newValues.folds !== oldValues.folds) {
      validationErrors.folds = checkRequired(newValues.folds) || checkMin(newValues.folds, 1);
      valuesChanged = true;
    }
    if (newValues.randomSeed !== oldValues.randomSeed) {
      validationErrors.randomSeed = checkRequired(newValues.randomSeed);
      valuesChanged = true;
    }
    if (newValues.testSize !== oldValues.testSize) {
      validationErrors.testSize = checkRequired(newValues.testSize) || checkBetween(newValues.testSize, 0, 1);
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
      <div className="crossValidationOptionsFormWrapper" style={{ width: "100%" }}>
        <form>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Tooltip title="Number of folds for cross-validation" placement="top-start">
                <TextField
                  label="Folds"
                  placeholder="Folds"
                  margin="dense"
                  variant="outlined"
                  name="folds"
                  fullWidth
                  defaultValue={this.props.defaults.folds}
                  onChange={e => this.props.changeInput(e)}
                  {...this.state.validationErrors.folds}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Specifies how many times to run MOSES with a random seed value" placement="top-start">
                <TextField
                  label="Number of seeds"
                  placeholder="Number of seeds"
                  margin="dense"
                  variant="outlined"
                  name="randomSeed"
                  fullWidth
                  defaultValue={this.props.defaults.randomSeed}
                  onChange={e => this.props.changeInput(e)}
                  {...this.state.validationErrors.randomSeed}
                />
              </Tooltip>
            </Grid>

            <Grid item xs={6}>
              <Tooltip
                title="The proportion of the dataset that should be included in the test splie"
                placement="top-start"
              >
                <TextField
                  label="Test size"
                  placeholder="Test size"
                  margin="dense"
                  variant="outlined"
                  name="testSize"
                  fullWidth
                  defaultValue={this.props.defaults.testSize}
                  onChange={e => this.props.changeInput(e)}
                  {...this.state.validationErrors.testSize}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
