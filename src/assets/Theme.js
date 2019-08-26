import { createMuiTheme } from "@material-ui/core/styles";

const customBlue = "#4086ff";
const customHoverBlue = "#005ACB";

const transBlueBorderTextHover = "#005ACB";
const transBlueBorderBgHover = "rgba(0,90,203,0.05)";

const alertBoxColor = "rgba(0,0,0,0.6)";
const alertBoxBorder = "#E67381";
const alertBoxBackgroundColor = "#FDE5E8";

const warningBoxBg = "#FDF3E5";
const warningBoxBorder = "#F18D5A";

const infoBoxBg = "#DEEAFF";
const infoBoxLink = "#067AD7";

const userProfileIconColor = "#757575";

const purple = "#220D3A";

const darkShadedGray = "#212121";
const mediumShadeGray = "#666";
const lightShadedGray = "#9b9b9b";
const grayTitleText = "#4a4a4a";

const succesBoxBg = "#E7FFF8";
const successBoxBorder = "#00C48C";

const lightGray = "#D6D6D6";
const disabledBtnBg = "#ccc";

const gray = "rgba(0,0,0,0.04)";
const gray1 = "#F5F7F8";
const cardBackground = "#f8f8f8";
const iconColor = "#AAAEB3";
const cardSeparator = "#e5e5e5";

const whiteColor = "#fff";
const offWhiteColor = "#fAFAFA";
const offWhite = "rgba(255,255,255,.60)";

const errorBgColor = "rgba(208,2,27,0.2)";
const githubBlack = "#333";
const black1 = "rgba(0,0,0,.87)";
const green = "#00C48C";

const footerBgColor = "#211D24";
const darkOrange = "#AC5C2C";

const orange = "#F29132";
const orange1 = "#FFF8E7";
const RatingStarColor = "#FFC000";

const aqua = "#00C48C";

const errorRed = "#B00020";
const redBtnText = "#D0021B";
const redBtnBg = "#E67381";

const verticalTabLeftBorder = "#e2e2e2";

const inputBoxBorder = "#979797";

const dialogTitle = "rgba(0,0,0,0.87)";

const outlinedBtnHoverBg = "rgba(241,241,241,0.15)";

const h2 = { size: 32, color: darkShadedGray };

const offlineRed = "#EF5265";
const offlineRedBg = "rgba(239,82,101,0.15)";

const informationBarBg = "#2196F3";

const infoBg = "#DEEAFF";

const warningBg = "#FDF3E5";
const warningBorder = "#F18D5A";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: customBlue,
      white: whiteColor,
      customHoverBlue,
      disabledBtnBg,
      black1,
      darkShadedGray,
      mediumShadeGray,
      lightShadedGray,
      offWhiteColor,
      offWhite,
      green,
      purple,
      darkOrange,
      orange,
      orange1,
      aqua,
      lightGray,
      gray,
      gray1,
      cardBackground,
      iconColor,
      errorRed,
      RatingStarColor,
      offlineRed,
      successBoxBorder,
      grayTitleText,
      redBtnText,
      transBlueBorderTextHover,
      transBlueBorderBgHover,
      cardSeparator,
      userProfileIconColor,
      alertBoxBorder,
      alertBoxColor,
      alertBoxBackgroundColor,
      infoBg,
      warningBg,
      warningBorder,
      verticalTabLeftBorder,
      redBtnBg,
      warningBoxBorder,
      warningBoxBg,
      infoBoxBg,
      infoBoxLink,
      inputBoxBorder,
      dialogTitle,
      outlinedBtnHoverBg,
      informationBarBg,
    },
  },
  backgroundColor: {
    blue: customBlue,
    red: errorBgColor,
    white: whiteColor,
    githubBlack,
    offlineRedBg,
    footerBgColor,
    succesBoxBg,
  },
  font: {
    h2,
  },
  typography: {
    primary: {
      main: "Muli, sans-serif",
    },
  },
});

export default theme;
