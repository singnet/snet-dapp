import { createMuiTheme } from "@material-ui/core/styles";

const customBlue = "#4086ff";

const purple = "#220D3A";

const customGray1 = "#9b9b9b";
const gray2 = "rgba(0,0,0,0.6)";
const gray3 = "#616161";
const gray4 = "#666";
const gray5 = "#f5f7f8";
const gray6 = "#B00020";
const gray7 = "#4a4a4a";
const gray8 = "#fafafa";
const gray9 = "#0000000a";
const gray10 = "#444";
const gray11 = "#ccc";
const gray12 = "#d6d6d6";

const whiteColor = "#fff";
const offWhite = "rgba(255,255,255,.60)";

const disabledBgColor = "#e6e6e6";
const disabledTxtColor = "#bcbcbc";

const errorBgColor = "rgba(208,2,27,0.2)";
const githubBlack = "#333";
const black1 = "rgba(0,0,0,.87)";
const green = "#00C48C";

const darkOrange = "#AC5C2C";

const orange = "#F29132";
const orange1 = "#FFF8E7";

const aqua = "#00C48C";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: customBlue,
      secondary: customGray1,
      white: whiteColor,
      disabled: disabledTxtColor,
      black1: black1,
      gray2: gray2,
      gray3: gray3,
      gray4: gray4,
      gray5: gray5,
      gray6: gray6,
      gray7: gray7,
      gray8: gray8,
      gray9: gray9,
      gray10: gray10,
      gray11: gray11,
      gray12: gray12,
      offWhite: offWhite,
      green: green,
      purple: purple,
      darkOrange: darkOrange,
      orange: orange,
      orange1: orange1,
      aqua: aqua
    }
  },
  typography: {
    primary: {
      main: ["OpenSans"]
    },
    secondary: {
      main: ["Raleway"]
    },
    tertiary: {
      main: ["Roboto"]
    },
    fontweight: 600
  },
  backgroundColor: {
    blue: customBlue,
    disabled: disabledBgColor,
    red: errorBgColor,
    white: whiteColor,
    githubBlack: githubBlack
  }
});

export default theme;
