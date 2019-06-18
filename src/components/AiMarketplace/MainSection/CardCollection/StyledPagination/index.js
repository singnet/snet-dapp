import React from "react";

import Pagination from "material-ui-flat-pagination";
// Material UI imports
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  paginationContainer: {
    paddingTop: 10
  },
  pageListformControl: {
    width: 72,
    margin: "0 12px 0 21px",
    "& fieldset": {
      paddingLeft: "0 !important",
      top: 0,
      "& legend": {
        display: "none"
      }
    }
  },
  pageCountSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& span": {
      color: theme.palette.text.secondary,
      fontSize: 14
    }
  }
}));

// handleClick(offset) {
//   // this.setState({ offset });
//   console.log('clicked')
// }

function StyledPagination() {
  const classes = useStyles();
  return (
    <Grid container spacing={24} className={classes.paginationContainer}>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.pagination}>
        <Pagination
          limit={10}
          offset={0}
          total={200}
          reduced={true}
          // onClick={(e, offset) => this.handleClick(offset)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        className={classes.pageCountSection}
      >
        <span className={classes.itemPerPageTxt}>Item per page</span>
        <FormControl variant="outlined" className={classes.pageListformControl}>
          <Select
            value={1}
            // onChange={handleChange}
            input={
              <OutlinedInput
                labelWidth={75}
                name="age"
                id="outlined-age-simple"
              />
            }
            className={classes.selectBox}
          >
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <span>1-5 of 100</span>
      </Grid>
    </Grid>
  );
}

export default StyledPagination;
