import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import InfoIcon from "@mui/icons-material/Info";
import Slider from "@mui/material/Slider";
import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import { VITSTrainingService } from "./t_glm_pb_service";
import { useStyles } from "./styles";
import { withStyles } from "@mui/styles";
import meta from "./meta.json";

const SELECT_MODELS_FROM_LIST_MESSAGE = "You can try training! Use the corresponding tab above."; // TODO fill message

class T_GLM extends React.Component {
  constructor(props) {
    super(props);

    const defaultModel = { value: "null", label: "Default" }; // Backend is expecting "null" (String) as value in defaullt case

    const { config } = meta;
    const { selectedModelId, modelsIds } = props;

    const modelsList = modelsIds?.length ? modelsIds : [];

    if (modelsList?.length) {
      modelsList.push(defaultModel);
    }

    this.submitAction = this.submitAction.bind(this);
    this.changeSlider = this.changeSlider.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleModelParameterChange = this.handleModelParameterChange.bind(this);

    this.state = {
      config: config,
      model_id: !selectedModelId ? defaultModel.value : selectedModelId,
      modelsList: modelsList,
      users_guide: "https://github.com/iktina/Generative-Language-Models", // TODO replace link
      code_repo: "https://github.com/iktina/Generative-Language-Models", // TODO replace link
      reference: "https://github.com/iktina/Generative-Language-Models", // TODO replace link
      model_id: selectedModelId,
      request: config.request.default,
      system_prompt: config.system_prompt.default,
      max_new_tokens: config.max_new_tokens.default,
      temperature: config.temperature.default,
      top_p: config.top_p.default,
      top_k: config.top_k.default,
      min_length: config.min_length.default,
      repetition_penalty: config.repetition_penalty.default,
      length_penalty: config.length_penalty.default,
      isSettingsOpen: false,
    };

    // console.clear();
  }

  canBeInvoked() {
    return this.state.request !== "";
  }

  handleModelParameterChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeSlider(elementName, value) {
    this.setState({
      [elementName]: value,
    });
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  constructRequest() {
    const {
      request,
      system_prompt,
      max_new_tokens,
      top_p,
      temperature,
      min_length,
      top_k,
      repetition_penalty,
      length_penalty,
    } = this.state;

    return JSON.stringify({
      request,
      system_prompt,
      max_new_tokens,
      top_p,
      temperature,
      min_length,
      top_k,
      repetition_penalty,
      length_penalty,
    });
  }

  toggleSettings() {
    const { isSettingsOpen } = this.state;

    this.setState({
      isSettingsOpen: !isSettingsOpen,
    });
  }

  submitAction() {
    const { model_id } = this.state;

    const methodDescriptor = VITSTrainingService["inference"];
    const request = new methodDescriptor.requestType();

    request.setData(this.constructRequest());
    request.setModelId(model_id);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          response: {
            status: "success",
            output: JSON.parse(message.getResult()),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    const { classes } = this.props;
    const { isSettingsOpen } = this.state;

    const settingsContainerClasses = `${classes.settingsContainer} ${isSettingsOpen ? "active" : ""}`;

    return (
      <Grid container direction="column" justify="center">
        {!this.props.selectedModelId && !this.props.modelsIds?.length ? (
          <h3>{SELECT_MODELS_FROM_LIST_MESSAGE}</h3>
        ) : (
          <Grid item xs={8} container spacing={2}>
            <Grid item xs>
              <OutlinedDropDown
                id="model_id"
                name="model_id"
                label="Model ID"
                fullWidth={true}
                list={this.state.modelsList}
                value={this.state.model_id}
                onChange={this.handleModelParameterChange}
              />
            </Grid>
            <Grid item xs className={classes.dropDownEmptyGrid}></Grid>
          </Grid>
        )}

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <OutlinedTextArea
            id="request"
            name="request"
            label="Request"
            fullWidth={true}
            value={this.state.request}
            rows={8}
            charLimit={this.state.config.request.max}
            helperTxt={this.state.request.length + " / " + this.state.config.request.max + " char "}
            onChange={this.handleFormUpdate}
          />
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <OutlinedTextArea
            id="system_prompt"
            name="system_prompt"
            label="System prompt"
            fullWidth={true}
            value={this.state.system_prompt}
            rows={8}
            charLimit={this.state.config.system_prompt.max}
            helperTxt={this.state.system_prompt.length + " / " + this.state.config.system_prompt.max + " char "}
            onChange={this.handleFormUpdate}
          />
        </Grid>

        <Grid container xs={12} sm={12} md={12} lg={12} className={settingsContainerClasses}>
          <Grid>
            <Button variant="text" color="primary" onClick={this.toggleSettings}>
              {(isSettingsOpen ? "Close" : "Open") + " additional settings"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Max new tokens</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.max_new_tokens.min}</span>
              <Slider
                name="length"
                value={this.state.max_new_tokens}
                max={this.state.config.max_new_tokens.max}
                min={this.state.config.max_new_tokens.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.max_new_tokens.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("max_new_tokens", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.max_new_tokens.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Top_p</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.top_p.min}</span>
              <Slider
                name="length"
                value={this.state.top_p}
                max={this.state.config.top_p.max}
                min={this.state.config.top_p.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.top_p.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("top_p", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.top_p.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Temperature</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.temperature.min}</span>
              <Slider
                name="length"
                value={this.state.temperature}
                max={this.state.config.temperature.max}
                min={this.state.config.temperature.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.temperature.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("temperature", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.temperature.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Min length</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.min_length.min}</span>
              <Slider
                name="length"
                value={this.state.min_length}
                max={this.state.config.min_length.max}
                min={this.state.config.min_length.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.min_length.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("min_length", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.min_length.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Top_k</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.top_k.min}</span>
              <Slider
                name="length"
                value={this.state.top_k}
                max={this.state.config.top_k.max}
                min={this.state.config.top_k.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.top_k.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("top_k", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.top_k.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Repetition penalty</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.repetition_penalty.min}</span>
              <Slider
                name="length"
                value={this.state.repetition_penalty}
                max={this.state.config.repetition_penalty.max}
                min={this.state.config.repetition_penalty.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.repetition_penalty.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("repetition_penalty", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.repetition_penalty.max}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Length penalty</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>{this.state.config.length_penalty.min}</span>
              <Slider
                name="length"
                value={this.state.length_penalty}
                max={this.state.config.length_penalty.max}
                min={this.state.config.length_penalty.min}
                aria-labelledby="discrete-slider-always"
                step={this.state.config.length_penalty.step}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("length_penalty", val)}
              />
              <span className={classes.startEndNumber}>{this.state.config.length_penalty.max}</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs container justify="flex-end">
          <Grid item>
            <HoverIcon text="View code on Github" href={this.state.code_repo}>
              <SvgIcon>
                <path // Github Icon
                  d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                />
              </SvgIcon>
            </HoverIcon>
          </Grid>
          <Grid item>
            <HoverIcon text="User's guide" href={this.state.users_guide}>
              <InfoIcon />
            </HoverIcon>
          </Grid>
          <Grid item>
            <HoverIcon text="View original project" href={this.state.reference}>
              <SvgIcon>
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
              </SvgIcon>
            </HoverIcon>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
            Invoke
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderComplete() {
    const { response } = this.state;

    if (!response) {
      return (
        <React.Fragment>
          <h2>Something went wrong...</h2>
        </React.Fragment>
      );
    }

    const output = response?.output?.result?.trim();

    if (!output) {
      throw new Error("Cannot read data from response");
    }

    const currentModel = this.state.modelsList.find((model) => model?.value === this.state.model_id);
    const modelLabel = !currentModel?.label ? "Default" : currentModel.label;

    return (
      <div>
        <p
          style={{
            padding: "0 10px",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0",
          }}
        >
          {`Input (model: ${modelLabel}):`}
        </p>

        <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
          <OutlinedTextArea
            id="serviceInput"
            name="serviceInput"
            fullWidth={true}
            value={this.state.request}
            rows={5}
          />
        </Grid>

        <p
          style={{
            padding: "0 10px",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0",
          }}
        >
          Output:
        </p>
        <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
          <OutlinedTextArea
            id="service_output"
            name="service_output"
            label="Result"
            fullWidth={true}
            value={output}
            rows={5}
          />
        </Grid>
      </div>
    );
  }

  render() {
    if (!this.props.isComplete) {
      return <div>{this.renderForm()}</div>;
    }
    return <div>{this.renderComplete()}</div>;
  }
}

export default withStyles(useStyles)(T_GLM);
