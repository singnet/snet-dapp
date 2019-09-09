import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  serviceCollection: {
    paddingLeft: 25,
    "@media(max-width: 1024px)": {
      paddingTop: 30,
      paddingLeft: 0,
    },
  },
}));
