export default theme => ({
  paperSize: {
    width: '100%',
    height: '100%',
    borderRadius: '3px'
  },
  valueContainer: {
    height: '100%',
    "& .no-result": {
      color:'#999999',
      fontSize: '14px',
    }
  },
  iconContainer: {
    padding: '0 22px',
    backgroundColor: theme.colors.primary(0.1)
  },
  iconDesign: {
    fontSize: '60px',
    color: theme.colors.primary()
  },
  contentSize: {
    padding: '16px',
    position: 'relative'
  },
  titleSize: {
    ...theme.font.default,
    textAlign: 'left',
    fontSize: '14px',
    color: theme.colors.grey(),
    // textTransform: 'uppercase',
  },
  valueSize: {
    ...theme.font.default,
    fontSize: '40px',
    color: theme.colors.baseGrey(),
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
  lastTooltip: {
    left: "-29px"
  },
  toolTipIcon: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: "absolute",
    right: "10px",
    bottom: "10px",
    zIndex: "10000",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey()
    }
  },
})
