export const useStyles = (theme) => {
  return {
    good: {
      color: theme.palette.success.main,
    },
    bad: {
      color: theme.palette.error.main,
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
  };
};
