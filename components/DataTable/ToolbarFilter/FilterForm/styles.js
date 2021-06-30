export default theme => ({
  root: {
    padding: "0 32px 16px"
  },
  fieldWrapper: {
    paddingBottom: "16px"
  },
  buttonGroup: {
    paddingTop: "16px"
  },
  buttonReset: {
    width: "100px"
  },
  buttonApply: {
    width: "100px",
    marginLeft: "auto"
  },
  fieldTitle: {
    marginBottom: "8px"
  },
  multiSelect__valueContainer: {
    height: "auto",
    "& > div": {
      padding: "unset !important",
      margin: "2px !important",
      "& > div": {
        fontSize: "inherit"
      }
    }
  },
  select__valueContainer: {
    height: "auto",
    "& > div": {
      padding: "unset !important",
      margin: "2px !important",
      "& > div": {
        fontSize: "inherit"
      }
    }
  }
});
