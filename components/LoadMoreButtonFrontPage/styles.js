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
  },
  button: {
    fontSize: "14px",
    height: "40px",
    textAlign: "center",
    lineHeight: "1.5",
    textTransform: "none",
    padding: "7px 14px",
    borderRadius: "3px",
    border: `solid 1px ${theme.colors.greyLight()}`,
    backgroundColor: "#ffffff",
    "&:hover": {
      outline: "none",
      backgroundColor: "rgba(200, 200, 200, 0.2)",
      boxShadow: "none"
    },
    "&,&:hover,&:focus": {
      color: theme.colors.baseGrey(),
      boxShadow: "none"
    }
  }
});
