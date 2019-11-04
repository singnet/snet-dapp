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
        Congratulations your ‘General Account Wallet’ has been successfully opened.
      </Typography>
      <p className={classes.description}>
        Please find below your private key. It is imperative that you copy this key and keep it in a safe and secure
        place as it will be the only way you can access your secure wallet.
      </p>
      <AlertBox type={alertTypes.INFO} message={privateKey} />
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
