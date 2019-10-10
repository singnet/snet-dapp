import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Payments from "./Payments";
import Usage from "./Usage";
import { useStyles } from "./styles";

class UserProfileTransactionHistory extends Component {
  state = {
    activeTab: 0,
    paymentResult: [
      {
        date: "08 Sep 2019",
        time: "02:32 AM EST",
        providerName: "Provider Name 1",
        providerId: "ID-8783As670D",
        paymentChannel: "General Account Wallet",
        type: "Paypal",
        statusType: "success",
        statusMessage: "Success",
        cost: "$12.00",
        agiReceived: "+ 0.98352378",
      },
      {
        date: "08 Sep 2019",
        time: "02:32 AM EST",
        providerName: "Provider Name 2",
        providerId: "ID-8783As670D",
        paymentChannel: "Metamask",
        type: "Deposit",
        statusType: "success",
        statusMessage: "Success",
        cost: "-",
        agiReceived: "+ 0.98352378",
      },
      {
        date: "08 Sep 2019",
        time: "02:32 AM EST",
        providerName: "Provider Name 3",
        providerId: "ID-8783As670D",
        paymentChannel: "General Account Wallet 2",
        type: "Paypal",
        statusType: "warning",
        statusMessage: "Pending",
        cost: "$12.00",
        agiReceived: "+ 0.98352378",
      },
      {
        date: "08 Sep 2019",
        time: "02:32 AM EST",
        providerName: "Provider Name 4 ",
        providerId: "ID-8783As670D",
        paymentChannel: "General Account Wallet",
        type: "Paypal",
        statusType: "error",
        statusMessage: "Failure",
        cost: "$12.00",
        agiReceived: "+ 0.98352378",
      },
      {
        date: "08 Sep 2019",
        time: "02:32 AM EST",
        providerName: "Provider Name 5",
        providerId: "ID-8783As670D",
        paymentChannel: "Metamask",
        type: "Withdraw",
        statusType: "success",
        statusMessage: "Success",
        cost: "-",
        agiReceived: "- 0.98352378",
      },
    ],
  };

  onTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes } = this.props;
    const { activeTab, paymentResult } = this.state;

    const tabs = [
      { name: "Payments", activeIndex: 0, component: <Payments data={paymentResult} /> },
      { name: "Usage", activeIndex: 1, component: <Usage /> },
    ];

    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;

    return (
      <Grid container spacing={24} className={classes.transactionHistoryMainContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.transactionHistoryContainer}>
          <h3>Transactions History</h3>
          <div className={classes.transactionHistoryContent}>
            <AppBar position="static" className={classes.tabsHeader}>
              <Tabs value={activeTab}>
                {tabs.map(value => (
                  <Tab key={value.name} label={value.name} onClick={() => this.onTabChange(value.activeIndex)} />
                ))}
              </Tabs>
            </AppBar>
            {activeComponent}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(UserProfileTransactionHistory);
