export default theme => ({
  firstRow: {
    marginTop: "4px",
    marginBottom: "4px",
    position: "relative"
  },
  secondRow: {
    marginTop: "-4px",
    marginBottom: "2px"
  },
  otherRow: {
    marginTop: "4px",
    marginBottom: "4px",

    "& .most-engagement-posts.no-result": {
      fontSize: "18px",
      color: "#999",
      paddingLeft: "20px"
    },

    "& .commercial-organic.no-result": {
      minHeight: "257px",
      color: "#999",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  valueInCard: {
    ...theme.font.default,
    fontSize: "48px",
    marginLeft: "25px",
    marginBottom: "5px",
    color: "inherit"
  },
  titleInCard: {
    ...theme.font.default,
    color: theme.colors.grey(),
    fontSize: "13px",
    lineHeight: "13px",
    marginLeft: "25px",
    marginTop: "20px",
    textTransform: "uppercase"
  },
  sizeChipRoot: {
    ...theme.font.default,
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "24px",
    padding: "0 10px",
    marginTop: "-4.5px",
    margin: "0",
    marginLeft: "11px",
    fontWeight: "bold",
    textTransform: "uppercase",
    height: "24px"
  },
  barValueLabel: {
    ...theme.font.default,
    textAlign: "center !important",
    justifyContent: "center !important",
    marginLeft: "-50%",
    fontSize: 11,
    lineHeight: "20px",
    color: theme.colors.greyLight()
  },
  pieChartColorWithGap: {
    "&:nth-child(1)": {
      fill: theme.colors.dangerLight()
    },
    "&:nth-child(2)": {
      fill: theme.colors.chartBlue()
    },
    stroke: "#ffffff",
    strokeWidth: "4px"
  },
  pieChartColorNoGap: {
    "&:nth-child(1)": {
      fill: theme.colors.dangerLight()
    },
    "&:nth-child(2)": {
      fill: theme.colors.chartBlue()
    },
    strokeWidth: "0px"
  },
  xlabel: {
    transform: "rotate(-45deg)",
    marginTop: "3px"
  },
  pieChartLabel: {
    ...theme.font.default,
    fontSize: "18px",
    lineHeight: "25px",
    opacity: "0.6",
    fill: "#ffffff"
  },
  fitContent: {
    minWidth: "fit-content",
    minHeight: "fit-content"
  },
  fitTitleContent: {
    minWidth: "fit-content",
    minHeight: "fit-content",
    alignItems: "left",
    paddingTop: "18%",
    paddingLeft: "2%"
  },
  dot: {
    width: 12,
    height: 12,
    marginRight: "4px"
  },
  pieChartLegend: {
    ...theme.font.default,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.87)",
    margin: "13px 0 3px 0"
  },
  verticalValue: {
    alignItems: "center",
    marginTop: "50%",
    marginBottom: "0"
  },
  lineArea: {
    fill: "#b4e3f4 !important",
    fillOpacity: "0.3 !important"
  },
  line: {
    stroke: theme.colors.primary() + " !important",
    strokeWidth: "2px"
  },
  point: {
    fill: theme.colors.chartBlue() + " !important",
    "&:hover": {
      stroke: "rgb(255, 255, 255)",
      strokeWidth: "3px",
      fill: "rgb(0, 150, 255) !important"
    }
  },
  pointTooltip: {
    ...theme.font.default,
    fontSize: 13,
    lineHeight: "20px",
    color: "#fff",
    borderRadius: "12px",
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "24px",
    padding: "2px 10px 2px 10px",
    "&:before": {
      content: "unset"
    }
  },
  trendlineChart: {
    maxWidth: "100%",
    width: "100%",
    // flex: "1",
    "& .chart-wrapper": {
      position: "relative",
      "& .no-result": {
        position: "absolute",
        color: "#999999",
        fontSize: "18px",
        left: "37%",
        top: "39%"
      }
    }
  },
  mostPostTitle: {
    ...theme.font.default,
    fontSize: "18px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: theme.colors.grey(),
    paddingTop: "2%"
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
    left: "120px !important",
    transform: "none !important"
  },
  toolTipIcon: {
    fontSize: "21px",
    color: theme.colors.grey(),
    position: "absolute",
    left: "92px",
    top: "26px",
    zIndex: "2",
    transform: "rotate(180deg)",
    "&:hover": {
      color: theme.colors.baseGrey()
    }
  },
  lengendListContainer: {
    textAlign: "end",
    paddingRight: "50px",
    position: "absolute",
    top: "-50px",
    right: "0"
  },
  lengendListStyle: {
    listStyleType: "none",
    display: "inline-flex",
    paddingRight: "55px"
  },
  lengendName: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "16px",
    // paddingTop: '2px',
    color: "#9DA4BA"
  },
  formContainerClassName: {
    width: "100%",
    position: "unset !important",
    display: "inline-flex"
  },
  labelClassName: {
    ...theme.font.default,
    lineHeight: "20px",
    fontSize: "14px",
    color: theme.colors.grey(),
    position: "unset !important",
    textAlign: "left",
    display: "inline-flex",
    alignItems: "center",
    paddingRight: "45px"
  },
  formControlCustomClassName: {
    width: "200px !important",
    display: "inline-flex",
    alignItems: "center"
  },
  typingSelectClassName: {
    ...theme.font.default,
    width: "100%",
    color: theme.colors.baseGrey(),
    lineHeight: "20px",
    height: "40px",
    fontSize: "14px",
    margin: "0"
  }
});
