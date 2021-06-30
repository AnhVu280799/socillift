export default theme => ({
  root: {
    padding: "0 32px",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  preWrapper: {
    whiteSpace: "pre-wrap",
    overflow: "auto"
  }
});
