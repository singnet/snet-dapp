import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import isEmpty from "lodash/isEmpty";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import NotificationBar from "../common/NotificationBar";
import { serviceDetailsActions } from "../../Redux/actionCreators";
import { pricing, serviceDetails } from "../../Redux/reducers/ServiceDetailsReducer";
import AlertBox, { alertTypes } from "../common/AlertBox";

class ServiceDetails extends Component {
  state = {
    activeTab: 0,
    alert: {},
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
      this.setState({ alert: { type: alertTypes.ERROR, message: "unable to fetch service Details. Please reload" } });
    }
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, service, pricing } = this.props;
    const { alert } = this.state;

    if (isEmpty(service)) {
      return (
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          <AlertBox type={alert.type} message={alert.message} />
        </Grid>
      );
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
      <div>
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          { /*<NotificationBar 
            type="warning" 
            showNotification={!service.is_available} 
            icon={ErrorOutlineIcon} 
            notificationText={"Service temporarily offline by the owner.  Please check back later"} 
          /> */}
          <NotificationBar 
            type="information" 
            showNotification={!service.is_available} 
            icon={CardGiftcardIcon} 
            notificationText={"Free Trial Access:  You can try out this service for free. You have   99 free API calls    after which a subscription needs to be purchased"} 
          />
          <div className={classes.TopSection}>
            <TitleCard
              org_id={service.org_id}
              display_name={service.display_name}
              img_url={service.assets_url && service.assets_url.hero_image}
              star_rating={service.service_rating && service.service_rating.rating}
              totalRating={service.service_rating ? service.service_rating.total_users_rated : 0}
            />
            <PricingDetails pricing={pricing} />
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

  return { service: serviceDetails(state, orgId, serviceId), pricing: pricing(state) };
};

const mapDispatchToProps = dispatch => ({
  fetchServiceDetails: (orgId, serviceId) => dispatch(serviceDetailsActions.fetchServiceDetails(orgId, serviceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
