// ##############################
// // // Sidebar styles
// #############################

import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  boxShadow
} from 'assets/jss/material-dashboard-pro-react.jsx';

const sidebarStyle = theme => ({
  drawerPaperRTL: {
    [theme.breakpoints.up('md')]: {
      left: 'auto !important',
      right: '0 !important'
    },
    [theme.breakpoints.down('sm')]: {
      left: '0  !important',
      right: 'auto !important'
    }
  },
  drawerPaper: {
    display: 'flex',
    flexFlow: 'column',
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1032',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    // overflow: 'auto',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.2)',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      // display: 'block',
      top: '0',
      // height: "100vh",
      height: '100%',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      // overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: '0'
    }
  },
  blackBackground: {
    color: '#FFFFFF',
    '&:after': {
      background: '#000',
      opacity: '.8'
    }
  },
  blueBackground: {
    color: '#FFFFFF',
    '&:after': {
      background: '#00acc1',
      opacity: '.93'
    }
  },
  whiteBackground: {
    color: '#3C4858',
    '&:after': {
      background: '#FFFFFF',
      opacity: '.93'
    }
  },
  whiteAfter: {
    '&:after': {
      backgroundColor: `${theme.colors.greyLight(0.3)} !important`
    }
  },
  drawerPaperMini: {
    width: drawerMiniWidth + 'px!important',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.2)'
  },
  logo: {
    padding: '20px 0 20px 0',
    margin: '0',
    display: 'block',
    position: 'relative',
    zIndex: '4',
    textAlign: 'center'
  },
  lineAfter: {
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '16px',
      width: 'calc(100% - 32px)',
      backgroundColor: 'hsla(0,0%,100%,.3)'
    }
  },
  logoMini: {
    maxHeight: '32px',
    color: theme.colors.baseGrey(1),
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1em'
  },
  logoImage: {
    maxWidth: '80%',
    margin: '5px 0',
    transition: 'all 300ms linear',
    opacity: 1,
    display: 'inline-block',
    maxHeight: '32px'
  },
  logoMiniRTL: {
    float: 'right',
    marginRight: '30px',
    marginLeft: '26px'
  },
  logoNormal: {
    ...theme.font.default,
    transition: 'all 300ms linear',
    display: 'block',
    opacity: '1',
    transform: 'translate3d(0px, 0, 0)',
    textTransform: 'uppercase',
    padding: '5px 0px',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    lineHeight: '30px',
    overflow: 'hidden',
    '&,&:hover,&:focus': {
      color: 'inherit'
    }
  },
  logoNormalRTL: {
    textAlign: 'right'
  },
  logoNormalSidebarMini: {
    opacity: '0',
    transform: 'translate3d(-25px, 0, 0)'
  },
  logoNormalSidebarMiniRTL: {
    transform: 'translate3d(25px, 0, 0)'
  },
  img: {
    width: '35px',
    verticalAlign: 'middle',
    border: '0'
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    transition: 'all 300ms linear'
  },
  list: {
    padding: '0',
    margin: '0',
    listStyle: 'none',
    color: 'inherit'
  },
  propIcon: {
    fontSize: '22px'
  },
  item: {
    color: 'inherit',
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: '0',
    padding: '0'
  },
  itemHover: {
    '&:hover': {
      outline: 'none',
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
      boxShadow: 'none'
    },
    '&,&:hover,&:focus': {
      color: theme.colors.baseGrey(0.8)
    }
  },
  itemLink: {
    ...theme.font.default,
    padding: '14px 12px 15px 18px',
    transition: 'all 300ms linear',
    margin: '0 16px 10px 16px',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    color: theme.colors.baseGrey(0.8),
    backgroundColor: 'transparent',
    width: 'auto',
    height: '50px',
    cursor: 'pointer'
  },
  itemLinkActive: {
    boxShadow: `0 4px 8px 0 ${theme.colors.primary(0.4)}`,
    '& > $itemText, & > $itemIcon': {
      opacity: 1.0
    }
  },
  itemIcon: {
    color: 'inherit',
    fontSize: '22px',
    float: 'left',
    position: 'inherit',
    marginRight: '0',
    opacity: '0.36'
  },
  itemIconMini: {
    fontSize: '22px',
    float: 'unset'
  },
  itemIconRTL: {
    float: 'right',
    marginLeft: '15px',
    marginRight: '1px'
  },
  itemText: {
    ...theme.font.default,
    color: 'inherit',
    margin: '0',
    marginLeft: '18px',
    lineHeight: '21px',
    transform: 'translate3d(0px, 0, 0)',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    position: 'relative',
    display: 'inline-block',
    height: 'auto',
    whiteSpace: 'nowrap',
    padding: '0',
    opacity: 0.8,
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  userItemText: {
    lineHeight: '22px'
  },
  itemTextRTL: {
    marginRight: '45px',
    textAlign: 'right'
  },
  itemTextMini: {
    transform: 'translate3d(-25px, 0, 0)',
    opacity: '0'
  },
  itemTextMiniRTL: {
    transform: 'translate3d(25px, 0, 0) !important'
  },
  collapseList: {
    margin: '0 0 10px 0',
    padding: '0 0 0.1px 0'
  },
  collapseItem: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: '0',
    padding: '0'
  },
  collapseActive: {
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    boxShadow: 'none',
    color: 'red'
  },
  collapseItemLink: {
    transition: 'all 300ms linear',
    margin: '0 16px 10px 16px',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '9px 12px 10px 18px',
    backgroundColor: 'transparent',
    ...theme.font.default,
    color: theme.colors.baseGrey(0.8),
    width: 'auto'
  },
  itemLinkMini: {
    margin: '0 10px 10px 10px',
    textAlign: 'center',
    padding: '13px 0 13px 0',
    height: '50px'
  },
  collapseItemMini: {
    color: 'inherit',
    ...theme.font.default,
    textTransform: 'uppercase',
    width: '30px',
    marginRight: '15px',
    textAlign: 'center',
    letterSpacing: '1px',
    position: 'relative',
    float: 'left',
    display: 'inherit',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    fontSize: '14px'
  },
  collapseItemMiniRTL: {
    float: 'right',
    marginLeft: '30px',
    marginRight: '1px'
  },
  groupLinkActive: {
    backgroundColor: theme.colors.black(0.05)
  },
  collapseItemText: {
    ...theme.font.default,
    color: 'inherit',
    opacity: 0.8,
    margin: '0',
    padding: '0',
    position: 'relative',
    transform: 'translateX(0px)',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    fontSize: '14px',
    lineHeight: '21px',
    marginLeft: '18px'
  },
  collapseItemTextRTL: {
    textAlign: 'right'
  },
  collapseItemTextMiniRTL: {
    transform: 'translate3d(25px, 0, 0) !important'
  },
  collapseItemTextMini: {
    transform: 'translate3d(-25px, 0, 0)',
    opacity: '0'
  },
  caret: {
    ...theme.caret.default,
    float: 'right',
    fontSize: '16px',
    margin: '1.5px 0 0 0',
    color: theme.colors.grey(1.0)
  },
  caretRTL: {
    left: '11px',
    right: 'auto'
  },
  caretActive: theme.caret.active,
  purple: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: theme.colors.primary(),
      ...theme.primaryBoxShadow
    }
  },
  sidebarWrapper: {
    position: 'relative',
    // height: 'calc(100vh - 75px)',
    flex: '1',
    width: drawerWidth,
    zIndex: '4',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    color: 'inherit',
    paddingBottom: '30px',
    overflow: 'hidden !important'
  },
  user: {
    padding: '0',
    margin: '0',
    textAlign: 'center',
    position: 'relative'
  },
  userMini: {
    marginBottom: '20px'
  },
  userName: {
    margin: '7.5px 0 0 0',
    ...theme.font.default,
    ...theme.font.heading4,
    ...theme.font.bold
  },
  userRole: {
    margin: '4px 0 0 0',
    ...theme.font.default,
    color: theme.colors.grey(1.0)
  },
  btnViewPlan: {
    ...theme.font.default,
    width: 'auto',
    height: '28px',
    fontSize: '14px',
    boxShadow: `0px 1px 1px 0 ${theme.colors.warning(0.3)}`,
    border: 'solid 0.5px rgba(255, 161, 24, 0.83)',
    backgroundColor: 'rgba(255, 152, 0, 0.01)',
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: '10px',
    textTransform: 'none',
    color: '#7b5523',
    alignItems: 'inherit',
    '&:hover': {
      color: '#FFFFFF !important',
      backgroundColor: theme.colors.warning()
    }
  },
  iconArrowRight: {
    fontSize: '22px',
    margin: '0',
    padding: '0',
    verticalAlign: 'middle'
  },
  userCaret: {
    fontSize: '16px',
    lineHeight: '22px'
  },
  userCaretWrapper: {
    transition: 'all 150ms ease-in',
    color: theme.colors.greyLight(1.0),
    backgroundColor: '#ffffff',
    fontSize: '16px',
    textAlign: 'center',
    padding: '0',
    width: '24px',
    height: '24px',
    border: 'solid 1px rgba(180, 180, 180, 0.3)',
    margin: '0',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-block'
  },
  userCaretLine: {
    textAlign: 'center',
    height: '24px',
    position: 'relative',
    '&:after': {
      bottom: '12px !important',
      zIndex: '-1'
    }
  },
  userCaretActive: {
    transform: 'rotate(-180deg)',
    color: '#ffffff',
    backgroundColor: '#b4b4b4'
  },
  userMenuWrapper: {
    margin: '11.5px 0 15px 0'
  },
  userMenuItemLink: {
    padding: '8px 0 5px 0',
    transition: 'all 300ms linear',
    margin: '0 17px 10px 17px',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    color: theme.colors.baseGrey(0.8),
    backgroundColor: 'transparent',
    ...theme.font.default,
    width: 'auto',
    textAlign: 'center',
    '&:first-of-type': {
      marginTop: '12px'
    }
  },
  userMenuItemLinkMini: {
    margin: '0px 5px 5px 5px',
    padding: '12px 0 8px 0',
    minWidth: '170px',
    '&:first-of-type': {
      marginTop: '5px'
    }
  },
  userMenuItemText: {
    ...theme.font.default,
    color: 'inherit',
    margin: '0',
    lineHeight: '20px',
    fontSize: '14px',
    transform: 'translate3d(0px, 0, 0)',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    position: 'relative',
    display: 'inline-block',
    height: 'auto',
    whiteSpace: 'nowrap',
    padding: '0'
  },
  floatingMenuHover: {
    pointerEvents: 'none'
  },
  floatingMenuHoverPaper: {
    pointerEvents: 'auto'
  },
  photo: {
    transition: 'all 300ms linear',
    width: '128px',
    height: '128px',
    overflow: 'hidden',
    zIndex: '5',
    borderRadius: '50%',
    display: 'inline-block',
    marginTop: '24px'
  },
  photoMini: {
    width: '45px',
    height: '45px',
    boxShadow: '0px 8px 10px 0 rgba(0, 0, 0, 0.2)',
    margin: '22px 0 27px 0'
  },
  photoRTL: {
    float: 'right',
    marginLeft: '12px',
    marginRight: '24px'
  },
  avatarImg: {
    width: '100%',
    verticalAlign: 'middle',
    border: '0'
  },
  userCollapseButton: {
    margin: '0',
    padding: '6px 15px',
    '&:hover': {
      background: 'none'
    }
  },
  userCollapseLinks: {
    marginTop: '-4px',
    '&:hover,&:focus': {
      color: '#FFFFFF'
    }
  },
  blue: {
    '&,&:hover,&:focus': {
      color: 'rgba(255, 255, 255, 1.0)',
      backgroundColor: theme.colors.primary(),
      ...theme.primaryBoxShadow
    }
  },
  green: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: theme.colors.success(),
      boxShadow:
        '0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)'
    }
  },
  orange: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: theme.colors.warning(),
      boxShadow:
        '0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)'
    }
  },
  red: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: theme.colors.danger(),
      boxShadow:
        '0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)'
    }
  },
  white: {
    '&,&:hover,&:focus': {
      color: '#3C4858',
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(60,72,88,.4)'
    }
  }
  // rose: {
  //   "&,&:hover,&:focus": {
  //     color: "#FFFFFF",
  //     backgroundColor: roseColor,
  //     boxShadow:
  //       "0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(233,30,99,.4)"
  //   }
  // }
});

export default sidebarStyle;
