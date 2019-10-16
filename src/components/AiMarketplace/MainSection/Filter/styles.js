import { makeStyles, createStyles } from "@material-ui/styles";
export const useStyles = theme =>
  createStyles({
    filterContainer: {
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    },
    filterResetBtnContainer: {
      padding: "12px 22px",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "4px 4px 0 0",
      borderBottom: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
    },
    h2: {
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: "normal",
    },
    resetBtn: {
      border: "none",
      backgroundColor: "transparent",
      color: theme.palette.text.primary,
      cursor: "pointer",
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      outline: "none",
      textTransform: "uppercase",
    },
    filterExpansionPanel: {
      marginTop: 0,
      marginBottom: 1,
      boxShadow: "none",
      backgroundColor: theme.palette.text.gray,
      "&::before": { position: "static" },
      "&.Mui-expanded": {
        marginTop: 0,
        backgroundColor: theme.palette.text.white,
      },
    },
    filtersHeadingTitle: {
      color: theme.palette.text.darkShadedGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 16,
    },
    filterDetails: {
      backgroundColor: theme.palette.text.white,
      flexDirection: "column",
    },
    formCntrlGrup: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& svg": {
        color: theme.palette.text.mediumShadeGray,
      },
    },
    count: {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
    },
    checkboxLabel: {
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      letterSpacing: "0.25px",
      color: theme.palette.text.mediumShadeGray,
    },
  });
export const useStylesHook = makeStyles(useStyles);
