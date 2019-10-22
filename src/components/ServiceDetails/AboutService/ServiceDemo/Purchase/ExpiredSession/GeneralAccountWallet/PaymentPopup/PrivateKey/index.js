import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";

import AlertText from "../../../../../../../../common/AlertText";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const PrivateKey = ({ classes, privateKey, handleNextSection }) => {
  const [keyCopied, setKeyCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setKeyCopied(true);
  };

  return (
    <div className={classes.privateKeyContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        Successfully Created Wallet for : Service Provider 1
      </Typography>
      <p className={classes.description}>
        <span>Information about the wallet and key. </span>Lorem ipsum dolor sit amet, vim natum dolore cu. It will take
        some time for the tokens to reflect on your channel. Please go ahead.
      </p>
      <div className={classes.infoBox}>
        <AlertBox type={alertTypes.INFO} message={privateKey} />
      </div>
      <div className={classes.downloadKeyBtn}>
        <CopyToClipboard text={privateKey} onCopy={handleCopyToClipboard}>
          <StyledButton type="transparent" btnText="copy private key" />
        </CopyToClipboard>
        <AlertText type={alertTypes.SUCCESS} message={keyCopied ? "Copied to Clipboard!" : undefined} />
      </div>
      <AlertBox
        type={alertTypes.WARNING}
        message="Please keep the private key secured. Once the private key is lost, it can not be recovered."
      />
      <div className={classes.btnContainer}>
        <StyledButton type="blue" disabled={!keyCopied} btnText="continue" onClick={handleNextSection} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PrivateKey);
