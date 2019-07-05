export const useStyles = theme => ({
  userMenuItemList: {
    padding: 0,
    margin: 0,
    "& li": {
      listStyle: "none",
      padding: "10px 20px",
      "&:last-of-type": {
        paddingLeft: 0,
        borderTop: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.text.lightGray,
        marginTop: 20,
        "& span": {
          paddingLeft: 20,
        },
      },
      "& span": {
        color: theme.palette.text.gray2,
        verticalAlign: "middle",
        paddingRight: 20,
      },
      "& a": {
        color: theme.palette.text.black1,
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: "28px",
        textDecoration: "none",
      },
    },
  },
});
