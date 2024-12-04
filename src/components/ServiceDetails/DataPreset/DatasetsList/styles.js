export const useStyles = (theme) => ({
  datasetsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  datasetLine: {
    boxSizing: "border-box",
    display: "flex",
    padding: "8px 12px",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    borderRadius: 8,
    background: theme.palette.text.gray,
    cursor: "pointer",
  },
  datasetName: {
    whiteSpace: "wrap",
    textOverflow: "ellipsis",
    width: "100%",
    overflow: "hidden",
  },
  datasetTag: {
    padding: 5,
    borderRadius: 6,
    fontWeight: 400,
    color: theme.palette.text.white,
    background: "linear-gradient(90deg, #4A3FEB 0%, #44D5EE 100%)",
  },
});
