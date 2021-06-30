export default theme => ({
  paperRoot: {
    borderRadius: '6px',
    boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
    backgroundColor: '#ffffff',
    width: '100%',
    margin: '32px 0 16px 0',
    overflow: 'unset',
    paddingBottom: '39px'
  },
  avgInfScoreTitle: {
    ...theme.font.default,
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  avgInfScoreValue: {
    ...theme.font.default,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 48,
    textAlign: 'right'
  },
  avgInfScore: {
    backgroundColor: theme.colors.primary(1.0),
    padding: '24px'
  },
  bigField: {
    backgroundColor: theme.colors.greyLight(0.2),
    padding: '24px 16px',
    position: 'relative',
    '&:after': {
      position: 'absolute',
      backgroundColor: theme.colors.greyLight(0.5),
      height: 'calc(100% - 48px)',
      width: '1px',
      content: '""',
      right: 0,
      top: 24
    },
    '&:last-of-type': {
      '&:after': {
        width: '0'
      }
    }
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
    bottom: "25px",
    '&:hover': {
      color: theme.colors.baseGrey(1.0)
    }
  },
  toolTipIconTableHeader: {
    fontSize: '21px',
    color: theme.colors.grey(1.0),
    position: "absolute",
    top: "0px",
    marginLeft: "10px",
    '&:hover': {
      color: theme.colors.baseGrey(1.0)
    }
  },
  tooltipHolder: {
    position: 'relative'
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(), boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    textTransform: "none !important",
    fontWeight: "normal !important",
    color: theme.colors.white(),
  },
  lastTooltip: {
    left: "-29px"
  },
  bigFieldTitle: {
    ...theme.font.default,
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  bigFieldValue: {
    ...theme.font.default,
    fontSize: 36,
    lineHeight: '1em',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  star: {
    fontSize: 18,
    marginLeft: '-6px',
    marginBottom: '-18px'
  },
  starUnchecked: {
    color: theme.colors.greyLight(1.0)
  },
  bigFieldContainer: {
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    width: '100%'
  },
  title: {
    ...theme.font.default,
    fontSize: 16,
    padding: '15.5px 17px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
  },
  tableTitle: {
    ...theme.font.default,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: theme.colors.grey(1.0),
    textTransform: 'uppercase',
    padding: '10px 0',
    textAlign: 'left',
    '&:first-of-type': {
      paddingLeft: '16px'
    },
    backgroundColor: theme.colors.greyLight(0.2),
    [theme.breakpoints.down('md')]: {
      padding: '8px 16px',
      backgroundColor: theme.colors.greyLight(0.2),
    },
  },
  catName: {
    ...theme.font.default,
    fontWeight: 'bold',
    paddingLeft: '16px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 16px 8px 16px',
    },
  },
  scoreBar: {
    height: '32px',
    position: 'relative',
    padding: '8px 0 8px 0',
    margin: '7px 0',
  },
  score: {
    ...theme.font.default,
    fontSize: 18,
    position: 'absolute',
    left: '100%',
    paddingLeft: '8px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  categoryRow: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 17,
      height: '1px',
      width: 'calc(100% - 34px)',
      content: '""',
      backgroundColor: 'rgba(0,0,0,0.06)'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 32px 0',
    },
  },
  catInfScore: {
    '& $scoreBar': {
      backgroundColor: theme.colors.primary(1.0),
      fontWeight: 'bold'
    },
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
    },
  },
  catOtherScore: {
    '& $scoreBar': {
      backgroundColor: theme.colors.baseGrey(0.5)
    },
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
    },
  },
  headerWrapper: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 24px 0',
    },
  }
})
