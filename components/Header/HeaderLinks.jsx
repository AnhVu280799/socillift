import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import { injectIntl } from 'react-intl';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const intl = this.props.intl;
    const { open } = this.state;
    const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
        <CustomInput
          rtlActive={rtlActive}
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            placeholder: rtlActive ? intl.formatMessage({ defaultMessage: "بحث" }): intl.formatMessage({ defaultMessage: "Search"}),
            inputProps: {
              "aria-label": rtlActive ? intl.formatMessage({ defaultMessage: "بحث"}) : intl.formatMessage({ defaultMessage: "Search"}),
              className: classes.searchInput
            }
          }}
        />
        <Button
          color="white"
          aria-label={intl.formatMessage({ defaultMessage: "edit"})}
          justIcon
          round
          className={searchButton}
        >
          <Search
            className={classes.headerLinksSvg + " " + classes.searchIcon}
          />
        </Button>
        <Button
          color="transparent"
          simple
          aria-label={intl.formatMessage({ defaultMessage: "Dashboard"})}
          justIcon
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Dashboard
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? intl.formatMessage({ defaultMessage: "لوحة القيادة" }): intl.formatMessage({ defaultMessage: "Dashboard"})}
            </span>
          </Hidden>
        </Button>
        <div className={managerClasses}>
          <Button
            color="transparent"
            justIcon
            aria-label={intl.formatMessage({ defaultMessage: "Notifications"})}
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Notifications
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <span className={classes.notifications}>{intl.formatMessage({ defaultMessage: "5"})}</span>
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClick} className={classes.linkText}>
                {rtlActive ? intl.formatMessage({ defaultMessage: "إعلام"}) : intl.formatMessage({ defaultMessage: "Notification"})}
              </span>
            </Hidden>
          </Button>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? intl.formatMessage({ defaultMessage: "إجلاء أوزار الأسيوي حين بل, كما"})
                          : intl.formatMessage({ defaultMessage: "Mike John responded to your email"})}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? intl.formatMessage({ defaultMessage: "شعار إعلان الأرضية قد ذلك"})
                          : intl.formatMessage({ defaultMessage: "You have 5 new tasks"})}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? intl.formatMessage({ defaultMessage: "ثمّة الخاصّة و على. مع جيما"})
                          : intl.formatMessage({ defaultMessage: "You're now friend with Andrew"})}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        {rtlActive ? intl.formatMessage({ defaultMessage: "قد علاقة"}) : intl.formatMessage({ defaultMessage: "Another Notification"})}
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        {rtlActive ? intl.formatMessage({ defaultMessage: "قد فاتّبع"}) : intl.formatMessage({ defaultMessage: "Another One"})}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Button
          color="transparent"
          aria-label={intl.formatMessage({ defaultMessage: "Person"})}
          justIcon
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? intl.formatMessage({ defaultMessage: "الملف الشخصي"}) : intl.formatMessage({ defaultMessage: "Profile"})}
            </span>
          </Hidden>
        </Button>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default injectIntl(withStyles(headerLinksStyle)(HeaderLinks)) ;
