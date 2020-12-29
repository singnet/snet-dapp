export const useStyles = theme => ({
  mediaGalleryContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 25px 30px 0",
    marginTop: 25,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& iframe": { width: "100%" },
  },
  masonry_grid: {
    display: "flex",
    marginLeft: -30,
    width: "auto",
  },
  masonry_grid_column: {
    paddingLeft: 30,
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: 30,
    },
  },

  card: {
    margin: 7,
    padding: 5,
    borderRadius: 3,
    boxShadow: "0 1px 3px darkgray",
  },

  overlayContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: "center",
    color: "#fff",
    opacity: 0.7,
    backgroundColor: "#4D4D4D",
    "& span": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },

  videoOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
