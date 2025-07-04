import React, { Fragment, useEffect, useState } from "react";
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

import { fetchServiceDetails, getIsTrainingAvailable } from "../../Redux/actionCreators/ServiceDetailsActions";

import ErrorBox from "../common/ErrorBox";
import SeoMetadata from "../common/SeoMetadata";
import Routes from "../../utility/constants/Routes";
import CardImg from "../../assets/images/SnetDefaultServiceImage.png";
import TrainingModels from "./TrainingModels";
import DataPreset from "./DataPreset";
import { datafactoryAvailabilityList } from "../../config/DatasetClient";

export const HERO_IMG = "hero_image";

const offlineNotication = {
  type: notificationBarTypes.WARNING,
  message: "Service temporarily offline by the provider. Please check back later.",
};

const ServiceDetails = ({ classes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { orgId, serviceId, tabId } = useParams();

  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const detailsTraining = useSelector((state) => state.serviceDetailsReducer.detailsTraining);
  const service = useSelector((state) => state.serviceDetailsReducer.details);
  const loading = useSelector((state) => state.loaderReducer.app.loading);

  const [activeTab, setActiveTab] = useState(tabId ? tabId : 0);

  useEffect(() => {
    setActiveTab(tabId);
  }, [tabId]);

  useEffect(() => {
    if (process.env.REACT_APP_SANDBOX) {
      return;
    }
    const updateServiceDetails = async () => {
      const { orgId: serviceOrgId, serviceId: serviceDataServiceId } = service;
      if (!serviceId || serviceOrgId !== orgId || serviceDataServiceId !== serviceId) {
        await dispatch(fetchServiceDetails(orgId, serviceId));
      }
    };

    updateServiceDetails();
  }, [dispatch, orgId, serviceId, service]);

  const handleTabChange = (activeTab) => {
    if (window.location.href.indexOf("#demo") > -1) {
      navigate(location.pathname);
    }
    navigate(location.pathname.split("tab/")[0] + "tab/" + activeTab); //TODO
    setActiveTab(activeTab);
  };

  const handleDemoClick = () => {
    navigate({ ...location, hash: Routes.hash.SERVICE_DEMO });
  };

  if (isEmpty(service)) {
    if (loading) {
      return null;
    }
    return (
      <Grid container className={classes.serviceDetailContainer}>
        <ErrorBox />
      </Grid>
    );
  }

  const isTrainingAvailable = getIsTrainingAvailable(detailsTraining, isLoggedIn);
  const isDatafactoryAvailable = datafactoryAvailabilityList.reduce(
    (accumulator, availableServices) =>
      accumulator && orgId === availableServices.organizationId && availableServices.servicesId.includes(serviceId),
    true
  );

  const tabs = [
    {
      name: "About",
      activeIndex: 0,
      tabId: "serviceDemo",
      component: <AboutService isTrainingAvailable={isTrainingAvailable} />,
    },
    {
      name: "Install and Run",
      tabId: "serviceGuides",
      activeIndex: 1,
      component: <InstallAndRunService />,
    },
  ];

  if (isTrainingAvailable && isDatafactoryAvailable) {
    tabs.push({
      name: "Data preset",
      tabId: "dataPreset",
      activeIndex: 2,
      component: <DataPreset />,
    });
  }

  if (isTrainingAvailable) {
    tabs.push({
      name: "Models",
      tabId: "serviceTraining",
      activeIndex: 3,
      component: <TrainingModels />,
    });
  }

  const seoURL = `${process.env.REACT_APP_BASE_URL}/servicedetails/org/${orgId}/service/${serviceId}/tab/${activeTab}`;
  return (
    <Fragment>
      <Helmet>
        <title>{service.displayName}</title>
        <meta name="keywords" content={service.displayName} />
        <meta name="description" content={service.shortDescription} />
      </Helmet>
      <SeoMetadata
        title={service.displayName}
        description={service.shortDescription}
        image={service?.orgImageUrl ? service.orgImageUrl : CardImg}
        url={seoURL}
        keywords={service.tags}
      />
      <Grid container className={classes.serviceDetailContainer}>
        <div className={classes.notificationBar}>
          <NotificationBar
            type={offlineNotication.type}
            showNotification={!service.isAvailable}
            icon={ErrorOutlineIcon}
            message={offlineNotication.message}
          />
        </div>
        <div className={classes.TopSection}>
          <TitleCard
            organizationName={service.organizationName}
            displayName={service.displayName}
            serviceMedia={service.media}
            orgImg={service.orgImageUrl}
            star_rating={service.rating}
            totalRating={service.numberOfRatings ? service.numberOfRatings : 0}
            shortDescription={service.shortDescription}
          />
          <PricingDetails serviceAvailable={service.isAvailable} handleDemoClick={handleDemoClick} />
        </div>
        <StyledTabs tabs={tabs} activeTab={Number(activeTab)} onTabChange={handleTabChange} />
      </Grid>
    </Fragment>
  );
};

export default withStyles(useStyles)(ServiceDetails);
