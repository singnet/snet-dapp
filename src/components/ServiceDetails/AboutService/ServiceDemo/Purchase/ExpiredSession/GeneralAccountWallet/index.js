import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../../../../../common/StyledButton";
import StyledDropdown from "../../../../../../common/StyledDropdown";
import PaymentInfoCard from "../../PaymentInfoCard";
import CreateWalletPopup from "./CreateWalletPopup";
import { useStyles } from "./styles";

class GeneralAccountWallet extends Component {
	state = {
		showCreateWalletPopup: false
	}

	handleCreateWallet = () => {
		this.setState({ showCreateWalletPopup: true })
	}

	handlePayTypeChange = () => {
		console.log('test')
	}

	handlePopupClose = () => {
    this.setState({ showCreateWalletPopup: false });
  };

	render(){		
		const { classes, paymentInfoCardTitle, paymentInfoCardValue, paymentInfoCardUnit } = this.props;
		const { showCreateWalletPopup } = this.state;
		const channelPaymentOptions = [
  		{ value: "general_account_wallet", label: "General Account Wallet" },
  		{ value: "metamask", label: "Metamask" }
		];
		return (
			<div className={classes.generalAccWalletContainer}>
				<p className={classes.description}>You have run out of free trial. Please select a payment method to continue</p>

				<div className={classes.paymentChannelAndDetails}>				
					<div className={classes.paymentChannelDropDownContainer}>
						<InfoIcon className={classes.infoIconContainer} />
						<div className={classes.paymentChannelDropDown}>
		          <span className={classes.dropDownTitle}>Payment Channel</span>
		          <AccountBalanceWalletIcon className={classes.walletIcon} />
		          <StyledDropdown
		            labelTxt={"Select a Wallet"}
		            list={channelPaymentOptions}
		            value={" "}
		            onChange={this.handlePayTypeChange}
		          />
		        </div>
		      </div>
	      	<div className={classes.channelBalance}>
	      		<PaymentInfoCard title={paymentInfoCardTitle} value={paymentInfoCardValue} unit={paymentInfoCardUnit} />
	      	</div>
					<div className={classes.alertBoxConatiner}></div>
				</div>			

				<div className={classes.btnsContainer}>
					<StyledButton type="transparentBlueBorderDisable" btnText="transaction history" />
					<StyledButton type="transparentBlueBorderDisable" btnText="top up wallet" />
					<StyledButton type="blue" btnText="create wallet" onClick={this.handleCreateWallet} />
				</div>

				<CreateWalletPopup
          open={showCreateWalletPopup}
          handleClose={this.handlePopupClose}          
        />
			</div>
		)
	};
}

export default withStyles(useStyles)(GeneralAccountWallet);
