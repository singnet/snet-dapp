import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";

import { userActions } from "../../../Redux/actionCreators";
import Payments from "./Payments";
import { useStyles } from "./styles";
import { Helmet } from "react-helmet";
import { isEmpty } from "lodash";

class UserProfileTransactionHistory extends Component {
  // state = { activeTab: 0 };

  // onTabChange = (activeTab) => {
  //   this.setState({ activeTab });
  // };

  componentDidMount = () => {
    const { fetchUserTransactions } = this.props;
    fetchUserTransactions();
  };

  render() {
    const { classes, transactionHistory } = this.props;
    // const { activeTab } = this.state;

    // const tabs = [
    //   { name: "Payments", activeIndex: 0, component: <Payments transactionHistory={transactionHistory} /> },
    // ];

    // const activeComponent = tabs.filter((el) => el.activeIndex === activeTab)[0].component;

    console.log("transactionHistory: ", transactionHistory);

    return (
      <Grid container className={classes.transactionHistoryMainContainer}>
        <Helmet>
          <meta
            name="description"
            content="View and manage your SingularityNET transactions to monitor AI service usage and spending efficiently."
          />
          <meta name="keywords" content="Transactions, AI Services, SingularityNET, Usage Tracking" />
        </Helmet>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.transactionHistoryContainer}>
          <h3>Transactions History</h3>
          <div className={classes.transactionHistoryContent}>
            {/* <AppBar position="static" className={classes.tabsHeader}>
              <Tabs value={activeTab}>
                {tabs.map((value) => (
                  <Tab key={value.name} label={value.name} onClick={() => this.onTabChange(value.activeIndex)} />
                ))}
              </Tabs>
            </AppBar>
            {activeComponent} */}
            {isEmpty(transactionHistory) ? (
              <h3>Transactions History is empty</h3>
            ) : (
              <Payments transactionHistory={transactionHistory} />
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUserTransactions: () => dispatch(userActions.fetchUserTransactions()),
});

const mapStateToProps = (state) => ({
  transactionHistory: state.userReducer.transactionHistory,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserProfileTransactionHistory));
