export const useStyles = (theme) => {
  return {
    good: {
      color: theme.palette.success.main,
    },
    bad: {
      color: theme.palette.error.main,
    },
    iframeWrapper: {
      position: "relative",
    },
    serviceIframe: {
      "--sanbox-border-color": theme.palette.error.light,
      boxSizing: "border-box",
      width: "100%",
      display: "flex",
      border: "20px solid transparent",
      borderImage: `repeating-linear-gradient(
          45deg,
          var(--sanbox-border-color),
          var(--sanbox-border-color) 20px,
          transparent 20px,
          transparent 40px
        )
        20`,
    },
    serviceLoadingProgress: {
      position: "absolute",
      width: "100%",
      height: "100%",
      inset: "0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
};
