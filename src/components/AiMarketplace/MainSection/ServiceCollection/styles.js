import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  serviceCollection: {
    paddingLeft: 25,
    "@media(max-width: 1023px)": { paddingLeft: 0 },
  },
}));
