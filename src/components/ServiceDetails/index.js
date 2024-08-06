import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import isEmpty from "lodash/isEmpty";
import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import { useStyles } from "./styles";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";
import { loaderActions, serviceDetailsActions, sdkActions } from "../../Redux/actionCreators";
import { pricing, serviceDetails, groupInfo } from "../../Redux/reducers/ServiceDetailsReducer";
import ErrorBox from "../common/ErrorBox";
import SeoMetadata from "../common/SeoMetadata";
import Routes from "../../utility/constants/Routes";
import CardImg from "../../assets/images/SnetDefaultServiceImage.png";
import TrainingModels from "./TrainingModels";
import { fetchTrainingModel } from "../../Redux/actionCreators/ServiceDetailsActions";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../common/AlertBox";
import { Helmet } from "react-helmet";
export const HERO_IMG = "hero_image";

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.demoExampleRef = React.createRef();
    this.lastActiveTab = 0;
    this.state = {
      activeTab: 0,
      alert: {},
      offlineNotication: {
        type: notificationBarTypes.WARNING,
        message: "Service temporarily offline by the provider. Please check back later.",
      },
      createModelCalled: "new",
      modelDetailsOnEdit: undefined,
    };
  }

  initializeServiceClient = async () => {
    if (this.serviceClient) {
      return;
    }
    const { org_id, service_id } = this.props.service;
    const sdk = await this.props.getSdk();
    this.serviceClient = new ServiceClient(sdk, org_id, service_id, sdk?._mpeContract, {}, this.props.groupInfo);
  };

  async componentDidMount() {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    if (isEmpty(this.props.service) || !this.props.service) {
      await this.fetchServiceDetails();
    }
    await this.fetchTrainingModel();
  }

  fetchTrainingModel = async () => {
    const {
      fetchTrainingModel,
      match: {
        params: { orgId, serviceId },
      },
    } = this.props;
    await fetchTrainingModel(orgId, serviceId);
  };

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

  handleTabChange = (activeTab) => {
    if (window.location.href.indexOf("#demo") > -1) {
      const currentUrl = this.props.location.pathname;
      this.props.history.push(currentUrl);
    }
    this.lastActiveTab = activeTab;
    this.setState({ activeTab, createModelCalled: "new", modelDetailsOnEdit: undefined, alert: {} });
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

  editModel = (model) => {
    this.setState({
      activeTab: 2,
      createModelCalled: "edit",
      modelDetailsOnEdit: model,
    });
  };

  onCancelEditModel = () => {
    this.setState({
      activeTab: this.lastActiveTab,
      createModelCalled: "new",
      modelDetailsOnEdit: undefined,
      alert: {},
    });
  };

  onUpdateModel = async (updateModelParams) => {
    const { startUpdateLoader, stopLoader, wallet } = this.props;
    this.setState({ alert: {} });
    try {
      const { modelDetailsOnEdit } = this.state;
      startUpdateLoader();
      const params = {
        modelId: modelDetailsOnEdit.modelId,
        address: wallet.address,
        method: modelDetailsOnEdit.methodName,
        name: modelDetailsOnEdit.serviceName,
        modelName: updateModelParams.trainingModelName,
        description: updateModelParams.trainingModelDescription,
        publicAccess: updateModelParams.enableAccessModel,
        addressList: !updateModelParams.enableAccessModel ? updateModelParams.ethAddress : [],
        status: modelDetailsOnEdit.status,
        updatedDate: modelDetailsOnEdit.updatedDate,
      };
      await this.initializeServiceClient();
      await this.serviceClient.updateModel(params);
      stopLoader();
      this.onCancelEditModel();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Unable to update model. Please try again" } });
      stopLoader();
    }
  };

  deleteModel = async () => {
    const { startDeleteLoader, stopLoader, wallet } = this.props;
    this.setState({ alert: {} });
    try {
      const { modelDetailsOnEdit } = this.state;
      startDeleteLoader();
      const params = {
        modelId: modelDetailsOnEdit.modelId,
        address: wallet.address,
        method: modelDetailsOnEdit.methodName,
        name: modelDetailsOnEdit.serviceName,
      };
      await this.initializeServiceClient();
      await this.serviceClient.deleteModel(params);
      stopLoader();
      this.onCancelEditModel();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Unable to Delete model. Please try again" } });
      stopLoader();
    }
  };

  render() {
    const { classes, service, pricing, loading, error, history, groupInfo, match, training, isLoggedIn } = this.props;
    const { offlineNotication } = this.state;
    const {
      params: { orgId, serviceId },
    } = match;
    if (isEmpty(service) || error) {
      if (loading) {
        return null;
      }
      return (
        <Grid container className={classes.serviceDetailContainer}>
          <ErrorBox />
        </Grid>
      );
    }

    const { activeTab, modelDetailsOnEdit } = this.state;
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
            demoComponentRequired={!!service.demo_component_required}
            training={training}
            editModel={this.editModel}
          />
        ),
      },
      {
        name: "Install and Run",
        activeIndex: 1,
        component: <InstallAndRunService service={service} groupId={groupInfo.group_id} />,
      },
    ];

    if (process.env.REACT_APP_TRAINING_ENABLE === "true" && Object.keys(training).length && isLoggedIn) {
      tabs.push({
        name: "Models",
        activeIndex: 2,
        component: (
          <TrainingModels
            service={service}
            groupId={groupInfo.group_id}
            training={training}
            createModelCalled={this.state.createModelCalled}
            modelDetailsOnEdit={modelDetailsOnEdit}
            cancelEditModel={this.onCancelEditModel}
            updateModel={this.onUpdateModel}
            editModel={this.editModel}
            deleteModel={this.deleteModel}
          />
        ),
      });
    }

    const seoURL = `${process.env.REACT_APP_BASE_URL}/servicedetails/org/${orgId}/service/${serviceId}`;
    return (
      <div>
        <Helmet>
          <title>{service.display_name}</title>
          <meta name="keywords" content={service.display_name} />
          <meta name="description" content={service.short_description} />
        </Helmet>
        <SeoMetadata
          title={service.display_name}
          description={service.short_description}
          image={service.org_assets_url ? service.org_assets_url.hero_image : CardImg}
          url={seoURL}
          keywords={service.tags}
        />
        <Grid container className={classes.serviceDetailContainer}>
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
          <div className={classes.alertBox}>
            <AlertBox type={this.state.alert.type} message={this.state.alert.message} />
          </div>
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
    training: state.serviceDetailsReducer.detailsTraining,
    isLoggedIn: state.userReducer.login.isLoggedIn,
    wallet: state.userReducer.wallet,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchServiceDetails: (orgId, serviceId) => dispatch(serviceDetailsActions.fetchServiceDetails(orgId, serviceId)),
  fetchTrainingModel: (orgId, serviceId) => dispatch(fetchTrainingModel(orgId, serviceId)),
  startUpdateLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_MODEL)),
  startDeleteLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_MODEL)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
  getSdk: () => dispatch(sdkActions.getSdk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ServiceDetails));
