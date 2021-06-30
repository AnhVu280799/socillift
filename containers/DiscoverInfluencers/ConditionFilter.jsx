import React from 'react';
import PropTypes from 'prop-types';

// classNames
import classNames from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { injectIntl } from 'react-intl';
// custom components
import ButtonInf from 'components/CustomButtons/ButtonInf';

// styles
import conditionFilterStyle from './ConditionFilterStyle';

// contanst
import influencerLogo from 'assets/img/influencer.svg';
import targetLogo from 'assets/img/target.svg';
import tagLogo from 'assets/img/tag.svg';

class ConditionFilter extends React.Component {
  componentDidMount() {}

  platformText = platform => {
    switch (platform) {
      case 'fb':
        return 'Facebook Profile';
      case 'page':
        return 'Facebook Fanpage';
      case 'youtube':
        return 'Youtube';
      case 'insta':
        return 'Instagram';
    }
  };
  render() {
    const {
      classes,
      color,
      name,
      className,
      onBack,
      platform,
      onNextInfDemo,
      onNextAudDemo,
      onNextInfCate,
      ...props
    } = this.props;
    const intl = this.props.intl;
    return (
      <Grid container className={classes.root} direction="row">
        <Grid
          item
          container
          direction="row"
          className={classes.welcomeContainer}
          alignItems="center"
          justify="center"
        >
          <p className={classes.selectedPlatform}>
           {intl.formatMessage({ defaultMessage: " Great, you selected"})}
            <span className={classes.platformStyle}>
              {this.platformText(platform)}
            </span>
          </p>
          <p className={classes.welcomeStyle}>{intl.formatMessage({ defaultMessage: "LET’S DISCOVER INFLUENCERS BY"})}</p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.buttonWrapper}
          alignItems="center"
          justify="center"
          spacing={16}
        >
          <Grid
            item
            container
            direction="column"
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            alignItems="center"
            justify="center"
          >
            <Button
              className={classNames(classes.buttonStyle, classes.infDemoHover)}
              onClick={() => onNextInfDemo()}
            >
              <img
                src={influencerLogo}
                alt="Influencer Logo"
                className={classes.logoButton}
              />
              <p className={classes.buttonName}>{intl.formatMessage({ defaultMessage: "Influencer Demographic"})}</p>
              <div className={classes.orangeBottomCircle} />
              <div className={classes.orangeLeftCircle} />
            </Button>
          </Grid>
          {(platform === 'fb' || platform === 'page') && (
            <Grid
              item
              container
              direction="column"
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              alignItems="center"
              justify="center"
            >
              <Button
                className={classNames(
                  classes.buttonStyle,
                  classes.infAudiHover
                )}
                onClick={() => onNextAudDemo()}
              >
                <img
                  src={targetLogo}
                  alt={intl.formatMessage({ defaultMessage: "Target Logo"})}
                  className={classes.logoButton}
                />
                <p className={classes.buttonName}>{intl.formatMessage({ defaultMessage: "Audiencer Demographic"})}</p>
                <div className={classes.purpleBottomCircle} />
                <div className={classes.purpleLeftCircle} />
              </Button>
            </Grid>
          )}
          <Grid
            item
            container
            direction="column"
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            alignItems="center"
            justify="center"
          >
            <Button
              className={classNames(classes.buttonStyle, classes.infCateHover)}
              onClick={() => onNextInfCate()}
            >
              <img
                src={tagLogo}
                alt={intl.formatMessage({ defaultMessage: "Category Logo"})}
                className={classes.logoButton}
              />
              <p className={classes.buttonName}>{intl.formatMessage({ defaultMessage: "Influenced Category"})}</p>
              <div className={classes.blueBottomCircle} />
              <div className={classes.blueLeftCircle} />
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.backBtnWrapper}
          alignItems="center"
          justify="center"
        >
          <ButtonInf className={classes.backButton} onClick={() => onBack(1)}>
          {intl.formatMessage({ defaultMessage: "Back To Choose Platform"})}
          </ButtonInf>
        </Grid>
      </Grid>
    );
  }
}

ConditionFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(conditionFilterStyle)(ConditionFilter)) ;
