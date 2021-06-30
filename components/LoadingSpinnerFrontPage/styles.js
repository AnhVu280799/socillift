export default theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    "&:before, &:after": {
      content: '""',
      height: "1px",
      flex: 1,
      backgroundColor: theme.colors.greyLighter()
    },
    "&:before": {
      marginRight: "20px"
    },
    "&:after": {
      marginLeft: "20px"
    }
  }
});
