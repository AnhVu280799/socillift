import React from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FloatingMenu from 'components/FloatingMenu';
// core components

import sidebarStyle from './SidebarStyle';
import LanguageSwitcher from 'components/LanguageSwitcher';

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.ps = null;
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    this.ps = new PerfectScrollbar(this.wrapperRef.current, {
      suppressScrollX: true,
      suppressScrollY: false,
      wheelPropagation: false
    });
  }
  componentWillUnmount() {
    this.ps.destroy();
    this.ps = null;
  }
  render() {
    const { className, user, headerLinks, links, isCollapsed } = this.props;  const intl = this.props.intl;
    return (
      <div className={className} ref={this.wrapperRef}>
        {intl.formatMessage({ defaultMessage: "user"})}
        {intl.formatMessage({ defaultMessage: "headerLinks"})}
        {intl.formatMessage({ defaultMessage: "links"})}
        <LanguageSwitcher isCollapsed={isCollapsed} />
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    const collapseRoute = props.routes.filter(route => route.collapse);
    this.state = {
      openAvatar: false,
      collapseState: collapseRoute.map(() => false),
      hoverState: collapseRoute.map(() => false),
      userRef: null,
      hoverRef: collapseRoute.map(() => null)
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }
  openCollapse(collapse) {
    const l = this.state.collapseState.slice();
    l[collapse] = !l[collapse];
    this.setState({ collapseState: l });
  }
  openHover = (index, target) => {
    if (this.props.miniActive) {
      const l = this.state.hoverRef.slice();
      l[index] = target;
      this.setState({ hoverRef: l });
    }
  };
  closeHover = index => {
    const l = this.state.hoverRef.slice();
    l[index] = null;
    this.setState({ hoverRef: l });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.miniActive && this.state.openAvatar) {
      this.setState({ openAvatar: false });
    }
  }
  componentDidMount() {
    const { routes } = this.props;
    routes
      .filter(({ hide }) => !hide)
      .map((prop, keyRoute) => {
        if (
          prop.views &&
          prop.views
            .filter(({ hide }) => !hide)
            .map(prop => this.activeRoute(prop.path))
            .filter(item => item).length > 0
        ) {
          this.openCollapse(keyRoute);
        }
      });
  }
  render() {
    const {
      classes,
      color,
      logo,
      image,
      routes,
      bgColor,
      rtlActive,
      userMenu,
      userMenuNotAuthenticate,
      variant,
      userInfo,
      location,
      onClickLogo,
      favicon,
      onClickBtnViewPlan
    } = this.props;
    const intl = this.props.intl;

    const currentPath = location.pathname + location.search;
    const userWrapperClass = cx(classes.user, {
      [cx(classes.lineAfter, classes.userMini, {
        [classes.whiteAfter]: bgColor === 'white'
      })]: this.props.miniActive
    });
    const photo = cx(classes.photo, {
      [classes.photoMini]: this.props.miniActive
    });
    const userOpen = Boolean(this.state.userRef);
    let delayHandler = null;
    const user = [
      <div key="userInfo" className={userWrapperClass}>
        <img
          src={userInfo.avatar}
          onError={e =>
            (e.target.src =
              'https://storage.googleapis.com/yn-influencer/Avatar%20Default.png')
          }
          className={photo}
          alt="..."
          onMouseEnter={e => {
            if (this.props.miniActive) {
              clearTimeout(delayHandler);
              this.setState({ userRef: e.currentTarget });
            }
          }}
          onMouseLeave={e => {
            if (this.props.miniActive)
              delayHandler = setTimeout(
                () => this.setState({ userRef: null }),
                150
              );
          }}
          aria-owns={userOpen ? 'userMenu' : null}
          aria-haspopup="true"
        />
        {!this.props.miniActive && [
          <p key="name" className={classes.userName}>
            {userInfo.username}
          </p>,
          <p key="role" className={classes.userRole}>
            {userInfo.role}
          </p>,
          userInfo.canViewSubscriptionPlan && (
            <Button
              key="btnViewPlan"
              className={classes.btnViewPlan}
              onClick={onClickBtnViewPlan}
            >
              {intl.formatMessage({ defaultMessage: "View my plan"})}
              <Icon className={classes.iconArrowRight}>{intl.formatMessage({ defaultMessage: "arrow_right"})}</Icon>
            </Button>
          )
        ]}
        {!this.props.miniActive &&
          userInfo.isAuthenticated === false && [
            <Button
              key="btnSignIn"
              className={classes.btnViewPlan}
              onClick={() => this.props.history.push('/sign-in')}
            >
              {intl.formatMessage({ defaultMessage: "Sign in"})}
            </Button>
          ]}
      </div>,
      this.props.miniActive && userInfo.isAuthenticated && (
        <FloatingMenu
          id="userMenu"
          key="floatingUserMenu"
          anchorElement={this.state.userRef}
          open={userOpen}
          anchorOrigin={{ horizontal: 60, vertical: 'center' }}
          transformOrigin={{ vertical: 24, horizontal: 'left' }}
          items={userMenu}
          onClose={() => this.setState({ userRef: null })}
          classes={{
            list: classes.list,
            item: classes.collapseItem,
            itemText: classes.userMenuItemText,
            itemHover: classes.itemHover,
            itemLink: cx(
              classes.userMenuItemLink,
              classes.userMenuItemLinkMini
            ),
            itemActive: classes[color]
          }}
          className={classes.floatingMenuHover}
          PaperProps={{
            classes: { root: classes.floatingMenuHoverPaper },
            onMouseEnter: () => clearTimeout(delayHandler),
            onMouseLeave: () =>
              (delayHandler = setTimeout(
                () => this.setState({ userRef: null }),
                150
              ))
          }}
        />
      ),
      this.props.miniActive && userInfo.isAuthenticated === false && (
        <FloatingMenu
          id="userMenu"
          key="floatingUserMenu"
          anchorElement={this.state.userRef}
          open={userOpen}
          anchorOrigin={{ horizontal: 60, vertical: 'center' }}
          transformOrigin={{ vertical: 24, horizontal: 'left' }}
          items={userMenuNotAuthenticate}
          onClose={() => this.setState({ userRef: null })}
          classes={{
            list: classes.list,
            item: classes.collapseItem,
            itemText: classes.userMenuItemText,
            itemHover: classes.itemHover,
            itemLink: cx(
              classes.userMenuItemLink,
              classes.userMenuItemLinkMini
            ),
            itemActive: classes[color]
          }}
          className={classes.floatingMenuHover}
          PaperProps={{
            classes: { root: classes.floatingMenuHoverPaper },
            onMouseEnter: () => clearTimeout(delayHandler),
            onMouseLeave: () =>
              (delayHandler = setTimeout(
                () => this.setState({ userRef: null }),
                150
              ))
          }}
        />
      ),
      !this.props.miniActive && (
        <div key="userMenu" className={classes.userMenuWrapper}>
          <div
            className={cx(classes.userCaretLine, classes.lineAfter, {
              [classes.whiteAfter]: bgColor === 'white'
            })}
          >
            {userInfo.isAuthenticated === true && (
              <div
                className={cx(classes.userCaretWrapper, {
                  [classes.userCaretActive]: !this.state.openAvatar
                })}
                onClick={() =>
                  this.setState({ openAvatar: !this.state.openAvatar })
                }
              >
                <Icon className={classes.userCaret}>{intl.formatMessage({ defaultMessage: "expand_less"})}</Icon>
              </div>
            )}
          </div>
          <Collapse in={this.state.openAvatar} unmountOnExit>
            <List
              className={cx(
                classes.list,
                classes.lineAfter,
                {
                  [classes.whiteAfter]: bgColor === 'white'
                },
                classes.collapseList
              )}
            >
              {userMenu.map((prop, key) => (
                <ListItem
                  key={key}
                  onClick={prop.onClick}
                  className={classes.collapseItem}
                >
                  <NavLink
                    to={prop.path}
                    className={cx(classes.userMenuItemLink, classes.itemHover, {
                      [classes[color]]: this.activeRoute(prop.path)
                    })}
                  >
                    <ListItemText
                      primary={prop.name}
                      disableTypography={true}
                      className={classes.userMenuItemText}
                    />
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      )
    ];
    const links = (
      <List className={classes.list}>
        {routes
          .filter(({ hide }) => !hide)
          .map((prop, key) => {
            if (prop.redirect) {
              return null;
            }
            const navLinkClasses = cx(classes.itemLink, classes.itemHover, {
              [classes.collapseActive]: prop.collapse && this.state[prop.state],
              [classes.itemLinkMini]: this.props.miniActive,
              [classes[color] + ' ' + classes.itemLinkActive]:
                !prop.collapse && this.activeRoute(prop.path)
            });
            const itemIcon = cx(
              { [classes.itemIconMini]: this.props.miniActive },
              classes.itemIcon
            );
            if (prop.collapse) {
              const open = Boolean(this.state.hoverRef[key]);
              let delayHandler = null;
              return [
                <ListItem
                  key={key}
                  className={classes.item}
                  aria-owns={open ? `mouse-over-popover-${key}` : null}
                  aria-haspopup="true"
                  onMouseEnter={({ currentTarget }) => {
                    if (!this.state.collapseState[key]) {
                      clearTimeout(delayHandler);
                      this.openHover(key, currentTarget);
                    }
                  }}
                  onMouseLeave={() => {
                    delayHandler = setTimeout(() => this.closeHover(key), 150);
                  }}
                >
                  <div
                    className={cx(navLinkClasses, {
                      [classes.groupLinkActive]:
                        prop.views
                          .filter(({ hide }) => !hide)
                          .map(prop => this.activeRoute(prop.path))
                          .filter(item => item).length > 0
                    })}
                    onClick={() => {
                      this.closeHover(key);
                      this.openCollapse(key);
                    }}
                  >
                    <ListItemIcon className={itemIcon}>
                      {typeof prop.icon === 'string' ? (
                        <Icon className={classes.propIcon}>{prop.icon}</Icon>
                      ) : (
                        <prop.icon className={classes.propIcon} />
                      )}
                    </ListItemIcon>
                    {!this.props.miniActive && [
                      <ListItemText
                        primary={prop.name}
                        disableTypography={true}
                        className={classes.itemText}
                        key="name"
                      />,
                      <ListItemIcon
                        key="caret"
                        className={cx(classes.caret, {
                          [classes.caretActive]: this.state.collapseState[key]
                        })}
                      >
                        <Icon className={classes.caret}>{intl.formatMessage({ defaultMessage: "arrow_drop_up"})}</Icon>
                      </ListItemIcon>
                    ]}
                  </div>
                  <Collapse in={this.state.collapseState[key]} unmountOnExit>
                    <List
                      className={cx(
                        classes.list,
                        classes.lineAfter,
                        {
                          [classes.whiteAfter]: bgColor === 'white'
                        },
                        classes.collapseList
                      )}
                    >
                      {prop.views
                        .filter(({ hide }) => !hide)
                        .map((prop, key) => {
                          if (prop.redirect) {
                            return null;
                          }
                          const navLinkClasses = cx(
                            classes.collapseItemLink,
                            classes.itemHover,
                            {
                              [classes.itemLinkMini]: this.props.miniActive,
                              [classes[color] +
                              ' ' +
                              classes.itemLinkActive]: this.activeRoute(
                                prop.path
                              )
                            }
                          );
                          return (
                            <ListItem
                              key={key}
                              className={classes.collapseItem}
                            >
                              <NavLink
                                to={prop.path}
                                className={navLinkClasses}
                              >
                                <ListItemIcon className={itemIcon}>
                                  {typeof prop.icon === 'string' ? (
                                    <Icon className={classes.propIcon}>
                                      {prop.icon}
                                    </Icon>
                                  ) : (
                                    <prop.icon className={classes.propIcon} />
                                  )}
                                </ListItemIcon>
                                {!this.props.miniActive && (
                                  <ListItemText
                                    primary={prop.name}
                                    disableTypography={true}
                                    className={classes.collapseItemText}
                                  />
                                )}
                              </NavLink>
                            </ListItem>
                          );
                        })}
                    </List>
                  </Collapse>
                </ListItem>,
                this.props.miniActive && (
                  <FloatingMenu
                    key={`${key}-1`}
                    id={`mouse-over-popover-${key}`}
                    anchorElement={this.state.hoverRef[key]}
                    open={open}
                    anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
                    transformOrigin={{ vertical: 24, horizontal: 'left' }}
                    items={prop.views
                      .filter(({ hide }) => !hide)
                      .map(view => ({
                        ...view,
                        active: this.activeRoute(view.path)
                      }))}
                    onClose={() => this.closeHover(key)}
                    classes={{
                      list: classes.list,
                      item: classes.collapseItem,
                      itemText: classes.userMenuItemText,
                      itemHover: classes.itemHover,
                      itemLink: cx(
                        classes.userMenuItemLink,
                        classes.userMenuItemLinkMini
                      ),
                      itemActive: classes[color]
                    }}
                    className={classes.floatingMenuHover}
                    PaperProps={{
                      classes: { root: classes.floatingMenuHoverPaper },
                      onMouseEnter: () => clearTimeout(delayHandler),
                      onMouseLeave: () =>
                        (delayHandler = setTimeout(
                          () => this.closeHover(key),
                          150
                        ))
                    }}
                  />
                )
              ];
            }
            return (
              <ListItem key={key} className={classes.item}>
                <NavLink to={prop.path} className={navLinkClasses}>
                  <ListItemIcon className={itemIcon}>
                    {typeof prop.icon === 'string' ? (
                      <Icon className={classes.propIcon}>{prop.icon}</Icon>
                    ) : (
                      <prop.icon className={classes.propIcon} />
                    )}
                  </ListItemIcon>
                  {!this.props.miniActive && (
                    <ListItemText
                      primary={prop.name}
                      disableTypography={true}
                      className={classes.itemText}
                    />
                  )}
                </NavLink>
              </ListItem>
            );
          })}
      </List>
    );
    const logoImage = classes.logoImage;
    const logoClasses = cx(classes.logo, classes.lineAfter, {
      [classes.whiteAfter]: bgColor === 'white'
    });
    const brand = (
      <div className={logoClasses}>
        {this.props.miniActive ? (
          <img
            src={favicon}
            className={classes.logoMini}
            onClick={onClickLogo}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <img
            src={logo}
            className={logoImage}
            onClick={onClickLogo}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    );
    const drawerPaper = cx(classes.drawerPaper, {
      [classes.drawerPaperMini]: this.props.miniActive,
      [classes.drawerPaperRTL]: rtlActive
    });
    const sidebarWrapper = cx(classes.sidebarWrapper, {
      [classes.drawerPaperMini]: this.props.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1
    });
    return (
      <div ref="mainPanel">
        {/* <Hidden mdUp implementation="jss">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={<HeaderLinks rtlActive={rtlActive} />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden> */}
        <Drawer
          // onMouseOver={() => this.setState({ miniActive: false })}
          // onMouseOut={() => this.setState({ miniActive: true })}
          anchor={rtlActive ? 'right' : 'left'}
          variant={typeof variant === 'string' ? variant : 'permanent'}
          open
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background']
          }}
          onClose={() => this.props.onClose(true, 'permanent')}
        >
          {brand}
          <SidebarWrapper
            className={sidebarWrapper}
            user={user}
            links={links}
            isCollapsed={this.props.miniActive}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose'
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  userMenu: PropTypes.arrayOf(PropTypes.object)
};

export default injectIntl(withStyles(sidebarStyle)(Sidebar));
