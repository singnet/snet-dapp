import React, { useState } from "react";
import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

import { useStyles } from "./styles";

const StyledPagination = ({ limit, offset, total_count, handleChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const classes = useStyles();

  const handleItemsPerPage = event => {
    const pagination = {
      offset: 0,
      limit: event.target.value,
    };
    setItemsPerPage(event.target.value);
    handleChange(pagination);
  };

  const handlePageChange = selectedOffset => {
    if (selectedOffset === parseFloat(offset)) {
      return;
    }
    const pagination = { offset: selectedOffset };
    handleChange(pagination);
  };

  const currentFirstItem = offset;
  const currentLastItem = parseFloat(limit) + parseFloat(offset);

  return (
    <Grid container spacing={24} className={classes.paginationContainer}>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.pagination}>
        <Pagination
          limit={limit}
          offset={offset}
          total={total_count}
          reduced={true}
          onClick={(e, offset) => handlePageChange(offset)}
          className={classes.styledPagination}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.pageCountSection}>
        <span className={classes.itemPerPageTxt}>Items per page</span>
        <FormControl variant="outlined" className={classes.pageListformControl}>
          <Select
            value={itemsPerPage}
            input={<OutlinedInput labelWidth={75} name="age" id="outlined-age-simple" onChange={handleItemsPerPage} />}
            className={classes.selectBox}
          >
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={36}>36</MenuItem>
          </Select>
        </FormControl>
        <span>
          {currentFirstItem}-{currentLastItem} of {total_count}
        </span>
      </Grid>
    </Grid>
  );
};

export default StyledPagination;
