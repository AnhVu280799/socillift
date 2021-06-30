import { LAYOUT_LOGIN_BACKGROUND_IMAGE } from 'constants/common';

export default theme => ({
  root: {
    backgroundImage: `url(${LAYOUT_LOGIN_BACKGROUND_IMAGE})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh'
  },
  content: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardRoot: {
    margin: 0,
    maxWidth: '600px'
  },
  cardContent: {
    padding: '32px 40px 50px 40px'
  },
  cardTitle: {
    paddingBottom: '0px'
  },
  cardFooter: {
    marginTop: '32px',
    textAlign: 'center'
  },
  logoWrapper: {
    textAlign: 'center'
  },
  logo: {
    height: '28px',
    marginBottom: '9px'
  },
  description: {
    textAlign: 'center'
  },
  formGroupLeft: {},
  formGroupRight: {},
  formGroupSource: {
    paddingTop: '24px'
  },
  formGroupCaptcha: {
    display: 'flex',
    justifyContent: 'center'
  },
  signUpButtonWrapper: {},
  signUpButton: {
    width: '144px',
    marginBottom: '64px'
  },
  loginButtonWrapper: {
    display: 'block',
    textAlign: 'center',
    marginBottom: '64px'
  },
  requestLink: {
    fontWeight: 'bold',
    fontSize: '17px'
  },
  errorMessage: {
    color: 'red',
    padding: '3% 0 0 0'
  },
  buttonTermsAndServices: {
    fontWeight: 700,
    color: theme.colors.primary(),
    paddingLeft: '4px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  [theme.breakpoints.up('sm')]: {
    cardRoot: {
      margin: '25px 0'
    },
    logoWrapper: {
      textAlign: 'initial'
    },
    description: {
      textAlign: 'initial'
    },
    formGroupLeft: {
      paddingRight: theme.spacing.unit
    },
    formGroupRight: {
      paddingLeft: theme.spacing.unit
    },
    formGroupCaptcha: {
      display: 'initial'
    },
    cardFooter: {
      textAlign: 'initial'
    },
    loginButtonWrapper: {
      textAlign: 'right'
    }
  },
  [theme.breakpoints.up('md')]: {
    cardRoot: {
      maxWidth: '720px'
    }
  }

  // [theme.breakpoints.down("sm")]: {
  //   logoWrapper: {
  //     textAlign: "center"
  //   },
  //   formGroupLeft: {
  //     paddingRight: 0
  //   },
  //   formGroupRight: {
  //     paddingLeft: 0
  //   }
  // }

  // imgLogo: {
  //   height: "26px",
  //   marginBottom: "9px"
  // },
  // signUpButton: {
  //   padding: "10px 25px",
  //   marginTop: "20px"
  // },
  // reCaptchaWrapper: {
  //   width: "100% !important",
  //   paddingTop: "20px !important"
  // },
  // fieldWrapper: {
  //   width: "100%",
  //   height: "100%",
  //   overflow: "auto",
  //   padding: "0 0 5px 0",
  //   overflowScrolling: "touch"
  // },
  // formSignUp: {
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100% !important"
  // },
  // loginLink: {
  //   fontWeight: "bold"
  // },
  // inputTextField: {
  //   margin: "0 0 10px 0 !important"
  // },
  // inputSelectorField: {
  //   paddingTop: "28px !important"
  // },
  // labelSelector: {
  //   top: "26px !important"
  // },
  // footContainer: {
  //   padding: "0px"
  // },
  // gridFieldContainer: {
  //   padding: "0px"
  // },
  // [theme.breakpoints.down("md")]: {
  //   divSignUp: {
  //     width: "100%",
  //     margin: "0",
  //     padding: "0 0 45px 0",
  //     display: "flex",
  //     justifyContent: "center",
  //     minHeight: "100%",
  //     flexDirection: "column",
  //     verticalAlign: "middle"
  //   },
  //   customCard: {
  //     width: "100vw",
  //     // height: "100%",
  //     borderRadius: "16px",
  //     margin: "0 auto !important",
  //     display: "block !important"
  //   }
  // },
  // [theme.breakpoints.up("md")]: {
  //   divSignUp: {
  //     width: "100%",
  //     margin: "0",
  //     padding: "0",
  //     display: "flex",
  //     justifyContent: "center",
  //     flexDirection: "column",
  //     minHeight: "100%",
  //     verticalAlign: "middle"
  //   },
  //   customCard: {
  //     width: "50vw",
  //     // height: "100%",
  //     borderRadius: "16px",
  //     margin: "0 auto !important",
  //     display: "block !important"
  //   }
  // },
  // loginMobileStyle: {
  //   paddingTop: "3%",
  //   paddingBottom: "3%"
  // }
});
