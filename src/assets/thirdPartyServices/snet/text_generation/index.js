import React from "react";
import { withStyles } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from "@material-ui/core/Avatar";

import StyledButton from "../../../../components/common/StyledButton";
import { GENGPT2 } from "./ntg_pb_service";
import { useStyles } from "./styles";
import AnchorLink from "../../../../components/common/AnchorLink";

const imgPath = (name, extension = "jpg") => {
  const trimmedName = name.replace(/[\s\.\'']/g, "");
  return `${process.env.REACT_APP_SNET_CDN}/assets/images/ThirdPartyServices/snet/text_generation/${trimmedName}.${extension}`;
};

const avatarPath = (name, extension = "jpg") => {
  const avatarName = name + "_avatar";
  return imgPath(avatarName, extension);
};

const defaultImgPath = imgPath("DefaultImage", "png");

const runNamesWithoutMedia = [
  { key: "universal", value: "Universal Generator" },
  { key: "badastronomer", value: "Phil Plait" },
  { key: "barackobama", value: "Barack Obama" },
  { key: "beebrookshire", value: "Bethany Brookshire" },
  { key: "berniesanders", value: "Bernie Sanders" },
  { key: "billgates", value: "Bill Gates" },
  { key: "conanobrien", value: "Conan O'Brien" },
  { key: "deborahblum", value: "Deborah Blum" },
  { key: "deepakchopra", value: "Deepak Chopra" },
  { key: "elonmusk", value: "Elon Musk" },
  {
    key: "ericrweinstein",
    value: "Eric Weinstein",
    image: imgPath("EricWeinstein", "png"),
    avatar: avatarPath("EricWeinstein", "png"),
  },
  { key: "hillaryclinton", value: "Hillary Clinton" },
  { key: "jimmyfallon", value: "Jimmy Fallon" },
  { key: "joebiden", value: "Joe Biden" },
  {
    key: "joerogan",
    value: "Joe Rogan",
    image: imgPath("JoeRogan", "png"),
    avatar: avatarPath("JoeRogan", "png"),
  },
  { key: "jordanbpeterson", value: "Dr Jordan B Peterson" },
  { key: "justinbieber", value: "Justin Bieber" },
  { key: "katyperry", value: "Katy Perry" },
  { key: "kevinhart4real", value: "Kevin Hart" },
  {
    key: "kimkardashian",
    value: "Kim Kardashian West",
    image: imgPath("Kim Kardashian West", "png"),
    avatar: avatarPath("Kim Kardashian West", "png"),
  },
  { key: "ladygaga", value: "Lady Gaga" },
  { key: "laelaps", value: "Brian Switek" },
  { key: "neiltyson", value: "Neil deGrasse Tyson" },
  { key: "trump", value: "Donald J. Trump" },
  { key: "rebeccaskloot", value: "Rebecca Skloot" },
  { key: "richarddawkins", value: "Richard Dawkins" },
  { key: "rickygervais", value: "Ricky Gervais" },
  { key: "samharrisorg", value: "Sam Harris" },
  { key: "terencemckenna_", value: "Terence McKenna" },
  { key: "theellenshow", value: "Ellen DeGeneres" },
  { key: "therock", value: "Dwayne Johnson" },
  { key: "thetweetofgod", value: "God" },
  { key: "ticbot", value: "TicBot" },

  { 
    key: "goodfellow_ian", 
    value: "Ian Goodfellow" ,
    image: imgPath("Ian Goodfellow", "jpg"),
    avatar: avatarPath("Ian Goodfellow", "jpg"),
  },
  { 
    key: "nietzsche", 
    value: "Friedrich Nietzsche",
    image: imgPath("Friedrich Nietzsche", "jpg"),
    avatar: avatarPath("Friedrich Nietzsche", "jpg"),
  },
  { key: "quotes500k_texts", value: "Best Quotes" },
  { key: "songdata", value: "Song Lyrics" },
  { key: "cmdr_hadfield", value: "Chris Hadfield" },
  { key: "dril", value: "Dril" },
  { 
    key: "officialmcafee", 
    value: "John MacAfee",
    image: imgPath("John MacAfee", "jpg"),
    avatar: avatarPath("John MacAfee", "jpg"),
  },
  { 
    key: "virginiahughes", 
    value: "Virginia Huges",
    image: imgPath("Virginia Huges", "jpg"),
    avatar: avatarPath("Virginia Huges", "jpg"), 
  },
];

const runNames = runNamesWithoutMedia.map(runName => {
  const updatedRunName = { ...runName };
  if (!runName.image) {
    updatedRunName.image = imgPath(runName.value);
  }
  if (!runName.avatar) {
    updatedRunName.avatar = avatarPath(runName.value);
  }
  return updatedRunName;
});

const initialUserInput = {
  start_text: "",
  run_name: "trump",
  temperature: 0.8,
  top_k: 0,
  length: 256,
  selectedAvatar: avatarPath("DonaldJTrump"),
};

