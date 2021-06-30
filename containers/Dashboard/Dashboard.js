import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import queryString from 'query-string';

import { SIDEBAR_BACKGROUND_IMAGE, LOGO, FAVICON } from 'constants/common';
import { updateRoutePermission } from 'utils';
import routes from 'routes/Dashboard';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { isNotAuthenticated } from 'reducers/UserReducer';

import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import LoadingScreen from 'components/LoadingScreen';
import SubscriptionPlanModal from 'components/SubscriptionPlanModal';
import Header from 'components/Header/Header.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import SocialAccountsDialog from 'containers/SocialAccountsDialog';

import styles from 'assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx';
import 'react-perfect-scrollbar/dist/css/styles.css';

export class Dashboard extends React.Component {
  state = {
    isOpenSubPlanModal: false,
    miniActive: false,
    variant: 'permanent'
  };

  scrollbarRef = null;
  scrollRef = null;

  userMenu = [{ name: 'Sign Out', path: '/sign-out' }];

  userMenuNotAuthenticated = [{ name: 'Sign in', path: '/sign-in' }];

  componentDidMount() {
    const {
      userInfo: { isAuthenticated, isActive, isPhoneNumberVerified },
      history
    } = this.props;
    const intl = this.props.intl;

    if (isAuthenticated) {
      if (!isActive) {
        history.push('/access-denied');
      }

      if (!isPhoneNumberVerified) {
        history.push(intl.formatMessage({ defaultMessage: '/verify-phone-number'}));
      }
    }

    if (!isAuthenticated) {
      history.push(intl.formatMessage({ defaultMessage: '/sign-in'}));
    }
  }

  componentDidUpdate() {
    this.scrollRef.scrollTop = 0;
    this.scrollbarRef.updateScroll();
  }

  sidebarMinimize = (value, variant) => {
    this.setState({
      miniActive: typeof value === 'boolean' ? value : !this.state.miniActive,
      variant: typeof variant === 'string' ? variant : 'permanent'
    });
  };

  updateRoutesVisibilityBasedOnPermission = routes => {
    return routes.map(route => {
      if (route.name === 'Management') {
        const viewRoutes = route.views.map(view =>
          updateRoutePermission(view, this.props.userInfo.globalPermissions)
        );

        const shouldNotHide = viewRoutes.some(
          ({ hide }) => hide === false || typeof hide === 'undefined'
        );

        if (shouldNotHide) {
          return { ...route, views: viewRoutes };
        } else {
          return { ...route, views: viewRoutes, hide: true };
        }
      } else {
        return updateRoutePermission(
          route,
          this.props.userInfo.globalPermissions
        );
      }
    });
  };

  handleFetchCode = code => {
    const codeCases = {
      336: () => {
        this.props.history.push('/access-denied');
      },
      401: () => {
        this.props.isNotAuthenticated();
        this.props.history.push('/auth-expired');
      },
      403: () => {
        this.props.history.push('/access-denied');
      },
      404: () => {
        this.props.history.push('/not-found');
      },
      500: () => {
        this.props.history.push('/internal-server-error');
      }
    };

    const callCase = codeCases[code];
    if (callCase) callCase();
  };

  onSearch = val => {
    if (!val) return;

    const query = {
      platform: 'fb',
      fb_id_name: val.trim(),
      page_size: 12,
      page_index: 0
    };

    this.props.history.push(`/advanced-search?${queryString.stringify(query)}`);
  };

  onClickLogo = () => this.props.history.push(this.props.userInfo.indexPath);

  openSubPlanModal = () => {
    this.setState({
      isOpenSubPlanModal: true
    });
  };

  closeSubPlanModal = () => {
    this.setState({
      isOpenSubPlanModal: false
    });
  };

