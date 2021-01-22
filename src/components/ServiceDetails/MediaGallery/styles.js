export const useStyles = theme => ({
  mediaGalleryContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    margin: "25px 0 70px",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& iframe": { width: "100%" },
  },
  marketplace_media_gallery: {
    padding: "10px 30px 31px",
    "& .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus": {
      border: "4px solid #4086ff",
    },
    "& .image-gallery-right-nav, .image-gallery-left-nav": {
      padding: 0,
      backgroundColor: "rgba(255,255,255,.9)",
      filter: "none",
      width: 64,
      height: 64,
      "& svg": {
        color: "#000",
        opacity: 0.1,
        height: 64,
        "&:hover": {
          color: "#4086ff",
          opacity: 1,
        },
      },
    },
    "& .image-gallery-content.fullscreen": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "& .image-gallery-slide-wrapper": {
        "& button": { display: "block" },
      },
      "& .image-gallery-play-button": { display: "none !important" },
      "& .image-gallery-slide .image-gallery-description": {
        boxSizing: "border-box",
        bottom: 0,
        backgroundColor: "#000",
        color: "#fff",
        width: "100%",
        display: "block",
        textAlign: "left",
        padding: "12px 15px",
      },
      "& .image-gallery-thumbnails-wrapper": { display: "none" },
    },
    "& .image-gallery-slide-wrapper": {
      "& button": { outline: "none" },
      "& .image-gallery-left-nav, .image-gallery-right-nav, .image-gallery-play-button": { display: "none" },
      "& .image-gallery-slide .image-gallery-description": { display: "none" },
      "& .image-gallery-thumbnails-wrapper": { display: "block" },
      "& .image-gallery-fullscreen-button": {
        bottom: -10,
        color: "#4086ff",
        filter: "none",
      },
    },
    "& .image-gallery-icon": {
      "&:hover": { color: "#4086ff" },
    },
    "& .image-gallery-slide .image-gallery-image": { paddingBottom: 35 },
    "& .image-gallery-fullscreen-button": { padding: 0 },
  },
  videoMainContainer: { position: "relative" },
  playVideoIcon: {
    backgroundColor: "#4086FF",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.4)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    padding: 20,
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#4086ff",
    },
  },
});
