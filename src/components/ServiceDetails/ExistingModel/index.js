import React from "react";
import { withStyles } from "@material-ui/styles";
import ModelDetails from "./ModelDetails";
import StyledButton from "../../common/StyledButton";
import MetamaskImg from "../../../assets/images/Metamask.png";
import { useStyles } from "./styles";

const ExistingModel = ({ classes }) => {
  const [metamaskConnected, setMetamaskConnected] = React.useState(false);
  return (
    <div className={classes.existingModelContainer}>
      <h2>Existing Model</h2>
      {
        metamaskConnected ? (
          <>
            <ModelDetails
            title="Region Recognition"
            id="4432"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
            status="Inprogress"
            accessTo="Public"
            lastUpdate="12-Aug-2022"
          />
          <div className={classes.btnContainer}>
            <StyledButton btnText="request a new model" />
          </div>
        </>
        ) : (
          <div className={classes.connectMMContainer}>
              <img src={MetamaskImg} alt="Metamask" />
              <span>Metamask</span>
              <p>Connect to your Metamask Wallet</p>
              <StyledButton btnText="Connect" />
          </div>
        ) 
      }
    </div>
  );
};

export default withStyles(useStyles)(ExistingModel);
