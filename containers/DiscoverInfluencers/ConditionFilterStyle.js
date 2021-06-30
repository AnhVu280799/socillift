export default theme => ({
  root: {
    width: '100%',
    height: '780px',
    marginTop: '23px',
    background: '#FFFFFF',
    boxShadow: '20px 20px 30px rgba(122, 131, 163, 0.1)',
    borderRadius: '6px',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingBottom: '32px'
    }
  },
  welcomeContainer: {
    width: '100%',
    display: 'inline-block'
  },
  selectedPlatform: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    textAlign: 'center',
    color: 'rgba(60, 72, 89, 0.89)',
    margin: '0',
    paddingTop: '120px',
    [theme.breakpoints.down('sm')]: {
      padding: '32px'
    }
  },
  platformStyle: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    textAlign: 'center',
    color: '#394878',
    margin: '0',
    paddingLeft: '5px',
    display: 'inline-block'
  },
  welcomeStyle: {
    ...theme.font.default,
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '38px',
    textAlign: 'center',
    color: '#164C6D',
    paddingTop: '20px',
    textTransform: 'uppercase',
    margin: '0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '24px'
    },
  },
  buttonWrapper: {
    width: '100%',
    padding: '110px 15% 0 15%',
    margin: '0',
    [theme.breakpoints.only('md')]: {
      padding: '110px 10% 0 10%'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      margin: '0 auto'
    }
  },
  buttonStyle: {
    width: '240px',
    height: '180px',
    background: '#FFFFFF',
    boxShadow: '20px 20px 30px rgba(122, 131, 163, 0.1)',
    borderRadius: '6px',
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.only('md')]: {
      width: '100%'
    }
  },
  logoButton: {
    width: '70px',
    height: '70px'
  },
  buttonName: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#394878',
    margin: '0',
    textTransform: 'capitalize',
    padding: '10px 50px',
    [theme.breakpoints.only('md')]: {
      padding: '16px 24px'
    }
  },
  orangeBottomCircle: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    position: 'absolute',
    left: '0%',
    bottom: '-75%',
    backgroundColor: '#FF9800',
    opacity: '0.04'
  },
  orangeLeftCircle: {
    borderRadius: '50%',
    width: '180px',
    height: '180px',
    position: 'absolute',
    left: '-40%',
    bottom: '0',
    backgroundColor: '#FF9800',
    opacity: '0.06'
  },
  purpleBottomCircle: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    position: 'absolute',
    left: '0%',
    bottom: '-75%',
    backgroundColor: '#9B27AF',
    opacity: '0.04'
  },
  purpleLeftCircle: {
    borderRadius: '50%',
    width: '180px',
    height: '180px',
    position: 'absolute',
    left: '-40%',
    bottom: '0',
    backgroundColor: '#9B27AF',
    opacity: '0.06'
  },
  blueBottomCircle: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    position: 'absolute',
    left: '0%',
    bottom: '-75%',
    backgroundColor: '#0065C9',
    opacity: '0.04'
  },
  blueLeftCircle: {
    borderRadius: '50%',
    width: '180px',
    height: '180px',
    position: 'absolute',
    left: '-40%',
    bottom: '0',
    backgroundColor: '#0065C9',
    opacity: '0.06'
  },
  infDemoHover: {
    '&:hover': {
      background: '#FFFFFF',
      border: '1px solid rgba(255, 153, 0, 0.8)',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(253, 198, 118, 0.1)',
      borderRadius: '6px'
    }
  },
  infAudiHover: {
    '&:hover': {
      background: '#FFFFFF',
      border: '1px solid rgba(155, 39, 175, 0.62)',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(155, 39, 175, 0.1)',
      borderRadius: '6px'
    }
  },
  infCateHover: {
    '&:hover': {
      background: '#FFFFFF',
      border: '1px solid rgba(0, 159, 219, 0.8)',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(0, 159, 219, 0.1)',
      borderRadius: '6px'
    }
  },
  backBtnWrapper: {
    width: '100%',
    paddingTop: '70px'
  },
  backButton: {
    ...theme.font.default,
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '19px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0px 4px 4px rgba(204, 208, 223, 0.2)',
    color: '#FFFFFF'
    // borderRadius: "6px",
  }
});
