import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import isEmpty from "lodash/isEmpty";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";
import { serviceDetailsActions } from "../../Redux/actionCreators";
import { pricing, serviceDetails } from "../../Redux/reducers/ServiceDetailsReducer";
import ErrorBox from "../common/ErrorBox";

class ServiceDetails extends Component {
  state = {
    activeTab: 0,
    alert: {},
    offlineNotication: {
      type: notificationBarTypes.WARNING,
      message: "Service is currently unavailable. Please try later",
    },
  };

  componentDidMount() {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    if (isEmpty(this.props.service)) {
      this.fetchServiceDetails();
    }
  }

  fetchServiceDetails = async () => {
    const {
      fetchServiceDetails,
      match: {
        params: { orgId, serviceId },
      },
    } = this.props;
    try {
      await fetchServiceDetails(orgId, serviceId);
    } catch (error) {
      this.setState({ error: true });
    }
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, service, pricing, loading, error, history } = this.props;
    const { offlineNotication } = this.state;

    if (isEmpty(service) || error) {
      if (loading) {
        return null;
      }
      return (
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          <ErrorBox />
        </Grid>
      );
    }

    const { activeTab } = this.state;

    const tabs = [
      {
        name: "About",
        activeIndex: 0,
        component: <AboutService service={service} history={history} />,
      },
      { name: "Install and Run", activeIndex: 1, component: <InstallAndRunService service={service} /> },
    ];

    return (
      <div>
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          <NotificationBar
            type={offlineNotication.type}
            showNotification={!service.is_available}
            icon={CardGiftcardIcon}
            message={offlineNotication.message}
          />
          <div className={classes.TopSection}>
            <TitleCard
              organizationName={service.organization_name}
              display_name={service.display_name}
              serviceImg={service.assets_url && service.assets_url.hero_image}
              orgImg={service.org_assets_url && service.org_assets_url.hero_image}
              star_rating={service.service_rating && service.service_rating.rating}
              totalRating={service.service_rating ? service.service_rating.total_users_rated : 0}
            />
            <PricingDetails
              activeTab={activeTab}
              pricing={pricing}
              handleTabChange={this.handleTabChange}
              history={history}
            />
          </div>
          <StyledTabs tabs={tabs} activeTab={activeTab} onTabChange={this.handleTabChange} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { orgId, serviceId },
    },
  } = ownProps;

  return {
    service: serviceDetails(state, orgId, serviceId),
    pricing: pricing(state),
    loading: state.loaderReducer.app.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchServiceDetails: (orgId, serviceId) => dispatch(serviceDetailsActions.fetchServiceDetails(orgId, serviceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
