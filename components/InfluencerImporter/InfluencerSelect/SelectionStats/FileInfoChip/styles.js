export default theme => ({
  root: {
    width: "100%",
    justifyContent: "unset",
    position: "relative"
  },
  icon: {
    position: "absolute",
    left: "12px"
  },
  label: {
    position: "absolute",
    left: "46px",
    padding: 0,
    maxWidth: "70%",
    overflow: "hidden"
  },
  deleteIcon: {
    position: "absolute",
    right: "5px"
  },
  valid: {
    color: "#00B04B",
    background: "#E5F7ED"
  },
  invalid: {
    color: "#C70E0E",
    background: "#FBE5E5"
  },
  errorIcon: {
    color: "inherit",
    opacity: 1,
    "&:hover": {
      color: "inherit",
      opacity: 0.6
    }
  }
});
