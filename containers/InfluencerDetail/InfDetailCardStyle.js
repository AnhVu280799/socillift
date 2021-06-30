export default (theme) => ({
  paper: {
    margin: '48px 0 41px 0',
    borderRadius: '6px',
    boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.14)',
    textAlign: 'left',
  },
  paperInfo: {
    // paddingBottom: "16px"
  },
  footer: {
    backgroundColor: theme.colors.primary(0.06),
    height: '64px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  statusWrapper: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      margin: '0 auto',
      padding: '16px 0',
    },
  },
  actionWrapper: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      margin: '0 auto',
      padding: '16px 0',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  statusTitle: {
    ...theme.font.default,
    fontSize: '16px',
    color: theme.colors.grey(1.0),
    marginLeft: '24px',
    display: 'inline-block',
    [theme.breakpoints.down('md')]: {
      margin: '0',
    },
  },
  status: {
    textTransform: 'uppercase',
    ...theme.font.default,
    fontWeight: 'bold',
    marginLeft: '9px',
    display: 'inline-block',
    fontSize: '16px',
  },
  button: {
    textTransform: 'none',
    ...theme.font.default,
    fontSize: '12px',
    padding: '7px 13px 7px 12px',
    minHeight: '32px',
    borderRadius: '16px',
    '&:hover': {
      border: `solid 0 ${theme.colors.grey(1.0)}`,
      boxShadow: `0px 2px 4px 0 ${theme.colors.baseGrey(0.16)}`,
      backgroundColor: '#ffffff',
    },
    marginRight: '5px',
    '&:last-of-type': {
      marginRight: '14px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0',
      '&:last-of-type': {
        marginRight: '0',
      },
      padding: '8px',
    },
  },
  btnPrimary: {
    color: theme.colors.primary(1.0),
    '&:hover': {
      border: `solid 0 ${theme.colors.primary(1.0)}`,
      boxShadow: `0px 2px 4px 0 ${theme.colors.primary(0.16)}`,
    },
  },
  btnIcon: {
    marginRight: '4px',
    '& > path': {
      fill: theme.colors.baseGrey(1.0),
    },
  },
  btnIconPrimary: {
    '& > path': {
      fill: theme.colors.primary(1.0),
    },
  },
  socialNetworkIcon: {
    '& > path': {
      fill: theme.colors.baseGrey(1.0),
      '&:hover': {
        fill: theme.colors.primary(1.0),
      },
    },
  },
  socialNetworkBtn: {
    padding: '0',
    margin: '8px auto',
    minHeight: '0',
    minWidth: '0',
  },
  socialContainer: {
    maxWidth: '80px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      width: '100%',
    },
  },
  imgContainer: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '216px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  img: {
    width: '100%',
    marginTop: '-24px',
    borderRadius: '50%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '216px',
    },
  },
  bioContainer: {
    paddingLeft: '24px',
    paddingRight: '24px',
    [theme.breakpoints.up('lg')]: {
      minWidth: 'calc(100% - 296px)',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  nameWrapper: {
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      paddingTop: '8px',
    },
  },
  name: {
    ...theme.font.default,
    fontSize: '36px',
    fontWeight: '600',
  },
  dropDownWrapper: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      paddingTop: '24px',
      paddingBottom: '24px',
    },
  },
  header: {
    minHeight: '70px',
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: '0',
      content: '""',
      height: '1px',
      opacity: '0.5',
      backgroundColor: '#e8e8e8',
      width: '100%',
    },
  },
  sidebarButton: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    margin: '0',
    boxShadow: `0px 2px 2px 0 ${theme.colors.grey(
      0.14
    )}, 0px 1px 5px 0 ${theme.colors.grey(0.12)}`,
    backgroundColor: '#ffffff !important',
    '&:hover': {
      boxShadow: '0px 4px 23px 0 rgba(0, 0, 0, 0.12) !important',
    },
    '&:focus': {
      boxShadow: `0px 3px 1px 0 ${theme.colors.grey(0.2)}`,
    },
    borderRadius: '50%',
  },
  sidebarMiniIcon: {
    color: theme.colors.grey(),
  },
  bioBody: {
    minHeight: '139px',
  },
  info: {
    paddingTop: '8px',
  },
  flexNone: {
    paddingTop: '8px',
    paddingRight: '24px',
    flex: 'none',
    width: '100%',
    [theme.breakpoints.only('md')]: {
      paddingRight: '0',
      paddingTop: '24px',
      paddingBottom: '16px',
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '16px',
    },
  },
  flexOne: {
    paddingTop: '8px',
    width: 'auto',
    flex: '1',
    maxWidth: 'none',
    [theme.breakpoints.only('md')]: {
      paddingRight: '0',
      paddingTop: '24px',
      paddingBottom: '16px',
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '16px 16px 24px 16px',
    },
  },
  field: {
    '&:nth-child(odd)': {
      marginTop: '4.5px',
      marginBottom: '5.5px',
    },
    '&:nth-child(even)': {
      marginTop: '4.5px',
      marginBottom: '4.5px',
    },
    '&:nth-child(1)': {
      marginTop: '2px',
      marginBottom: '3px',
      [theme.breakpoints.only('md')]: {
        width: '20%',
        display: 'inline-block',
      },
    },
    '&:nth-child(2)': {
      [theme.breakpoints.only('md')]: {
        width: '20%',
        display: 'inline-block',
      },
    },
    [theme.breakpoints.only('md')]: {
      width: '30%',
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  export: {
    ...theme.font.default,
    fontSize: '13px',
    lineHeight: '20px',
    color: theme.colors.primary(1.0),
  },
  fieldTitle: {
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontSize: '14px',
  },
  fieldValue: {
    ...theme.font.default,
    fontSize: '14px',
  },
  groupIcon: {
    color: theme.colors.grey(1.0),
    fontSize: '18px',
  },
  groupName: {
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontWeight: 'bold',
    marginLeft: '7px',
  },
  groupTitle: {
    marginTop: '3.5px',
  },
  size: {
    ...theme.font.default,
    fontSize: '12px',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '12px',
    textTransform: 'uppercase',
    height: '24px',
    minWidth: '60px',
    '& > span': {
      paddingLeft: '8px !important',
      paddingRight: '8px !important',
    },
  },
  micro: {
    backgroundColor: theme.colors.success(1.0),
  },
  mega: {
    backgroundColor: theme.colors.danger(1.0),
  },
  macro: {
    backgroundColor: theme.colors.warning(1.0),
  },
  potential: {
    backgroundColor: theme.colors.baseGrey(1.0),
  },
  under_potential: {
    backgroundColor: theme.colors.greyLight(1.0),
  },
  popper: {
    top: '-10px !important',
  },
  infoField: {
    width: 'fit-content',
  },
  infoValue: {
    width: 'fit-content',
    marginLeft: '10px',
  },
  tooltipField: {
    ...theme.font.default,
    color: theme.colors.grey(1.0),
    fontSize: '13px',
    lineHeight: '21px',
    margin: '4px 0',
  },
  tooltipValue: {
    color: '#ffffff',
  },
  categories: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '24px',
    marginTop: '6.5px',
  },
  profession: {
    backgroundColor: theme.colors.greyLightest(1.0),
    borderRadius: '14px',
    ...theme.font.default,
    fontSize: '14px',
    minHeight: '28px',
    '& > span': {
      paddingLeft: '8px !important',
      paddingRight: '8px !important',
      whiteSpace: 'pre-wrap !important',
    },
    height: 'fit-content',
    margin: '4px 2px',
  },
  professions: {
    margin: '5.5px -2px',
  },
  socialNetworkIconDisable: {
    '& > path': {
      fill: theme.colors.greyLight(1.0),
      '&:hover': {
        fill: theme.colors.greyLight(1.0),
      },
    },
  },
  linkNormal: {
    marginRight: '17px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      width: '100%',
      margin: '0',
      textAlign: 'center',
    },
  },
  linkDisable: {
    pointerEvents: 'none',
  },
});
