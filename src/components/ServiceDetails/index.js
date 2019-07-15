import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import { useStyles } from "./styles";
import { serviceActions } from "../../Redux/actionCreators";
import OfflineNotification from "../common/OfflineNotification";

class ServiceDetails extends Component {
  state = {
    service_row_id: "",
    service: {},
    activeTab: 0,
  };

  componentDidMount = async () => {
    if (!this.props.services || this.props.services.length === 0) {
      this.populateServiceData(this.props.pagination);
      await this.props.fetchService(this.props.pagination);
      return;
    }
    this.populateServiceData();
  };

  componentDidUpdate = async () => {
    const { service } = this.state;
    if (!service || (Object.entries(service).length === 0 && service.constructor === Object)) {
      await this.props.fetchService(this.props.pagination);
      this.populateServiceData();
    }
  };

  populateServiceData = () => {
    const { service_row_id } = this.props.match.params;
    const service = this.props.services.filter(el => el.service_row_id === Number(service_row_id))[0];
    this.setState({ service_row_id, service });
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes } = this.props;
    const { service, activeTab } = this.state;

    const tabs = [{ name: "About", activeIndex: 0, component: <AboutService service={service} /> }];

    if (!service) {
      return null;
    }
    return (
      <div>
        <OfflineNotification showNotification={!service.is_available} />
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          <TitleCard org_id={service.org_id} display_name={service.display_name} />
          <PricingDetails price_model={service.price_model} />
          <StyledTabs tabs={tabs} activeTab={activeTab} onTabChange={this.handleTabChange} />
        </Grid>
      </div>
    );
  }
}

ServiceDetails.defaultProps = {
  services: [],
};

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
