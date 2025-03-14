import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    marginTop: 10,
    textAlign: "center",
    "& button": {
      padding: "15px 60px",
      marginTop: 10,
      marginRight: "0 !important",
    },
  },
}));
