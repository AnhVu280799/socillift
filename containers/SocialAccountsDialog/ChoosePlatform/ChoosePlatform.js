import React from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, Login } from 'react-facebook';
import _ from 'lodash';
import GoogleLogin from 'react-google-login';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  setDialogTitle,
  addSocialAccount,
  fetchSocialAccounts,
  toggleEnterPageId,
  changeFacebookAccessToken,
  changeFacebookPages,
  changeDialogView,
  changeYoutubeAccessToken,
  changeYoutubeChannels,
  changeYoutubeSelectedChannel,
  toggleLoading
} from 'redux/social-accounts/actions';
import { dispatchNotification } from 'reducers/NotificationReducer';

import { withStyles, Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import ConnectedSocialButton from '../ConnectedSocialButton';

import facebookAPI from 'apis/facebook/facebook-api';
import youtubeAPI from 'apis/youtube/youtube-api';

import styles from './styles';

class ChoosePlatform extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.setDialogTitle(`Connect Your Social Profile`);
    this.props.toggleLoading(true);

    setTimeout(() => {
      this.props.toggleLoading(false);
    }, 1200);
  }

  handleFBLoginComplete = type => async ({ profile, tokenDetail }) => {
    const {
      facebook: { fanpageScope, profileScope },
      changeFacebookAccessToken,
      changeFacebookPages
    } = this.props;
    const intl = this.props.intl;
    const {
      id: fbId,
      name,
      picture: {
        data: { url: avatar }
      }
    } = profile;

    let { accessToken, grantedScopes } = tokenDetail;
    grantedScopes = grantedScopes.split(',').map(elm => elm.trim());

    const requiredScope = type === 'profile' ? profileScope : fanpageScope;

    if (_.difference(requiredScope, grantedScopes).length) {
      this.props.dispatchNotification({
        open: true,
        icon: InfoIcon,
        message:
          intl.formatMessage({ defaultMessage: 'Authorization failed. You need allow full permissions to continue. Please try again.'}),
        color: 'danger'
      });
      return;
    }

    if (type === 'fanpage') {
      const pages = await facebookAPI.getPages(accessToken);

      changeFacebookAccessToken(accessToken);
      changeFacebookPages(pages);
      return;
    }

    this.props
      .addSocialAccount({
        platform: 'fb',
        platformId: fbId,
        name,
        username: fbId,
        avatar
      })
      .then(() => {
        const { error } = this.props;
        const intl = this.props.intl;
        let message = !error
          ? intl.formatMessage({ defaultMessage: 'Your facebook profile connected successful!'})
          : intl.formatMessage({ defaultMessage: 'Your facebook profile connected failed. Please try again.'});
        const color = !error ? intl.formatMessage({ defaultMessage: 'success'}) : intl.formatMessage({ defaultMessage: 'danger'});

        if (error && error.code === 400) {
          message = error.data.message;
        }

        return this.props.fetchSocialAccounts().then(() => {
          this.props.dispatchNotification({
            open: true,
            icon: InfoIcon,
            message,
            color
          });
        });
      });
  };

  handleFBLoginFailure = type => error => {
    this.props.dispatchNotification(
      {
        open: true,
        icon: InfoIcon,
        message: intl.formatMessage({ defaultMessage: 'Authenticate your facebook account failed. Please try again.'}),
        color: 'danger'
      },
      2000
    );
  };

  handleFBLoginSuccess = type => () => {
    if (type === 'fanpage') {
      this.props.changeDialogView('chooseFanpage');
    }
  };

  handleYoutubeLoginSuccess = async response => {
    try {
      const { tokenObj } = response;
      const { access_token: accessToken, scope } = tokenObj;

      this.props.changeYoutubeAccessToken(accessToken);

      const channels = await youtubeAPI.getChannels(accessToken);

      this.props.changeYoutubeChannels(channels);

      if (channels.length) {
        this.props.changeYoutubeSelectedChannel(channels[0].channelId);
      }

      this.props.changeDialogView('chooseFanpage');
    } catch (err) {
      this.props.toggleLoading(false);

      this.props.dispatchNotification(
        {
          open: true,
          icon: InfoIcon,
          message: 'Your youtube profile connected failed. Please try again.',
          color: 'danger'
        },
        2000
      );
    }
  };

  handleYoutubeLoginFailure = response => {
    this.props.toggleLoading(false);

    this.props.dispatchNotification(
      {
        open: true,
        icon: InfoIcon,
        message: 'Your youtube profile connected failed. Please try again.',
        color: 'danger'
      },
      2000
    );
  };

  renderButtonConnectFanpage = () => {
    const {
      facebook: { appId, fanpageScope },
      accounts
    } = this.props;
    const intl = this.props.intl;
    const fields = ['id', 'name', 'picture'].join(',');

    const scope = fanpageScope.join(',');

    return (
      <FacebookProvider appId={appId}>
        <Login
          scope={scope}
          fields={fields}
          onCompleted={this.handleFBLoginComplete('fanpage')}
          onError={this.handleFBLoginFailure('fanpage')}
          onSuccess={this.handleFBLoginSuccess('fanpage')}
          returnScopes
          rerequest
        >
          {({ handleClick, error, data, loading }) => (
            <ConnectedSocialButton
              platform="page"
              isConnected={!!accounts && !!accounts['page']}
              userInfo={accounts['page']}
              loading={loading}
              onClick={handleClick}
              disabled={loading}
            />
          )}
        </Login>
      </FacebookProvider>
    );
  };

  renderButtonConnectYoutube = () => {
    const {
      youtube: { clientId, scopes },
      accounts,
      loading
    } = this.props;

    const scope = scopes.join(',');

    return (
      <GoogleLogin
        clientId={clientId}
        scope={scope}
        render={renderProps => (
          <ConnectedSocialButton
            platform="youtube"
            isConnected={!!accounts && !!accounts['youtube']}
            userInfo={accounts['youtube']}
            onClick={e => {
              this.props.toggleLoading(true);
              renderProps.onClick();
            }}
            loading={loading}
            disabled={renderProps.disable || loading}
          />
        )}
        buttonText="Login"
        onSuccess={this.handleYoutubeLoginSuccess}
        onFailure={this.handleYoutubeLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    );
  };

  render() {
    const { classes, accounts, youtube, loading } = this.props;
    const intl = this.props.intl;

    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.descriptionText}>
         {intl.formatMessage({ defaultMessage: " Select a network to connect a profile."})}
          <br />
         {intl.formatMessage({ defaultMessage: " If you have several accounts to connect, don’t worry—we’ll bring you"})}
          {intl.formatMessage({ defaultMessage: "back to this screen after each profile is set up."})}
        </Grid>
        {/* <Grid item className={classes.buttonWrapper} xs={12}>
          <FacebookProvider appId={fbAppIds.profile}>
            <Login
              scope={this.requiredScope.join(",")}
              fields="id,name,picture"
              onCompleted={this.handleFBLoginSuccess}
              onError={this.handleFBLoginFailure}
              returnScopes
              rerequest
            >
              {({ handleClick, error, data }) => (
                <ConnectedSocialButton
                  platform="fb"
                  isConnected={!!accounts && !!accounts["fb"]}
                  userInfo={accounts["fb"]}
                  loading={loading}
                  onClick={e => {
                    this.setState({ loading: true }, () => {
                      handleClick(e);
                    });
                  }}
                  disabled={loading}
                />
              )}
            </Login>
          </FacebookProvider>
        </Grid> */}
        {/* <Grid item className={classes.buttonWrapper} xs={12}>
          {this.renderButtonConnectFanpage()}
        </Grid>
        <Grid item className={classes.buttonWrapper} xs={12}>
          <ConnectedSocialButton
            platform="insta"
            isConnected={!!accounts && !!accounts['insta']}
            userInfo={accounts['insta']}
            disabled
          />
        </Grid> */}

        <Grid item className={classes.buttonWrapper} xs={12}>
          {this.renderButtonConnectYoutube()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  socialAccounts: { error, accounts, youtube, loading }
}) => ({
  error,
  accounts,
  youtube,
  loading
});

const mapDispatchToProps = {
  setDialogTitle,
  addSocialAccount,
  fetchSocialAccounts,
  toggleEnterPageId,
  dispatchNotification,
  changeFacebookAccessToken,
  changeFacebookPages,
  changeDialogView,
  changeYoutubeAccessToken,
  changeYoutubeChannels,
  changeYoutubeSelectedChannel,
  toggleLoading
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: 'ChoosePlatform' })
)(ChoosePlatform)) ;
