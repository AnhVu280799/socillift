export default theme => ({
  root: {
    padding: "0 32px",
    marginBottom: "32px"
  },
  content: {},
  actionsGroup: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    "& li": {
      display: "inline-block"
    }
  },
  buttonEdit: {
    color: theme.colors.info()
  },
  buttonDelete: {
    color: theme.colors.danger()
  },
  buttonAdd: {
    fontWeight: "bold",
    marginLeft: "12px",
    textTransform: "uppercase"
  },
  iconButtonAdd: {
    width: "21px",
    height: "21px",
    marginRight: "4px"
  },
  searchBarRoot: {
    width: "350px",
    marginRight: "12px"
  }
});
