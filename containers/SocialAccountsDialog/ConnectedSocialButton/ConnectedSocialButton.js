import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Grid,
  Button,
  Avatar,
  Tooltip,
  Fade,
  LinearProgress
} from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import styles from './styles';

import facebookLogo from 'assets/img/facebook.svg';
import fanpageLogo from 'assets/img/flag_variant.svg';
import youtubeLogo from 'assets/img/youtube.svg';
import instagramLogo from 'assets/img/instagram.svg';

class ConnectedSocialButton extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    platform: PropTypes.oneOf(['fb', 'page', 'youtube', 'insta']).isRequired,
    isConnected: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
  };

  getPlatformData(platform) {
    const { classes } = this.props;
    const intl = this.props.intl;
    const data = {
      fb: {
        buttonConnectClassName: classes.buttonFacebook,
        buttonConnectTitle: intl.formatMessage({ defaultMessage: `Connect Facebook Personal Profile`}),
        buttonLinkedClassName: classes.buttonFacebookLinked,
        logo: facebookLogo,
        logoAlt: intl.formatMessage({ defaultMessage: `Facebook Logo`}),
        tooltipTitle: intl.formatMessage({ defaultMessage: `Please close the pop-up to remove this connected profile if you would like to connect another Facebook Personal Profile.`})
      },
      page: {
        buttonConnectClassName: classes.buttonPage,
        buttonConnectTitle: intl.formatMessage({ defaultMessage: `Connect Facebook Fanpage`}),
        buttonLinkedClassName: classes.buttonPageLinked,
        logo: fanpageLogo,
        logoAlt: intl.formatMessage({ defaultMessage: `Fanpage Logo`}),
        tooltipTitle: intl.formatMessage({ defaultMessage: `Please close the pop-up to remove this connected profile if you would like to connect another Facebook Fanpage.`})
      },
      youtube: {
        hide: true,
        buttonConnectClassName: classes.buttonYoutube,
        buttonConnectTitle: intl.formatMessage({ defaultMessage: `Connect Youtube Profile`}),
        buttonLinkedClassName: classes.buttonYoutubeLinked,
        logo: youtubeLogo,
        logoAlt: intl.formatMessage({ defaultMessage: `Youtube Logo`}),
        tooltipTitle: intl.formatMessage({ defaultMessage: `Please close the pop-up to remove this connected profile if you would like to connect another Youtube Channel Profile.`})
      },
      insta: {
        buttonConnectClassName: classes.buttonInstagram,
        buttonConnectTitle: intl.formatMessage({ defaultMessage: `Connect Instagram Profile`}),
        buttonLinkedClassName: classes.buttonInstagramLinked,
        logo: instagramLogo,
        logoAlt: intl.formatMessage({ defaultMessage: `Instagram Logo`}),
        tooltipTitle: intl.formatMessage({ defaultMessage: `Please close the pop-up to remove this connected profile if you would like to connect another Instagram Profile.`})
      }
    };

    return data[platform] || data['fb'];
  }

  handleButtonClicked = e => {
    if (this.props.onClick) this.props.onClick(e);
  };

  renderButton = () => {
    const { classes, platform, disabled, loading } = this.props;

    const platformData = this.getPlatformData(platform);

    return (
      <Button
        classes={{
          root: classes.button,
          disabled: classes.buttonDisabled
        }}
        className={platformData.buttonConnectClassName}
        onClick={this.handleButtonClicked}
        disabled={disabled}
      >
        <Grid container item>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs={3}
          >
            <img
              className={clsx({
                [classes.buttonLogo]: true,
                [classes.buttonLogoDisabled]: !!disabled
              })}
              src={platformData.logo}
              alt={platformData.logoAlt}
            />
          </Grid>
          <Grid
            container
            item
            direction="column"
            alignItems="flex-start"
            justify="center"
            xs={9}
          >
            <div
              className={clsx({
                [classes.buttonName]: true,
                [classes.buttonNameDisabled]: !!disabled
              })}
            >
              {platformData.buttonConnectTitle}
              {loading && <LinearProgress />}
            </div>
          </Grid>
        </Grid>
      </Button>
    );
  };

  renderUserInfo = () => {
    const { classes, platform, userInfo } = this.props;
    const intl = this.props.intl;
    const { name, username, avatar } = userInfo || {};

    const platformData = this.getPlatformData(platform);

    return (
      <Grid
        className={clsx(classes.button, platformData.buttonLinkedClassName)}
        container
        item
        xs={12}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          item
          xs={3}
        >
          <Avatar
            className={classes.avatar}
            src={avatar}
            alt={intl.formatMessage({ defaultMessage:  `Avatar of {name}.`} ,{ name: name})}
          />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="center"
          item
          xs={7}
        >
          <Grid container item className={classes.logoName}>
            <img
              className={classes.logoButtonSmall}
              src={platformData.logo}
              alt={platformData.logoAlt}
            />
            <div className={classes.influencerName}>{name}</div>
          </Grid>
          <Grid container item className={classes.userName}>
            {username}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          item
          xs={2}
        >
          <Tooltip
            title={platformData.tooltipTitle}
            classes={{
              tooltip: classes.tooltipTitle,
              popper: classes.lastTooltip
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            PopperProps={{
              disablePortal: true
            }}
          >
            <ErrorOutline className={classes.toolTipIcon} />
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, isConnected } = this.props;

    return (
      <div className={classes.root}>
        {isConnected ? this.renderUserInfo() : this.renderButton()}
      </div>
    );
  }
}

export default injectIntl (
  withStyles(styles, { name: 'ConnectedSocialButton' })(
    ConnectedSocialButton
  )
) ;
