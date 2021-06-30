export default theme => ({
  underline: {
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary()}`
    },
    "&:after,&:before": {
      bottom: "0"
    }
  },
  input: {
    textAlign: "center",
    padding: "0",
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    },
    "-moz-appearance": "textfield",
    lineHeight: "1em",
    height: "32px"
  }
});
