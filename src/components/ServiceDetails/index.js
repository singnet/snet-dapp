import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import isEmpty from "lodash/isEmpty";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";
import { serviceDetailsActions } from "../../Redux/actionCreators";
import { pricing, serviceDetails, groupInfo } from "../../Redux/reducers/ServiceDetailsReducer";
import ErrorBox from "../common/ErrorBox";
import SeoMetadata from "../common/SeoMetadata";
import Routes from "../../utility/constants/Routes";

export const HERO_IMG = "hero_image";

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.demoExampleRef = React.createRef();
    this.state = {
      activeTab: 0,
      alert: {},
      offlineNotication: {
        type: notificationBarTypes.WARNING,
        message: "Service temporarily offline by the provider. Please check back later.",
      },
    };
  }

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
    if (window.location.href.indexOf("#demo") > -1) {
      const currentUrl = this.props.location.pathname;
      this.props.history.push(currentUrl);
    }
    this.setState({ activeTab });
  };

  scrollToView = () => {
    if (this.demoExampleRef.current) {
      this.demoExampleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  handleDemoClick = () => {
    const { history } = this.props;
    const { activeTab } = this.state;
    history.push({ ...history.location, hash: Routes.hash.SERVICE_DEMO });
    if (activeTab !== 0) {
      this.setState({ activeTab: 0 }, () => {
        this.scrollToView();
      });
      return;
    }
    this.scrollToView();
  };

  render() {
    const { classes, service, pricing, loading, error, history, groupInfo, match } = this.props;
    const { offlineNotication } = this.state;
    const {
      params: { orgId, serviceId },
    } = match;

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
        component: (
          <AboutService
            service={service}
            history={history}
            serviceAvailable={service.is_available}
            demoExampleRef={this.demoExampleRef}
            scrollToView={this.scrollToView}
          />
        ),
      },
      {
        name: "Install and Run",
        activeIndex: 1,
        component: <InstallAndRunService service={service} groupId={groupInfo.group_id} />,
      },
    ];

    const seoURL = `${process.env.REACT_APP_BASE_URL}/servicedetails/org/${orgId}/service/${serviceId}`;

    return (
      <div>
        <SeoMetadata
          title={service.display_name}
          description={service.short_description}
          image={service.org_assets_url.hero_image}
          url={seoURL}
          keywords={service.tags}
        />
        <Grid container spacing={24} className={classes.serviceDetailContainer}>
          <div className={classes.notificationBar}>
            <NotificationBar
              type={offlineNotication.type}
              showNotification={!service.is_available}
              icon={ErrorOutlineIcon}
              message={offlineNotication.message}
            />
          </div>
          <div className={classes.TopSection}>
            <TitleCard
              organizationName={service.organization_name}
              display_name={service.display_name}
              service={service.media}
              orgImg={service.org_assets_url && service.org_assets_url.hero_image}
              star_rating={service.service_rating && service.service_rating.rating}
              totalRating={service.service_rating ? service.service_rating.total_users_rated : 0}
              shortDescription={service.short_description}
            />
            <PricingDetails
              serviceAvailable={service.is_available}
              pricing={pricing}
              handleDemoClick={this.handleDemoClick}
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
    groupInfo: groupInfo(state),
    pricing: pricing(state),
    loading: state.loaderReducer.app.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchServiceDetails: (orgId, serviceId) => dispatch(serviceDetailsActions.fetchServiceDetails(orgId, serviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ServiceDetails));
