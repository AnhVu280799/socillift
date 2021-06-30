export default theme => ({
  root: {
    padding: "0 32px 16px"
  },
  buttonBar: {
    display: "flex",
    flexFlow: "row wrap",
    marginTop: theme.spacing.unit * 2
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
    width: "150px",
    marginLeft: "auto"
  },
  formGroup: {
    padding: `${theme.spacing.unit}px 0`,
    width: "100%"
  },
  permissionsGroup: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  }
});
