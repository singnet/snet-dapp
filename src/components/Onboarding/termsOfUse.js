import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import StyledButton from "../common/StyledButton";

const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.gray8
  },
  termsOfUseContainer: {
    width: 630,
    paddingBottom: 40,
    margin: "40px auto 0",
    backgroundColor: theme.palette.text.white,
    boxShadow:
      "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    textAlign: "center",
    "& h3": {
      padding: "15px 0 15px 25px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray5,
      margin: 0,
      color: theme.palette.text.black1,
      fontSize: 20,
      textAlign: "left"
    },
    "@media (max-width:724px)": {
      width: "90%"
    }
  },
  termsAndConditions: {
    height: 306,
    padding: "23px 17px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f1f1f1",
    margin: "15px 13px 0",
    backgroundColor: theme.palette.text.gray8,
    textAlign: "left",
    color: theme.palette.text.gray3,
    fontSize: 14,
    fontFamily: theme.typography.secondary.main,
    overflow: "auto"
  },
  checkboxAndButton: {
    padding: "30px 15px 0",
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      padding: "13px 61px 11px"
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  }
});

class TermsOfUse extends Component {
  state = {
    hasAcceptedTerms: false
  };

  handleAcceptTerms = event => {
    this.setState({ hasAcceptedTerms: event.target.checked });
  };

  render() {
    const { classes, handleNextSection } = this.props;
    const { hasAcceptedTerms } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <div className={classes.termsOfUseContainer}>
          <h3>Review and Accept Terms of Service</h3>
          <div className={classes.termsAndConditions}>
            <p>
              Lorem ipsum dolor sit amet, ad vis affert dictas. Has an scripta
              ponderum accommodare, adhuc dolorum adolescens per ea. Has in
              autem veniam alterum. His illum nonumes lobortis eu, sit ne
              salutandi philosophia.
            </p>
            <p>
              Amet accusam facilisi ne per, sea eu scripta tractatos imperdiet,
              in cum exerci iisque. Eam eripuit feugiat et, no has nusquam
              atomorum mediocrem, his bonorum mediocrem id. Id sit volutpat
              consetetur, etiam viris voluptatibus ne duo. Cu est dolore
              oportere. Id vel apeirian assueverit, quo aeterno nostrum id. Te
              quidam accusam urbanitas quo, omnes quaerendum cu mea.
            </p>
            <p>
              Libris corpora sed te, vel ea libris complectitur, mel in sanctus
              liberavisse. Usu ne aperiam scripserit scribentur, pri ferri
              alterum an. Ea his adhuc populo accusata, tincidunt democritum cum
              ei. Veri nemore tacimates et pro. Et eam diam imperdiet
              quaerendum, cum ut wisi splendide, ei enim tantas definitionem
              duo. At mea appetere rationibus.
            </p>
            <p>
              Id sed essent qualisque, ridens vocent ne mel, eos eligendi
              intellegat at. Eos vitae discere in. Nam ne quidam scaevola
              persecuti. Viris feugiat torquatos et sea, vis tacimates
              contentiones concludaturque in. Vel nulla ponderum qualisque ad,
              est adipisci consequat at.
            </p>
          </div>
          <div className={classes.checkboxAndButton}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasAcceptedTerms}
                  onChange={this.handleAcceptTerms}
                  color="primary"
                />
              }
              label="I agree to the Terms of Service"
            />
            <StyledButton
              btnText="accept"
              disabled={!hasAcceptedTerms}
              onClick={handleNextSection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TermsOfUse);
