export const useStyles = (theme) => ({
  dasbordModalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  parameters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 25,
  },
  improveButtonContainer: {
    textAlign: "right",
  },

  // PARAMETER CARD
  parameterContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 4,
    border: `1px solid ${theme.palette.text.verticalTabLeftBorder}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
  checkbox: {
    "& .Mui-checked": { color: "black" },
    "& .MuiFormControlLabel-label": {
      fontSize: 17,
      fontWeight: 700,
      color: "black",
    },
  },
  improvementRaw: {
    display: "flex",
    gap: 6,
    whiteSpace: "nowrap",
  },
  improvementValue: {
    fontWeight: 700,
    background: "linear-gradient(90deg, #8279FE 0%, #449CEE 100%)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  listOfImprovementsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  status: {
    color: "#449CEE",
    textAlign: "right",
    fontSize: 14,
    fontWeight: 700,
  },
});
