export default theme => ({
  tabsIndicator: {
    height: "0"
  },
  tabLabelContainer: {
    padding: "15px"
  },
  tabsRoot: {
    margin: "16px 0 16px -8px"
  },
  tabRoot: {
    minWidth: "0",
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontSize: "14px",
    lineHeight: "14px",
    marginLeft: "8px",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.08)"
    }
  },
  selectedTab: {
    backgroundColor: theme.colors.primary(1.0),
    color: "#ffffff",
    boxShadow: `0px 3px 8px 0 ${theme.colors.primary(0.4)}`,
    "&:hover": {
      color: "#ffffff",
      opacity: "1.0",
      backgroundColor: theme.colors.primary(1.0)
    }
  }
});
