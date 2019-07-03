import React, { useState } from "react";
import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import { serviceActions } from "../../../../../Redux/actionCreators";

const StyledPagination = ({ limit, offset, total_count, fetchService }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const classes = useStyles();

  const handleItemsPerPage = event => {
    const pagination = {
      offset: 0,
      limit: event.target.value,
    };
    fetchService(pagination);
    setItemsPerPage(event.target.value);
  };

  const handlePageChange = selectedOffset => {
    if (selectedOffset === parseFloat(offset)) {
      return;
    }
    const pagination = { offset: selectedOffset };
    fetchService(pagination);
  };

  const currentFirstItem = offset;
  const currentLastItem = parseFloat(limit) + parseFloat(offset);

  return (
    <Grid container spacing={24} className={classes.paginationContainer}>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.pagination}>
        <Pagination
          limit={limit}
          offset={offset}
          total={total_count}
          reduced={true}
          onClick={(e, offset) => handlePageChange(offset)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.pageCountSection}>
        <span className={classes.itemPerPageTxt}>Items per page</span>
        <FormControl variant="outlined" className={classes.pageListformControl}>
          <Select
            value={itemsPerPage}
            input={<OutlinedInput labelWidth={75} name="age" id="outlined-age-simple" onChange={handleItemsPerPage} />}
            className={classes.selectBox}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <span>
          {currentFirstItem}-{currentLastItem} of {total_count}
        </span>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  limit: state.serviceReducer.limit,
  offset: state.serviceReducer.offset,
  total_count: state.serviceReducer.total_count,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPagination);
