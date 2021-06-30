export default theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },
  pageWrapper: {
    display: 'flex',
    flexFlow: 'column',
    padding: '0 16px'
  },
  pageWrapperCollapsed: {
    maxWidth: `calc(100% - ${theme.filterDrawerWidth})`,
    flexBasis: `calc(100% - ${theme.filterDrawerWidth})`
  },
  content: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
  },
  listInfluencers: {
    maxWidth: '376px'
  },
  filterChips: {
    maxHeight: '100px'
  },
  snackBar: {
    bottom: 0,
    '& > div': {
      marginBottom: 0
    }
  },
  snackBarPinned: {
    position: 'initial'
  },
  snackBarShrink: {},
  [theme.breakpoints.up('sm')]: {
    root: {
      flexFlow: 'row'
    },
    snackBar: {
      bottom: '45px',
      '& > div': {
        marginBottom: '20px'
      }
    },
    snackBarPinned: {
      position: 'fixed'
    },
    snackBarShrink: {
      right: theme.filterDrawerWidth
    }
  },
  [theme.breakpoints.up('md')]: {
    pageWrapper: {
      padding: theme.defaultContentPadding
    },
    listInfluencers: {
      maxWidth: '784px',
      marginTop: '48px'
    },
    influencerCard: {
      '&:nth-child(2n+1)': {
        paddingRight: '16px'
      },
      '&:nth-child(2n+2)': {
        paddingLeft: '16px'
      }
    }
  },
  [theme.breakpoints.up('lg')]: {
    listInfluencers: {
      maxWidth: '1192px'
    },
    influencerCard: {
      '&:nth-child(3n+1)': {
        paddingLeft: 0,
        paddingRight: '16px'
      },
      '&:nth-child(3n+2)': {
        paddingLeft: '16px',
        paddingRight: '16px'
      },
      '&:nth-child(3n+3)': {
        paddingLeft: '16px',
        paddingRight: 0
      }
    }
  }
});
