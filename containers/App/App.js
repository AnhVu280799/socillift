import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import { retrieveUserInfo } from 'reducers/UserReducer';
import { history } from 'redux/store';
import routes from 'routes';
import themes from 'themes';
import { getCurrentLang, loadLocaleData } from 'utils/localize';
import 'assets/scss/material-dashboard-pro-react.scss';
import 'styles/styles.css';

export class App extends React.PureComponent {
  handleFetchUserData = () => {
    const { location } = this.props;

    const userId = window.localStorage ? window.localStorage.getItem('user_id') : null;

    if (location.pathname !== '/sign-out') {
      this.props.retrieveUserInfo(userId);
    }
  };

  componentDidMount() {
    this.handleFetchUserData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleFetchUserData();
    }
  }

  render() {
    const defaultLocale = 'en';
    const locale = getCurrentLang();
    const messages = loadLocaleData(locale);

    return (
      <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={messages}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={themes}>
            <Switch>
              {routes.map(route => (
                <Route {...route} key={route.path} />
              ))}
            </Switch>
          </MuiThemeProvider>
        </ConnectedRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ router }) => ({
  location: router.location
});

const mapDispatchToProps = {
  retrieveUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
