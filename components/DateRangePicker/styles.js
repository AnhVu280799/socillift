export default theme => ({
  popoverRoot: {
    [theme.breakpoints.down("sm")]: {
      "& .rdrDefinedRangesWrapper": {
        display: "none"
      }
    }
  },
  buttonGroup: {
    textAlign: "right"
  },
  btnError: {
    color: "red"
  },
  root: {
    width: "100%"
  },
  dateInputWrapper: {
    margin: 0,
    padding: "20px 0 5px 0",
    listStyleType: "none",
    display: "flex",
    "& li": {
      width: "50%",
      padding: "0 20px"
    }
  }
});
