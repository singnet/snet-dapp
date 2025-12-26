import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import { CircularProgress } from "@mui/material";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";

function ServiceLoadingProgress({ classes, serviceName }) {
  return (
    <div className={classes.serviceLoadingProgress}>
      <CircularProgress />
      <span>{LoaderContent.SERVICE_LOADING(serviceName).loaderHeader}</span>
    </div>
  );
}
export default withStyles(useStyles)(ServiceLoadingProgress);
