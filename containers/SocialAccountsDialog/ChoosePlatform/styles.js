export default theme => ({
  root: {},
  descriptionText: {
    fontSize: "16px",
    lineHeight: "22px",
    marginBottom: "8px"
  },
  buttonWrapper: {
    margin: "16px auto"
  },
  button: {
    flex: 1,
    height: "100px",
    boxShadow: "20px 20px 30px rgba(122, 131, 163, 0.1)",
    borderRadius: "6px",
    boxSizing: "border-box"
  },
  buttonDisabled: {
    border: "2.5px solid #F1EEEF !important"
  },
  buttonFacebook: {
    border: "1px solid #6F8DED",
    "&:hover": {
      background: "#FFFFFF",
      border: "2.5px solid #6F8DED",
      boxSizing: "border-box",
      boxShadow: "20px 20px 30px rgba(111, 141, 237, 0.15)",
      borderRadius: "6px"
    }
  },
  buttonFacebookLinked: {
    border: "2.5px solid #6F8DED"
  },
  buttonPage: {
    border: "1px solid #FDC676",
    "&:hover": {
      background: "#FFFFFF",
      border: "2.5px solid #FDC676",
      boxSizing: "border-box",
      boxShadow: "20px 20px 30px rgba(253, 198, 118, 0.15)",
      borderRadius: "6px"
    }
  },
  buttonPageLinked: {
    border: "2.5px solid #FDC676"
  },
  buttonYoutube: {
    border: "1px solid #E5918B",
    "&:hover": {
      background: "#FFFFFF",
      border: "2.5px solid #E5918B",
      boxSizing: "border-box",
      boxShadow: "20px 20px 30px rgba(229, 145, 139, 0.15)",
      borderRadius: "6px"
    }
  },
  buttonYoutubeLinked: {
    border: "2.5px solid #E5918B"
  },
  buttonInstagram: {
    border: "1px solid #F26C99",
    "&:hover": {
      background: "#FFFFFF",
      border: "2.5px solid #F26C99",
      boxSizing: "border-box",
      boxShadow: "20px 20px 30px rgba(242, 108, 153, 0.15)",
      borderRadius: "6px"
    }
  },
  buttonInstagramLinked: {
    border: "2.5px solid #FDC676"
  },
  buttonLogo: {
    width: "48px",
    height: "48px"
  },
  buttonLogoDisabled: {
    filter: "grayscale(100%)"
  },
  avatar: {
    width: "70px",
    height: "70px",
    boxShadow: "0px 20px 30px rgba(111, 120, 151, 0.25)",
    border: "5px solid #FFFFFF"
  },
  logoName: {
    margin: "4px 0"
  },
  logoButtonSmall: {
    width: "20px",
    height: "20px"
  },
  influencerName: {
    fontWeight: "bold",
    lineHeight: "19px",
    marginLeft: "8px"
  },
  userName: {
    lineHeight: "19px",
    color: "#82858C",
    margin: "4px 0"
  },
  buttonName: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#394878",
    textAlign: "left",
    margin: 0,
    textTransform: "capitalize"
  },
  buttonNameDisabled: {
    color: "#A8ACB7"
  },
  tooltipTitle: {
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
    transform: "rotate(180deg)",
    "&:hover": {
      color: theme.colors.baseGrey()
    }
  }
});
