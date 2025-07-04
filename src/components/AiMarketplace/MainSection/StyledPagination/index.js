import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import { useStyles } from "./styles";

const paginationLimits = [12, 24, 36];

const StyledPagination = ({ limit, page, totalCount, handleChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [limit, page, totalCount]);

  const handleItemsPerPage = (event) => {
    const pagination = {
      page: 1,
      limit: event.target.value,
    };
    setItemsPerPage(event.target.value);
    handleChange(pagination);
  };

  const handlePageChange = (selectedPage) => {
    console.log("selectedPage: ", selectedPage, page);

    // if (selectedPage === parseFloat(page)) {
    //   return;
    // }
    const pagination = { page: selectedPage };
    handleChange(pagination);
  };

  const currentFirstItem = --page * limit;
  const viewedCountService = limit + currentFirstItem;
  const currentLastItem = totalCount > viewedCountService ? viewedCountService : totalCount;
  const count = Math.ceil(totalCount / limit) || 1;

  console.log(
    "currentFirstItem: ",
    currentFirstItem,
    "viewedCountService: ",
    viewedCountService,
    "currentLastItem: ",
    currentLastItem,
    "count: ",
    count
  );

  return (
    <Grid container className={classes.paginationContainer}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Pagination count={count} onChange={(e, page) => handlePageChange(page)} />
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
          {currentFirstItem}-{currentLastItem} of {totalCount}
        </span>
      </Grid>
    </Grid>
  );
};

export default StyledPagination;
