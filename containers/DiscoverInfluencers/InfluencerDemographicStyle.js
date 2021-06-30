export default theme => ({
  root: {
    width: '100%',
    height: 'auto',
    marginTop: '23px',
    background: '#FFFFFF',
    boxShadow: '20px 20px 30px rgba(122, 131, 163, 0.1)',
    borderRadius: '6px',
    display: 'inline-block',
    padding: '24px 20% 0 20%',
    [theme.breakpoints.down('md')]: {
      padding: '24px'
    }
  },
  headerContainer: {
    width: '100%',
    padding: '0 0 16px 0'
  },
  titleText: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '38px',
    textAlign: 'center',
    color: '#164C6D',
    textTransform: 'uppercase',
    width: '100%',
    margin: '0'
  },
  descriptionStyle: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: 'rgba(60, 72, 88, 0.6)',
    margin: '0',
    paddingTop: '8px'
  },
  platformStyle: {
    ...theme.font.default,
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: '#164C6D',
    margin: '0',
    paddingLeft: '5px',
    display: 'inline-block'
  },
  sectionContainer: {
    width: '100%',
    marginBottom: '8px',
    paddingTop: '24px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '8px',
    }
  },
  sectionTitle: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    textAlign: 'left',
    paddingTop: '5px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0'
    }
  },
  sectionAction: {
    width: '100%',
    padding: '0 2%'
  },
  // checkBox Style
  checkboxBlank: {
    border: `solid 1px ${theme.colors.greyLight()}`,
    width: '20px',
    height: '20px',
    borderRadius: '3px',
    backgroundColor: '#ffffff'
  },
  checkboxChecked: {
    width: '20px',
    height: '20px',
    borderRadius: '3px',
    border: `solid 1px ${theme.colors.primary()}`,
    backgroundColor: `${theme.colors.primary()} !important`
  },
  checkIcon: {
    position: 'absolute',
    top: '7px',
    left: '2px',
    fontSize: '16px',
    color: '#ffffff',
    fontWeight: '600'
  },
  // checkField Style
  checkFieldContainer: {
    width: '100%',
    display: 'contents'
  },
  itemCheckField: {
    width: '100%',
    height: '30px',
    textAlign: 'left',
    display: 'inline-flex'
  },
  checkbox: {
    padding: '0',
    margin: '0 7px 0 0'
  },
  checkFieldTitle: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    margin: '0',
    paddingTop: '5px'
  },
  descritionCheckFieldContainer: {
    display: 'inline-grid',
    paddingLeft: '27px'
  },
  checkFieldDescription: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#9DA4BA',
    width: '100%',
    textAlign: 'left'
  },
  iconInfSize: {
    width: '30px',
    height: '100%',
    marginLeft: '5px'
  },
  iconInfType: {
    opacity: '0.8',
    marginLeft: '5px'
  },
  // check Field Influencer Size
  checkFieldSizeWrapper: {},
  checkFieldSizeContainer: {
    padding: '0 0 16px 0'
  },
  horizontalLine: {
    width: '100%',
    height: '1px',
    borderBottom: '1px solid #E4E7F0',
    paddingTop: '24px'
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: 'left',
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
    opacity: '0.95',
    borderRadius: '3px',
    fontSize: '14px',
    color: theme.colors.white()
  },
  lastTooltip: {
    left: '-29px'
  },
  toolTipIconSize: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: 'absolute',
    left: '94px',
    top: '4px',
    zIndex: '10',
    transform: 'rotate(180deg)',
    '&:hover': {
      color: theme.colors.baseGrey()
    },
    [theme.breakpoints.down('sm')]: {
      left: '95px',
      top: '15px',
    },
  },
  toolTipIconType: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: 'absolute',
    left: '98px',
    top: '4px',
    zIndex: '10',
    transform: 'rotate(180deg)',
    '&:hover': {
      color: theme.colors.baseGrey()
    },
    [theme.breakpoints.down('sm')]: {
      left: '99px',
      top: '15px',
    },
  },
  toolTipIconProfession: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: 'absolute',
    left: '134px',
    top: '4px',
    zIndex: '10',
    transform: 'rotate(180deg)',
    '&:hover': {
      color: theme.colors.baseGrey()
    },
    [theme.breakpoints.down('sm')]: {
      left: '135px',
      top: '15px',
    },
  },
  toolTipIconProfessionYoutube: {
    left: '116px'
  },
  toolTipIconProfessionPage: {
    left: '160px'
  },
  itemContainerProfession: {
    width: '100%',
    textAlign: 'left'
  },
  exampleTitle: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#9DA4BA',
    width: '100%',
    textAlign: 'left',
    paddingTop: '24px',
    paddingBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  },
  exProfessionContainer: {
    width: '20%',
    height: '80px',
    background: '#FFFFFF',
    display: 'inline-block',
    [theme.breakpoints.only('sm')]: {
      width: '25%'
    },
    [theme.breakpoints.only('xs')]: {
      width: '50%'
    }
  },
  exProfessionBorder: {
    border: '0.5px solid rgba(0, 159, 219, 0.8)',
    boxSizing: 'border-box',
    borderRadius: '6px',
    width: 'auto',
    height: '100%',
    padding: '10px',
    margin: '0 16px',
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  },
  exProfessionName: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    textAlign: 'center'
  },
  btnBack: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#FFFFFF',
    textAlign: 'center',
    boxShadow: '0px 4px 4px rgba(204, 208, 223, 0.2)',
    background: '#CCD0DF',
    width: '110px'
  },
  btnApply: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#FFFFFF',
    textAlign: 'center',
    boxShadow: '0px 4px 4px rgba(204, 208, 223, 0.2)',
    background: '#009FDB',
    width: '110px'
  },
  itemContainer: {
    width: '100%',
    // margin: "8px -8px -8px -8px",
    textAlign: 'left'
  },
  itemText: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    margin: '0',
    padding: '10px 0'
  },
  itemGroup: {
    width: '100%',
    margin: '0',
    padding: '48px 0 0 0'
  },
  checkboxGroup: {
    margin: '-4px 0 0 0',
    display: 'inline-flex'
  },
  oneLineItem: {
    // padding: "8px",
    display: 'block',
    position: 'relative'
  },
  error: {
    ...theme.font.default,
    color: theme.colors.danger(1.0),
    fontSize: 12,
    lineHeight: '21px',
    paddingTop: '8px',
    margin: '0'
  }
});
