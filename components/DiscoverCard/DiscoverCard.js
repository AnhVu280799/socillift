import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl } from 'react-intl';
// custom components
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
// import MoreActions from "components/MoreActions";
import CustomizedTooltip from 'components/CustomizedTooltip';

import discoverCardStyle from 'assets/jss/material-dashboard-pro-react/components/discoverCardStyle.jsx';
import { checkString } from 'utils/index.js';

import MdiIcon from '@mdi/react';
import {
  mdiFacebookBox,
  mdiFlagVariantOutline,
  mdiTagMultiple,
  mdiBriefcase,
  mdiInstagram,
  mdiYoutube
} from '@mdi/js';

// constants
import defaultAvatar from 'assets/img/Avatar Default.png';
import InfluencerSizes from 'constants/influencersize';

class DiscoverCard extends React.Component {
  render() {
    const {
      classes,
      name,
      location,
      photoUrl,
      categories,
      professions,
      avgInfluenceScore,
      size,
      avgInfluenceScoreType,
      // onClickBookmark,
      onClickSelect,
      // onClickMoreActions,
      checkedCheckbox,
      totalFollowers,
      avgEngagement,
      facebookId,
      pageId,
      // instagramId,
      youtubeId,
      instaUserName,
      id,
      viewDetailInfluencer,
      openModalViewDetail,
      isDemoAccount
    } = this.props;
    const intl = this.props.intl;

    const influenceScoreButtonStyle = cx(classes.influenceScoreButton, {
      [classes.influenceScoreButtonExtreme]:
        avgInfluenceScoreType === 'extreme',
      [classes.influenceScoreButtonLarge]: avgInfluenceScoreType === 'large',
      [classes.influenceScoreButtonMedium]: avgInfluenceScoreType === 'medium',
      [classes.influenceScoreButtonSmall]: avgInfluenceScoreType === 'small',
      [classes.influenceScoreButtonNull]: avgInfluenceScoreType === 'null'
    });

    const returnToolTipCategories = (categories, icon,intl) => {
      const lengthCategories = categories.length;
      const newCategories = [...categories];
      const [firstCat, secondCat] = newCategories;
      const lastCat = newCategories.pop();
      const IconUsed = () => (
        <span className={classes.mdiIconClasses}>
          <MdiIcon
            path={icon}
            size="18px"
            className={classes.influencerIconCategories}
            color="#b4b4b4"
          />{' '}
        </span>
      );

      if (lengthCategories === 1) {
        return (
          <p className={classes.influencerCategories}>
            <IconUsed />
            <span className={classes.oneCat} title={intl.formatMessage({ defaultMessage: "firstCat"})}>
              {intl.formatMessage({ defaultMessage: "firstCat"})}
            </span>
          </p>
        );
      }
      if (lengthCategories === 2) {
        return (
          <p className={classes.influencerCategories}>
            <IconUsed />
            <span className={classes.twoCat} title={intl.formatMessage({ defaultMessage: "firstCat"})}>
              {intl.formatMessage({ defaultMessage: "firstCat"})}
            </span>
            <span>&nbsp; and &nbsp;</span>
            <span className={classes.twoCat} title={intl.formatMessage({ defaultMessage: "secondCat"})}>
              {intl.formatMessage({ defaultMessage: "secondCat"})}
            </span>
          </p>
        );
      }
      if (lengthCategories >= 3) {
        return (
          <CustomizedTooltip
            categories={newCategories}
            iconUsed={<IconUsed />}
            firstCat={firstCat}
            lastCat={lastCat}
          />
        );
      } else {
        return (
          <p className={classes.influencerCategories}>
            <IconUsed />
           {intl.formatMessage({ defaultMessage: "N/A"})}
          </p>
        );
      }
    };

    const tooltipCategories =
      categories && returnToolTipCategories(categories, mdiTagMultiple);
    const tooltipProfessions =
      professions && returnToolTipCategories(professions, mdiBriefcase);

    return (
      <Card className={classes.discoverCard} profile>
        <Checkbox
          tabIndex={-1}
          onClick={onClickSelect}
          color="primary"
          checked={checkedCheckbox}
          className={cx(classes.checkBoxStyle, classes.checkBoxSelect)}
        />
        {/* <Checkbox
          tabIndex={-1}
          defaultChecked
          onClick={onClickBookmark}
          color="primary"
          checkedIcon={<Icon className={classes.checkedIcon}>bookmark</Icon>}
          icon={<Icon className={classes.checkedIcon}>bookmark_border</Icon>}
          className={cx(classes.checkBoxStyle, classes.checkBoxBookmark)}
        />
        <MoreActions
          onClick={onClickMoreActions}
          className={cx(classes.checkBoxStyle, classes.moreActions)}
        /> */}
        <CardAvatar className={classes.cardAvatar} profile>
          {viewDetailInfluencer ? (
            isDemoAccount ? (
              <Link to={`/influencers/${id}`}>
                <div className={classes.avatarContainerWithMark}>
                  <img
                    src={photoUrl ? photoUrl : defaultAvatar}
                    onError={event => (event.target.src = defaultAvatar)}
                  />
                  <div className={classes.viewProfileMark}>
                     {intl.formatMessage({ defaultMessage: "VIEW"})} <br />  {intl.formatMessage({ defaultMessage: "FULL PROFILE"})}
                  </div>
                </div>
              </Link>
            ) : (
              <Link to={`/influencers/${id}`}>
                <img
                  src={photoUrl ? photoUrl : defaultAvatar}
                  onError={event => (event.target.src = defaultAvatar)}
                />
              </Link>
            )
          ) : (
            <div
              className={classes.avatarContainer}
              onClick={() => openModalViewDetail()}
            >
              <img
                src={photoUrl ? photoUrl : defaultAvatar}
                onError={event => (event.target.src = defaultAvatar)}
              />
            </div>
          )}
        </CardAvatar>
        <CardBody className={classes.cardBody} profile>
          {viewDetailInfluencer ? (
            <Link className={classes.cardTitle} to={`/influencers/${id}`}>
              {checkString(name)}
            </Link>
          ) : (
            <div
              className={classes.cardTitle}
              onClick={() => openModalViewDetail()}
            >
              {checkString(name)}
            </div>
          )}
          <h6 className={classes.cardCategory}>
            {checkString(location ? location : 'Viet Nam')} .{' '}
            {size && Object.keys(InfluencerSizes).includes(size)
              ? InfluencerSizes[size]
              : 'N/A'}
          </h6>
          <Button className={influenceScoreButtonStyle} round>
            <p className={classes.influenceScore}>
            {intl.formatMessage({ defaultMessage: "INF.SCORE:"})}{' '}
              <span className={classes.influenceScorePoint}>
                {avgInfluenceScore}
              </span>
            </p>
          </Button>
          {tooltipProfessions}
          {tooltipCategories}
          <hr style={{ margin: '0px' }} />
          <div className={classes.influencerPlatform}>
            {!isDemoAccount && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://fb.com/${facebookId}`}
                className={cx(classes.linkNormal, {
                  [classes.linkDisable]: !facebookId
                })}
              >
                <MdiIcon
                  path={mdiFacebookBox}
                  size="32px"
                  className={cx(classes.socialNetworkIcon, {
                    [classes.socialNetworkIconDisable]: !facebookId
                  })}
                />
              </a>
            )}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://fb.com/${pageId}`}
              className={cx(classes.linkNormal, {
                [classes.linkDisable]: !pageId
              })}
            >
              <MdiIcon
                path={mdiFlagVariantOutline}
                size="32px"
                className={cx(classes.socialNetworkIcon, {
                  [classes.socialNetworkIconDisable]: !pageId
                })}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://instagram.com/${instaUserName}`}
              className={cx(classes.linkNormal, {
                [classes.linkDisable]: !instaUserName
              })}
            >
              <MdiIcon
                path={mdiInstagram}
                size="32px"
                className={cx(classes.socialNetworkIcon, {
                  [classes.socialNetworkIconDisable]: !instaUserName
                })}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://youtube.com/channel/${youtubeId}`}
              className={cx(classes.linkNormal, {
                [classes.linkDisable]: !youtubeId
              })}
            >
              <MdiIcon
                path={mdiYoutube}
                size="32px"
                className={cx(classes.socialNetworkIcon, {
                  [classes.socialNetworkIconDisable]: !youtubeId
                })}
              />
            </a>
          </div>
        </CardBody>
        <div className={classes.infoContainer}>
          <div
            className={classNames(
              classes.childContainer,
              classes.leftContainer
            )}
          >
            <div>
              <div className={classNames(classes.infoTitle)}>Social Reach</div>
              <div className={classNames(classes.infoNumber)}>
                {totalFollowers}
              </div>
            </div>
          </div>
          <div
            className={classNames(
              classes.childContainer,
              classes.rightContainer
            )}
          >
            <div>
              <div className={classNames(classes.infoTitle)}>
                 {intl.formatMessage({ defaultMessage: "Avg. Engagement"})}
              </div>
              <div className={classNames(classes.infoNumber)}>
                {avgEngagement}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

DiscoverCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectIntl(withStyles(discoverCardStyle)(DiscoverCard)) ;
