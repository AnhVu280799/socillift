export default theme => ({
  mainDiv: {
    // textAlign: "center",
    width: "100%",
    height: "100%",
    overflow: 'auto'
  },
  cardTitle: {
    paddingBottom: "0px",
    marginBottom: "0px"
  },
  cardContent: {
    padding: "32px 40px 50px 40px !important",
    height: "100% !important",
  },
  imgLogo: {
    height: "26px",
    marginBottom: "9px"
  },
  signUpButton: {
    padding: "10px 25px",
    marginTop: "20px"
  },
  reCaptchaWrapper: {
    width: "100% !important",
    paddingTop: "20px !important",
  },
  fieldWrapper: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: '0 0 5px 0',
    overflowScrolling: "touch",
  },
  formSignUp: {
    display: 'flex',
    flexDirection: 'column',
    height: "100% !important",
  },
  loginLink: {
    fontWeight: "bold"
  },
  inputTextField: {
    margin: '0 0 10px 0 !important',
  },
  inputSelectorField: {
    paddingTop: '28px !important'
  },
  labelSelector: {
    top: '26px !important'
  },
  footContainer: {
    padding: "0px"
  },
  gridFieldContainer: {
    padding: "0px"
  },
  [theme.breakpoints.down('md')]: {
    divSignUp: {
      width: "100%",
      margin: "0",
      padding: "0 0 45px 0",
      display: "flex",
      justifyContent: "center",
      minHeight: "100%",
      flexDirection: "column",
      verticalAlign: "middle",
    },
    customCard: {
      width: "100vw",
      height: "100%",
      borderRadius: "16px",
      margin: "0 auto !important",
      display: "block !important",
    },
  },
  [theme.breakpoints.up('md')]: {
    divSignUp: {
      width: "100%",
      margin: "0",
      padding: "0",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      minHeight: "100%",
      verticalAlign: "middle",
    },
    customCard: {
      width: "50vw",
      height: "100%",
      borderRadius: "16px",
      margin: "0 auto !important",
      display: "block !important",
    },
  },
  loginMobileStyle: {
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  checkboxWrapper: {
    paddingTop: '16px'
  },
  checkboxContainer: {
    display: "inline-block"
  },
  conditionText: {
    paddingLeft: '4px'
  },
  conditionAction: {
    color: theme.colors.primary(),
    textDecoration: 'underline',
    display: "inline",
    cursor: 'pointer'
  },
  checkboxTerm: {
    padding: '0',
    marginLeft: '-2px',
  }
  
})