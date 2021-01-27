export const useStyles = theme => ({
  serviceListingHeaderContainer: {
    padding: "20px 60px 25px",
    background: "linear-gradient(180deg, #820D81 0%, #221471 100%)",
  },
  headerMedia: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    padding: "26px 0 26px 24px",
    display: "flex",
    alignItems: "center",
    "& h2": {
      padding: "8px 0 20px",
      color: theme.palette.text.white,
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "40px",
    },
    "& p": {
      margin: "0 0 32px",
      color: "#EEE",
      fontWeight: 200,
      fontSize: 18,
      lineHeight: "26px",
      "& span": {
        paddingTop: 30,
        display: "block",
      },
    },
  },
  featuredServiceContainer: {
    "& span": {
      fontSize: 14,
      lineHeight: "18px",
      "&:first-of-type": {
        position: "relative",
        backgroundColor: "#220D3A",
        padding: "4px 24px 4px 8px",
        color: "#FFC200",
        letterSpacing: 0.4,
        "&::after": {
          content: "' '",
          width: 18,
          height: 23,
          display: "inline-block",
          backgroundColor: "purple",
          transform: "rotate(40deg)",
          position: "absolute",
          right: -11,
          top: -2,
        },
      },
      "&:last-of-type": {
        marginLeft: 8,
        opacity: "0.75",
        color: "#989898",
        fontWeight: 600,
        letterSpacing: 1.25,
      },
      "& svg": {
        fontSize: 20,
        verticalAlign: "middle",
      },
    },
  },
  headerButtons: {
    "&:last-of-type button": { marginLeft: 24 },
  },
  titleDescription: {
    borderTop: "1px solid #A389D4",
    paddingTop: 22,
    marginTop: 22,
    "& h2": {
      color: theme.palette.text.white,
      fontWeight: 600,
      fontSize: 32,
      letterSpacing: -0.64,
      lineHeight: "40px",
      textAlign: "right",
    },
    "& p": {
      margin: 0,
      paddingLeft: 24,
      "& span": {
        display: "block",
        color: "#EEE",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "23px",
      },
    },
  },
  navigationIcon: {
    padding: "17px 11px",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "2px -1px 2px 0 rgba(0,0,0,0.4)",
    opacity: 0.05,
    fontSize: 30,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
  leftNavigation: {
    marginRight: 55,
    transform: "scaleX(-1)",
  },
  rightNavigation: {
    marginLeft: 54,
  },
});
