export default theme => ({
  root: {
    padding: "16px 64px 64px"
  },
  closeButtonWrapper: {
    display: "flex",
    justifyContent: "end"
  },
  buttonGroup: {
    padding: 0,
    margin: "16px 0",
    listStyleType: "none",
    "& li": {
      display: "inline-block",
      marginRight: theme.spacing.unit
    }
  },
  buttonCancel: { color: "red", borderColor: "red" },
  buttonSave: {},
  fieldTitle: {
    marginBottom: "8px"
  },
  formWrapper: {},
  hidden: {
    visibility: "hidden"
  }
});
