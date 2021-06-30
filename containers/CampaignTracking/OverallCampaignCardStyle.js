export default theme => ({
  container: {
    background: "#FFFFFF",
    boxShadow: "20px 20px 20px rgba(122, 131, 163, 0.1)",
    borderRadius: "4px",
    width: "100%",
    height: "280px",
  },
  titleStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "25px",
    color: "#9DA4BA",
    textAlign: "left",
    padding: "16px 0 8px 24px",
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      padding: "8px 16px",
    },
  },
  contentContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: "0 16px",
    },
  },
  valueStyle: {
    ...theme.font.default,
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    color: "#3C4859",
    textAlign: "left",
    padding: "0 0 0 24px",
    [theme.breakpoints.down('sm')]: {
      padding: "0",
    },
  },
  descriptionStyle: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "16px",
    color: "#9DA4BA",
    textAlign: "left",
    padding: "8px 0 0 24px",
    [theme.breakpoints.down('sm')]: {
      padding: "0",
    },
  },
  fullContainer: {
    borderBottom: "1px solid #DCDFEA",
    padding: "0 0 17px 0"
  },
  fullContainerWithoutBorder: {
    padding: "0 0 17px 0"
  },
  engagementDetailContainer: {
    width: "100%",
    padding: "25px 10px 0 10px"
  },
  nameEngagementContainer: {
    position: "relative",
    paddingBottom: "15px",
    paddingLeft: "45px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "32px",
    },
  },
  imageStyle: {
    width: "60px",
    position: "absolute",
    top: "calc(0% - 20px)",
    left: "calc(0% - 10px)",
    [theme.breakpoints.down('sm')]: {
      width: "50px",
      top: "calc(0% - 15px)",
    },
  },
  nameEngagement: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#9DA4BA",
    textAlign: "left",
    display: "contents",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  },
  engagementContainer: {
    width: "100%",
    padding: "0 10px",
    [theme.breakpoints.down('sm')]: {
      padding: "0 5px",
    },
  },
  engagementStyle: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "19px",
    fontWeight: "bold",
    color: "#3C4859",
    textAlign: "center",
    background: "#F7F9FF",
    borderRadius: "10px",
    width: "100%",
    display: "inline-block",
    padding: "2px"
  },
  imageOneContainer: {
    paddingBottom: "4px",
    paddingRight: "8px"
  },
  imageTwoContainer: {
    paddingBottom: "4px"
  },
  imageThreeContainer: {
    paddingTop: "4px"
  },
  imageFourContainer: {
    paddingTop: "4px",
    paddingLeft: "8px",
    position: "relative"
  },
  imageOne: {
    width: "65px",
    height: "65px",
    objectFit: "cover",
    borderRadius: "8px 8px 0px 8px",
    [theme.breakpoints.down('sm')]: {
      width: "57px",
      height: "57px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "47px",
      height: "47px",
    },
  },
  imageTwo: {
    width: "73px",
    height: "73px",
    objectFit: "cover",
    borderRadius: "8px 8px 8px 0px",
    [theme.breakpoints.down('sm')]: {
      width: "65px",
      height: "65px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "55px",
      height: "55px",
    },
  },
  imageThree: {
    width: "73px",
    height: "73px",
    objectFit: "cover",
    borderRadius: "8px 0px 8px 8px",
    [theme.breakpoints.down('sm')]: {
      width: "65px",
      height: "65px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "55px",
      height: "55px",
    },
  },
  imageFour: {
    width: "65px",
    height: "65px",
    objectFit: "cover",
    borderRadius: "0px 8px 8px 8px",
    [theme.breakpoints.down('sm')]: {
      width: "57px",
      height: "57px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "47px",
      height: "47px",
    },
  },
  overlayExtImage: {
    width: "65px",
    height: "65px",
    background: "linear-gradient(0deg, #000000, #000000)",
    opacity: "0.5",
    position: "absolute",
    borderRadius: "0px 8px 8px 8px",
    [theme.breakpoints.down('sm')]: {
      width: "57px",
      height: "57px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "47px",
      height: "47px",
    },
  },
  extNumberStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FDFDFD"
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white(),
    fontWeight: "normal"
  },
  lastTooltip: {
    left: "-29px"
  },
  toolTipIcon: {
    fontSize: "21px",
    color: theme.colors.grey(),
    position: "absolute",
    right: "16px",
    top: "20px",
    zIndex: "100",
    transform: "rotate(180deg)",
    "&:hover": {
      color: theme.colors.baseGrey()
    },
    [theme.breakpoints.down('sm')]: {
      top: "10px",
    },
  }
});
