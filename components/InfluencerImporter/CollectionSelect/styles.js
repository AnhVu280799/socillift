export default theme => ({
  root: {
    marginTop: theme.spacing.unit * 13
  },
  title: {
    color: "#3C4859",
    fontSize: "2em",
    fontWeight: "bold",
    lineHeight: "33px",
    margin: "0 0 22px 6px"
  },
  inline: {
    display: "flex",
    flexFlow: "row wrap",
    "& > button:last-child": {
      marginLeft: "auto"
    }
  },
  firstBlock: {
    margin: "14px 0",
    alignItems: "flex-end"
  },
  buttonIcon: {
    width: "21px",
    height: "21px",
    marginRight: "4px"
  },
  selectWrapper: {
    position: "relative"
  },
  loading: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "26px 26px 0 0"
  },
  loadingIcon: {
    top: "unset",
    left: "unset",
    position: "unset"
  }
});
