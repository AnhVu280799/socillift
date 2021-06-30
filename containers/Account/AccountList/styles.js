export default theme => ({
  root: {
    padding: "0 32px",
    marginBottom: "32px",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  actionsGroup: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    "& li": {
      display: "inline-block"
    }
  },
  searchBarRoot: {
    width: "350px",
    marginRight: "12px"
  },
  buttonAdd: {
    fontWeight: "bold",
    marginLeft: "12px",
    textTransform: "uppercase"
  },
  buttonEdit: {
    color: theme.colors.info()
  },
  buttonDelete: {
    color: theme.colors.danger()
  },
  columnName: {
    display: "flex",
    flexFlow: "row wrap"
  },
  iconActive: {
    color: theme.colors.info(),
    marginRight: theme.spacing.unit
  },
  iconInactive: {
    color: theme.colors.danger(),
    marginRight: theme.spacing.unit
  },
  iconButtonAdd: {
    width: "21px",
    height: "21px",
    marginRight: "4px"
  }
});
