export default theme => ({
  paperSize: {
    width: '100%',
    height: '400px',
    borderRadius: '6px'
  },
  postContainer: {
    width: '100%',
    height: '100%',
    // position: 'relative',
  },
  totalEngagementsTitle: {
    width: '100%',
    height: '10%',
    ...theme.font.default,
    fontSize: '14px',
    textAlign: 'center',
    color: theme.colors.grey(),
    paddingTop: '6%',
    paddingBottom: '6%'
  },
  totalEngagementsValue: {
    width: '100%',
    height: '10%',
    ...theme.font.default,
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.baseGrey(),
    borderBottom: '1px solid rgb(232, 232, 232)',
    paddingBottom: '20%',
    position: 'relative'
  },
  postMedia: {
    width: '100%',
    height: '50%',
    position: 'relative',
    // paddingTop: '2%',
    paddingBottom: '3%',
  },
  postMessageNonPhoto: {
    width: '100%',
    height: 'auto',
    ...theme.font.default,
    fontSize: '14px',
    fontStretch: 'normal',
    textAlign: 'left',
    color: theme.colors.baseGrey(),
    wordBreak: "break-word",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
    paddingTop: '10%',
    paddingLeft: '6%',
    paddingRight: '6%',
    maxWidth: 'fit-content',
    maxHeight: 'fit-content',
  },
  postMessagePhoto: {
    width: '100%',
    height: '10%',
    ...theme.font.default,
    fontSize: '14px',
    fontStretch: 'normal',
    textAlign: 'left',
    color: theme.colors.baseGrey(),
    wordBreak: "break-word",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
    paddingLeft: '6%',
    paddingRight: '6%',
    maxWidth: 'fit-content',
    maxHeight: 'fit-content',
  },
  postCreatedTime: {
    width: '100%',
    height: '10%',
    ...theme.font.default,
    fontSize: '12px',
    textAlign: 'left',
    color: theme.colors.grey(),
    paddingTop: '2%',
    paddingLeft: '6%',
  },
  postCreatedTimeNonContent: {
    paddingTop: '10%',
  },
  postImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    objectFit: 'cover',
  },
  overlayExtNumImage:{
    width: '23%',
    height: '14%',
    position: 'absolute',
    borderRadius: '16px',
    backgroundColor: theme.colors.baseGrey(0.9),
    textAlign: 'right',
    right: '4%',
    bottom: '15%'
  },
  extNumImage: {
    ...theme.font.default,
    fontSize: '13px',
    color: '#ffffff',
    position: 'absolute',
    textAlign: 'left',
  },
  overlayVideo:{
    width: '100%',
    height: '94%',
    position: 'absolute',
    backgroundColor: theme.colors.baseGrey(0.4),
    textAlign: 'right',
    top: '0%',
    left: '0%',
  },
  playIcon: {
    fontSize: '48px',
    position: 'absolute',
    top: '40%',
    left: '42%',
    color: '#ffffff',
    textAlign: 'center',
  },
  postNonImage: {
    visibility: 'hidden'
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
  ellipsePostType: {
    width: '48px',
    height: '48px',
    backgroundColor: '#000000',
    borderRadius: '50%',
    position: 'absolute',
    left: '2%',
    bottom: '-40%',
    boxShadow: '0px 2px 3px 0 rgba(0, 0, 0, 0.2)',
    zIndex: '1',
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
})
