import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import { useStyles } from "./styles";

const StyledPagination = ({ limit, offset, total_count, handleChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(36);
  const classes = useStyles();

  const handleItemsPerPage = (event) => {
    const pagination = {
      offset: 0,
      limit: event.target.value,
    };
    setItemsPerPage(event.target.value);
    handleChange(pagination);
  };

  const handlePageChange = (selectedOffset) => {
    if (selectedOffset === parseFloat(offset)) {
      return;
    }
    const pagination = { offset: selectedOffset };
    handleChange(pagination);
  };

  const currentFirstItem = offset;
  const currentLastItem =
    total_count > parseFloat(limit) + parseFloat(offset) ? parseFloat(limit) + parseFloat(offset) : total_count;

  return (
    <Grid container className={classes.paginationContainer}>
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
            <MenuItem value={36}>36</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={12}>12</MenuItem>
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
