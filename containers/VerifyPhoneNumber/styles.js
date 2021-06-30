import { LAYOUT_LOGIN_BACKGROUND_IMAGE } from "constants/common";

export default theme => ({
  root: {
    backgroundImage: `url(${LAYOUT_LOGIN_BACKGROUND_IMAGE})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh"
  },
  content: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardRoot: {
    margin: 0,
    maxWidth: "600px"
  },
  cardContent: {
    padding: "32px 40px 50px 40px"
  },
  cardTitle: {
    paddingBottom: "0px"
  },
  cardFooter: {
    marginTop: "16px",
    textAlign: "center",
    marginBottom: "32px",
    flexDirection: "column-reverse"
  },
  logoWrapper: {
    textAlign: "center"
  },
  logo: {
    height: "28px",
    marginBottom: "9px"
  },
  description: {
    textAlign: "center"
  },
  formGroupLeft: {},
  formGroupRight: {},
  formGroupSource: {
    paddingTop: "24px"
  },
  formGroupCaptcha: {
    display: "flex",
    justifyContent: "center"
  },
  leftButtonWrapper: {},
  leftButton: {
    minWidth: "144px"
  },
  rightButtonWrapper: {
    display: "block",
    textAlign: "center"
  },
  rightButton: {
    minWidth: "144px"
  },
  expiredInCountdown: {
    padding: "8px 0 0",
    "& span": {
      fontWeight: 500
    }
  },
  expiredInCountdownRunOut: {
    "& span": {
      color: theme.colors.danger()
    }
  },
  buttonChangePhoneNumber: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    margin: "8px 0",
    lineHeight: "21px",
    fontSize: "16px",
    fontWeight: 700,
    "&:hover": {
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
    }
  },
  buttonResend: {
    padding: "16px 0"
  },
  hidden: {
    display: "none"
  },
  [theme.breakpoints.up("sm")]: {
    cardRoot: {
      margin: "25px 0"
    },
    logoWrapper: {
      textAlign: "initial"
    },
    description: {
      textAlign: "initial"
    },
    formGroupLeft: {
      paddingRight: theme.spacing.unit
    },
    formGroupRight: {
      paddingLeft: theme.spacing.unit
    },
    formGroupCaptcha: {
      display: "initial"
    },
    cardFooter: {
      textAlign: "initial",
      marginBottom: "16px",
      flexDirection: "initial"
    },
    rightButtonWrapper: {
      textAlign: "right"
    },
    buttonResend: {
      padding: "initial"
    }
  },
  [theme.breakpoints.up("md")]: {
    cardRoot: {
      maxWidth: "720px"
    }
  }
});
