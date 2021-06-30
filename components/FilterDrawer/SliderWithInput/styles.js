export default theme => ({
  root: {},
  slider: {
    "& .noUi-connect": {
      background: theme.colors.primary()
    },
    "& .noUi-handle": {
      background: theme.colors.primary(),
      width: "14px",
      height: "14px",
      boxShadow: `0px 2px 2px 0 ${theme.colors.primary(0.3)}`,
      border: "none"
    }
  },
  sliderValue: {
    width: "88px",
    "&:last-of-type": {
      float: "right"
    },
    fontSize: "13px"
  }
});
