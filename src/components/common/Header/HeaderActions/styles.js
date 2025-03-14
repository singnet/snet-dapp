import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  loginBtnsContainer: {
    "& button": {
      minWidth: "auto",
      padding: "11px",
    },
    "@media (max-width:375px)": {
      flexDirection: "column",
    },
  },
}));
