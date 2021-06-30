import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'perfect-scrollbar';
import { injectIntl } from 'react-intl';

import {
  withStyles,
  MenuItem,
  ClickAwayListener,
  Paper,
  Grow,
  Divider,
  Popper,
  Icon,
  Menu,
  ListItemIcon,
  MenuList,
  ListItemText,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField,
  Tooltip,
  Select
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from 'components/CustomButtons/Button.jsx';
import TextInput from 'components/TextInput';

import { ruleRunner } from 'utils/ruleRunner.js';
import { minLength, maxLength } from 'utils/rules.js';

import styles from 'assets/jss/material-dashboard-pro-react/components/collectionDropdownStyle.jsx';

const validationRulesName = ruleRunner(
  'collectionNameError',
  'collection name',
  minLength(2),
  maxLength(80)
);

class MenuListScrollbar extends React.Component {
  componentDidMount() {
    this.ps = new PerfectScrollbar(this.refs.main, {
      suppressScrollX: true,
      suppressScrollY: false,
      wheelPropagation: false
    });
  }
  componentWillUnmount() {
    this.ps.destroy();
    this.ps = null;
  }
  componentDidUpdate() {
    this.ps.update();
  }
  render() {
    const { children, ...rest } = this.props;
    return (
      <div ref="main" {...rest}>
        {children}
      </div>
    );
  }
}

class CollectionDropdown extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    hoverColor: PropTypes.oneOf([
      'dark',
      'primary',
      'info',
      'success',
      'warning',
      'danger',
      'rose'
    ]),
    buttonText: PropTypes.node,
    buttonIcon: PropTypes.string,
    dropdownList: PropTypes.array,
    dropup: PropTypes.bool,
    dropdownHeader: PropTypes.node,
    caret: PropTypes.bool,
    noLiPadding: PropTypes.bool,
    innerDropDown: PropTypes.bool,
    navDropdown: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    caret: true,
    dropup: false,
    hoverColor: 'primary',
    anchorX: 'left'
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isExpanded: false,
      collectionName: '',
      collectionNameError: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  handleCloseMenu(param) {
    this.setState({ open: false });
    if (this.props && this.props.onClick) {
      this.props.onClick(param);
    }
  }
  handleChangeCollectionName = event => {
    this.setState({
      collectionName: event.target.value,
      ...validationRulesName(event.target.value)
    });
  };
  handleClickAdd = () => {
    const { collectionName } = this.state;
    this.props.onCollectionAdd(collectionName);
    this.setState({
      collectionName: '',
      isExpanded: false
    });
  };
  handleClickCancel = () => {
    this.setState({
      open: false,
      isExpanded: false,
      collectionNameError: false,
      collectionName: ''
    });
  };
  handleChangeExpansion = () => {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded
    });
  };
  render() {
    const {
      open,
      collectionName,
      collectionNameError,
      isExpanded
    } = this.state;

    const {
      classes,
      className,
      buttonText,
      dropdownList,
      dropup,
      caret,
      innerDropDown,
      navDropdown,
      onChangeCheckboxMenuItem,
      isShow,
      anchorX,
      dropdownIcon,
      dropdownText,
      pannelTitle,
      cancelText,
      addText,
      disabledButton
    } = this.props;
    const intl = this.props.intl;

    const caretClasses = clsx({
      [classes.caret]: true,
      [classes.caretDropup]: dropup && !open,
      [classes.caretActive]: open && !dropup
    });

    const disableAddButton =
      collectionName === '' || collectionNameError !== false;

    const dropDownMenu = (
      <MenuList role="menu" className={classes.menuList}>
        <MenuListScrollbar className={classes.menuListScrollbar}>
          {dropdownList
            .map((item, idx) => ({
              ...item,
              onChange: checkedState => {
                const newDropdownList = [...dropdownList];
                newDropdownList[idx] = { ...item, selected: checkedState };
                onChangeCheckboxMenuItem(newDropdownList, item, checkedState);
              }
            }))
            .map(({ id, name, selected, onChange }) => (
              <div key={id}>
                <MenuItem
                  value={name}
                  classes={{
                    root: classes.selectMenuItem
                  }}
                  disableRipple
                >
                  <Checkbox
                    color={'primary'}
                    className={classes.collectionItemCheckBox}
                    onChange={event => onChange(event.target.checked)}
                    checked={selected}
                  />
                  <Tooltip
                    disableHoverListener
                    title={name}
                    placement="bottom"
                    classes={{ tooltip: classes.tooltipName }}
                  >
                    <ListItemText
                      primary={name}
                      classes={{
                        root: classes.collectionItemTextRoot,
                        primary: classes.collectionItemText
                      }}
                      onClick={() => onChange(!selected)}
                    />
                  </Tooltip>
                </MenuItem>
                <Divider className={classes.dropdownDividerItem} />
              </div>
            ))}
        </MenuListScrollbar>
        {isShow && (
          <div style={{ width: '300px' }}>
            <ExpansionPanel
              classes={{
                root: classes.expansionPanelRoot,
                expanded: classes.expansionPanelExpanded
              }}
              expanded={isExpanded}
              onChange={this.handleChangeExpansion}
            >
              <ExpansionPanelSummary
                classes={{
                  expanded: classes.expansionPanelSummaryExpanded,
                  expandIcon: classes.expansionPanelSummary,
                  content: classes.expansionPanelSummaryContent
                }}
                className={classes.expansionPanelSummaryRoot}
                expandIcon={
                  <ExpandMoreIcon className={classes.expandMoreIcon} />
                }
              >
                <p className={classes.titleAddNewCollection}>{pannelTitle}</p>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                classes={{
                  root: classes.expansionPanelDetailsRoot
                }}
              >
                <div>
                  <TextInput
                    last
                    formLabel={intl.formatMessage({ defaultMessage: "Collection name"})}
                    classNameContainer={classes.inputPropsCollectionName}
                    value={collectionName}
                    error={collectionNameError !== false}
                    helperText={collectionNameError}
                    onChange={this.handleChangeCollectionName}
                  />
                </div>
                <div className={classes.buttonDiv}>
                  <Button
                    variant="contained"
                    className={classes.buttonCancel}
                    onClick={this.handleClickCancel}
                  >
                    {intl.formatMessage({ defaultMessage: "cancelText"})}
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonAdd}
                    disabled={disableAddButton}
                    onClick={this.handleClickAdd}
                  >
                    {intl.formatMessage({ defaultMessage: "addText"})}
                  </Button>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )}
      </MenuList>
    );

    return (
      <div
        className={clsx({
          [className]: true,
          [classes.innerManager]: innerDropDown,
          [classes.manager]: !innerDropDown
        })}
      >
        <div className={buttonText !== undefined ? '' : classes.target}>
          <Button
            aria-label={intl.formatMessage({ defaultMessage: "Notifications"})}
            aria-owns={open ? 'menu-list' : null}
            aria-haspopup={intl.formatMessage({ defaultMessage: "true"})}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            onClick={this.handleClick}
            className={classes.dropDownButton}
            round
            fullWidth
            disabled={disabledButton}
          >
            {dropdownIcon && (
              <Icon className={classes.buttonIcon}>{intl.formatMessage({ defaultMessage: "dropdownIcon"})}</Icon>
            )}
            {intl.formatMessage({ defaultMessage: "dropdownText"})}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </div>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          keepMounted
          placement="bottom-start"
          className={clsx({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
            [classes.pooperNav]: open && navDropdown,
            [classes.popperRight]: anchorX === 'right'
          })}
          modifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: 'disabled'
            }
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              in={open}
              id="menu-list"
              style={
                dropup
                  ? { transformOrigin: '0 100%' }
                  : { transformOrigin: '0 0' }
              }
            >
              <Paper className={classes.dropdown}>
                {innerDropDown ? (
                  dropDownMenu
                ) : (
                  <ClickAwayListener onClickAway={this.handleClose}>
                    {intl.formatMessage({ defaultMessage: "dropDownMenu"})}
                  </ClickAwayListener>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default injectIntl(
  withStyles(styles, { name: 'CollectionDropdown' })(
    CollectionDropdown
  )
) ;
