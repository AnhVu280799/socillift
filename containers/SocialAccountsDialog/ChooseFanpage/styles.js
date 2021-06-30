export default theme => ({
  root: {
    padding: "43px",
    lineHeight: "19px"
  },
  description: {
    "& span": {
      fontWeight: "bold"
    }
  },

  inputLabel: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "end",
    margin: "18px 0 5px 0",
    "& img": {
      height: "26px",
      margin: "0 5px 0 -5px"
    }
  },
  buttonBar: {
    marginTop: theme.spacing.unit * 10
  },
  buttonBack: {
    cursor: "pointer",
    alignSelf: "center",
    color: theme.colors.baseGrey,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  buttonConnect: {
    marginLeft: "auto"
  }
});
