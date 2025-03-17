import { useState } from "react";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useStyles } from "../styles";
import { withStyles } from "@mui/styles";
import { downloadAuthToken } from "../../../../Redux/actionCreators/ServiceActions";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import StyledButton from "../../../common/StyledButton";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
const downloadTokenFileName = "authToken.txt";

const FreecallToken = ({ classes }) => {
  const dispatch = useDispatch();

  const [isTokenGenerating, setIsTokenGenerating] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [downloadTokenURL, setDownloadTokenURL] = useState("");
  const [publickey, setPublickey] = useState();
  const [alert, setAlert] = useState({});

  const generateToken = async ({ service, groupId }) => {
    if (isTokenGenerating) {
      return;
    }

    try {
      setIsTokenGenerating(true);
      setAlert({});
      const downloadToken = await dispatch(downloadAuthToken(service.service_id, groupId, publickey, service.org_id));
      setDownloadTokenURL(downloadToken);
    } catch (e) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to download the token. Please try later" });
    } finally {
      setIsTokenGenerating(false);
    }
  };

  const isValidAddress = (address) => {
    try {
      const checksumAddress = web3.utils.toChecksumAddress(address);
      return checksumAddress ? true : false;
    } catch (error) {
      return false;
    }
  };

  const handlePublicKey = (event) => {
    const address = event.currentTarget.value;
    setPublickey(address);
    const isAddressValid = isValidAddress(address);
    if (!isAddressValid) {
      setAlert({ type: alertTypes.ERROR, message: "invalid public key" });
      setIsAddressValid(false);
    } else {
      setAlert({});
      setIsAddressValid(true);
    }
  };

  return (
    <div className={classes.overViewContainer}>
      <div className={classes.freecallContainer}>
        <Typography className={classes.intSetupDesc}>
          Generate the free call token to use in your SDK. The address used to generate this token should be the same as
          the identity specified in your SDK configuation. This will allow you to invoke the service from your SDK on a
          trial basis
        </Typography>
        <div className={classes.textfieldContainer}>
          <div>
            <TextField
              id="outlined-user-name"
              label="Public Address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={publickey}
              onChange={handlePublicKey}
            />
            <Typography className={classes.publicAddDesc}>
              Ethereum address used in your SDK. This is the public address corresponding to the private key you use in
              the SDK
            </Typography>
          </div>
          {!downloadTokenURL && (
            <StyledButton
              type="blue"
              btnText="Generate Token"
              onClick={generateToken}
              disabled={isTokenGenerating || !isAddressValid}
            />
          )}
          {downloadTokenURL && (
            <a className={classes.downloadTokenLink} href={downloadTokenURL} download={downloadTokenFileName}>
              <StyledButton type="blue" btnText="Download Token" />
            </a>
          )}
        </div>
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(FreecallToken);
