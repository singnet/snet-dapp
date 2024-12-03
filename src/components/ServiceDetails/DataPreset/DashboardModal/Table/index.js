import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const TableSamples = ({ classes, tableData }) => {
  const headData = tableData[0];
  const bodyData = tableData.length >= 2 ? tableData.slice(1) : [];

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
        {bodyData.map((row, index) => (
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
