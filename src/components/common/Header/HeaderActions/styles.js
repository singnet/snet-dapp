import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  loginBtnsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    "& button": {
      minWidth: "auto",
      padding: "11px",
    },
    "@media (max-width:375px)": {
      flexDirection: "column",
    },
  },
}));
