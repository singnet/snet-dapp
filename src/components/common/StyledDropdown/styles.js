import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    "&:before": { display: "none" },
    "& select": {
      width: "100%",
      padding: '10px 30px 10px 10px',
      '&:hover':{
      	backgroundColor: theme.palette.text.transBlueBorderBgHover
      }
    }
  }
}));
