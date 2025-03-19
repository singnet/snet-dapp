import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  ratedCount: {
    marginLeft: 10,
    display: "inline-block",
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2,
    verticalAlign: "super",
  },
}));
