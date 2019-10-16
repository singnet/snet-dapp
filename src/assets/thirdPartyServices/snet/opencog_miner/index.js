import React from "react";

import { OpencogServices } from "./opencog_pb_service"
import TextField from "@material-ui/core/TextField"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

export default class OpenCogMiner extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleMinSupSliderUpdate = this.handleMinSupSliderUpdate.bind(this);
    this.handleMinFreqSliderUpdate = this.handleMinFreqSliderUpdate.bind(this);
    this.handleMaxIterSliderUpdate = this.handleMaxIterSliderUpdate.bind(this);
    this.handleMaxConjSliderUpdate = this.handleMaxConjSliderUpdate.bind(this);
    this.handleMaxVarSliderUpdate = this.handleMaxVarSliderUpdate.bind(this);
    this.handleExampleSelectionList = this.handleExampleSelectionList.bind(this);
    this.swipeAreaChangeIndex = this.swipeAreaChangeIndex.bind(this);
    this.setParameters = this.setParameters.bind(this);

    this.state = {
      methodName: "Execute",
      dataset: "https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/ugly-male-soda-drinker-kb.scm",
      minfreq: 0,
      minsup: 5,
      maximum_iterations: 100,
      max_conjuncts: 3,
      max_variables: 2,
      example_value: "ugly-male-soda-drinker",
      serviceName: "OpencogServices",
      swipe_area: 1,
      response: undefined,
    };
  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return this.state.methodName !== "Select a method" &&
      this.state.dataset !== "" &&
      this.state.minfreq !== "" &&
      this.state.minsup !== "" &&
      this.state.maximum_iterations !== "" &&
      this.state.max_conjuncts !== "" &&
      this.state.max_variables !== ""
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleMinFreqSliderUpdate(event, newValue) {
    this.setState({ minfreq: newValue });
  }

  handleMinSupSliderUpdate(event, newValue) {
    this.setState({ minsup: newValue });
  }

  handleMaxIterSliderUpdate(event, newValue) {
    this.setState({ maximum_iterations: newValue });
  }

  handleMaxConjSliderUpdate(event, newValue) {
    this.setState({ max_conjuncts: newValue });
  }

  handleMaxVarSliderUpdate(event, newValue) {
    this.setState({ max_variables: newValue });
  }

  setParameters(dataset,
    minfreq,
    minsup,
    maximum_iterations,
    max_conjuncts,
    max_variables) {
    this.state.dataset = dataset;
    this.state.minfreq = minfreq;
    this.state.minsup = minsup;
    this.state.maximum_iterations = maximum_iterations;
    this.state.max_conjuncts = max_conjuncts;
    this.state.max_variables = max_variables;
  }

  handleExampleSelectionList(event, index, value) {
    console.log(event.target.name)
    console.log(event.target.value)

    switch (event.target.value) {
      case "simple":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/simple-kb.scm", 0, 2, 100, 3, 2);
        break;
      case "2-conjunct":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/2-conjunct-kb.scm", 0, 2, 100, 3, 4);
        break;
      case "ugly-male-soda-drinker":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/ugly-male-soda-drinker-kb.scm", 0, 5, 100, 3, 2);
        break;
      case "mozi-ai":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/mozi-ai-kb.scm", 0.001, 0, 500, 3, 2);
        break;
      case "custom":
        this.setParameters("", 0, 0, 0, 0, 0);
        break;
    }

    this.setState({ example_value: event.target.value });
  }

  handleInputUpdate(event) {
    this.setState({ [event.targettarget.name]: event.target.value });
  }

  swipeAreaChangeIndex(event, index) {
    switch (this.state.example_value) {
      case "simple":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/simple-kb.scm", 0, 2, 100, 3, 2);
        break;
      case "2-conjunct":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/2-conjunct-kb.scm", 0, 2, 100, 3, 4);
        break;
      case "ugly-male-soda-drinker":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/ugly-male-soda-drinker-kb.scm", 0, 5, 100, 3, 2);
        break;
      case "mozi-ai":
        this.setParameters("https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/mozi-ai-kb.scm", 0.001, 0, 500, 3, 2);
        break;
      case "custom":
        this.setParameters("", 0, 0, 0, 0, 0);
        break;
    }

    if(index == 0)
    {
      this.state.dataset = "";
    }

    this.setState({ swipe_area: index });
  }

  submitAction() {
    const { methodName,
      dataset,
      minfreq,
      minsup,
      maximum_iterations,
      max_conjuncts,
      max_variables } = this.state;

    const methodDescriptor = OpencogServices[methodName];
    const request = new methodDescriptor.requestType();

    const cmd = ["Miner",
      dataset,
      minfreq,
      minsup,
      maximum_iterations,
      max_conjuncts,
      max_variables];

    request.setInputList(cmd);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", mined: message.getOutput() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <br /><br />
        <Grid
          container
          spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={7}>
            <Paper
              style={{ padding: "10px", width: "auto", height: "auto" }}
            >
              <Tabs
                value={this.state.swipe_area}
                onChange={this.swipeAreaChangeIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
              >
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify" }}>
                        Set your own dataset.
                          </Typography>
                    </React.Fragment>
                  }
                  placement="left-start"
                >
                  <Tab label="Custom Dataset" />
                </Tooltip>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                        Load pre-configured examples.
                          </Typography>
                    </React.Fragment>
                  }
                  placement="left-start"
                >
                  <Tab label="Example Datasets" />
                </Tooltip>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                        How to create datasets and to set the input parameters.
                          </Typography>
                    </React.Fragment>
                  }
                  placement="left-start"
                >
                  <Tab label="Help" />
                </Tooltip>
              </Tabs>
            </Paper>

            {
              this.state.swipe_area === 0 &&
              
              <TabContainer>
                <Paper
                  style={{ padding: "30px", width: "auto", height: "auto" }}
                >
                  <Grid
                    container
                    spacing={1}>
                    <Grid item xs={12}>
                      <p style={{ textAlign: "justify" }}>
                        Datasets are written in Atomese, which is basically <a href="https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/s/Scheme_programming_language.htm">scheme</a> code that allows interacting with most of OpenCog's routines.
                        Please, see an example a valid dataset <a href="https://raw.githubusercontent.com/singnet/opencog-services/master/assets/examples/pattern-miner/datasets/ugly-male-soda-drinker-kb.scm">here</a>. In order to see how to create your own dataset, please click on the help tab.
                      </p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}>
                    <Grid item xs={12}>
                      <Tooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                              Input dataset. Please, see the help tab to check how the dataset can be created.
                              Another option is to load an example dataset from the examples tab.
                          </Typography>
                          </React.Fragment>
                        }
                        placement="left-start"
                      >
                        <TextField
                          id="standard-multiline-static"
                          label="Dataset"
                          style={{ width: "100%" }}
                          InputProps={{
                            style: { fontSize: 15 },
                          }}
                          InputLabelProps={{
                            style: { fontSize: 15 },
                          }}
                          value={this.state.dataset}
                          name="dataset"
                          onChange={this.handleFormUpdate}
                          rows="6"
                          defaultValue=""
                          margin="normal"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Paper>
              </TabContainer>
            }
            {
              this.state.swipe_area === 1 &&
              <TabContainer>
                <Paper
                  style={{ padding: "30px", width: "auto", height: "auto" }}
                >
                  <Grid
                    container
                    spacing={1}>
                    <Grid item xs={12}>
                      <p style={{ textAlign: "left" }}>
                        Example datasets available:
                      </p>
                      <p>
                        <ul style={{ textAlign: "justify" }}>
                          <li><b>Simple:</b> Simple dataset for very basic pattern miner.</li>
                          <li><b>2-Conjunct:</b> 2-Conjunctions dataset for more complex operations.</li>
                          <li><b>Ugly Man Soda Drinker:</b> A dataset containing information regarding the characteristics of humans who drink soda.</li>
                          <li><b>Mozi BioAI:</b> A dataset containing information regarding bioscience.</li>
                        </ul>
                      </p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth="true">
                        <InputLabel htmlFor="example">Example Dataset</InputLabel>
                        <Select
                          value={this.state.example_value}
                          onChange={this.handleExampleSelectionList}
                          inputProps={{
                            name: 'example',
                            id: 'example',
                          }}>
                          <MenuItem value={'simple'}>Simple</MenuItem>
                          <MenuItem value={'2-conjunct'}>Two Conjunctions</MenuItem>
                          <MenuItem value={'ugly-male-soda-drinker'}>Ugly Male Soda Drinker</MenuItem>
                          <MenuItem value={'mozi-ai'}>Mozi AI</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        disabled
                        id="standard-multiline-static"
                        label="Dataset"
                        style={{ width: "100%" }}
                        InputProps={{
                          style: { fontSize: 15 },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 15 },
                        }}
                        value={this.state.dataset}
                        name="dataset"
                        onChange={this.handleFormUpdate}
                        rows="6"
                        defaultValue=""
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </TabContainer>
            }
            {
              this.state.swipe_area === 2 &&
              <TabContainer>
                <Paper
                  style={{ padding: "30px", width: "auto", height: "auto" }}
                >
                  <Grid
                    container
                    spacing={1}>
                    <Grid>
                      <p style={{ textAlign: "justify" }}>
                        The pattern miner is a frequent and surprise sub-hypergraph pattern miner for the AtomSpace.
                        It is built on top of the URE to take advantage of the URE refined control capabilities.
                        For more references regarding the aforementioned specifications, please visit the <a href="https://github.com/opencog/opencog">OpenCog's</a> main repository.
                      </p>
                      <p style={{ textAlign: "justify" }}>
                        In order to know more about how it works, please see the <a href="https://github.com/singnet/miner">OpenCog miner</a> project.
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              </TabContainer>
            }

          </Grid>
          <Grid item xs></Grid>
        </Grid >

        <br /> <br />

        {
          (this.state.swipe_area === 0 || this.state.swipe_area === 1) &&
          <TabContainer>
            <Grid
              container
              spacing={3}
              justify="center">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <h1>Input Parameters</h1>
              </Grid>
            </Grid>

            <br /><br />

            <Paper
              style={{ width: "auto", padding: "30px", maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }}
            >
              <br /><br />

              <Grid
                container
                spacing={2}
                width="50%"
                justify="center">
                <Grid item xs={3}>
                  <Typography id="continuous-slider" gutterBottom>
                    Minimun Frequency
                </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                          Minimum frequency is used to prune the algorithm.
                          Higher values indicate that a found pattern should have at least the specified frequency to be put into the final solution.
                          Recommended values are between 0.001 to 0.1.
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left-start"
                  >
                    <Slider
                      aria-labelledby="continuous-slider"
                      onChange={this.handleMinFreqSliderUpdate}
                      value={this.state.minfreq}
                      defaultValue={this.state.minfreq}
                      valueLabelDisplay="on"
                      step={0.01}
                      min={0.0}
                      max={100.0}
                    />
                  </Tooltip>
                </Grid>
                {/* <Grid item xs></Grid> */}
              </Grid>

              <br /><br />

              <Grid
                container
                spacing={2}
                justify="center">
                <Grid item xs={3}>
                  <Typography gutterBottom>
                    Minimun Surprisingness
              </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                          Prune the results of the pattern miner by the surprisingness factor of patterns.
                          Higher values indicate that a found pattern should have at least the specified minimum surprisingness to be put into the final solution.
                          Recommended values are between 1 and 5.
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left-start"
                  >
                    <Slider
                      aria-labelledby="discrete-slider"
                      onChange={this.handleMinSupSliderUpdate}
                      value={this.state.minsup}
                      defaultValue={this.state.minsup}
                      valueLabelDisplay="on"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Tooltip>
                </Grid>
                {/* <Grid item xs></Grid> */}
              </Grid>

              <br /><br />

              <Grid
                container
                spacing={2}
                justify="center">
                <Grid item xs={3}>
                  <Typography gutterBottom>
                    Maximum Iterations
              </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                          Determine the number of iterations of the algorithm.
                          Higher values indicate that the algorithm will keep more time trying to find patterns.
                          Recommended values are between 100 and 200.
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left-start"
                  >
                    <Slider
                      aria-labelledby="discrete-slider"
                      onChange={this.handleMaxIterSliderUpdate}
                      value={this.state.maximum_iterations}
                      defaultValue={this.state.maximum_iterations}
                      valueLabelDisplay="on"
                      step={1}
                      min={0}
                      max={1000}
                    />
                  </Tooltip>
                </Grid>
                {/* <Grid item xs></Grid> */}
              </Grid>

              <br /><br />

              <Grid
                container
                spacing={2}
                justify="center">
                <Grid item xs={3}>
                  <Typography gutterBottom>
                    Max Conjunctions
              </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                          Size of patterns to be found.
                          Recommended values are between 1 and 5.
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left-start"
                  >
                    <Slider
                      aria-labelledby="discrete-slider"
                      onChange={this.handleMaxConjSliderUpdate}
                      value={this.state.max_conjuncts}
                      defaultValue={this.state.max_conjuncts}
                      valueLabelDisplay="on"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Tooltip>
                </Grid>
                {/* <Grid item xs></Grid> */}
              </Grid>

              <br /><br />

              <Grid
                container
                spacing={2}
                justify="center">
                <Grid item xs={3}>
                  <Typography gutterBottom>
                    Max Variables
              </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" style={{ fontSize: 15, textAlign: "justify"  }}>
                          The number of variables inside a pattern.
                          Recommended values are between 1 and 3.
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left-start"
                  >
                    <Slider
                      aria-labelledby="discrete-slider"
                      onChange={this.handleMaxVarSliderUpdate}
                      value={this.state.max_variables}
                      defaultValue={this.state.max_variables}
                      valueLabelDisplay="on"
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Tooltip>
                </Grid>
                {/* <Grid item xs></Grid> */}
              </Grid>

              <br /> <br />

              <Grid
                container
                spacing={1}>
                <Grid item xs={12} style={{ textAlign: "center"}}>
                  <Button
                    style={{ fontSize: 15, marginLeft: "auto", marginRight: "auto"  }}
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={!this.canBeInvoked()}
                    onClick={this.submitAction}
                  >
                    Call OpenCog Pattern Miner
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </TabContainer>
        }
        {
          this.state.swipe_area === 2 &&
          <TabContainer>
            <Grid
              container
              spacing={3}
              justify="center">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <h1>How to Create Datasets</h1>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <p style={{ textAlign: "justify" }}>
                  In OpenCog, Datasets are stored as an Atomspace, which is basically hyperhraphs that allows you to represent complex relationships from the real-world. 
                  The contents of an Atomspace is described using <a href="https://wiki.opencog.org/w/Atomese">Atomese</a>.
                </p>
                <p style={{ textAlign: "justify" }}>
                  The example below represents a raw dataset entry for the relationship between Allen and Human beings, where Allen is a Human being.
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <pre style={{ textAlign: "left" }}>
                    {`(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Human")
)`}
                  </pre>
                </Paper>
                <p style={{ textAlign: "justify" }}>
                  This example in Atomese represents this simple relationship:
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <img src="https://raw.githubusercontent.com/singnet/opencog-services/master/assets/graph_allen_example_atomspace.png"
                    alt="Allen relationship with human beings."
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "625px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }} />
                </Paper>
                <p style={{ textAlign: "justify" }}>
                  We can add more information regarding Allen as depicted below.
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <img src="https://raw.githubusercontent.com/singnet/opencog-services/master/assets/graph_allen_example_atomspaceB.png"
                    alt="Allen relationship with human beings and soda drinkers."
                    style={{
                      width: "285px",
                      height: "327px",
                      maxWidth: "625px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }} />
                </Paper>
                <p style={{ textAlign: "justify" }}>
                  We just need to add more entries into our dataset file as shown below.
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <pre style={{ textAlign: "left" }}>
                    {
                      `(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Man")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Human")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Ugly")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Soda Drinker")
)`
                    }
                  </pre>
                </Paper>
                <p style={{ textAlign: "justify" }}>
                  This example dataset is just saying that Allen is a man, Human, ugly and that he drinks soda.
                </p>
                <p style={{ textAlign: "justify" }}>
                  It's possible to extend the dataset reusing elements. For example, see the next figure.
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <img src="https://raw.githubusercontent.com/singnet/opencog-services/master/assets/graph_allen_example_atomspaceC.png"
                    alt="Allen relationship with human beings and soda drinkers."
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "625px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }} />
                </Paper>
                <p style={{ textAlign: "justify" }}>
                  Now it's also saying that Jassy is Human (but a woman) and also drinks soda.
                </p>
                <p style={{ textAlign: "justify" }}>
                  In order to represent this knowledge in Atomese, we just need to do the following.
                </p>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                  <pre style={{ textAlign: "left" }}>
                    {
                      `(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Man")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Human")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Ugly")
)
(InheritanceLink
  (ConceptNode "Allen")
  (ConceptNode "Soda Drinker")
)
(InheritanceLink
  (ConceptNode "Jassy")
  (ConceptNode "Human")
)
(InheritanceLink
  (ConceptNode "Jassy")
  (ConceptNode "Woman")
)
(InheritanceLink
  (ConceptNode "Jassy")
  (ConceptNode "Soda Drinker")
)`
                    }
                  </pre>
                </Paper>
              </Grid>
              <Grid
                container
                spacing={2}
                justify="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <h1>Input Parameters</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <p style={{ textAlign: "justify" }}>
                    The following parameters are used to run the pattern miner over the input dataset.
                  </p>
                  <Paper style={{ width: "auto", padding: "30px", maxWidth: "auto", marginLeft: "auto", marginRight: "auto" }}>
                    <img src="https://raw.githubusercontent.com/singnet/opencog-services/master/assets/input_parameters.png"
                      alt="Input parameters for the pattern miner algorithm."
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "625px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }} />
                  </Paper>
                  <ul style={{ textAlign: "justify" }}>
                    <li><b>Minimum Frequency:</b> Used to prune the results of the pattern miner.
                      Higher values indicate that a found pattern should have at least the specified frequency to be put into the final solution.
                      Recommended values are between 0.001 to 0.1.
                    </li>
                    <li><b>Minimum Surprinsigness:</b> This is another prune technique.
                      Higher values indicate that a found pattern should have at least the specified minimum surprisingness to be put into the final solution.
                      Recommended values are between 1 and 5.
                    </li>
                    <li><b>Maximum Iterations:</b> Allows to determine the number of iterations of the algorithm.
                      Higher values indicate that the algorithm will try to find patterns for more time, consequently, it will take more time to finish.
                      Recommended values are between 100 and 200.
                    </li>
                    <li><b>Max Conjunctions:</b> It is used to determine the size of the patterns to be found.
                      Recommended values are between 1 and 5.
                    </li>
                    <li><b>Max Variables:</b> Set the number of variables in a pattern.
                      Recommended values are between 1 and 3.
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </TabContainer>
        }
      </React.Fragment >
    );
  }

  renderComplete() {
    const { response } = this.state;

    return (
      <div style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <div style={{ padding: "10px 0" }}>
            <Grid
              container
              spacing={2}
              justify="center">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <h1>Output</h1>
                <p style={{ textAlign: "center", color: "grey", fontStyle: "italic", fontSize: 15 }}>
                  The following output represents all the patterns found for the input dataset. Please, see this <a href="https://github.com/singnet/opencog-services/blob/master/docs/Miner.md">documentation</a> or go to this service help tab in order to get better explanations about its meaning.
                </p>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Paper style={{ width: "auto", padding: "30px", maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }}>
                  <pre style={{textAlign: "left"}}>
                    {response.mined}
                  </pre>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