  render() {
    const newRoutes = this.updateRoutesVisibilityBasedOnPermission(routes);

    const {
      classes,
      notification,
      loadingScreen,
      fetchResult: { code },
      userInfo,
      ...rest
    } = this.props;
    const intl = this.props.intl;
    const { miniActive, variant, isOpenSubPlanModal } = this.state;

    this.handleFetchCode(code);

    return (
      <div id="container" className={classes.wrapper}>
        <Sidebar
          routes={intl.formatMessage({ defaultMessage: "newRoutes"})}
          image={intl.formatMessage({ defaultMessage: "SIDEBAR_BACKGROUND_IMAGE"})}
          favicon={intl.formatMessage({ defaultMessage: "FAVICON"})}
          logo={intl.formatMessage({ defaultMessage: "LOGO"})}
          onClickLogo={this.onClickLogo}
          userInfo={intl.formatMessage({ defaultMessage: "userInfo"})}
          color="blue"
          bgColor="white"
          miniActive={intl.formatMessage({ defaultMessage: "miniActive"})}
          userMenu={this.userMenu}
          userMenuNotAuthenticate={this.userMenuNotAuthenticated}
          variant={intl.formatMessage({ defaultMessage: "variant"})}
          onClose={this.sidebarMinimize}
          sideBarState={{
            miniActive: intl.formatMessage({ defaultMessage: "miniActive"}),
            variant: intl.formatMessage({ defaultMessage: "variant"})
          }}
          onClickBtnViewPlan={this.openSubPlanModal}
          {...rest}
        />
        {userInfo.canViewSubscriptionPlan && (
          <SubscriptionPlanModal
            open={intl.formatMessage({ defaultMessage: "isOpenSubPlanModal"})}
            modalTitle={intl.formatMessage({ defaultMessage: "Subscription Plan"})}
            onCloseClick={this.closeSubPlanModal}
            userId={userInfo._id}
          />
        )}
        <Snackbar close {...notification} />
        <Scrollbar
          id="content"
          className={clsx({
            [classes.mainPanel]: true,
            [classes.mainPanelSidebarMini]:
              miniActive || variant === 'temporary'
          })}
          options={{ suppressScrollX: true, wheelPropagation: false }}
          ref={ref => {
            this.scrollbarRef = ref;
          }}
          containerRef={ref => {
            this.scrollRef = ref;
          }}
        >
          <div id="route">
            <LoadingScreen
              {...loadingScreen}
              miniActive={miniActive}
              modalActive={isOpenSubPlanModal}
            />
            <Switch>
              {newRoutes.map((route, key) => {
                if (route.redirect) {
                  return (
                    <Redirect from={route.path} to={route.pathTo} key={key} />
                  );
                }

                const commonProps = {
                  minimizeSidebar: this.sidebarMinimize,
                  sideBarState: {
                    miniActive: miniActive,
                    variant: variant
                  },
                  drawHeader: renderHeaderProps => (
                    <Header
                      sidebarMinimize={this.sidebarMinimize}
                      miniActive={miniActive}
                      onSearch={val => this.onSearch(val)}
                      {...rest}
                      {...renderHeaderProps}
                    />
                  )
                };

                if (route.collapse) {
                  return route.views.map((routeChild, key) => {
                    return (
                      <Route
                        path={routeChild.path}
                        exact={routeChild.exact}
                        hide={routeChild.hide}
                        name={routeChild.name}
                        key={key}
                        render={renderProps => (
                          <routeChild.component
                            {...renderProps}
                            name={routeChild.name}
                            {...commonProps}
                          />
                        )}
                      />
                    );
                  });
                }

                return (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    hide={route.hide}
                    name={route.name}
                    key={key}
                    render={renderProps => (
                      <route.component
                        {...renderProps}
                        name={route.name}
                        {...commonProps}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          </div>
        </Scrollbar>
        <SocialAccountsDialog />
      </div>
    );
  }
}

const mapStateToProps = ({
  userInfo,
  notification,
  loadingScreen,
  fetchResult
}) => ({
  userInfo,
  notification,
  loadingScreen,
  fetchResult,
  isAuthenticated: userInfo.isAuthenticated
});

const mapDispatchToProps = {
  isNotAuthenticated
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: 'Dashboard' })
)(Dashboard)) ;