class TextGenerationService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.changeSlider = this.changeSlider.bind(this);

    this.users_guide = "https://github.com/iktina/neural-text-generation";

    this.state = {
      ...initialUserInput,
      serviceName: "GENGPT2",
      methodName: "gen_gpt_2",
      response: undefined,
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  changeSlider(elementName, value) {
    // Event Target Name and Value are getting Blank
    this.setState({
      [elementName]: value,
    });
  }

  handleFormUpdate(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (name === "run_name") {
      this.parseAvatarSrc(value);
    }
  }

  onKeyPressvalidator(event) {
    // console.log(event.target.value);
  }

  submitAction() {
    const { methodName, start_text, temperature, top_k, run_name, length } = this.state;
    const methodDescriptor = GENGPT2[methodName];
    const request = new methodDescriptor.requestType();

    request.setStartText(start_text);
    request.setTemperature(temperature);
    request.setTopK(top_k);
    request.setRunName(run_name);
    request.setLength(length);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        const selectedRunName = runNames.find(el => el.key === this.state.run_name);
        const image = (selectedRunName && selectedRunName.image) || defaultImgPath;
        this.setState({
          ...initialUserInput,
          response: { status: "success", answer: message.getAnswer(), image, start_text },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  parseAvatarSrc = run_name => {
    const selectedRunName = runNames.find(el => el.key === run_name);
    const selectedAvatar = (selectedRunName && selectedRunName.avatar) || defaultImgPath;
    this.setState({ selectedAvatar });
  };

  handleAvatarLoadError = () => {
    this.setState({ selectedAvatar: defaultImgPath });
  };

  handleResponseImgError = () => {
    this.setState(prevState => ({ response: { ...prevState.response, image: defaultImgPath } }));
  };

  renderForm() {
    const { run_name, start_text, length: maxResponseLength, top_k, temperature, selectedAvatar } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24} className={classes.textGenConfigDetails}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
            <p>
              For this demo you will be asked to input a text content and the persona you would like the tweet to come
              from.
            </p>
            <p>
              Check out the
              <AnchorLink
                newTab
                href="https://github.com/iktina/neural-text-generation#how-does-it-work"
                label="Guide"
                className={classes.guideLink}
              />
              for detailed steps.
            </p>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.header}>
            <h4>Parameters</h4>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.dropdownAndAvatar}>
            <Grid item xs={12} sm={12} md={7} lg={7} className={classes.dropdown}>
              <InfoIcon className={classes.infoIcon} />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-simple">Persona Model</InputLabel>
                <Select
                  value={run_name}
                  onChange={this.handleFormUpdate}
                  name="run_name"
                  input={<OutlinedInput labelWidth={320} name="age" id="outlined-age-simple" />}
                >
                  {runNames.map(item => (
                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Avatar
                alt="Singularity"
                src={selectedAvatar}
                imgProps={{
                  onError: this.handleAvatarLoadError,
                }}
                className={classes.avatar}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textArea}>
            <InfoIcon className={classes.infoIcon} />
            <TextField
              name="start_text"
              label="Tweet Context or Question"
              multiline
              rows="7"
              variant="outlined"
              value={start_text}
              onChange={this.handleFormUpdate}
              onKeyPress={e => this.onKeyPressvalidator(e)}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Max Length</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>0</span>
              <Slider
                name="length"
                value={maxResponseLength}
                max={1024}
                min={1}
                aria-labelledby="discrete-slider-always"
                step={10}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("length", val)}
              />
              <span className={classes.startEndNumber}>1024</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Top K</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>0</span>
              <Slider
                name="top_k"
                value={top_k}
                aria-labelledby="discrete-slider-always"
                min={0}
                max={20}
                step={1}
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("top_k", val)}
              />
              <span className={classes.startEndNumber}>20</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.progressBarContainer}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <InfoIcon className={classes.infoIcon} />
              <span className={classes.title}>Temperature</span>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} className={classes.sliderContainer}>
              <span className={classes.startEndNumber}>0</span>
              <Slider
                name="temperature"
                value={temperature}
                step={0.1}
                min={0.2}
                max={1.5}
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="on"
                onChange={(e, val) => this.changeSlider("temperature", val)}
              />
              <span className={classes.startEndNumber}>1.5</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
            <StyledButton type="blue" btnText="Invoke" onClick={this.submitAction} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const { response } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.textGenRunDetails}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.runTabDescription}>
          <p>Your request has been completed. You can now vote for the agent below.</p>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultsHeader}>
          <h4>Results</h4>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultsContent}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgContainer}>
            <img src={response.image} onError={this.handleResponseImgError} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultDetails}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <InfoIcon className={classes.infoIcon} />
              <span className="resultTitle">Status</span>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <span className={classes.resultValue}>success</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultDetails}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <InfoIcon className={classes.infoIcon} />
              <span className="resultTitle">Input text</span>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <span className={classes.resultValue}>{response.start_text}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultDetails}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <InfoIcon className={classes.infoIcon} />
              <span className="resultTitle">Response output</span>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <span className={classes.resultValue}>{response.answer.replace("[END BY LENGTH]", "")}</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}

export default withStyles(useStyles)(TextGenerationService);
