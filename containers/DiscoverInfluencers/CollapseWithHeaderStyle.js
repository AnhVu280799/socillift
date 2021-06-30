export default theme => ({
  titleWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    width: "100%"
  },
  titleWrapperClose: {
    backgroundColor: "#ffffff"
  },
  title: {
    ...theme.font.default,
    display: "inline-block",
    fontSize: "14px",
    lineHeight: "19px",
    color: "#394878",
    lineHeight: "14px",
    textAlign: "left",
    padding: "16px 0",
    width: "100%"
  },
  caret: {
    ...theme.caret.default,
    fontSize: "22px",
    color: "#626262",
    position: "absolute",
    top: "10px",
    left: "250px"
  },
  caretActive: theme.caret.active,
  childContainer: {
    margin: "0",
    padding: "0"
  },
  lineAfter: {
    position: "relative",
    width: "100%",
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      width: "100%",
      backgroundColor: theme.colors.greyLightest()
    },
    "&:last-of-type": {
      "&:before": {
        height: "0"
      }
    }
  },
  container: {
    overflow: "visible",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease"
  }
});