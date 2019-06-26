import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";

class TermsOfUse extends Component {
    state = {
        hasAcceptedTerms: false,
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
                            Lorem ipsum dolor sit amet, ad vis affert dictas. Has an scripta ponderum accommodare, adhuc
                            dolorum adolescens per ea. Has in autem veniam alterum. His illum nonumes lobortis eu, sit
                            ne salutandi philosophia.
                        </p>
                        <p>
                            Amet accusam facilisi ne per, sea eu scripta tractatos imperdiet, in cum exerci iisque. Eam
                            eripuit feugiat et, no has nusquam atomorum mediocrem, his bonorum mediocrem id. Id sit
                            volutpat consetetur, etiam viris voluptatibus ne duo. Cu est dolore oportere. Id vel
                            apeirian assueverit, quo aeterno nostrum id. Te quidam accusam urbanitas quo, omnes
                            quaerendum cu mea.
                        </p>
                        <p>
                            Libris corpora sed te, vel ea libris complectitur, mel in sanctus liberavisse. Usu ne
                            aperiam scripserit scribentur, pri ferri alterum an. Ea his adhuc populo accusata, tincidunt
                            democritum cum ei. Veri nemore tacimates et pro. Et eam diam imperdiet quaerendum, cum ut
                            wisi splendide, ei enim tantas definitionem duo. At mea appetere rationibus.
                        </p>
                        <p>
                            Id sed essent qualisque, ridens vocent ne mel, eos eligendi intellegat at. Eos vitae discere
                            in. Nam ne quidam scaevola persecuti. Viris feugiat torquatos et sea, vis tacimates
                            contentiones concludaturque in. Vel nulla ponderum qualisque ad, est adipisci consequat at.
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
                        <StyledButton btnText="accept" disabled={!hasAcceptedTerms} onClick={handleNextSection} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(TermsOfUse);
