import { isMainnet } from "../../../config/Networks";
import StyledButton from "../StyledButton";

// Note: Buttons intentionally link to opposite marketplaces
const MARKETPLACE_LINKS = {
  TESTNET: {
    label: "Marketplace Mainnet",
    link: "https://marketplace.singularitynet.io/",
  },
  FET: {
    label: "AGIX Marketplace",
    link: "https://agix-marketplace.singularitynet.io/",
  },
  AGIX: {
    label: "FET Marketplace",
    link: "https://marketplace.singularitynet.io/",
  },
};

const CURRENT_NETWORK = process.env?.REACT_APP_ETH_NETWORK;
const CURRENT_TOKEN = process.env?.REACT_APP_TOKEN_NAME;

const NavigateToMainPortalButton = () => {
  if (!CURRENT_NETWORK || !CURRENT_TOKEN) {
    throw new Error("Network ID or Current Token wasn't provided");
  }

  const headerMarketplaceLink = isMainnet(CURRENT_NETWORK)
    ? MARKETPLACE_LINKS[CURRENT_TOKEN]
    : MARKETPLACE_LINKS.TESTNET;

  return (
    <StyledButton
      type="whiteBorder"
      btnText={headerMarketplaceLink.label}
      href={headerMarketplaceLink.link}
      newTab={true}
    />
  );
};

export default NavigateToMainPortalButton;
