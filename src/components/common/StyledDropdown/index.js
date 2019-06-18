import React from "react";

// Material UI imports
import { makeStyles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    "& label": {
      color: theme.palette.primary.main,
      fontSize: 18,
      "& div": {
        "&::before": {
          borderBottom: "none"
        }
      }
    },
    "& svg": {
      right: "-15px",
      color: theme.palette.primary.main
    },
    "& label + div": {
      "&::before": {
        borderBottom: "none"
      }
    }
  }
}));

function StyledDropdown(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    featured: ""
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="featured-label">{props.labelTxt}</InputLabel>
      <Select
        native
        value={state.featured}
        onChange={handleChange("featured")}
        inputProps={{
          name: "featured",
          id: "featured-label"
        }}
      >
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
  );
}

export default StyledDropdown;
