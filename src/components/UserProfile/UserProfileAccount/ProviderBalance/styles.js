export const useStyles = theme => ({
  providerBalContent: {
    width: "100%",
    margin: 0,
    "& h3": {
      padding: "0 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "50px",
    },
  },
  description: {
    padding: "24px 20px 34px",
    color: "#3D3E40",
    fontSize: 16,
    lineHeight: "24px",
    "& p": { fontFamily: theme.typography.primary.main },
  },
});
