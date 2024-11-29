import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const headData = ["column1", "column2", "column3"];

const TableSamples = ({ classes, tableData }) => {
  return (
    <table className="sample-table">
      <thead className={classes.tableHead}>
        <tr>
          {headData.map((cellData, index) => (
            <th key={index} className={classes.tableCeil}>
              {cellData}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.map((cellData, index) => (
              <td key={index} className={classes.tableCeil}>
                {cellData}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default withStyles(useStyles)(TableSamples);
