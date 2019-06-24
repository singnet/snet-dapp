import { createMuiTheme } from "@material-ui/core/styles";

const customBlue = "#4086ff";

const purple = "#220D3A";

const darkShadedGray = "#212121";
const mediumShadeGray = "#666";
const lightShadedGray = "#9b9b9b";

const gray = "rgba(0,0,0,0.04)";

const whiteColor = "#fff";
const offWhiteColor = "#fAFAFA";
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
            white: whiteColor,
            disabled: disabledTxtColor,
            black1: black1,
            darkShadedGray: darkShadedGray,
            mediumShadeGray: mediumShadeGray,
            lightShadedGray: lightShadedGray,
            offWhiteColor: offWhiteColor,
            offWhite: offWhite,
            green: green,
            purple: purple,
            darkOrange: darkOrange,
            orange: orange,
            orange1: orange1,
            aqua: aqua,
            gray: gray,
        },
    },
    typography: {
        primary: {
            main: ["OpenSans"],
        },
        secondary: {
            main: ["Raleway"],
        },
        tertiary: {
            main: ["Roboto"],
        },
        fontweight: 600,
    },
    backgroundColor: {
        blue: customBlue,
        disabled: disabledBgColor,
        red: errorBgColor,
        white: whiteColor,
        githubBlack: githubBlack,
    },
});

export default theme;
