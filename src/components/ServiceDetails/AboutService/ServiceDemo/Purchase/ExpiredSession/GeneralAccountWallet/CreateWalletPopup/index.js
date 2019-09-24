import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import ProgressBar from "../../../../../../../common/ProgressBar";
import StyledButton from "../../../../../../../common/StyledButton";
import StyledDropdown from "../../../../../../../common/StyledDropdown";
import Details from "./Details";
import Purchase from "./Purchase";
import PrivateKey from "./PrivateKey";
import Summary from "./Summary";
import PopupDetails from "../PopupDetails";

import { useStyles } from "./styles";

class CreateWalletPopup extends Component {
	state = {
    progressText: ["Details", "Purchase", "Private Key", "Summary"],
    activeSection: 1
  }

	handleCancel = () => {
    this.props.handleClose();
  };

	render(){
		const { classes, open } = this.props;
		const { progressText, activeSection } = this.state;

		const PopupProgressBarComponents = [ 
			{ component: <Details/> },
			{ component: <Purchase /> },
			{ component: <PrivateKey /> },
			{ component: <Summary /> }
		];

		return (
			<div className={classes.generalAccWalletContainer}>
				<Modal open={open} onClose={this.handleCancel} className={classes.Modal}>
	        <Card className={classes.card}>
	          <CardHeader
	            className={classes.CardHeader}
	            title="Create General Account Wallet"
	            action={
	              <IconButton onClick={this.handleCancel}>
	                <CloseIcon />
	              </IconButton>
	            }
	          />
	          <CardContent className={classes.CardContent}>
	          	{PopupProgressBarComponents.map((item, index) => (
          			<PopupDetails
          				item={item}
			            active={activeSection === index + 1}
			            activeSection={activeSection}
			            progressText={progressText}
			          />
        			))}
	          </CardContent>
	          <CardActions className={classes.CardActions}>
	            <StyledButton btnText="cancel" type="transparent" />
	            <StyledButton btnText="Continue" type="blue"/>
	          </CardActions>
	        </Card>
	      </Modal>
			</div>
		);
	}	
}

export default withStyles(useStyles)(CreateWalletPopup);
