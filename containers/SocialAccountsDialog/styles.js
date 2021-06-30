export default theme => ({
  titleDialog: {
    padding: "0px",
    position: "relative",
    backgroundColor: theme.colors.greyLightest(),
    borderBottom: "1px solid rgba(0,0,0,.1)"
  },
  title: {
    ...theme.font.default,
    ...theme.font.bold,
    textTransform: "uppercase",
    color: theme.colors.baseGrey(),
    fontSize: "16px",
    minHeight: "56px",
    padding: "16px",
    margin: "0px"
  },
  paper: {
    width: "100%",
    borderRadius: "6px",
    zIndex: "10"
  },
  container: {
    backgroundColor: theme.colors.black(0.6)
  },
  closeRight: {
    padding: "0px",
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "56px",
    height: "56px"
  },
  contentDialog: {
    padding: "24px",
    overflowX: "hidden"
  }
});
