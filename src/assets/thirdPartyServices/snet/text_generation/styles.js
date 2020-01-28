export const useStyles = theme => ({
  description: {
    "& p": {
      margin: "25px 0 0",
      color: "rgba(0,0,0,0.60)",
      fontSize: 14,
      letterSpacing: 0.3,
      lineHeight: "21px",
    },
    "& a": {
      color: theme.palette.text.primary,
      fontWeight: 600,
      textDecoration: "none",
      padding: "0 5px",
    },
  },
  header: {
    paddingTop: 10,
    borderTop: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.disabledBtnBg,
    marginTop: 45,
    "& h4": {
      padding: "0 15px",
      fontSize: 18,
      color: theme.palette.text.black1,
    },
  },
  infoIcon: {
    paddingRight: 12,
    display: "none",
    color: theme.palette.text.lightGray,
    verticalAlign: "middle",
  },
  dropdownAndAvatar: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    "& > div": {
      width: "95%",
      "& label": {
        fontFamily: theme.typography.primary,
        color: theme.palette.text.darkShadedGray,
        letterSpacing: 0.4,
        lineHeight: "16px",
      },
      "& > div": {
        "& legend": { width: "110px !important" },
      },
    },
  },
  menuItem: {
    fontSize: 16,
    color: theme.palette.text.black1,
    letterSpacing: 0.5,
    lineHeight: "28px",
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.offWhiteColor,
    },
  },
  avatar: {
    width: 72,
    height: 72,
  },
  textArea: {
    padding: "0 30px 0 4px",
    marginTop: 25,
    "& svg": { paddingTop: 10 },
    "& div": { width: "94%" },
  },
  title: {
    marginRight: 20,
    fontSize: 14,
    color: theme.palette.text.mediumShadeGray,
    letterSpacing: 0.13,
    lineHeight: "24px",
  },
  progressBarContainer: {
    marginTop: 60,
    display: "flex",
  },
  sliderContainer: {
    maxWidth: "60%",
    display: "flex",
    "& .MuiSlider-root": { color: theme.palette.text.primary },
  },
  startEndNumber: {
    width: 41,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.inputBoxBorder,
    display: "inline-block",
    fontSize: 16,
    color: theme.palette.text.black1,
    letterSpacing: 0.15,
    lineHeight: "24px",
    textAlign: "center",
  },
  errorMsg: { margin: "25px 0 0" },
  btnContainer: {
    marginTop: 30,
    textAlign: "center",
    "& button": {
      "&:first-of-type": { padding: "13px 0 11px" },
      "&:last-of-type": { padding: "13px 68px 11px" },
    },
  },
  runTabDescription: {
    margin: "25px 0",
    fontSize: 14,
    color: theme.palette.text.mediumShadeGray,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h4": { fontSize: "20 !important" },
    "& svg": {
      display: "none",
      color: theme.palette.text.lightShadedGray,
    },
  },
  resultsContent: {
    padding: "20px 0 90px",
    borderRadius: 4,
    marginbottom: 40,
    backgroundColor: theme.palette.text.cardBackground,
  },
  imgContainer: {
    width: 479,
    height: 273,
    margin: "0 auto",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  resultDetails: {
    padding: "15px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.lightGray,
    margin: "0 10px",
    display: "flex",
  },
  resultTitle: {
    color: theme.palette.text.darkShadedGray,
    fontSize: 14,
  },
  resultValue: {
    color: theme.palette.text.mediumShadeGray,
    fontSize: 14,
  },
  resultBtnContainer: { textAlign: "center" },
});
