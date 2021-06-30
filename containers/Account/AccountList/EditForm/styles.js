export default theme => ({
  root: {
    padding: "0 32px 16px"
  },
  buttonGroup: {
    paddingTop: "16px"
  },
  buttonBack: {
    alignSelf: "center",
    cursor: "pointer",
    color: "rgba(153, 153, 153, 1)",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  buttonSave: {
    width: "100px",
    marginLeft: "auto"
  },
  formGroup: {
    padding: `${theme.spacing.unit}px 0`
  },
  typingSelectLabel: {
    color: theme.colors.grey(),
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "20px"
  }
});
