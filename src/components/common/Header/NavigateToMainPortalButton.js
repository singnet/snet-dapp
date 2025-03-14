import { isMainnet } from "../../../config/Networks";
import StyledButton from "../StyledButton";

const NavigateToMainPortalButton = () => {
  if (isMainnet(process.env.REACT_APP_ETH_NETWORK)) {
    return null;
  } else {
    return (
      <StyledButton
        type="whiteBorder"
        btnText="Marketplace Mainnet"
        href="https://beta.singularitynet.io/"
        newTab={true}
      />
    );
  }
};

export default NavigateToMainPortalButton;
