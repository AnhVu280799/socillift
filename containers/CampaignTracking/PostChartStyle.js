export default theme => ({
  container: {
    background: "#FFFFFF",
    boxShadow: "20px 20px 20px rgba(122, 131, 163, 0.1)",
    borderRadius: "4px",
    width: "100vw",
    height: "600px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      background: "none",
      boxShadow: "none",
    }
  },
  tabContainer: {
    padding: "0",
    "&:hover": {
      borderTop: "1px solid #DCDFEA",
      borderBottom: "1px solid #DCDFEA"
    },
    background: "#FFFFFF",
    boxShadow: "20px 20px 20px rgba(122, 131, 163, 0.1)",
    borderRadius: "4px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "32px"
    }
  },
  avatarContainer: {
    position: "relative",
    margin: "0",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px"
    }
  },
  infoContainer: {
    padding: "0 0 0 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "0"
    }
  },
  chartContainer: {
    padding: "0 0 0 8px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 8px",
    }
  },
  viewDetailContainer: {
    display: "inline-block",
    borderTop: "1px solid #01BBD3"
  },
  viewDetailTitle: {
    ...theme.font.default,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "14px",
    color: "#009FDB",
    textAlign: "center",
    display: "inline-flex",
  },
  arrowDetailStyle: {
    width: "35px",
    transform: "rotate(-90deg)",
    display: "inline-flex",
  },
  avatarStyle: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0px 20px 30px rgba(111, 120, 151, 0.25)",
    border: "8px solid #FFFFFF",
    [theme.breakpoints.down("lg")]: {
      width: "60px",
      height: "60px"
    },
  },
  rankImageStyle: {
    width: "32px",
    height: "32px",
    position: "absolute",
    left: "70%",
    bottom: "5%",
    [theme.breakpoints.down("lg")]: {
      width: "25px",
      height: "25px",
      bottom: "20%",
      left: "45px"
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "0",
      left: "60px"
    }
  },
  rankTextStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#3C4858",
    position: "absolute",
    left: "84%",
    bottom: "11%",
    margin: "0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
      bottom: "20%",
      left: "54px"
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "1px",
      left: "69px"
    }
  },
  nameStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "19px",
    color: "#3C4859",
    margin: "0",
    textAlign: "left"
  },
  timeStyle: {
    ...theme.font.default,
    fontSize: "10px",
    lineHeight: "14px",
    color: "#9DA4BA",
    margin: "0",
    textAlign: "left"
  },
  lengendListContainer: {
    textAlign: "center",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      display: "inline-flex",
      padding: "0"
    }
  },
  lengendListStyle: {
    listStyleType: "none",
    display: "inline-flex",
    paddingRight: "55px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "16px",
    }
  },
  iconLengend: {
    margin: "0 15px 0 0",
    [theme.breakpoints.down("sm")]: {
      margin: "0 8px 0 0",
    }
  },
  lengendName: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    paddingTop: "2px",
    color: "#9DA4BA",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    }
  },
  tabChartContainer: {
    padding: "24px 0 0 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px 0 0 0",
    }
  },
  arrowContainer: {
    position: "relative",
    margin: "0 0 0 -5px"
  },
  arrowStyle: {
    position: "absolute",
    width: "50px",
    right: "-20px"
  },
  postDetailContainer: {
    paddingTop: "15px"
  },
  expansionPanelDetailsRoot: {
    padding: "0"
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "center",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white(),
    margin: "0"
  },
  lastTooltip: {
    left: "-29px"
  },
});
