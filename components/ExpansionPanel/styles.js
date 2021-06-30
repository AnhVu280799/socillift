export default theme => ({
  root: {},
  titleWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer'
  },
  titleWrapperClose: {
    backgroundColor: '#ffffff'
  },
  title: {
    display: 'inline-block',
    fontSize: '14px',
    lineHeight: '14px',
    margin: '13px 0 13px 24px'
  },
  caret: {
    ...theme.caret.default,
    fontSize: '18px',
    color: theme.colors.baseGrey(),
    position: 'absolute',
    top: '11px',
    right: '17px'
  },
  caretActive: theme.caret.active,
  childContainer: {
    margin: '0',
    padding: '0 24px 24px 24px'
  },
  lineAfter: {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors.greyLightest()
    },
    '&:last-of-type': {
      '&:before': {
        height: '0'
      }
    }
  },
  container: {
    overflow: 'visible',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease'
  }
});
