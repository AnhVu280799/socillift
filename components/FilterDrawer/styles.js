const transition = {
  transitionProperty: 'top, bottom, width',
  transitionDuration: '.2s, .2s, .35s',
  transitionTimingFunction: 'linear, linear, ease'
};

const style = theme => ({
  root: {
    flexShrink: 0
  },
  paper: {
    borderLeft: 'unset',
    boxShadow: '-1px 0px 0 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgb(255, 255, 255)',
    textAlign: 'left',
    overflow: 'hidden'
  },
  open: {
    width: '100%',
    ...transition
  },
  close: {
    width: 0,
    ...transition
  },
  titleWrapper: {},
  btnLabel: {
    fontWeight: 400
  },
  selectionSimple: {
    width: 'calc(100% - 32px)',
    marginLeft: '32px'
  },
  selectionAdv: {
    width: 'calc(100% - 96px)',
    marginLeft: '32px'
  },
  selectionSimpleGender: {
    width: '100%',
    marginLeft: '0'
  },
  selectionAdvGender: {
    width: 'calc(100% - 64px)',
    marginLeft: '0'
  },
  percentSign: {
    ...theme.font.default,
    fontSize: '14px',
    color: theme.colors.grey(1.0),
    position: 'absolute',
    top: '15px',
    right: '2px',
    lineHeight: '32px'
  },
  CancelIcon: {
    fontSize: '18px',
    lineHeight: '32px',
    position: 'absolute',
    top: '14px',
    left: '8px',
    height: 'unset',
    cursor: 'pointer'
  },
  lineAfter: {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors.greyLightest()
    }
  },
  percentInput: {
    ...theme.font.default,
    fontSize: '14px',
    color: theme.colors.grey(1.0),
    width: '39px',
    position: 'absolute',
    top: '13px',
    right: '25px',
    paddingBottom: '3px',
    lineHeight: '1.1875em'
  },
  filterWrapper: {
    flex: 1
  },
  title: {
    ...theme.font.default,
    ...theme.font.heading3,
    margin: '14.5px 0 11.5px 24px',
    display: 'inline-block'
  },
  titleIcon: {
    color: theme.colors.grey(),
    fontSize: '26px',
    float: 'right',
    margin: '19.5px 19px 0 0',
    cursor: 'pointer'
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    position: 'relative',
    width: 'inherit',
    bottom: '0',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors.greyLightest()
    }
  },
  buttonApply: {
    ...theme.button.primary,
    margin: '17px 0 18px 25px',
    fontSize: '12px',
    padding: '8.5px 0',
    width: '109px'
  },
  buttonReset: {
    ...theme.button.default,
    margin: '17px 25px 18px 0',
    float: 'right',
    fontSize: '12px',
    padding: '8.5px 0',
    width: '103px'
  },
  checkbox: {
    padding: '0',
    margin: '-3px 7px 0 0'
  },
  checkboxBlank: {
    border: `solid 1px ${theme.colors.greyLight()}`,
    width: '20px',
    height: '20px',
    borderRadius: '3px',
    backgroundColor: '#ffffff'
  },
  radiobox: {
    padding: '0',
    margin: '0 7px 0 0'
  },
  radioboxBlank: {
    border: `solid 1px ${theme.colors.greyLight()}`,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#ffffff'
  },
  radioboxChecked: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `solid 1px ${theme.colors.primary()}`,
    color: `${theme.colors.primary()} !important`
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
    top: '1.3px',
    left: '2px',
    fontSize: '16px',
    color: '#ffffff',
    fontWeight: '600'
  },
  checkFieldTitle: {
    ...theme.font.default,
    fontSize: '14px',
    margin: '0'
  },
  singleValueAdv: {
    width: '117px'
  },
  item: {
    padding: '8px',
    display: 'inline-block'
  },
  oneLineItem: {
    padding: '8px',
    display: 'block',
    position: 'relative'
  },
  error: {
    ...theme.font.default,
    color: theme.colors.danger(1.0),
    fontSize: 12,
    lineHeight: '21px',
    paddingTop: 0,
    marginTop: -3.5,
    paddingBottom: 13.5
  },
  simpleAdvance: {
    padding: '4px 8px',
    ...theme.font.default,
    color: theme.colors.primary(1.0),
    fontSize: '13px',
    lineHeight: '1em',
    width: 'fit-content',
    cursor: 'pointer',
    '-webkit-user-select': 'none' /* Chrome all / Safari all */,
    '-moz-user-select': 'none' /* Firefox all */,
    '-ms-user-select': 'none' /* IE 10+ */,
    userSelect: 'none'
  },
  itemContainer: {
    margin: '8px -8px -8px -8px'
  },
  addMoreBtn: {
    border: `solid 1px ${theme.colors.primary(1.0)}`,
    ...theme.font.default,
    color: theme.colors.primary(1.0),
    fontSize: '12px',
    lineHeight: '1em',
    padding: '13px 0'
  },
  itemText: {
    ...theme.font.default,
    fontSize: '14px',
    lineHeight: '1em',
    color: theme.colors.grey(1.0)
  },
  itemGroup: {
    margin: '-8px 0',
    padding: '13px 0 0 0'
  },
  itemGroupPlatform: {
    margin: '-8px 0',
    padding: '13px 0 0 0',
    display: 'flex',
    flexDirection: 'column'
  },
  checkboxGroup: {
    margin: '-4px 0 0 0'
  },
  multiSelectGroup: {
    paddingTop: '8px'
  },
  selectGroup: {
    paddingTop: '0',
    marginTop: '-2px'
  },
  [theme.breakpoints.up('sm')]: {
    open: {
      width: theme.filterDrawerWidth
    }
  }
});
export default style;
