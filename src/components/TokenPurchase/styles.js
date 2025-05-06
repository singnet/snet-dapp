export const useStyles = (theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "1rem",
    height: "calc(100vh - 6rem)",
    img: {
      width: "100%",
    },
  },
  buyToken: {
    background: "var(--color-gray)",
    borderRadius: "var(--border-radius)",
    padding: "1rem",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    fontWeight: 400,
    margin: "0",
    marginBottom: "2rem",
  },
  thumbnail: {
    display: "inline-flex",
    alignItems: "flex-start",
    borderRadius: "10px",
    overflow: "hidden",
  },
});
