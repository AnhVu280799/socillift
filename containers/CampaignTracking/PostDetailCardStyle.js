export default theme => ({
  paperSize: {
    width: "90%",
    height: "540px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 20px rgba(122, 131, 163, 0.2)",
    borderRadius: "10px 4px 4px 10px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  firstRow: {
    height: "140px",
    padding: "24px 24px 0 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px 8px 0 8px",
    }
  },
  titleStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "16px",
    color: "#9DA4BA",
    paddingBottom: "8px",
    height: "45px",
    "&:hover": {
      color: theme.colors.baseGrey()
    }
  },
  valueStyle: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "49px",
    color: "#3C4858",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    }
  },
  valueStyleBlue: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "49px",
    color: "#4CA3C5",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    }
  },
  innerValue: {
    width: "100%",
    textAlign: "center"
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
    margin: "0"
  },
  postMedia: {
    width: "100%",
    height: "240px",
    position: "relative"
  },
  influencerContainer: {
    padding: "20px 40px 15px 40px"
  },
  avatarContainer: {
    width: "40px",
    height: "40px"
  },
  avatarStyle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  nameTimeContainer: {},
  nameStyle: {
    ...theme.font.default,
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "22px",
    textAlign: "left",
    color: "#3C4859"
  },
  postCreatedTime: {
    ...theme.font.default,
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "left",
    color: "#999999"
  },
  postMessageStyle: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "left",
    color: "#3C4858",
    padding: "0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px 16px",
    }
  },
  postImage: {
    width: "100%",
    height: "100%",
    display: "block",
    backgroundPosition: "center",
    backgroundSize: "100%",
    objectFit: "cover"
  },
  overlayExtNumImage: {
    width: "90px",
    height: "24px",
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "rgba(31, 33, 33, 0.8)",
    border: "1px solid rgba(31, 33, 33, 0.8)",
    textAlign: "center",
    right: "5%",
    top: "10%"
  },
  extNumImage: {
    ...theme.font.default,
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: "16px",
    color: "#FFFFFF",
    position: "absolute",
    textAlign: "left"
  },
  overlayVideo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(7, 7, 7, 0.5)",
    textAlign: "right",
    top: "0%",
    left: "0%"
  },
  playIcon: {
    fontSize: "48px",
    position: "absolute",
    top: "40%",
    left: "42%",
    color: "#FFFFFF",
    textAlign: "center"
  },
  postNonImage: {
    visibility: "hidden"
  },
  ellipsePostType: {
    width: "60px",
    height: "60px",
    backgroundColor: "#000000",
    borderRadius: "50%",
    position: "absolute",
    left: "44%",
    bottom: "-5%",
    boxShadow: "0px 20px 30px rgba(111, 120, 151, 0.25)",
    border: "5px solid #FFFFFF",
    zIndex: "1"
  },
  iconPostType: {
    color: "#FFFFFF",
    fontSize: "26px"
  },
  post: {
    backgroundColor: theme.colors.primary(1.0)
  },
  postPhoto: {
    backgroundColor: theme.colors.info(1.0)
  },
  postVideo: {
    backgroundColor: "#e91e63"
  },
  postLink: {
    backgroundColor: "#9b27af"
  },
  postStatus: {
    backgroundColor: theme.colors.baseGrey(1.0),
    transform: "rotate(180deg)"
  },
  postEvent: {
    backgroundColor: theme.colors.chartDarkBlue(1.0)
  },
  postNote: {
    backgroundColor: theme.colors.chartBlue(1.0)
  }
});
