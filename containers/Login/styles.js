import { LAYOUT_LOGIN_BACKGROUND_IMAGE } from "constants/common";

export default theme => ({
  root: {
    backgroundImage: `url(${LAYOUT_LOGIN_BACKGROUND_IMAGE})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh"
  },
  content: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formWrapper: {
    width: "430px",
    borderRadius: "16px"
  },
  cardContent: {
    padding: "32px 40px 37px 40px !important"
  },
  cardTitle: {
    paddingBottom: "0px",
    marginBottom: "0px"
  },
  spinnerClass: {
    width: "30px"
  },
  requestLink: {
    fontWeight: "bold",
    fontSize: "17px"
  },
  logoWrapper: {},
  logo: {
    height: "26px",
    marginBottom: "9px"
  },
  loginButtonWrapper: {},
  loginButton: {
    width: "144px"
  },
  signUpButtonWrapper: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cardFooter: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit}px`
  },
  errorMessage: {
    color: "red",
    padding: "5px 0 0 0"
  },
  [theme.breakpoints.only("xs")]: {
    logoWrapper: {
      textAlign: "center"
    },
    loginButton: {
      width: "100%",
      marginBottom: `${theme.spacing.unit * 4}px`
    },
    signUpButtonWrapper: {
      display: "block",
      textAlign: "center"
    },
    errorMessage: {
      textAlign: "center"
    }
  }
});
