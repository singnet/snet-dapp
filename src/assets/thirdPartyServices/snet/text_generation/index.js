import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import KnowMoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";

import StyledButton from "../../../../components/common/StyledButton";
import AlertBox, { alertTypes } from "../../../../components/common/AlertBox";
import BarackObama from "../../../images/ThirdPartyServices/snet/text_generation/BarackObama.jpg";
import BarackObamaAvatar from "../../../images/ThirdPartyServices/snet/text_generation/BarackObama_avatar.jpg";
import { GENGPT2 } from "./ntg_pb_service";
import { useStyles } from "./styles";

const initialUserInput = {
  start_text: "",
  run_name: "trump",
  temperature: 1.2,
  top_k: 20,
  length: 256,
};

const runNames = [
  { key: "badastronomer", value: "Phil Plait" },
  { key: "barackobama", value: "Barack Obama", image: BarackObama, avatar: BarackObamaAvatar },
  { key: "beebrookshire", value: "Bethany Brookshire" },
  { key: "berniesanders", value: "Bernie Sanders" },
  { key: "billgates", value: "Bill Gates" },
  { key: "cmdr_hadfield", value: "Chris Hadfield" },
  { key: "conanobrien", value: "Conan O'Brien" },
  { key: "deborahblum", value: "Deborah Blum" },
  { key: "deepakchopra", value: "Deepak Chopra" },
  { key: "dril", value: "wint" },
  { key: "elonmusk", value: "Elon Musk" },
  { key: "ericrweinstein", value: "Eric Weinstein" },
  { key: "hillaryclinton", value: "Hillary Clinton" },
  { key: "jimmyfallon", value: "jimmyfallon" },
  { key: "joebiden", value: "Joe Biden" },
  { key: "joerogan", value: "Joe Rogan" },
  { key: "jordanbpeterson", value: "Dr Jordan B Peterson" },
  { key: "justinbieber", value: "Justin Bieber" },
  { key: "katyperry", value: "Katy Perry" },
  { key: "kevinhart4real", value: "Kevin Hart" },
  { key: "kimkardashian", value: "Kim Kardashian West" },
  { key: "ladygaga", value: "Lady Gaga" },
  { key: "laelaps", value: "Brian Switek" },
  { key: "neiltyson", value: "Neil deGrasse Tyson" },
  { key: "nietzschequotes", value: "NietzscheQuotes" },
  { key: "officialmcafee", value: "John McAfee" },
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
  { key: "veryshortstory", value: "Very Short Story" },
  { key: "virginiahughes", value: "Virginia Hughes" },
];

const personaModalOptions = [
  { label: "Donald J. Trump", value: " " },
  { label: "Ricky Gervais", value: " " },
  { label: "{option 3}", value: " " },
  { label: "{option 4}", value: " " },
  { label: "{option 5}", value: " " },
  { label: "{option 6}", value: " " }
];

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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onKeyPressvalidator(event) {
    // console.log(event.target.value);
  }

  submitAction() {
    var btn = document.getElementById("invoke-button");
    btn.disabled = true;
    btn.innerHTML = "Wait...";

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
        const image = selectedRunName && selectedRunName.image;
        this.setState({
          ...initialUserInput,
          response: { status: "success", answer: message.getAnswer(), image },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  parseAvatarSrc = () => {
    const selectedRunName = runNames.find(el => el.key === this.state.run_name);
    return selectedRunName && selectedRunName.avatar;
  };

  renderForm() {
    const { response } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24} className={classes.textGenConfigDetails}>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
            <p>For this demo you will be asked to input a text content and the persona you would like the tweet to be. This text block is used to explain the nature of your Demo service . More text describing what the user should do here.</p>
            <p>Check out the <Link to="">Guide</Link> for details steps.</p>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}  className={classes.header}>
            <h4>Parameters</h4>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.dropdownAndAvatar}>

            <Grid item xs={12} sm={12} md={7} lg={7} className={classes.dropdown}>
              <InfoIcon className={classes.infoIcon} />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-simple">Persona Model</InputLabel>
                <Select
                  value={"Persona Model"}
                  input={<OutlinedInput labelWidth={320} name="age" id="outlined-age-simple" />}
                >
                  {personaModalOptions.map(item => (
                    <MenuItem className={classes.menuItem} key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Avatar alt="Singularity" src={BarackObamaAvatar} className={classes.avatar} />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textArea}>
            <InfoIcon className={classes.infoIcon} />
            <TextField
              label="Tweet Context or Question"
              multiline
              rows="7"
              variant="outlined"
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
                defaultValue={60}
                aria-labelledby="discrete-slider-always"
                step={10}
                valueLabelDisplay="on"
              />
              <span className={classes.startEndNumber}>300</span>
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
                  defaultValue={60}
                  aria-labelledby="discrete-slider-always"
                  step={10}
                  valueLabelDisplay="on"
                />
              <span className={classes.startEndNumber}>300</span>
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
                defaultValue={60}
                aria-labelledby="discrete-slider-always"
                step={10}
                valueLabelDisplay="on"
              />
              <span className={classes.startEndNumber}>300</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.errorMsg}>
            <AlertBox message="error state message" type={alertTypes.ERROR}/>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
            <StyledButton type="transparent" btnText="back" />
            <StyledButton type="blue" btnText="next" />
          </Grid>

        </Grid>


      </React.Fragment>
    );
  }

  renderComplete() {
    const { response } = this.state;
    const { classes } = this.props;
    return (
      // <div>
      //   <p style={{ fontSize: "13px" }}>
      //     <div>
      //       <img src={response.image} height={400} />
      //     </div>
      //     Response from service is: <b>{response.answer.replace("[END BY LENGTH]", "")}</b>{" "}
      //   </p>
      // </div>

      <Grid container spacing={24} className={classes.textGenRunDetails}>

         <Grid item xs={12} sm={12} md={12} lg={12} className={classes.runTabDescription}>
          <p>Your request has been completed. You can now vote for the agent below.</p>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultsHeader}>
          <h4>Results</h4>
          <div>
            <DownloadIcon />
            <KnowMoreIcon />
          </div>
         </Grid>

         <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultsContent}>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgContainer}>
            <img src={BarackObama} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultDetails} >
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
              <span className={classes.resultValue}>Before boarding your rocket to Mars, remember to pack these items</span>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultDetails}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <InfoIcon className={classes.infoIcon} />
              <span className="resultTitle">Response output</span>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <span className={classes.resultValue}>Space shuttle tickets</span>
            </Grid>

          </Grid>
         </Grid>

         <Grid item xs={12} sm={12} md={12} lg={12} className={classes.resultBtnContainer}>
            <StyledButton type="transparent" btnText="rate the service" />
            <StyledButton type="blue" btnText="reset and run again" />
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