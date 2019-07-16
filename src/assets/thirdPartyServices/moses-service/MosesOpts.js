import React from "react";
import {
  TextField,
  Grid,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Chip,
  Tooltip,
  Switch,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { checkRequired, checkMin, checkDuplicate } from "./utils";

export default class MosesOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalParameterName: "",
      additionalParameterValue: "",
      validationErrors: {
        maximumEvals: null,
        featureSelectionTargetSize: null,
        resultCount: null,
        numberOfThreads: null,
        hcCrossoverMinNeighbors: null,
        hcCrossoverPopSize: null,
        additionalParameterName: null,
        complexityRatio: null,
      },
    };
    this.name = React.createRef();
  }

  updateValidationStatus() {
    let validationErrors = Object.assign({}, this.state.validationErrors);
    if (!this.props.defaults.enableFeatureSelection) {
      delete validationErrors.featureSelectionTargetSize;
    }
    if (!this.props.defaults.hcWidenSearch) {
      delete validationErrors.hcCrossoverMinNeighbors;
      delete validationErrors.hcCrossoverPopSize;
    }
    this.props.setValidationStatus(Object.values(validationErrors).filter(v => v).length === 0);
  }

  validateForm(oldValues, newValues) {
    const validationErrors = Object.assign({}, this.state.validationErrors);
    let valuesChanged = false;
    // maximumEvals
    if (newValues.maximumEvals !== oldValues.maximumEvals) {
      validationErrors.maximumEvals = checkRequired(newValues.maximumEvals);
      valuesChanged = true;
    }
    // featureSelectionTargetSize
    if (newValues.featureSelectionTargetSize !== oldValues.featureSelectionTargetSize) {
      validationErrors.featureSelectionTargetSize = checkRequired(newValues.featureSelectionTargetSize);
      valuesChanged = true;
    }
    // resultCount
    if (newValues.resultCount !== oldValues.resultCount) {
      validationErrors.resultCount = checkRequired(newValues.resultCount) || checkMin(newValues.numberOfThreads, 1);
      valuesChanged = true;
    }
    // numberOfThreads
    if (newValues.numberOfThreads !== oldValues.numberOfThreads) {
      validationErrors.numberOfThreads =
        checkRequired(newValues.numberOfThreads) || checkMin(newValues.numberOfThreads, 1);
      valuesChanged = true;
    }
    // hcCrossoverMinNeighbors
    if (newValues.hcCrossoverMinNeighbors !== oldValues.hcCrossoverMinNeighbors) {
      validationErrors.hcCrossoverMinNeighbors = checkRequired(newValues.hcCrossoverMinNeighbors);
      valuesChanged = true;
    }
    // hcCrossoverPopSize
    if (newValues.hcCrossoverPopSize !== oldValues.hcCrossoverPopSize) {
      validationErrors.hcCrossoverPopSize = checkRequired(newValues.hcCrossoverPopSize);
      valuesChanged = true;
    }

    if (newValues.complexityRatio !== oldValues.complexityRatio) {
      validationErrors.complexityRatio = checkRequired(newValues.complexityRatio);
      valuesChanged = true;
    }

    if (valuesChanged) {
      this.setState({ validationErrors: validationErrors });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.validateForm(prevProps.defaults, this.props.defaults);
  }

  parseAdditionalParameters() {
    if (!this.props.additionalParameters) return [];
    return Object.keys(this.props.additionalParameters).map(key => {
      return { name: key, value: this.props.additionalParameters[key] };
    });
  }

  conditionallyRequired(isRequired, value) {
    return isRequired && value === "" ? { validateStatus: "error", help: "This is required" } : null;
  }

  render() {
    this.updateValidationStatus();
    const additionalParameters = this.parseAdditionalParameters();

    return (
      <div className="mosesOptionsFormWrapper" style={{ width: "100%" }}>
        <form>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title={
                  <span>
                    Enable integrated feature selection. Feature selection is performed immediately before knob building
                    (representation building), when creating a new deme.
                  </span>
                }
                placement="top-start"
              >
                <FormControlLabel
                  value="0"
                  control={
                    <Switch
                      defaultChecked={this.props.defaults.enableFeatureSelection}
                      name="enableFeatureSelection"
                      onChange={e => this.props.changeInput(e)}
                    />
                  }
                  label={<span>Enable feature selection</span>}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title="Hillclimbing parameter (hc). If false,then deme search terminates when a local hilltop is found. If true, then the search radius is progressively widened, until another termination condition is met. "
                placement="top-start"
              >
                <FormControlLabel
                  value="0"
                  control={
                    <Switch
                      defaultChecked={this.props.defaults.hcWidenSearch}
                      name="hcWidenSearch"
                      onChange={e => this.props.changeInput(e)}
                    />
                  }
                  label="hc Widen Search"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title="If the table has discrete output type (like bool or enum), balance the resulting ctable so all classes have the same weight."
                placement="top-start"
              >
                <FormControlLabel
                  value="0"
                  control={
                    <Switch
                      defaultChecked={this.props.defaults.balance}
                      name="balance"
                      onChange={e => this.props.changeInput(e)}
                    />
                  }
                  label="Balance"
                />
              </Tooltip>
            </Grid>
          </Grid>
          {this.props.defaults.enableFeatureSelection && (
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Tooltip
                  title="Feature selection algorithm. Supported are:
                                        simple, for a fast maximun mutual information algo.
                                        inc, for incremental max-relevency, min-redundancy.
                                        smd, for stochastic mutual dependency,
                                        random, for uniform random dependency,
                                        hc for moses-hillclimbing."
                  placement="top-start"
                >
                  <FormLabel component="legend">Feature selection algorithm</FormLabel>
                </Tooltip>

                <RadioGroup
                  onChange={e => this.props.changeInput(e)}
                  name="featureSelectionAlgorithm"
                  style={{ display: "flex", flexDirection: "row" }}
                  value={this.props.defaults.featureSelectionAlgorithm}
                >
                  <FormControlLabel value="simple" control={<Radio />} label="simple" />
                  <FormControlLabel value="inc" control={<Radio />} label="inc" />
                  <FormControlLabel value="smd" control={<Radio />} label="smd" />
                  <FormControlLabel value="hc" control={<Radio />} label="hc" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip
                  title="This option specifies the number of features to be selected out of the dataset.  A value of 0 disables feature selection"
                  placement="top-start"
                >
                  <TextField
                    label="Feature Selection Target Size"
                    placeholder="Feature Selection Target Size"
                    margin="dense"
                    variant="outlined"
                    name="featureSelectionTargetSize"
                    fullWidth
                    onChange={e => this.props.changeInput(e)}
                    defaultValue={this.props.defaults.featureSelectionTargetSize}
                    {...this.state.validationErrors.featureSelectionTargetSize}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          )}
          {this.props.defaults.hcWidenSearch && (
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Tooltip
                  title="It also allows to control when crossover occurs instead of exhaustive search. If the neighborhood to explore has more than the given number (and at least 2 iterations has passed) then  crossover kicks in."
                  placement="top-start"
                >
                  <TextField
                    label="hc Crossover Min Neighbors"
                    placeholder="hc Crossover Min Neighbors"
                    margin="dense"
                    variant="outlined"
                    name="hcCrossoverMinNeighbors"
                    fullWidth
                    onChange={e => this.props.changeInput(e)}
                    defaultValue={this.props.defaults.hcCrossoverMinNeighbors}
                    {...this.state.validationErrors.hcCrossoverMinNeighbors}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip
                  title="Number of new candidates created by crossover during each iteration of hillclimbing."
                  placement="top-start"
                >
                  <TextField
                    label="hc Crossover Pop Size"
                    placeholder="hc Crossover Pop Size"
                    margin="dense"
                    variant="outlined"
                    name="hcCrossoverPopSize"
                    fullWidth
                    onChange={e => this.props.changeInput(e)}
                    defaultValue={this.props.defaults.hcCrossoverPopSize}
                    {...this.state.validationErrors.hcCrossoverPopSize}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Maximum number of fitness function evaluations." placement="top-start">
                <TextField
                  label="Maximum evals"
                  placeholder="Maximum evals"
                  margin="dense"
                  variant="outlined"
                  name="maximumEvals"
                  fullWidth
                  onChange={e => this.props.changeInput(e)}
                  defaultValue={this.props.defaults.maximumEvals}
                  {...this.state.validationErrors.maximumEvals}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title="The number of results to return,ordered according to a linear combination of score and complexity. If negative, then return all results."
                placement="top-start"
              >
                <TextField
                  label="Result Count"
                  placeholder="Result Count"
                  margin="dense"
                  variant="outlined"
                  name="resultCount"
                  fullWidth
                  onChange={e => this.props.changeInput(e)}
                  defaultValue={this.props.defaults.resultCount}
                  {...this.state.validationErrors.resultCount}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Number of jobs allocated for deme optimization." placement="top-start">
                <TextField
                  label="Number Of Threads"
                  placeholder="Number Of Threads"
                  margin="dense"
                  variant="outlined"
                  name="numberOfThreads"
                  fullWidth
                  onChange={e => this.props.changeInput(e)}
                  defaultValue={this.props.defaults.numberOfThreads}
                  {...this.state.validationErrors.numberOfThreads}
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid spacing={24} container>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title="Effort allocated for reduction during knob building, 0-3, 0 means minimum effort, 3 means maximum effort. Thebigger the effort the lower the dimension of the deme."
                placement="top-start"
              >
                <FormLabel component="legend">Reduct Knob Building Effort</FormLabel>
              </Tooltip>
              <RadioGroup
                onChange={e => this.props.changeInput(e)}
                name="reductKnobBuildingEffort"
                style={{ display: "flex", flexDirection: "row" }}
                value={this.props.defaults.reductKnobBuildingEffort.toString()}
              >
                <FormControlLabel value={"0"} control={<Radio />} label="0" />
                <FormControlLabel value={"1"} control={<Radio />} label="1" />
                <FormControlLabel value={"2"} control={<Radio />} label="2" />
                <FormControlLabel value={"3"} control={<Radio />} label="3" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip
                title="Fix the ratio of the score to complexity, to be used as a penalty, when ranking the metapopulation for fitness. ."
                placement="top-start"
              >
                <TextField
                  label="Complexity ratio"
                  placeholder="Complexity ratio"
                  margin="dense"
                  variant="outlined"
                  name="complexityRatio"
                  fullWidth
                  onChange={e => this.props.changeInput(e)}
                  defaultValue={this.props.defaults.complexityRatio}
                  {...this.state.validationErrors.complexityRatio}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </form>

        <form layout="inline" style={{ marginTop: "10px" }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FormLabel component="legend">Additional parameters</FormLabel>
              {additionalParameters.map(item => {
                return (
                  <Chip
                    key={item.name}
                    style={{ margin: "2px" }}
                    label={
                      <span>
                        <b>{item.name}</b> {item.value}
                      </span>
                    }
                    onDelete={e => this.props.removeAdditionalParameter(item.name)}
                    color="primary"
                  />
                );
              })}
              {additionalParameters.length > 0 && <br />}
              <TextField
                {...this.state.validationErrors.additionalParameterName}
                label="Name"
                placeholder="Name"
                name="additionalParameterName"
                margin="dense"
                variant="outlined"
                value={this.state.additionalParameterName}
                onChange={e => {
                  let validationErrors = Object.assign({}, this.state.validationErrors);

                  validationErrors.additionalParameterName = checkDuplicate(
                    e.target.value.trim(),
                    Object.keys(this.props.additionalParameters)
                  );
                  this.setState({
                    validationErrors: validationErrors,
                    additionalParameterName: e.target.value.trim(),
                  });
                }}
                style={{ marginRight: "5px" }}
              />
              <TextField
                label="Value"
                placeholder="Value"
                margin="dense"
                variant="outlined"
                value={this.state.additionalParameterValue}
                onChange={e =>
                  this.setState({
                    additionalParameterValue: e.target.value,
                  })
                }
                style={{ marginRight: "5px" }}
              />
              <Button
                className="addAdditionalParameter"
                variant="contained"
                size="large"
                style={{ marginTop: "10px" }}
                onClick={e => {
                  this.props.addAdditionalParameter(
                    this.state.additionalParameterName,
                    this.state.additionalParameterValue
                  );
                  this.setState({
                    additionalParameterName: "",
                    additionalParameterValue: "",
                  });
                }}
                disabled={!this.state.additionalParameterName || !this.state.additionalParameterValue}
              >
                <Add /> Add parameter
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
