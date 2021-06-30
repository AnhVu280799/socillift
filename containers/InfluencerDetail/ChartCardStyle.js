export default theme => ({
  title: {
    ...theme.font.default,
    ...theme.font.heading5,
    textAlign: 'left',
    fontSize: '16px',
    color: theme.colors.baseGrey(1.0)
  },
  paperRoot: {
    padding: '16px',
    boxShadow: '0px -1px 4px 0 rgba(0, 0, 0, 0.14)',
    width: '100%',
    borderRadius: '3px'
  },
  chart: {
    width: '100%',
    height: '100%',
    marginTop: '13px'
  }
});
