export default theme => ({
  root: {
    textAlign: 'center',
    width: '100%',
    maxHeight: '64px',
    overflow: 'hidden',
    position: 'relative',
    padding: '16px 0 12px 0'
  },
  line: {
    backgroundColor: theme.colors.greyLight(0.4),
    minHeight: '1px',
    width: '100%'
  }
});
