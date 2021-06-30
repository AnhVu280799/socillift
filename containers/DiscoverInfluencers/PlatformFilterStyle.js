import socialFrame from 'assets/img/social_media_frame.png';

export default theme => ({
  root: {
    width: '100%',
    height: 'auto',
    marginTop: '23px',
    padding: '0 60px',
    [theme.breakpoints.only('xs')]: {
      padding: '0'
    }
  },
  userName: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'rgba(60, 72, 89, 0.89)'
  },
  welcomeContainer: {},
  welcomeStyle: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '32px',
    lineHeight: '44px',
    color: '#3C4858',
    paddingRight: '10px'
  },
  logoStyle: {
    // width: '130px',
    height: '40px'
  },
  questionStyle: {
    ...theme.font.default,
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '38px',
    color: '#164C6D',
    textTransform: 'uppercase',
    paddingTop: '75px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '32px'
    }
  },
  rowOne: {
    paddingBottom: '55px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '16px'
    }
  },
  buttonStyle: {
    width: '240px',
    height: '180px',
    background: '#FFFFFF',
    boxShadow: '20px 20px 30px rgba(122, 131, 163, 0.1)',
    borderRadius: '6px',
    display: 'inline-block',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  buttonHoverFb: {
    '&:hover': {
      background: '#FFFFFF',
      border: '2.5px solid #6F8DED',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(111, 141, 237, 0.15)',
      borderRadius: '6px'
    }
  },
  buttonHoverPage: {
    '&:hover': {
      background: '#FFFFFF',
      border: '2.5px solid #FDC676',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(253, 198, 118, 0.15)',
      borderRadius: '6px'
    }
  },
  buttonHoverYoutube: {
    '&:hover': {
      background: '#FFFFFF',
      border: '2.5px solid #E5918B',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(229, 145, 139, 0.15)',
      borderRadius: '6px'
    }
  },
  buttonHoverInsta: {
    '&:hover': {
      background: '#FFFFFF',
      border: '2.5px solid #F26C99',
      boxSizing: 'border-box',
      boxShadow: '20px 20px 30px rgba(242, 108, 153, 0.15)',
      borderRadius: '6px'
    }
  },
  disabledButton: {
    background: '#E2E7F8'
  },
  logoButton: {
    width: '48px',
    height: '48px'
  },
  buttonName: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#394878',
    textAlign: 'center',
    margin: '0',
    paddingTop: '22px'
  },
  buttonDescription: {
    ...theme.font.default,
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#9DA4BA',
    textAlign: 'center',
    margin: '0',
    paddingTop: '7px'
  },
  frameContainer: {
    width: '100%',
    height: '548px'
  },
  frameImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  actionWrapper: {
    position: 'relative',
    [theme.breakpoints.only('xs')]: {
      padding: '0 24px'
    },
  },
  btnWrapper: {
    zIndex: '1'
  },
  background: {
    position: 'absolute',
    zIndex: '0',
    width: '75%',
    right: '0',
    bottom: '-25%',
    opacity: '0.1',
    objectFit: 'cover',
    [theme.breakpoints.only('sm')]: {
      width: '115%',
      bottom: '15%',
      right: '-5%'
    },
    [theme.breakpoints.only('xs')]: {
      width: '200%',
      bottom: '35%',
      right: '-55%'
    },
  }
});
