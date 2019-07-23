import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import { serviceActions } from "../../Redux/actionCreators";

class ServiceDetails extends Component {
  state = {
    service_row_id: "",
    activeTab: 0,
  };

  componentDidMount = async () => {
    await this.fetchServices();
    this.populateServiceData();
  };

  fetchServices = async () => {
    const { services, pagination, fetchService } = this.props;
    if (services && services.length > 0) {
      return;
    }

    return fetchService(pagination);
  };

  populateServiceData = () => {
    const { service_row_id } = this.props.match.params;
    const service = this.props.services.find(service => service.service_row_id === Number(service_row_id));
    this.setState({ service_row_id, service });
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes } = this.props;
    const { service, activeTab } = this.state;

    const tabs = [
      { name: "About", activeIndex: 0, component: <AboutService service={service} /> },
      { name: "Install and Run", activeIndex: 1, component: <InstallAndRunService /> },
    ];

    if (!service) {
      return null;
    }

    return (
      <Grid container spacing={24} className={classes.serviceDetailContainer}>
        <TitleCard
          org_id={service.org_id}
          display_name={service.display_name}
          img_url={service.hero_image}
          star_rating={service.service_rating}
          totalRating={service.total_users_rated}
        />
        <PricingDetails price_strategy={service.pricing_strategy} />
        <StyledTabs tabs={tabs} activeTab={activeTab} onTabChange={this.handleTabChange} />
      </Grid>
    );
  }
}

ServiceDetails.defaultProps = {
  services: [],
};

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
  isLoggedIn: state.userReducer.login.isLoggedIn,
  isWalletAssigned: state.userReducer.isWalletAssigned,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
