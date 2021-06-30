import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { injectIntl } from 'react-intl';
// material-ui icons
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import Icon from '@material-ui/core/Icon';

import Button from 'components/CustomButtons/Button.jsx';

import headerStyle from 'assets/jss/material-dashboard-pro-react/components/headerStyle.jsx';

const CanFilterByBasicInfo = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canFilterByBasicInfo,
  wrapperDisplayName: 'CanFilterByBasicInfo',
  FailureComponent: () => null
})(({ children }) => children);
class Header extends React.Component {
  state = {
    value: '',
    propsVal: ''
  };
  static defaultProps = {
    value: ''
  };
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.propsVal) {
      return { value: props.value, propsVal: props.value };
    }
    return null;
  }
  render() {
    const { classes, color, name, hide, ...props } = this.props;
    const intl = this.props.intl;
    const appBarClasses = cx(classes.appBar, {
      [classes[color]]: color
    });
    return (
      <AppBar className={appBarClasses}>
        <Hidden smDown implementation="js">
          <Toolbar className={classes.container}>
            <Button
              justIcon
              round
              className={classes.sidebarButton}
              onClick={props.sidebarMinimize}
            >
              <Icon className={classes.sidebarMiniIcon}>
                {props.miniActive ? intl.formatMessage({ defaultMessage: 'dehaze'}) : intl.formatMessage({ defaultMessage: 'more_vert'})}
              </Icon>
            </Button>
            <div className={cx(classes.title, classes.flex)}>{intl.formatMessage({ defaultMessage: "name"})}</div>
            {!hide && (
              <CanFilterByBasicInfo>
                <Input
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                    focused: classes.inputFocus
                  }}
                  disableUnderline
                  startAdornment={
                    <InputAdornment
                      classes={{
                        root: classes.inputAdornmentRoot
                      }}
                    >
                      <Icon>person</Icon>
                    </InputAdornment>
                  }
                  placeholder={intl.formatMessage({ defaultMessage: "Search influencer by Name, FBID, URL"})}
                  value={this.state.value}
                  onChange={({ target: { value } }) => this.setState({ value })}
                  onKeyDownCapture={e =>
                    e.keyCode === 13 && props.onSearch(this.state.value)
                  }
                />
                <Button
                  justIcon
                  round
                  className={classes.sidebarButton}
                  onClick={() =>
                    this.state.value.trim().length &&
                    props.onSearch(this.state.value)
                  }
                >
                  <Icon className={classes.sidebarMiniIcon}>{intl.formatMessage({ defaultMessage: "search"})}</Icon>
                </Button>
              </CanFilterByBasicInfo>
            )}
          </Toolbar>
        </Hidden>
        <Hidden mdUp implementation="js">
          <Toolbar className={classes.container}>
            <Grid item container direction="column">
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.gridContainer}
              >
                <div className={cx(classes.title, classes.flex)}>{intl.formatMessage({ defaultMessage: "name"})}</div>
                <Button
                  justIcon
                  round
                  className={classes.sidebarButton}
                  onClick={() => this.props.sidebarMinimize(false, 'temporary')}
                >
                  <Icon className={classes.sidebarMiniIcon}>
                    {props.miniActive ? intl.formatMessage({ defaultMessage: 'dehaze'}) : intl.formatMessage({ defaultMessage: 'more_vert'})}
                  </Icon>
                </Button>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.gridContainerRow2}
              >
                {!hide && (
                  <CanFilterByBasicInfo>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        input: classes.input,
                        focused: classes.inputFocus
                      }}
                      disableUnderline
                      startAdornment={
                        <InputAdornment
                          classes={{
                            root: classes.inputAdornmentRoot
                          }}
                        >
                          <Icon>{intl.formatMessage({ defaultMessage: "person"})}</Icon>
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment
                          classes={{ root: classes.inputAdornmentRoot }}
                        >
                          <Button
                            justIcon
                            className={classes.sidebarButtonInside}
                            onClick={() =>
                              this.state.value.trim().length &&
                              props.onSearch(this.state.value)
                            }
                          >
                            <Icon className={classes.sidebarMiniIconInside}>
                            {intl.formatMessage({ defaultMessage: "search"})}
                            </Icon>
                          </Button>
                        </InputAdornment>
                      }
                      placeholder={intl.formatMessage({ defaultMessage: "Search influencer"})}
                      value={this.state.value}
                      onChange={({ target: { value } }) =>
                        this.setState({ value })
                      }
                      onKeyDownCapture={e =>
                        e.keyCode === 13 && props.onSearch(this.state.value)
                      }
                    />
                  </CanFilterByBasicInfo>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Hidden>
      </AppBar>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool
};

export default injectIntl(withStyles(headerStyle)(Header)) ;
