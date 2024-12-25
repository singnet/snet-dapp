export const useStyles = (theme) => ({
  parametersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 35,
  },
  parameters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 25,
  },
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
      whiteSpace: "nowrap",
    },
  },
  improvementRaw: {
    display: "flex",
    gap: 6,
    whiteSpace: "nowrap",
  },
  issuesText: {
    color: "#222",
  },
  improvementValue: {
    fontWeight: 700,
  },
  listOfImprovementsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  status: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: 700,
  },
  Low: {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.35) 0%, rgba(208, 109, 106, 0.35) 100%)",
    color: "#D06D6A",
  },
  Middle: {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, rgba(233, 170, 52, 0.25) 100%)",
    color: "#E9AA34",
  },
  High: {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, rgba(68, 156, 238, 0.25) 100%)",
    color: "#449CEE",
  },
  Perfect: {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.35) 0%, rgba(166, 47, 235, 0.35) 100%)",
    color: "#A62FEB",
  },
});
