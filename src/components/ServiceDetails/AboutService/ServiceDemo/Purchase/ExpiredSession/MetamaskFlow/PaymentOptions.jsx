import { withStyles } from "@mui/styles";
import { useStyles } from "./style";
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react";
import ChannelSelectionBox from "../../ChannelSelectionBox";
import { payTypes } from "./metadata";
import { formatValue, isValidCallsNumber } from "./helpers";
import PropTypes from "prop-types";

const PaymentOptions = ({classes, servicePrice, noOfServiceCalls, mpeBalance, totalPrice, selectedPayType, channelBalance, setSelectedPayType, setNoOfServiceCalls}) => {
    const [disabledPayTypes, setDisabledPayTypes] = useState([]);
    const paymentOptions = useMemo(() => ({
      [payTypes.SINGLE_CALL]: {
        type: payTypes.SINGLE_CALL,
        title: "Single Call",
        description: "Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance.",
        disabled: disabledPayTypes.includes(payTypes.SINGLE_CALL)
      },
      [payTypes.MULTIPLE_CALLS]: {
        type: payTypes.MULTIPLE_CALLS,
        title: "Multiple Calls",
        description: "Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost.",
        disabled: disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)
      }
    }), [disabledPayTypes]);

      useEffect(() => {
        const pushTypeToDisable = (disabledPayTypes, type) => {
          !disabledPayTypes.includes(type) && disabledPayTypes.push(type);
        }
    
        const handleDisabledPaytypes = () => {
          const disabledPayTypes = [];
    
          if (channelBalance <= 0) {
            pushTypeToDisable(disabledPayTypes, payTypes.CHANNEL_BALANCE)
          }
          if (mpeBalance <= 0) {
            pushTypeToDisable(disabledPayTypes, payTypes.SINGLE_CALL);
            pushTypeToDisable(disabledPayTypes, payTypes.MULTIPLE_CALLS);
          }
          setDisabledPayTypes(disabledPayTypes);
        };
    
        handleDisabledPaytypes();
      }, [channelBalance, mpeBalance]);

      const handlePayTypeChange = useCallback((value) => {
        if (disabledPayTypes.includes(value) || selectedPayType === value) {
          return;
        }
        if (selectedPayType === payTypes.SINGLE_CALL) {
            setNoOfServiceCalls(1);
        }
        setSelectedPayType(value);
      }, [disabledPayTypes, selectedPayType]);
    
      const handleNoOfCallsChange = useCallback((event) => {
        let noOfServiceCalls = event.target.value;
        if (!noOfServiceCalls) {
          noOfServiceCalls = 0;
        }
        noOfServiceCalls = formatValue(noOfServiceCalls);
        setNoOfServiceCalls(noOfServiceCalls);
        if (!isValidCallsNumber(noOfServiceCalls)) {
          return;
        }
        
      }, []);

    return (
        <Fragment>
        <ChannelSelectionBox
          title={paymentOptions[payTypes.SINGLE_CALL].title}
          description={paymentOptions[payTypes.SINGLE_CALL].description}
          checked={selectedPayType === payTypes.SINGLE_CALL}
          value={payTypes.SINGLE_CALL}
          onClick={() => handlePayTypeChange(payTypes.SINGLE_CALL)}
          inputProps={{
            totalPrice: servicePrice,
            unit: process.env.REACT_APP_TOKEN_NAME,
            noInput: true,
          }}
          disabled={paymentOptions[payTypes.SINGLE_CALL].disabled}
        />
        <div className={classes.bestValueContainer}>
          <div className={classes.channelSelectionTitle}>Best Value</div>
          <ChannelSelectionBox
            title={paymentOptions[payTypes.MULTIPLE_CALLS].title}
            description={paymentOptions[payTypes.MULTIPLE_CALLS].description}
            checked={selectedPayType === payTypes.MULTIPLE_CALLS}
            value={payTypes.MULTIPLE_CALLS}
            onClick={() => handlePayTypeChange(payTypes.MULTIPLE_CALLS)}
            inputProps={{
              noOfServiceCalls,
              onChange: handleNoOfCallsChange,
              totalPrice,
              unit: process.env.REACT_APP_TOKEN_NAME,
            }}
            disabled={paymentOptions[payTypes.MULTIPLE_CALLS].disabled}
          />
        </div>
        </Fragment>
    )
}

export default memo(withStyles(useStyles)(PaymentOptions));

PaymentOptions.propTypes = {
    classes: PropTypes.object.isRequired,
    setNoOfServiceCalls: PropTypes.func.isRequired,
    setSelectedPayType: PropTypes.func.isRequired,
    noOfServiceCalls: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    mpeBalance: PropTypes.string.isRequired,
    servicePrice: PropTypes.string.isRequired,
    channelBalance: PropTypes.string.isRequired,
    selectedPayType: PropTypes.oneOf(Object.keys(payTypes)).isRequired
};