export default theme => ({
  root: {
    margin: "0px 8px 4px 0",
    float: "left",
    backgroundColor: "#ffffff",
    color: "rgba(60,72,88,1)",
    "&:hover": {
      backgroundColor: theme.colors.grey(),
      color: theme.colors.white()
    }
  },
  label: {
    fontSize: "14px",
    maxWidth: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline-block"
  },
  clearAll: {
    margin: "0px 8px 4px 0",
    float: "left",
    color: "rgb(153,153,153)",
    backgroundColor: theme.colors.bgPage(),
    "&:hover": {
      backgroundColor: theme.colors.grey()
    }
  },
  deleteIcon: {
    fontSize: "14px",
    color: "inherit",
    margin: "0 8px 0 -4px",
    "&:hover": {
      color: "inherit"
    }
  }
});
