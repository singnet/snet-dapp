import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import { useStyles } from "./styles";

const paginationLimits = [12, 24, 36];

const StyledPagination = ({ limit, offset, total_count, handleChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(limit);
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
    if (selectedOffset-- === parseFloat(offset)) {
      return;
    }
    const pagination = { offset: selectedOffset };
    handleChange(pagination);
  };

  const currentFirstItem = offset * limit;
  const viewedCountService = limit + currentFirstItem;
  const currentLastItem = total_count > viewedCountService ? viewedCountService : total_count;

  return (
    <Grid container className={classes.paginationContainer}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Pagination count={Math.ceil(total_count / limit)} onChange={(e, offset) => handlePageChange(offset)} />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.pageCountSection}>
        <span className={classes.itemPerPageTxt}>Items per page</span>
        <FormControl variant="outlined" className={classes.pageListformControl}>
          <Select
            value={itemsPerPage}
            input={<OutlinedInput onChange={handleItemsPerPage} />}
            className={classes.selectBox}
          >
            {paginationLimits.map((paginationLimit) => (
              <MenuItem key={paginationLimit} value={paginationLimit}>
                {paginationLimit}
              </MenuItem>
            ))}
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
