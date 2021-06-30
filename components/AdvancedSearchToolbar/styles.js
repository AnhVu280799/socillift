export default theme => ({
  root: {},
  buttonToggleFilterDrawerWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '18px'
  },
  buttonToggleFilterDrawer: {
    width: '40px',
    height: '40px',
    boxShadow:
      '0px 2px 2px 0 rgba(153, 153, 153, 0.14), 0px 1px 5px 0 rgba(153, 153, 153, 0.12)',
    backgroundColor: '#ffffff'
  },
  buttonToggleFilterDrawerActive: {
    boxShadow:
      '0px 8px 18px 0 rgba(0, 159, 219, 0.14), 0px 10px 20px 0 rgba(0, 159, 219, 0.3)',
    backgroundColor: theme.colors.primary(),
    '&:hover, &:focus': {
      color: '#FFFFFF',
      backgroundColor: theme.colors.primary(),
      boxShadow:
        '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)'
    }
  },
  buttonIcon: {
    fontSize: '18px',
    color: theme.colors.baseGrey()
  },
  buttonIconActive: {
    color: '#fff'
  },
  totalItemsWrapper: {
    marginTop: '16px',
    marginBottom: '24px'
  },
  totalItems: {
    fontSize: '28px',
    lineHeight: '38px',
    fontWeight: 600
  },
  dropdownSortByWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '12px 0'
  },
  dropdownSortBy: {
    width: 250
  },
  dropdownShowingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '12px 0'
  },
  dropdownShowing: {
    width: 250
  },
  checkboxSelectAllWrapper: {
    display: 'flex',
    flexFlow: 'column',
    margin: '12px 0'
  },
  checkboxSelectAll: {
    paddingRight: '12px',
    margin: '0 auto'
  },
  buttonSelectAllResultWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '12px',
    textTransform: 'capitalize'
  },
  buttonSelectAllResult: {
    color: theme.colors.primary(),
    cursor: 'pointer'
  },
  dropdownCollectionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '12px 0'
  },
  dropdownCollection: { width: 189 },
  [theme.breakpoints.up('md')]: {
    totalItemsWrapper: {
      order: 1,
      paddingTop: '30px',
      margin: 0
    },
    totalItems: {
      textAlign: 'left'
    },
    buttonToggleFilterDrawerWrapper: {
      order: 2
    },
    checkboxSelectAllWrapper: {
      maxWidth: 'initial',
      flexBasis: 'initial',
      margin: 0
    },
    checkboxSelectAll: {
      margin: '0 0 0 -12px',
      padding: '0 16px 0 0',
      textAlign: 'left'
    },
    buttonSelectAllResultWrapper: {
      justifyContent: 'start',
      padding: 0
    },
    dropdownCollectionWrapper: {
      maxWidth: 'initial',
      flexBasis: 'initial',
      margin: 0
    },
    dropdownSortByWrapper: {
      maxWidth: '200px',
      marginLeft: 'auto'
    },
    dropdownShowingWrapper: {
      maxWidth: '175px',
      marginLeft: 'auto'
    },
    groupOne: {
      order: 4,
      marginTop: '16px',
      maxWidth: '407px',
      marginLeft: 'auto',
      flexBasis: '40%'
    },
    groupTwo: {
      order: 3,
      alignItems: 'center',
      marginTop: '16px',
      maxWidth: '550px',
      flexBasis: '60%'
    }
  },
  [theme.breakpoints.up('lg')]: {
    checkboxSelectAllWrapper: {
      flexFlow: 'row wrap',
      alignItems: 'center'
    },
    buttonSelectAllResultWrapper: {
      paddingRight: '16px'
    },
    buttonSelectAllResult: {
      '&:before': {
        content: '"•"',
        margin: '0px 12px 0px 0px',
        color: theme.colors.grey(),
        fontSize: '16px'
      }
    }
  }
});
