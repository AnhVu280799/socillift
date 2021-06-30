export default theme => ({
  wrapPage: {
    padding: '15px 0 0 0'
  },
  loadingWrapper: {
    marginTop: "4px",
    marginBottom: "16px",
  },
  loadingNotification: {
  },
  loadingText: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: "16px 0",
  },
  progressBarContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: "0 0 16px 0",
    textAlign: "-webkit-center",
    margin: "0 auto"
  },
  progressBar: {
    width: "60%",
  },
  iconDesign: {
    fontSize: '50px',
    color: theme.colors.primary(1.0)
  },
  paperSize: {
    width: '100%',
    height: '100%',
    borderRadius: '3px'
  },
  iconContainer: {
    padding: '0 22px',
    backgroundColor: theme.colors.primary(0.1)
  },
  valueContainer: {
    height: '100%'
  },
  titleSize: {
    ...theme.font.default,
    textAlign: 'left',
    fontSize: '12px',
    color: theme.colors.grey(1.0),
    textTransform: 'uppercase'
  },
  valueSize: {
    ...theme.font.default,
    fontSize: '40px',
  },
  contentSize: {
    padding: '16px',
    position: 'relative'
  },
  infoIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: '21px',
    color: '#818181',
    zIndex: '10000',
    '&:hover': {
      color: theme.colors.primary(1.0)
    }
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "center",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white()
  },
  subTitle: {
    ...theme.font.default,
    fontSize: '13px',
    color: theme.colors.grey(1.0),
    textAlign: 'left',
    padding: '10px 0'
  },
  subValue: {
    ...theme.font.default,
    fontSize: '16px',
    textAlign: 'left',
    fontWeight: '600'
  },
  subContent: {
    backgroundColor: 'rgb(232, 232, 232, 0.5)',
    padding: '17px 28px',
    position: 'relative',
  },
  arrowIcon: {
    padding: '0',
    margin: '0',
    fontSize: '90px',
    position: 'absolute',
    left: -42,
    top: '10%',
    color: '#ffffff',
  },
  recentpostTitle: {
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontSize: '18px',
    textAlign: 'left',
    margin: '30px 0 0 0',
    padding: '0',
    width: '100%'
  },
  postWrapper: {
    width: '100%',
    height: 'auto',
    position: 'relative',
  },
  postPaper: {
    width: '100%',
    height: 'fit',
    borderRadius: '6px',
    boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
    margin: '16px 0 0 16px',
  },
  postContainer: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    width: '41%',
    height: '100%',
    padding: '0 20px 0 0',
  },
  contentWrapperStatus: {
    width: '68%',
    height: '100%',
    padding: '0 20px 0 0',
  },
  postTilte: {
    ...theme.font.default,
    fontSize: '16px',
    padding: '24px 0 0 48px',
    width: '100%',
    textAlign: 'justify',
    fontWeight: '600',
  },
  postContentYoutube: {
    ...theme.font.default,
    fontSize: '14px',
    padding: '12px 0 0 48px',
    width: '100%',
    textAlign: 'justify',
  },
  postContent: {
    ...theme.font.default,
    fontSize: '14px',
    padding: '28px 0 0 48px',
    width: '100%',
    textAlign: 'justify',
  },
  postTime: {
    ...theme.font.default,
    fontSize: '12px',
    width: '100%',
    padding: '15px 0 25px 47px',
    color: theme.colors.grey(1.0),
  },
  audioContent: {
    width: '27%',
    height: '100%',
    padding: '0',
    margin: '0',
    position: 'relative',
  },
  audioContentStatus: {
    width: '0%',
    height: '100%',
    padding: '0',
    margin: '0',
    position: 'relative',
  },
  postImage: {
    height: '95px',
    width: '75%',
    borderRadius: '6px',
    display: 'block',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    objectFit: 'cover',
  },
  postNonImage: {
    visibility: 'hidden'
  },
  postVideoImage: {
    height: '95px',
    width: '90%',
    borderRadius: '6px',
    display: 'block',        
    backgroundPosition: 'center',
    backgroundSize: '100%',
    objectFit: 'cover',
    backgroundColor: theme.colors.baseGrey(0.6),
  },
  postImgWrapperYoutube: {
    padding: '0 10px 0 0'
  },
  extNumImage: {
    ...theme.font.default,
    fontSize: '26px',
    color: '#ffffff',
    position: 'absolute',
    bottom: '5%',
    right: '8%',
  },
  overlay:{
    height: '95px',
    width: '75%',
    position: 'absolute',
    borderRadius: '6px',
    backgroundColor: theme.colors.baseGrey(0.6),
    textAlign: 'right',
  },
  overlayVideoYoutube:{
    height: '95px',
    width: '90%',
    position: 'absolute',
    borderRadius: '6px',
    backgroundColor: theme.colors.baseGrey(0.6),
    textAlign: 'right',
  },
  secondImageOverlay: {
    position: 'relative'
  },
  playIcon: {
    position: 'absolute',
    fontSize: '28px',
    top: '40%',
    left: '45%',
    color: '#ffffff',
  },
  playIconYoutube: {
    position: 'absolute',
    top: '35%',
    left: '40%',
    width: '25%',
  },
  totalEngagement: {
    borderLeft: '1px solid rgb(0, 0, 0, 0.05)',
    padding: '0',
    width: '12%',
  },
  totalEngagementTitle: {
    ...theme.font.default,
    fontSize: '13px',
    textAlign: 'left',
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '30px 0 5px 20px'
  },
  totalEngagementValue: {
    ...theme.font.default,
    fontSize: '36px',
    textAlign: 'left',
    padding: '0 0 20px 20px'
  },
  activeUserStyle: {
    width: '12%',
    borderLeft: '1px solid rgb(0, 0, 0, 0.05)',
    padding: '0px'
  },
  activeUserStyleTitle: {
    ...theme.font.default,
    fontSize: '13px',
    textAlign: 'left',
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '30px 0 5px 20px'
  },
  activeUserStyleValue: {
    ...theme.font.default,
    fontSize: '36px',
    textAlign: 'left',
    padding: '0 0 20px 20px'
  },
  listContainer: {
    padding: '0',
    margin: '0',
    width: '20%',
  },
  subContentPost: {
    backgroundColor: 'rgb(232, 232, 232, 0.2)',
    borderLeft: '1px solid rgb(0, 0, 0, 0.05)',
    // padding: '17px 60px 10px 0',
    // margin: '0 50px',
  },
  subTitlePost: {
    ...theme.font.default,
    fontSize: '13px',
    color: theme.colors.grey(1.0),
    textAlign: 'left',
    padding: '8px 0 8px 22px'
  },
  subValuePost: {
    ...theme.font.default,
    fontSize: '18px',
    textAlign: 'left',
    padding: '5px 10px'
  },
  ellipseLaunch: {
    width: '40px',
    height: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    boxShadow: '0px 1px 2px 0 rgba(0, 0, 0, 0.16)',
  },
  launchIcon: {
    padding: '3px 0 0 0',
    color: theme.colors.grey(1.0)
  },
  ellipsePostType: {
    width: '48px',
    height: '48px',
    backgroundColor: '#000000',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: '0px 2px 3px 0 rgba(0, 0, 0, 0.2)',
  },
  iconPostType: {
    color: '#ffffff',
    fontSize: '20px',
  },
  post: {
    backgroundColor: theme.colors.primary(1.0)
  },
  postPhoto: {
    backgroundColor: theme.colors.info(1.0)
  },
  postVideo: {
    backgroundColor: '#e91e63'
  },
  postLink: {
    backgroundColor: '#9b27af'
  },
  postStatus: {
    backgroundColor: theme.colors.baseGrey(1.0),
    transform: 'rotate(180deg)'
  },
  postEvent: {
    backgroundColor: theme.colors.chartDarkBlue(1.0),
  },
  postNote: {
    backgroundColor: theme.colors.chartBlue(1.0),
  },
  hidden: {
    visibility: 'hidden',
  },
  visible: {
    visibility: 'visible'
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white()
  },
  toolTipIcon: {
    fontSize: '21px',
    color: theme.colors.grey(1.0),
    position: "absolute",
    right: "10px",
    bottom: "10px",
    zIndex: "10000",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey(1.0)
    }
  },
  lastTooltip: {
    left: "-29px"
  },
  detailEngagement: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white(),
    margin: "0",
    padding: "0"
  }
})
