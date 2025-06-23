import { Fragment, memo, useState } from "react";
import PurchaseDialog from "../../PurchaseDialog";
import PropTypes from "prop-types";

const { default: StyledButton } = require("../../../../../../common/StyledButton")

const DepositButton = ({isHighlight = false}) => {
const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
    return (
        <Fragment>
            <PurchaseDialog show={showPurchaseDialog} onClose={() => setShowPurchaseDialog(false)} />
            <StyledButton
            type={ isHighlight ? "blue" : "transparent"}
            btnText="Deposit into Escrow"
            onClick={() => setShowPurchaseDialog(true)}
            />
        </Fragment>
    )
}

export default memo(DepositButton);

DepositButton.propTypes = {
  isHighlight: PropTypes.bool
};