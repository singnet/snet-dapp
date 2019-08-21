import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import { serviceDetailsActions } from "../../Redux/actionCreators";
import { pricing } from "../../Redux/reducers/ServiceDetailsReducer";

class ServiceDetails extends Component {
  state = {
    activeTab: 0,
  };

  componentDidMount() {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }

    this.fetchServiceDetails();
  }

  fetchServiceDetails = async () => {
    const { fetchServiceDetails, match } = this.props;
    const { orgId, serviceId } = match.params;
    await fetchServiceDetails({ orgId, serviceId });
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, service, pricing } = this.props;

    if (isEmpty(service) || isEmpty(pricing)) {
      return null;
    }

    const { activeTab } = this.state;

    const tabs = [
      {
        name: "About",
        activeIndex: 0,
        component: <AboutService service={service} />,
      },
      { name: "Install and Run", activeIndex: 1, component: <InstallAndRunService /> },
    ];

    return (
      <Grid container spacing={24} className={classes.serviceDetailContainer}>
        <TitleCard
          org_id={service.org_id}
          display_name={service.display_name}
          img_url={service.assets_url && service.assets_url.hero_image}
          star_rating={service.service_rating && service.service_rating.rating}
          totalRating={service.service_rating ? service.service_rating.total_users_rated : 0}
        />
        <PricingDetails pricing={pricing} />
        <StyledTabs tabs={tabs} activeTab={activeTab} onTabChange={this.handleTabChange} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  service: state.serviceDetailsReducer,
  pricing: pricing(state),
});

const mapDispatchToProps = dispatch => ({
  fetchServiceDetails: args => dispatch(serviceDetailsActions.fetchServiceDetails({ ...args })),
  resetServiceDetails: () => dispatch(serviceDetailsActions.resetServiceDetails),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
