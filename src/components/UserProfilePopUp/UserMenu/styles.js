export const useStyles = theme => ({
  userMenuItemList: {
    padding: 0,
    margin: 0,
    "& li": {
      listStyle: "none",
      padding: "12px 20px",
      "& a": {
        width: "100%",
        display: "inline-block",
        "&:hover": {
          "& svg": { color: theme.palette.text.primary },
          "& span": { color: theme.palette.text.primary },
        },
      },
      "& span": {
        color: theme.palette.text.black1,
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: "28px",
        textDecoration: "none",
      },
      "& svg": {
        color: theme.palette.text.userProfileIconColor,
        verticalAlign: "middle",
        paddingRight: 15,
      },
      "& hr": { margin: "10px 0" },
      "&:last-of-type": { paddingBottom: 19 },
    },
  },
  UserMenuAction: {
    padding: "0 20px !important",
    cursor: "pointer",
    "& span": {
      width: "89%",
      padding: "12px 0",
      display: "inline-block",
    },
    "&:hover": {
      "& svg": { color: theme.palette.text.primary },
      "& span": { color: theme.palette.text.primary },
    },
  },
});
