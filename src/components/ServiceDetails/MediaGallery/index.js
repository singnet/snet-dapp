import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PlayIcon from "@material-ui/icons/PlayArrow";
import ImageGallery from "react-image-gallery";
import last from "lodash/last";
import "react-image-gallery/styles/css/image-gallery.css";

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
    };

    this.filteredData = this.props.data.filter(item => {
      return item.asset_type !== HERO_IMG;
    });

    this.images = this.filteredData.map(item => {
      if (item.file_type === "video") {
        return {
          original: this.getYoutubeVideoThumbnail(item.url),
          thumbnail: this.getYoutubeVideoThumbnail(item.url, "thumbnail"),
          embedUrl: this.enhancedEmbedUrl(item.url),
          renderItem: this._renderVideo.bind(this),
          description: item.description ? item.description : "Description will go here",
        };
      }
      return {
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
    console.debug("clicked on image", event.target, "at index", this._imageGallery.getCurrentIndex());
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
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a className="close-video" onClick={this._toggleShowVideo.bind(this, item.embedUrl)} />
            <iframe width="590" height="368" src={item.embedUrl} frameBorder="0" allowFullScreen />
            <PlayIcon />
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            {/* <div className="play-button" /> */}
            <img className="image-gallery-image" src={item.original} />
            {item.description && (
              <span className="image-gallery-description" style={{ right: "0", left: "initial" }}>
                {item.description}
              </span>
            )}
            <PlayIcon className={classes.playVideoIcon} />
          </a>
        )}
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return this.images.length !== 0 ? (
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
          // showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          // showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
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
    ) : null;
  }
}

export default withStyles(useStyles)(MediaGallery);
