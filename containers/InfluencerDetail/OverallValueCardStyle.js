export default theme => ({
  paperRoot: {
    width: '100%',
    height: '174px',
    borderRadius: '3px',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  containerFirstRow: {
    position: 'relative',
    padding: '20px 0 0 0'
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    position: 'absolute',
  },
  iconStyle: {
    fontSize: '48px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    position: 'absolute',
    opacity: '1.0 !important',
  },
  containerValue: {
    padding: '10px 0 0 0',
    "& .no-result": {
      fontSize: '18px',
      color:'#999999',
    }
  },
  valueStyle: {
    ...theme.font.default,
    fontSize: '36px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: theme.colors.baseGrey()
  },
  titleStyle: {
    ...theme.font.default,
    fontSize: '14px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: theme.colors.grey()
  },
  contentStyle: {
    ...theme.font.default,
    fontSize: '12px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: theme.colors.greyLight(),
    padding: '15px 10px 0 20px'
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white()
  },
})
