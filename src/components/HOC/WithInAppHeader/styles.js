import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  scrollableContent: {
    width: "100%",
    position: "absolute",
    top: 70,
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  increaseTopSpace: {
    height: "calc(100vh - 110px)",
    top: 110,
  },
  componentHolder: {
    minHeight: "calc(100vh - 70px - 250px)",
  },
}));
