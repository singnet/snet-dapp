import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  loginBtnsLi: {
    marginRight: 30,
    listStyle: "none",
    "& span": {
      "& span": {
        "@media (max-width:768px)": { display: "none" },
      },
    },
    "@media (max-width:550px)": { display: "none" },
  },
  signupBtn: {
    padding: "4px 24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.text.white,
    borderRadius: 4,
    marginRight: 0,
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.palette.text.outlinedBtnHoverBg },
  },
  loginBtnsAnchor: {
    textDecoration: "none",
    fontSize: 16,
    color: theme.palette.text.white,
    cursor: "pointer",
    "&:hover": {
      paddingBottom: 4,
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.white,
      fontWeight: 600,
    },
  },
  loginBtn: {
    "&:hover": { fontWeight: 400 },
  },
  signupBtnText: {
    fontWeight: 600,
    letterSpacing: 1.79,
    lineHeight: "16px",
    "&:hover": { borderBottom: "none" },
  },
  UppercaseText: { textTransform: "uppercase" },
}));
