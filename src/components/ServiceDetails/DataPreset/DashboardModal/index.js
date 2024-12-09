import SNETDialog from "../../../common/SNETDialog";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import Graphs from "./Graphs";
import ImprovementParameters from "./Parameters";
import TableSamples from "./Table";
import { useState } from "react";
import ButtonGroup from "./ButtonGroup";

const DashboardModal = ({ classes, onClose, isShow, dataset, setDatasetInfo }) => {
  const [selectedParameters, setSelectedParameters] = useState();
  const [isTableView, setIsTableView] = useState(true);

  const toggleTableView = () => {
    setIsTableView(!isTableView);
  };

  return (
    <SNETDialog isDialogOpen={isShow} onDialogClose={onClose} showCloseButton={false}>
      <div className={classes.dasbordModalContainer}>
        <ImprovementParameters
          parameters={dataset?.additionalInfo?.analysis?.feature_groups}
          setSelectedParameters={setSelectedParameters}
        />
        <ButtonGroup
          dataset={dataset}
          selectedParameters={selectedParameters}
          isTableView={isTableView}
          toggleTableView={toggleTableView}
          setDataset={setDatasetInfo}
        />
        {isTableView && dataset?.additionalInfo?.dataset_sample && (
          <TableSamples tableData={dataset?.additionalInfo?.dataset_sample} />
        )}
        <Graphs graphs={dataset?.additionalInfo?.analysis?.graphs} />
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(DashboardModal);
