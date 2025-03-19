export const useStyles = (theme) => ({
  datasetUploader: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  examplesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  exampleDataset: {
    display: "flex",
    padding: "8px 12px",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    borderRadius: 8,
    background: theme.palette.text.gray,
    cursor: "pointer",
  },
});
