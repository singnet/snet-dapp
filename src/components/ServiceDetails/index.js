import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import Grid from "@mui/material/Grid";
import isEmpty from "lodash/isEmpty";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import AboutService from "./AboutService";
import InstallAndRunService from "./InstallAndRunService";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";

import { sdkActions } from "../../Redux/actionCreators";
import { fetchTrainingModel, fetchServiceDetails } from "../../Redux/actionCreators/ServiceDetailsActions";
import { startAppLoader, stopAppLoader } from "../../Redux/actionCreators/LoaderActions";
import {
  pricing as getPricing,
  serviceDetails as getServiceDetails,
  groupInfo as getGroupInfo,
} from "../../Redux/reducers/ServiceDetailsReducer";

import ErrorBox from "../common/ErrorBox";
import SeoMetadata from "../common/SeoMetadata";
import Routes from "../../utility/constants/Routes";
import CardImg from "../../assets/images/SnetDefaultServiceImage.png";
import TrainingModels from "./TrainingModels";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import AlertBox, { alertTypes } from "../common/AlertBox";

export const HERO_IMG = "hero_image";

const offlineNotication = {
  type: notificationBarTypes.WARNING,
  message: "Service temporarily offline by the provider. Please check back later.",
};
let serviceClient;

const ServiceDetails = ({ classes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { orgId, serviceId } = useParams();

  const service = useSelector((state) => getServiceDetails(state, orgId, serviceId));
  const groupInfo = useSelector((state) => getGroupInfo(state));
  const pricing = useSelector((state) => getPricing(state));
  const loading = useSelector((state) => state.loaderReducer.app.loading);
  const training = useSelector((state) => state.serviceDetailsReducer.detailsTraining);
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const wallet = useSelector((state) => state.userReducer.wallet);

  const [activeTab, setActiveTab] = useState(0);
  const [alert, setAlert] = useState({});
  const [createModelCalled, setCreateModelCalled] = useState("new");
  const [modelDetailsOnEdit, setModelDetailsOnEdit] = useState();

  const initializeServiceClient = async () => {
    if (serviceClient) {
      return;
    }
    const { org_id, service_id } = service;
    const sdk = await dispatch(sdkActions.getSdk());
    serviceClient = new ServiceClient(sdk, org_id, service_id, sdk?._mpeContract, {}, groupInfo);
  };

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    if (isEmpty(service) || !service) {
      dispatch(fetchServiceDetails(orgId, serviceId));
    }
    dispatch(fetchTrainingModel(orgId, serviceId));
  }, [dispatch, orgId, serviceId, service]);

  const handleTabChange = (activeTab) => {
    if (window.location.href.indexOf("#demo") > -1) {
      const currentUrl = location.pathname;
      navigate(currentUrl);
    }
    setActiveTab(activeTab);
    // this.lastActiveTab = activeTab;
    // this.setState({ activeTab, createModelCalled: "new", modelDetailsOnEdit: undefined, alert: {} });
  };

  // const scrollToView = () => {
  //   if (demoExampleRef.current) {
  //     demoExampleRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // };

  const handleDemoClick = () => {
    navigate({ ...location, hash: Routes.hash.SERVICE_DEMO });
    if (activeTab !== 0) {
      setActiveTab(0);
      // scrollToView();
      return;
    }
    // scrollToView();
  };

  const editModel = (model) => {
    setActiveTab(2);
    setCreateModelCalled("edit");
    setModelDetailsOnEdit(model);
  };

  // const onCancelEditModel = () => {
  //   this.setState({
  //     activeTab: lastActiveTab,
  //     createModelCalled: "new",
  //     modelDetailsOnEdit: undefined,
  //     alert: {},
  //   });
  // };

  const onUpdateModel = async (updateModelParams) => {
    setAlert({});
    try {
      dispatch(startAppLoader(LoaderContent.UPDATE_MODEL));
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
      await initializeServiceClient();
      await serviceClient.updateModel(params);
      dispatch(stopAppLoader());
      // onCancelEditModel();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to update model. Please try again" });
      dispatch(stopAppLoader());
    }
  };

  const deleteModel = async () => {
    setAlert({});
    try {
      dispatch(startAppLoader(LoaderContent.DELETE_MODEL));
      const params = {
        modelId: modelDetailsOnEdit.modelId,
        address: wallet.address,
        method: modelDetailsOnEdit.methodName,
        name: modelDetailsOnEdit.serviceName,
      };
      await initializeServiceClient();
      await serviceClient.deleteModel(params);
      dispatch(stopAppLoader());
      // onCancelEditModel();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to Delete model. Please try again" });
      dispatch(stopAppLoader());
    }
  };

  if (isEmpty(service) || !isEmpty(alert)) {
    if (loading) {
      return null;
    }
    return (
      <Grid container className={classes.serviceDetailContainer}>
        <ErrorBox />
      </Grid>
    );
  }

  const tabs = [
    {
      name: "About",
      activeIndex: 0,
      component: (
        <AboutService
          service={service}
          serviceAvailable={service.is_available}
          // scrollToView={scrollToView}
          demoComponentRequired={!!service.demo_component_required}
          training={training}
          editModel={editModel}
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
          createModelCalled={createModelCalled}
          modelDetailsOnEdit={modelDetailsOnEdit}
          updateModel={onUpdateModel}
          editModel={editModel}
          deleteModel={deleteModel}
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
          <PricingDetails serviceAvailable={service.is_available} pricing={pricing} handleDemoClick={handleDemoClick} />
        </div>
        <StyledTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <div className={classes.alertBox}>
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(ServiceDetails);
