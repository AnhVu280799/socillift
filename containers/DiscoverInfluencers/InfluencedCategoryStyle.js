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
    paddingTop: '24px'
  },
  sectionTitle: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    textAlign: 'left',
    paddingTop: '5px',
    position: 'relative'
  },
  sectionAction: {
    width: '100%',
    padding: '8px 2%',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0'
    }
  },
  horizontalLine: {
    width: '100%',
    height: '1px',
    borderBottom: '1px solid #E4E7F0',
    paddingTop: '48px'
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
  toolTipIconCate: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: 'absolute',
    left: '103px',
    top: '4px',
    zIndex: '10',
    transform: 'rotate(180deg)',
    '&:hover': {
      color: theme.colors.baseGrey()
    }
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
    paddingTop: '24px'
  },
  exCategoryContainer: {
    width: '20%',
    height: '80px',
    background: '#FFFFFF',
    display: 'inline-block',
    marginBottom: '32px',
    [theme.breakpoints.only('sm')]: {
      width: '25%',
      margin: '0',
    },
    [theme.breakpoints.only('xs')]: {
      width: '50%',
      margin: '0',
    }
  },
  exCategoryBorder: {
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
  exCategoryName: {
    ...theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#394878',
    textAlign: 'center'
  },
  sectionButtonContainer: {
    width: '100%',
    marginBottom: '8px',
    paddingTop: '256px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '32px'
    }
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
  itemContainerCategory: {
    width: '100%',
    textAlign: 'left'
  }
});
