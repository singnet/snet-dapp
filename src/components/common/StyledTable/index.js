import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledTable = ({ classes, title, columns, rows }) => {
  return (
    <div className={classes.styledTable}>
      <Typography variant="h5" className={classes.styledTableHeader}>
        {title}
      </Typography>
      <div className={classes.styledTableContent}>
        <div className={classes.styledTableColumn}>
          {columns.map(column => (
            <Typography key={column.key} variant="body2">
              {column.label}
            </Typography>
          ))}
        </div>
        {rows.map(row => (
          <div key={row.key} className={row.highlight ? classes.styledTableDataHighlighted : classes.styledTableData}>
            {row.values.map(value => (
              <div key={value.label}>
                {value.icon && <value.icon className={classes.infoIconContainer} />}
                <Typography variant="body2">{value.label}</Typography>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

StyledTable.defaultProps = {
  columns: [{}],
  rows: [{ values: [{}] }],
};

StyledTable.propTypes = {
  title: PropTypes.string,
};

export default withStyles(useStyles)(StyledTable);
