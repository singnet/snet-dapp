export const useStyles = theme => ({
  projectDetailsContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 14px 25px 0",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& h3": { marginBottom: 15 },
    "& > div": {
      paddingLeft: 30,
      marginTop: 17,
      display: "flex",
      "& h5": {
        paddingBottom: 34,
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "22px",
        "&:last-of-type": { paddingBottom: 0 },
      },
      "& a": {
        display: "block",
        color: theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.25,
        wordBreak: "break-all",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
      },
      "& p": {
        margin: 0,
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
      },
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  projectDetailsHeadings: { width: "35%" },
  projectDetailsValue: {
    width: "65%",
    "& > span": {
      display: "block",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      wordBreak: "break-all",
    },
  },
  orgIdValue: { paddingTop: 39 },
  serviceIdValue: { paddingTop: 39 },
  contributors: {
    "& p": { marginLeft: "30px !important" },
  },
  contributorsName: { paddingTop: 39 },
  projectDetailsContent: {
    "& h5": { padding: "0 !important" },
    paddingBottom: 39,
  },
  projectURLContainer: {
    "& > div": { display: "flex" },
    "& svg": {
      paddingTop: 3,
      marginRight: 5,
      color: theme.palette.text.primary,
      fontSize: 14,
    },
    "& a": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});
