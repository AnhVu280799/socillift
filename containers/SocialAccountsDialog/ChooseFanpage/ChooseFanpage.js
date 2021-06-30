import React from 'react';
import PropTypes from 'prop-types';
import { FacebookProvider, Login } from 'react-facebook';
import _ from 'lodash';
import axios from 'axios';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  setDialogTitle,
  changePageId,
  toggleEnterPageId,
  addSocialAccount,
  fetchSocialAccounts,
  changeSelectedPage,
  changeDialogView,
  changeFacebookAccessToken,
  changeFacebookPages,
  changeYoutubeSelectedChannel
} from 'redux/social-accounts/actions';
import { dispatchNotification } from 'reducers/NotificationReducer';
import { openLoading, closeLoading } from 'reducers/ScreenLoadingReducer';

import { withStyles, Grid, Typography, TextField } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import Button from 'components/CustomButtons/ButtonInf';
import TypingSelect from 'components/TypingSelect';

import fanpageLogo from 'assets/img/flag_variant.svg';
import youtubeLogo from 'assets/img/youtube.svg';

import { APP_NAME } from 'constants/common';

import styles from './styles';

class ChooseFanpage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.setDialogTitle(`Authorize Your Youtube Channel`);
  }

  handleButtonConnectClick = () => {
    const {
      channels,
      accessToken,
      // selectedPage,
      selectedChannel,
      openLoading,
      closeLoading,
      addSocialAccount,
      fetchSocialAccounts
    } = this.props;
    const intl = this.props.intl;
    openLoading();

    const channel = channels.find(
      channel => channel.channelId === selectedChannel
    );

    addSocialAccount({
      platform: 'youtube',
      platformId: selectedChannel,
      accessToken,
      name: channel.title,
      username: channel.customURL || channel.channelId,
      avatar: channel.thumbnails.default.url
    }).then(() => {
      const { error } = this.props;

      let message = !error
        ? intl.formatMessage({ defaultMessage: 'Your youtube channel connected successful!'})
        : intl.formatMessage({ defaultMessage: 'Your youtube channel connected failed. Please try again.'});
      const color = !error ? intl.formatMessage({ defaultMessage: 'success'}) : intl.formatMessage({ defaultMessage: 'danger'});

      if (error && error.code === 400) {
        message = error.data.message;
      }

      return fetchSocialAccounts().then(() => {
        closeLoading();

        if (!error) {
          this.handleButtonBackClick();
        }

        this.props.dispatchNotification(
          { open: true, icon: InfoIcon, message, color },
          2000
        );
      });
    });
  };

  handleButtonBackClick = () => {
    const {
      changeDialogView,
      changeFacebookAccessToken,
      changeFacebookPages
    } = this.props;

    changeFacebookAccessToken(null);
    changeFacebookPages([]);
    changeDialogView(null);
  };

  handleChangeFanpage = ({ value }) => {
    this.props.changeSelectedPage(value);
  };

  handleChangeChannel = ({ value }) => {
    this.props.changeYoutubeSelectedChannel(value);
  };

  renderDropdownFacebookFanpage = () => {
    const { classes, pages, selectedPage } = this.props;
    const intl = this.props.intl;
    const value = pages.filter(({ value }) => value === selectedPage);

    return (
      <>
        <div className={classes.inputLabel}>
          <img src={fanpageLogo} alt={intl.formatMessage({ defaultMessage: "Fanpage Logo"})} />
          <Typography variant="inherit">{intl.formatMessage({ defaultMessage: "Facebook Fanpage:"})}</Typography>
        </div>
        <TypingSelect
          options={pages}
          value={value}
          onChange={this.handleChangeFanpage}
        />
      </>
    );
  };

  renderDropdownYoutubeChannel = () => {
    const { classes, channels: rawChannels, selectedChannel } = this.props;
    const intl = this.props.intl;
    const channels = rawChannels.map(channel => ({
      label: `${channel.title} <${channel.customURL || channel.channelId}>`,
      value: channel.channelId
    }));

    const value = channels.filter(({ value }) => value === selectedChannel);

    return (
      <>
        <div className={classes.inputLabel}>
          <img src={youtubeLogo} alt={intl.formatMessage({ defaultMessage: "Fanpage Logo"})} />
          <Typography variant="inherit">{intl.formatMessage({ defaultMessage: "Youtube Channel:"})}</Typography>
        </div>
        <TypingSelect
          options={channels}
          value={value}
          onChange={this.handleChangeChannel}
        />
      </>
    );
  };

  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    return (
      <Grid container className={classes.root} direction="column">
        <Grid item xs={12}>
          <Typography variant="inherit" className={classes.description}>
            {APP_NAME} {intl.formatMessage({ defaultMessage: "needs permission to access to publish posts on your"})}
            {intl.formatMessage({ defaultMessage: " Youtube Channel. "})}<span>l{intl.formatMessage({ defaultMessage: "Please choose your Youtube Channe"})}</span> {intl.formatMessage({ defaultMessage: "to"})}
            {intl.formatMessage({ defaultMessage: "add and manage your profile:"})}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {this.renderDropdownYoutubeChannel()}
        </Grid>
        <Grid className={classes.buttonBar} item xs={12} container>
          <div
            className={classes.buttonBack}
            onClick={this.handleButtonBackClick}
          >
            {intl.formatMessage({ defaultMessage: "Back"})}
          </div>
          <Button
            color="primary"
            round
            className={classes.buttonConnect}
            onClick={this.handleButtonConnectClick}
          >
            {intl.formatMessage({ defaultMessage: "Connect"})}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  socialAccounts: {
    error,
    youtube: { channels, selectedChannel, accessToken }
  }
}) => ({
  error,
  channels,
  selectedChannel,
  accessToken
});

const mapDispatchToProps = {
  setDialogTitle,
  changePageId,
  toggleEnterPageId,
  addSocialAccount,
  fetchSocialAccounts,
  dispatchNotification,
  openLoading,
  closeLoading,
  changeSelectedPage,
  changeDialogView,
  changeFacebookAccessToken,
  changeFacebookPages,
  changeYoutubeSelectedChannel
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: 'ChooseFanpage' })
  )(ChooseFanpage)
  
) ;
