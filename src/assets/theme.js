import { createMuiTheme } from "@material-ui/core/styles";

const customPrimaryBlue = "#4086ff";
const customSecodaryTextColor = "#9b9b9b";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: customPrimaryBlue
    },
    secondary: {
      main: customSecodaryTextColor
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
    }
  }
});

export default theme;
