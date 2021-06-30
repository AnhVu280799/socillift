export default theme => ({
  card: {
    textAlign: "center",
    width: "100%",
    marginTop: "unset",
    marginBottom: "unset",
    height: "240px",
    borderRadius: "6px",
    color: theme.colors.baseGrey(),
    position: "relative"
  },
  cardBody: {
    padding: "0px"
  },
  cardTitle: {
    marginTop: "13px",
    marginBottom: "0px",
    padding: "0px",
    paddingLeft: "16px",
    paddingRight: "16px",
    letterSpacing: "0.1px",
    color: "inherit",
    ...theme.font.heading5,
    ...theme.font.bold,
    fontSize: "16px",
    fontWeight: "600"
  },
  cardTitleNoDisplayRecords: {
    marginBottom: "23px"
  },
  cardNumberRecords: {
    lineHeight: "1.5",
    color: theme.colors.grey,
    ...theme.font.heading6
  },
  divImg: {
    borderRadius: "6px",
    position: "absolute",
    top: "0",
    left: "0",
    height: "240px",
    width: "100%",
    opacity: 0.92,
    background: `linear-gradient(7deg, ${theme.colors.primary()} 0%, ${theme.colors.primaryLighter()} 100%)`,
    [theme.breakpoints.down('md')]: {

    },
  },
  cardImgTop: {
    height: "240px",
    width: "100%",
    borderRadius: "6px",
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)"
  },
  bannerText: {
    ...theme.font.default,
    ...theme.font.bold,
    textTransform: "uppercase",
    textAlign: "center",
    position: "absolute",
    color: "#efefef",
    fontSize: "18px",
    lineHeight: "38px",
    width: "100%",
    display: "inline-block",
    margin: "0 auto",
    top: "20%",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
      top: "8%",
    },
  },
  inputContainer: {
    width: "100%",
    left: "0",
    top: "40%",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      left: 0,
      width: "100%",
      padding: "0 4px"
    },
  },
  inputRoot: {
    width: "704px",
    height: "50px",
    borderRadius: "80px",
    backgroundColor: "#F3F5FB",
    boxShadow: "20px 20px 30px rgba(0, 158, 222, 0.1)",
    color: "#44556E",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "35px",
    }
  },
  inputFocus: {
    backgroundColor: "#F3F5FB"
  },
  defaultHastag: {
    ...theme.font.default,
    fontWeight: "600",
    fontSize: "24px",
    textAlign: "left",
    color: "#44556E",
    paddingLeft: "20px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "20px",
    },
  },
  inputAdornmentRoot: {},
  input: {
    ...theme.font.default,
    fontWeight: "600",
    fontSize: "24px",
    textAlign: "left",
    color: "#44556E",
    padding: "0",
    [theme.breakpoints.down('sm')]: {
      fontSize: "18px",
    },
  },
  searchButton: {
    height: "50px",
    width: "63px",
    background: "#009EDE",
    color: "#FFFFFF",
    border: "2px solid #FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0px 4px 20px rgba(240, 214, 214, 0.25)",
    borderTopRightRadius: "80px",
    borderBottomRightRadius: "80px",
    margin: "0",
    [theme.breakpoints.down('sm')]: {
      height: "35px",
      width: "35px",
      border: "1px solid #FFFFFF",
    },
  },
  searchIcon: {
    color: "#FFFFFF",
    fontSize: "34px !important",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: "26px !important",
    },
  },
  suggestContainerAbsolute: {
    position: "absolute",
    bottom: "30px",
    left: "0",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      top: "62%"
    },
  },
  suggestContainer: {
    position: "relative",
    margin: "0 auto",
    display: "inline-block",
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      bottom: 0
    }
  },
  suggestTitle: {
    ...theme.font.default,
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FFFFFF",
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "10px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  },
  suggestTagContainer: {
    // position: "absolute",
    // left: "40%",
    // top: "-8px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      top: "24px",
      left: "16px"
    },
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "10px"
  },
  suggestionHashtag: {
    width: "auto",
    height: "32px",
    margin: "0 24px 0 0",
    "&:hover": {
      background: "none",
    },
    paddingRight: "inherit",
    [theme.breakpoints.down('sm')]: {
      margin: "-5px 0 0 0",
      paddingRight: "4px"
    },
  },
  hashtagName: {
    ...theme.font.default,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FFFFFF",
    textAlign: "center",
    margin: "0",
    textTransform: "lowercase",
    textDecorationLine: "underline",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  }
});
