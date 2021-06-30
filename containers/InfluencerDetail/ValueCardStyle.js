export default theme => ({
  paperRoot: {
    width: '100%',
    height: '124px',
    borderRadius: '3px',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 40px 50px -40px rgba(0,0,0,.2)'
  },
  topCircle: {
    borderRadius: '50%',
    width: '195px',
    height: '195px',
    position: 'absolute',
    top: '-122px',
    right: '16px'
  },
  rightCircle: {
    borderRadius: '50%',
    width: '252px',
    height: '252px',
    position: 'absolute',
    right: '-126px',
    top: '-95px'
  },
  icon: {
    position: 'absolute',
    right: '0',
    bottom: '0'
  },
  value: {
    position: 'absolute',
    left: '0',
    bottom: '0'
  },
  title: {
    position: 'absolute',
    left: '0',
    top: '0'
  },
  bigFieldIcon: {
    fontSize: '67px',
    color: theme.colors.grey(1.0),
    marginLeft: '-5px'
  },
  toolTipIcon: {
    fontSize: '21px',
    color: theme.colors.grey(1.0),
    position: "absolute",
    right: "16px",
    top: "18px",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey(1.0)
    }
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    zIndex: "10000",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white()
  },
  lastTooltip: {
    left: "-29px"
  }
})
