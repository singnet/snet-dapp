import { Fragment } from "react";
import MetamaskDetails from "./MetamaskDetails";
import MPEActionTabs from "./MPEActionTabs";

const MetamaskAccount = () => {
  return (
    <Fragment>
      <MetamaskDetails />
      <MPEActionTabs />
    </Fragment>
  );
};

export default MetamaskAccount;
