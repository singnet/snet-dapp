import SNETDialog from "../../../common/SNETDialog";

const DashboardModal = ({ onClose, isShow }) => {
  return (
    <SNETDialog isDialogOpen={isShow} onDialogClose={onClose} showCloseButton={false}>
      <h2>Quality check of the dataset</h2>
    </SNETDialog>
  );
};

export default DashboardModal;
