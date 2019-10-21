export const useStyles = theme => ({
  card: {
    width: 628,
    margin: "50px auto 0",
    "@media(max-width: 960px)": { width: "100%" },
  },
  CardHeader: {
    padding: "5px 20px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#eee",
    color: theme.palette.text.black1,
    fontSize: 24,
    "& .MuiCardHeader-title": {
      fontFamily: theme.typography.primary.main,
    },
  },
  CardContent: {
    paddingTop: 25,
    "& > div": {
      paddingTop: 0,
      paddingBottom: 25,
      "&:first-of-type": {
        width: "100%",
        "& ul": {
          "@media(max-width: 470px)": { alignItems: "flex-start" },
        },
        "& ul li": {
          "&::before": {
            "@media(max-width: 600px)": {
              width: 20,
              margin: "0 5px",
            },
            "@media(max-width: 470px)": { display: "none" },
          },
        },
      },
      "& ul": {
        justifyContent: "center",
        "& li": {
          "&:before": {
            width: 40,
            margin: "0 10px",
          },
        },
      },
    },
  },
});
