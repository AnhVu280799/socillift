export default theme => ({
  firstRow: {
    marginTop: '-4px',
    marginBottom: '4px'
  },
  otherRow: {
    marginTop: '16px',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
      marginTop: '0px',
    },
  },
  valueInCard: {
    ...theme.font.default,
    fontSize: '48px',
    marginLeft: '16px',
    // marginBottom: '4px',
    color: 'inherit'
  },
  titleInCard: {
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontSize: '13px',
    lineHeight: '13px',
    marginLeft: '16px',
    marginTop: '16px',
    textTransform: 'uppercase'
  },
  sizeChipRoot: {
    ...theme.font.default,
    color: '#ffffff',
    fontSize: '12px',
    lineHeight: '24px',
    padding: '0 10px',
    marginTop: '-4.5px',
    margin: '0',
    marginLeft: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    height: '24px'
  },
  sizeChipLabel: {
    padding: '0'
  },
  barChart: {
    height: '190px'
  },
  barValue: {
    ...theme.font.default,
    fontSize: 12,
    lineHeight: '16px',
    fill: theme.colors.grey(1.0)
  },
  barChartLabel: {
    ...theme.font.default,
    ...theme.font.heading6,
    justifyContent: 'flex-start !important',
    textAlign: 'left !important',
    lineHeight: '16px'
  },
  barChartBar: {
    strokeWidth: 16,
  },
  barValueLabel: {
    ...theme.font.default,
    textAlign: 'center !important',
    justifyContent: 'center !important',
    marginLeft: '-50%',
    fontSize: '11px',
    lineHeight: '20px',
    color: theme.colors.greyLight(1.0)
  },
  barChartBlue: {
    stroke: theme.colors.chartBlue(1.0)
  },
  barChartPurple: {
    stroke: theme.colors.chartPurple(1.0)
  },
  genderLine: {
    borderTop: `1px solid ${theme.colors.greyLighter(1.0)}`,
    padding: '16px 0 15px 0'
  },
  genderLineTitle: {
    ...theme.font.default,
    fontSize: 18
  },
  genderLineValue: {
    ...theme.font.default,
    fontSize: 32
  },
  Female1: {
    fill: '#e91e62'
  },
  Female2: {
    fill: '#fde8ef'
  },
  Male1: {
    fill: theme.colors.chartPurple(1.0)
  },
  Male2: {
    fill: '#f5eaf7'
  },
  chartBar:{
    overflow: 'visible'
  },
  pieChartColorWithGap: {
    '&:nth-child(1)': {
      fill: theme.colors.chartRed()
    },
    '&:nth-child(2)': {
      fill: theme.colors.chartOrange()
    },
    '&:nth-child(3)': {
      fill: theme.colors.chartBlue()
    },
    '&:nth-child(4)': {
      fill: theme.colors.success()
    },
    '&:nth-child(5)': {
      fill: theme.colors.chartPurple()
    },
    '&:nth-child(6)': {
      fill: theme.colors.chartDarkBlue()
    },
    stroke: '#fff',
    strokeWidth: '4px'
  },
  xlabel: {
    transform: 'rotate(-45deg)',
    marginTop: '3px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
      transform: 'rotate(60deg)',
    },
  },
  pieChartLabel: {
    ...theme.font.default,
    fontSize: 13,
    fill: '#ffffff'
  },
  fitContent: {
    minWidth: 'fit-content',
    minHeight: 'fit-content'
  },
  dot: {
    width: 12,
    height: 12,
    marginRight: '4px'
  },
  pieChartLegend: {
    ...theme.font.default,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '13px 0 3px 0'
  },
  verticalValue: {
    alignItems: 'center',
    marginTop: '50%',
    marginBottom: '0'
  },
  lineChartLabel: {
    ...theme.font.default,
    fontSize: 12,
    color: theme.colors.grey(1.0)
  },
  lineArea: {
    fill: '#b4e3f4 !important',
    fillOpacity: '0.3 !important'
  },
  line: {
    stroke: theme.colors.primary(1.0) + ' !important',
    strokeWidth: '2px'
  },
  point: {
    fill: theme.colors.chartBlue(1.0) + ' !important',
    '&:hover': {
      stroke: 'rgb(255, 255, 255)',
      strokeWidth: '3px',
      fill: 'rgb(0, 150, 255) !important'
    },
    [theme.breakpoints.down('md')]: {
      height: '5px',
      r: '4',
    },
  },
  pointTooltip: {
    ...theme.font.default,
    fontSize: 13,
    lineHeight: '20px',
    color: '#fff',
    borderRadius: '12px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '24px',
    padding: '2px 10px 2px 10px',
    '&:before': {
      content: 'unset'
    }
  },
  totalFollower: {
    maxWidth: "50%",
    width: "auto",
    flex: "1",
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      flex: 'none',
      width: '100%'
    },
  },
  followerGrowth: {
    maxWidth: "50%",
    width: "auto",
    flex: "1",
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      flex: 'none',
      width: '100%'
    },
  },
  activeFollower: {
    maxWidth: "25%",
    width: "auto",
    flex: "1",
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      flex: 'none',
      width: '100%'
    },
  },
  locationChartWrapper: {
    paddingRight: "12px !important",
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0 8px 0 !important'
    },
  },
  ageChartWrapper: {
    paddingLeft: "12px !important",
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0 !important'
    },
  },
  genderChartWrapper: {
    paddingRight: "12px !important",
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0 !important'
    },
  },
  educationChartWrapper: {
    paddingLeft: "12px !important",
    paddingRight: "12px !important",
    width: '37.5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
      padding: '8px 0 !important'
    },
  },
  jobChartWrapper: {
    width: '37.5%',
    paddingLeft: "12px !important",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
      padding: '8px 0 16px 0 !important'
    },
  },
  chartLineWrapper: {
    overflowX: 'auto',
    maxWidth: '100%'
  },
  chartLine: {
    width: '100%',
    minWidth: '100%',
  },
  // label: {
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: '10px'
  //   },
  // }
})
