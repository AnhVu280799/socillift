import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import platformFilterStyle from './PlatformFilterStyle';
import { LOGO as sociaLiftlogo, APP_NAME } from 'constants/common';
import facebookLogo from 'assets/img/facebook.svg';
import youtubeLogo from 'assets/img/youtube.svg';
import instaLogo from 'assets/img/instagram.svg';
import flagLogo from 'assets/img/flag_variant.svg';
import socialFrame from 'assets/img/social_media_frame.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import { injectIntl } from 'react-intl';
class PlatformFilter extends React.PureComponent {
  render() {
    const { classes, color, name, className, choosePlatform, userName, disableExternalAccount, isDemoAccount, intl } =
      this.props;
      const intl = this.props.intl;

    return (
      <Grid container className={classes.root}>
        <Grid container className={classes.userName}>
          <FormattedMessage defaultMessage="Hi {username}," values={{ username: userName }} />
        </Grid>
        <Grid container className={classes.welcomeContainer}>
          <div className={classes.welcomeStyle}>
            <FormattedMessage defaultMessage="Welcome to" />
          </div>
          <img
            src={sociaLiftlogo}
            alt={intl.formatMessage({ defaultMessage: '{app_name} Logo' }, { app_name: APP_NAME })}
            className={classes.logoStyle}
          />
        </Grid>
        <Grid container className={classes.questionStyle}>
          <FormattedMessage defaultMessage="WHICH PLATFORM DO YOU WANT TO GET STARTED ?" />
        </Grid>
        <Grid container item direction="row" className={classes.actionWrapper}>
          <Grid
            container
            item
            direction="column"
            xl={6}
            lg={6}
            md={10}
            sm={12}
            xs={12}
            alignItems="center"
            justify="center"
            className={classes.btnWrapper}
          >
            <Grid container item direction="row" className={classes.rowOne} spacing={16}>
              {!isDemoAccount && (
                <Grid
                  container
                  item
                  direction="column"
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  alignItems="center"
                  justify="center"
                >
                  <Button
                    className={classNames(classes.buttonStyle, classes.buttonHoverFb, {
                      [classes.disabledButton]: disableExternalAccount
                    })}
                    onClick={() => choosePlatform('fb')}
                    disabled={disableExternalAccount}
                  >
                    <img
                      src={facebookLogo}
                      alt={intl.formatMessage({ defaultMessage: 'Facebook Logo' })}
                      className={classes.logoButton}
                    />
                    <p className={classes.buttonName}>
                      <FormattedMessage defaultMessage="Facebook Profile" />
                    </p>
                    <p className={classes.buttonDescription}>
                      <FormattedMessage defaultMessage="{number} Influencers" values={{ number: '10K+' }} />
                    </p>
                  </Button>
                </Grid>
              )}
              <Grid
                container
                item
                direction="column"
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                alignItems="center"
                justify="center"
              >
                <Button
                  className={classNames(classes.buttonStyle, classes.buttonHoverPage)}
                  onClick={() => choosePlatform('page')}
                >
                  <img
                    src={flagLogo}
                    alt={intl.formatMessage({ defaultMessage: 'Fanpage Logo' })}
                    className={classes.logoButton}
                  />
                  <p className={classes.buttonName}>
                    <FormattedMessage defaultMessage="Facebook Fanpage" />
                  </p>
                  <p className={classes.buttonDescription}>
                    <FormattedMessage defaultMessage="{number} Influencers" values={{ number: '3.3K+' }} />
                  </p>
                </Button>
              </Grid>
              {isDemoAccount && (
                <Grid
                  container
                  item
                  direction="column"
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  alignItems="center"
                  justify="center"
                >
                  <Button
                    className={classNames(classes.buttonStyle, classes.buttonHoverYoutube, {
                      [classes.disabledButton]: disableExternalAccount
                    })}
                    onClick={() => choosePlatform('youtube')}
                    disabled={disableExternalAccount}
                  >
                    <img
                      src={youtubeLogo}
                      alt={intl.formatMessage({ defaultMessage: 'Youtube Logo' })}
                      className={classes.logoButton}
                    />
                    <p className={classes.buttonName}>
                      <FormattedMessage defaultMessage="Youtube" />
                    </p>
                    <p className={classes.buttonDescription}>
                      <FormattedMessage defaultMessage="{number} Influencers" values={{ number: '3.8K+' }} />
                    </p>
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid container item direction="row" spacing={16}>
              {!isDemoAccount && (
                <Grid
                  container
                  item
                  direction="column"
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  alignItems="center"
                  justify="center"
                >
                  <Button
                    className={classNames(classes.buttonStyle, classes.buttonHoverYoutube, {
                      [classes.disabledButton]: disableExternalAccount
                    })}
                    onClick={() => choosePlatform('youtube')}
                    disabled={disableExternalAccount}
                  >
                    <img
                      src={youtubeLogo}
                      alt={intl.formatMessage({ defaultMessage: 'Youtube Logo' })}
                      className={classes.logoButton}
                    />
                    <p className={classes.buttonName}>
                      <FormattedMessage defaultMessage="Youtube" />
                    </p>
                    <p className={classes.buttonDescription}>
                      <FormattedMessage defaultMessage="{number} Influencers" values={{ number: '3.8K+' }} />
                    </p>
                  </Button>
                </Grid>
              )}
              <Grid
                container
                item
                direction="column"
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                alignItems="center"
                justify="center"
              >
                <Button
                  className={classNames(classes.buttonStyle, classes.buttonHoverInsta, {
                    [classes.disabledButton]: disableExternalAccount
                  })}
                  onClick={() => choosePlatform('insta')}
                  disabled={disableExternalAccount}
                >
                  <img
                    src={instaLogo}
                    alt={intl.formatMessage({ defaultMessage: 'Insta Logo' })}
                    className={classes.logoButton}
                  />
                  <p className={classes.buttonName}>
                    <FormattedMessage defaultMessage="Instagram" />
                  </p>
                  <p className={classes.buttonDescription}>
                    <FormattedMessage defaultMessage="{number} Influencers" values={{ number: '2K+' }} />
                  </p>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid
              container
              item
              direction="column"
              xl={6}
              lg={6}
              md={4}
              sm={12}
              xs={12}
              className={classes.frameContainer}
            >
              <img
                src={socialFrame}
                alt={intl.formatMessage({ defaultMessage: 'Frame Image' })}
                className={classes.frameImage}
              />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <img className={classes.background} src={socialFrame} />
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

PlatformFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(platformFilterStyle)(PlatformFilter));
