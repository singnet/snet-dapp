import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import StarRatingComponent from "react-star-rating-component";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import CardImg from "../../../assets/images/SnetDefaultServiceImage.png";
import { useStyles } from "./styles";
import RatingsCount from "snet-dapp-components/components/RatingsCount";
import SingularityLogo from "../../../assets/images/avatar.png";
import Typography from "@mui/material/Typography";
import { HERO_IMG } from "../";

const TitleCard = ({
  classes,
  display_name,
  star_rating,
  organizationName,
  service,
  orgImg,
  totalRating,
  shortDescription,
}) => {
  const [showLightBox, setshowLightBox] = useState(false);

  const altText = display_name + ": " + shortDescription;

  const openLightBox = () => {
    setshowLightBox(true);
  };

  const handleClose = () => {
    setshowLightBox(false);
  };

  const serviceImage = (mediaData) => {
    if (!mediaData) return CardImg;
    const serviceImgObj = mediaData.find(({ asset_type }) => asset_type === HERO_IMG);
    return serviceImgObj ? (serviceImgObj.url ? serviceImgObj.url : CardImg) : CardImg;
  };

  return (
    <Grid item xs={12} sm={12} md={8} lg={8} className={classes.computerVisionContainer}>
      <div className={classes.titleImg}>
        <img
          src={serviceImage(service)}
          alt={altText}
          width={229}
          height={129}
          onClick={openLightBox}
          title={altText}
          loading="lazy"
        />
      </div>

      <div className={classes.computerVisionContent}>
        <div className={classes.serviceCreatorDetails}>
          <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
          <div className={classes.companyName}>
            <p className={classes.providersName}>Provider</p>
            <Typography variant="h4" display="block">
              {organizationName}
            </Typography>
          </div>
        </div>

        <h1>{display_name}</h1>

        <div>
          <StarRatingComponent name="rate1" starCount={5} value={star_rating} className={classes.ratingStars} />
          <RatingsCount ratingGiven={star_rating} totalRating={totalRating} />
        </div>
      </div>

      <Modal open={showLightBox} className={classes.serviceLightBox} onClose={handleClose}>
        <div className={classes.serviceImgContainer}>
          <img src={serviceImage(service)} alt={altText} loading="lazy" />
          <CloseIcon onClick={handleClose} />
        </div>
      </Modal>
    </Grid>
  );
};

export default withStyles(useStyles)(TitleCard);
