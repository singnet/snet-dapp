import React from "react";
import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

import { useStyles } from "./styles";

const StyledPagination = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={24} className={classes.paginationContainer}>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.pagination}>
                <Pagination limit={10} offset={0} total={200} reduced={true} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.pageCountSection}>
                <span className={classes.itemPerPageTxt}>Item per page</span>
                <FormControl variant="outlined" className={classes.pageListformControl}>
                    <Select
                        value={1}
                        input={<OutlinedInput labelWidth={75} name="age" id="outlined-age-simple" />}
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
};

export default StyledPagination;
