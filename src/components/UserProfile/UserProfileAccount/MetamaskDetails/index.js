import { Fragment } from "react";
import MetamaskDetails from "./MetamaskDetails";
import MPEActionTabs from "./MPEActionTabs";

const MetamaskAccount = ({ handleTitleChange }) => {
  return (
    <Fragment>
      <MetamaskDetails />
      <MPEActionTabs handleTitleChange={handleTitleChange} />
    </Fragment>
  );
};

export default MetamaskAccount;
