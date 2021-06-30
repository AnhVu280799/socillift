export default theme => ({
  mainDiv: {
    ...theme.font.default,
    textAlign: "center",
    width: "100%",
    padding: theme.defaultContentPadding,
    overflow: "visible",
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "60px",
    }
  },
  banner: {
    marginTop: "23px",
    marginBottom: "24px"
  },
  headerOneStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "38px",
    color: "#3C4859",
    paddingTop: "32px",
    paddingBottom: "16px",
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      paddingTop: "16px",
    },
  },
  dateTimeTooltip: {
    paddingTop: "24px",
    paddingBottom: "24px",
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      padding: "16px 0"
    },
  },
  lastUpdatedDateTime: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#9DA4BA",
    position: "absolute",
    right: "0",
    top: "32px",
    [theme.breakpoints.down('sm')]: {
      position: "relative",
      textAlign: "left",
      top: "0"
    },
  },
  availableDuration: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#9DA4BA",
    position: "absolute",
    left: "0",
    top: "32px",
    [theme.breakpoints.down('sm')]: {
      position: "relative",
      textAlign: "left",
      top: "0"
    },
  },
  headerTwoStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "30px",
    color: "#3C4859",
    paddingTop: "42px",
    [theme.breakpoints.down('sm')]: {
      paddingTop: "16px",
    },
  },
  descriptionStyle: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#126382",
    textAlign: "left",
    padding: "8px 16px"
  },
  contentWrapper: {
    paddingTop: "16px",
    paddingBottom: "24px",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      margin: "0"
    },
  },
  audienceWrapper: {
    paddingTop: "24px"
  },
  locationChartContainer: {
    width: "100%",
    height: "320px",
    marginBottom: "30px"
  },
  ageChartContainer: {
    width: "100%",
    height: "320px"
  },
  barChart: {
    height: "250px",
    width: "100%",
  },
  barValue: {
    ...theme.font.default,
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "16px",
    fill: "#3C4859",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  },
  barChartLabel: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    color: "#9DA4BA",
    [theme.breakpoints.down('sm')]: {
      fontSize: "10px",
    },
  },
  barChartBar: {
    strokeWidth: 16
  },
  barValueLabel: {
    ...theme.font.default,
    textAlign: "center !important",
    justifyContent: "center !important",
    marginLeft: "-50%",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "16px",
    color: "#9DA4BA"
  },
  barChartBlue: {
    stroke: "#01BBD3"
  },
  barChartGreen: {
    stroke: "#00B04B"
  },
  specialValue: {
    ...theme.font.default,
    fontSize: "50px",
    fontWeight: "bold",
    lineHeight: "68px",
    color: "#0C79A3"
  },
  advocacyChartWrapper: {
    position: "relative",
    overflow: "unset",
    width: "100%"
  },
  noResult: {
    ...theme.font.default,
    fontSize: "18px",
    lineHeight: "25px",
    textAlign: "center",
    color: "#999999",
    position: "absolute",
    top: "232px",
    left: "30%"
  },
  descriptionNoData: {
    ...theme.font.default,
    fontSize: "28px",
    lineHeight: "38px",
    textAlign: "left",
    color: "#3C4859"
  },
  dataWrapper: {
    width: "100%",
  },
  containerBottomContact: {
    height: "104px",
    margin: "16px 0 0 0",
    [theme.breakpoints.down('sm')]: {
      margin: "0",
    },
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
  descriptionStyleBlue: {
    color: "#009FDB",
    display: "inline",
    "&:hover": {
      color: "#126382"
    }
  }
});
