import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PlayIcon from "@material-ui/icons/PlayArrow";
import ImageGallery from "react-image-gallery";
import last from "lodash/last";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import DefaultIconForVideo from "../../../assets/images/Play_1.png";
import { HERO_IMG } from "../";

import { useStyles } from "./styles";

class MediaGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: "bottom",
      showVideo: {},
      showLightBox: false,
      lightBoxMedia: null,
      hideNextIcon: false,
      hidePrevIcon: false,
      mediaType: "img",
      lightBoxVideoUrl: "",
      description: "",
    };

    this.filteredData = this.props.data.filter(item => {
      return item.asset_type !== HERO_IMG;
    });

    this.images = this.filteredData.map((item, index) => {
      if (item.file_type === "video") {
        return {
          index,
          original: this.getYoutubeVideoThumbnail(item.url),
          thumbnail: this.getYoutubeVideoThumbnail(item.url, "thumbnail"),
          embedUrl: this.enhancedEmbedUrl(item.url),
          renderItem: this._renderVideo.bind(this),
          description: item.description ? item.description : "Description will go here",
        };
      }
      return {
        index,
        original: item.url,
        thumbnail: item.url,
        description: item.description ? item.description : "Description will go here",
      };
    });
  }

  enhancedEmbedUrl(link) {
    if (!link.includes("youtube")) {
      return link;
    }
    const youtubeId = last(link.split("="));
    const embededLink = `https://youtube.com/embed/${youtubeId}`;
    return embededLink;
  }

  getYoutubeVideoThumbnail(link, type) {
    if (!link.includes("youtube")) {
      return DefaultIconForVideo;
    }
    const youtubeId = last(link.split("="));
    const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeId}/${type === "thumbnail" ? "1.jpg" : "0.jpg"}`;
    return youtubeThumbnail;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval || this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    const lightBoxMedia = event.target.getAttribute("src");

    const currentVideoObj = this.images.find(value => {
      return value.original === lightBoxMedia;
    });

    this.setState(
      {
        lightBoxMedia,
        mediaType: event.target.getAttribute("data-mediaType") ? "video" : "img",
        lightBoxVideoUrl: currentVideoObj ? currentVideoObj.embedUrl : "",
        hidePrevIcon: currentVideoObj.index === 0 ? true : false,
        hideNextIcon: currentVideoObj.index === this.images.length - 1 ? true : false,
      },
      () => {
        this.setState({ showLightBox: true });
      }
    );
  }

  _onImageLoad(event) {
    console.debug("loaded image", event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug("slid to index", index);
  }

  _onPause(index) {
    console.debug("paused on index", index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug("isFullScreen?", !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug("playing from index", index);
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo,
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    const { classes } = this.props;
    return (
      <div className={classes.videoMainContainer}>
        <img
          className="image-gallery-image"
          src={item.original}
          loading="lazy"
          data-mediaType={item.embedUrl ? "video" : "image"}
        />
        {item.description && (
          <span className="image-gallery-description" style={{ right: "0", left: "initial" }}>
            {item.description}
          </span>
        )}
        <PlayIcon
          src={item.original}
          data-mediaType={item.embedUrl ? "video" : "image"}
          className={classes.playVideoIcon}
        />
      </div>
    );
  }

  handleClose = () => {
    this.setState({ showLightBox: false });
  };

  showPrev = data => {
    const { lightBoxMedia } = this.state;
    let prevMedia = lightBoxMedia;

    const currentMediaObj = data.find(value => {
      return value.original === lightBoxMedia;
    });

    const prevMediaIndex = currentMediaObj.index - 1;

    if (data[prevMediaIndex].embedUrl) {
      this.setState({
        mediaType: "video",
        lightBoxVideoUrl: data[prevMediaIndex].embedUrl,
      });
    } else {
      this.setState({ mediaType: "img" });
    }

    prevMedia = data[prevMediaIndex].original;
    if (prevMediaIndex <= 0) {
      prevMedia = data[0].original;
      this.setState({ hidePrevIcon: true });
    } else {
      prevMedia = data[prevMediaIndex].original;
    }
    this.setState({
      lightBoxMedia: prevMedia,
      hideNextIcon: false,
    });
  };

  showNext = data => {
    const { lightBoxMedia } = this.state;
    let nextMedia = lightBoxMedia;

    const currentMediaObj = data.find(value => {
      return value.original === lightBoxMedia;
    });

    const nextMediaIndex = currentMediaObj.index + 1;

    if (data[nextMediaIndex].embedUrl) {
      this.setState({
        mediaType: "video",
        lightBoxVideoUrl: data[nextMediaIndex].embedUrl,
      });
    } else {
      this.setState({ mediaType: "img" });
    }

    if (nextMediaIndex >= data.length - 1) {
      nextMedia = data[data.length - 1].original;
      this.setState({ hideNextIcon: true });
    } else {
      nextMedia = data[nextMediaIndex].original;
    }

    this.setState({
      lightBoxMedia: nextMedia,
      hidePrevIcon: false,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      showLightBox,
      lightBoxMedia,
      hideNextIcon,
      hidePrevIcon,
      lightBoxVideoUrl,
      mediaType,
      description,
    } = this.state;

    console.log("hidePrevIcon", hidePrevIcon);

    return this.images.length !== 0 ? (
      <Fragment>
        <div className={classes.mediaGalleryContainer}>
          <h2>Media Gallery ({this.images.length})</h2>
          <ImageGallery
            ref={i => (this._imageGallery = i)}
            items={this.images}
            lazyLoad={false}
            onClick={this._onImageClick.bind(this)}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            onPause={this._onPause.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            onPlay={this._onPlay.bind(this)}
            infinite={this.state.infinite}
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
            additionalClass={classes.marketplace_media_gallery}
          />
        </div>
        <Modal open={showLightBox} className={classes.mediaGalleryLightBox}>
          <div className={classes.mediaContainer}>
            <h2>Media Gallery</h2>
            <CloseIcon className={classes.closeIcon} onClick={this.handleClose} />
            <div className={classes.mediaWrapper}>
              <div className={classes.arrowIconContainer}>
                <ArrowForwardIosIcon
                  className={`${classes.leftNavIcon} ${hidePrevIcon ? classes.hideIcon : classes.navIcon}`}
                  onClick={() => this.showPrev(this.images)}
                />
                <ArrowForwardIosIcon
                  className={`${classes.rigthtNavIcon} ${hideNextIcon ? classes.hideIcon : classes.navIcon}`}
                  onClick={() => this.showNext(this.images)}
                />
              </div>
              {mediaType === "img" ? (
                <img src={lightBoxMedia} alt="" loading="lazy" />
              ) : (
                <iframe src={lightBoxVideoUrl} frameBorder="0" allowFullScreen className={classes.lightBoxIframe} />
              )}
              {description ? <span className="image-gallery-description">{description}</span> : null}
            </div>
          </div>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default withStyles(useStyles)(MediaGallery);
