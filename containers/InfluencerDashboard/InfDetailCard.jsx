// react
import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import styles from "./InfDetailCardStyle";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { injectIntl } from 'react-intl';
// mdi icon
import MdiIcon from "@mdi/react";
import {
  mdiFacebookBox,
  mdiFlagVariantOutline,
  mdiYoutube,
  mdiInstagram,
  mdiAccountEdit,
} from "@mdi/js";

// libs
import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";
import cx from "classnames";

// constants
import INF_KINDS from "../../constants/influencerkinds";
const CanEditInfluencerBasicInfo = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canEditInfluencerBasicInfo,
  wrapperDisplayName: "CanEditInfluencerBasicInfo",
  FailureComponent: () => null
})(({ children }) => children);

class InfDetailCard extends React.Component {

  render() {
    const {
      classes,
      onEdit,
      photoUrl,
      name,
      kind,
      size,
      location,
      career,
      categories,
      state,
      facebookId,
      pageId,
      youtubeId,
      instaUserName,
      platform,
      platformCategories,
      ...props
    } = this.props;
    const intl = this.props.intl;

    return (
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid className={classes.paperInfo} item container direction="row">
            <Grid
              item
              container
              xs={1}
              direction="column"
              className={classes.socialContainer}
              alignItems="stretch"
              justify="center"
            >
              <Grid
                item
                container
                direction="row"
                alignItems="stretch"
                justify="center"
              >
                <a
                  target="_blank"
                  href={`https://fb.com/${facebookId}`}
                  className={cx(classes.linkNormal, {
                    [classes.linkDisable]: !facebookId
                  })}
                >
                  <Button className={classes.socialNetworkBtn}>
                    <MdiIcon
                      path={mdiFacebookBox}
                      size="32px"
                      className={cx(classes.socialNetworkIcon, {
                        [classes.socialNetworkIconDisable]: !facebookId
                      })}
                    />
                  </Button>
                </a>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="stretch"
                justify="center"
              >
                <a
                  target="_blank"
                  href={`https://fb.com/${pageId}`}
                  className={cx(classes.linkNormal, {
                    [classes.linkDisable]: !pageId
                  })}
                >
                  <Button className={classes.socialNetworkBtn}>
                    <MdiIcon
                      path={mdiFlagVariantOutline}
                      size="32px"
                      className={cx(classes.socialNetworkIcon, {
                        [classes.socialNetworkIconDisable]: !pageId
                      })}
                    />
                  </Button>
                </a>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="stretch"
                justify="center"
              >
                <a
                  target="_blank"
                  href={`https://instagram.com/${instaUserName}`}
                  className={cx(classes.linkNormal, {
                    [classes.linkDisable]: !instaUserName
                  })}
                >
                  <Button className={classes.socialNetworkBtn}>
                    <MdiIcon
                      path={mdiInstagram}
                      size="32px"
                      className={cx(classes.socialNetworkIcon, {
                        [classes.socialNetworkIconDisable]: !instaUserName
                      })}
                    />
                  </Button>
                </a>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="stretch"
                justify="center"
              >
                <a
                  target="_blank"
                  href={`https://youtube.com/channel/${youtubeId}`}
                  className={cx(classes.linkNormal, {
                    [classes.linkDisable]: !youtubeId
                  })}
                >
                  <Button className={classes.socialNetworkBtn}>
                    <MdiIcon
                      path={mdiYoutube}
                      size="32px"
                      className={cx(classes.socialNetworkIcon, {
                        [classes.socialNetworkIconDisable]: !youtubeId
                      })}
                      color={"red"}
                    />
                  </Button>
                </a>
              </Grid>
            </Grid>
            <Grid item xs={3} className={classes.imgContainer}>
              <img
                className={classes.img}
                src={photoUrl}
                onError={e =>
                  (e.target.src =
                    "https://storage.googleapis.com/yn-influencer/Avatar%20Default.png")
                }
              />
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={8}
              className={classes.bioContainer}
            >
              <Grid
                item
                container
                alignItems="center"
                className={classes.header}
              >
                <Grid xs={8} item>
                  <span className={classes.name}>{intl.formatMessage({ defaultMessage: "name"})}</span>
                </Grid>
              </Grid>
              <Grid item container className={classes.bioBody}>
                <Grid
                  item
                  container
                  md={4}
                  direction="column"
                  className={classes.flexNone}
                >
                  {
                    platform === 'fb' || platform === 'page' &&
                    <Grid item className={classes.field}>
                      <span className={classes.fieldTitle}>{intl.formatMessage({ defaultMessage: "Inf. size"})}:&nbsp;</span>
                      {typeof size === "string" && (
                        <Chip
                          label={size.replace("_", " ")}
                          className={`${classes.size} ${
                            classes[size.toLowerCase()]
                            }`}
                        />
                      )}
                    </Grid>
                  }
                  <Grid item className={classes.field}>
                    <span className={classes.fieldTitle}>{intl.formatMessage({ defaultMessage: "Inf. type:"})}&nbsp;</span>
                    <span className={classes.fieldValue}>
                      {INF_KINDS[kind]}
                    </span>
                  </Grid>
                  <Grid item className={classes.field}>
                    <span className={classes.fieldTitle}>Location:&nbsp;</span>
                    <span className={classes.fieldValue}>{location ? location : 'Viet Nam'}</span>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  md={4}
                  direction="column"
                  className={classes.flexNone}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    className={classes.groupTitle}
                  >
                    <Icon className={classes.groupIcon}>work</Icon>
                    <span className={classes.groupName}>
                      {platform === "fb" || platform === "insta"
                        ? intl.formatMessage({ defaultMessage: "PROFESSIONS"})
                        : platform === "page"
                          ? intl.formatMessage({ defaultMessage: "FACEBOOK PAGE CATEGORY"})
                          : platform === "youtube"
                            ? intl.formatMessage({ defaultMessage: "YOUTUBE CATEGORIES"})
                            : ""}
                    </span>
                  </Grid>
                  <Grid item container className={classes.professions}>
                    {
                      (platform === "fb" || platform === "insta") && career && career.length > 0
                        ? career.map(({ name }, idx) => (
                          <Chip
                            label={name}
                            key={idx}
                            className={classes.profession}
                          />
                        ))
                        : ((platform === "page" || platform === "youtube") && platformCategories && platformCategories.length > 0 ?
                          platformCategories.map(({ name }, idx) => (
                            <Chip
                              label={name}
                              key={idx}
                              className={classes.profession}
                            />
                          )) :
                          'updating')
                    }
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  md={4}
                  direction="column"
                  className={classes.flexOne}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    className={classes.groupTitle}
                  >
                    <Icon className={classes.groupIcon}>{intl.formatMessage({ defaultMessage: "folder_shared"})}</Icon>
                    <span className={classes.groupName}>{intl.formatMessage({ defaultMessage: "CATEGORIES"})}</span>
                  </Grid>
                  <Grid item container className={classes.categories}>
                    {
                      categories && categories.length > 0 ?
                        categories
                          .map(({ categoryName }) => categoryName)
                          .join(" . ") :
                        'updating'
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="footer"
            item
            container
            className={classes.footer}
            direction="row"
            alignItems="center"
          >
            <Grid
              item
              container
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              alignItems="center"
            >
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              justify="flex-end"
            >
              <Grid item>
                <CanEditInfluencerBasicInfo
                  children={
                    <Button
                      onClick={onEdit}
                      className={`${classes.button} ${classes.btnPrimary}`}
                    >
                      <MdiIcon
                        path={mdiAccountEdit}
                        size="18px"
                        className={`${classes.btnIcon} ${
                          classes.btnIconPrimary
                          }`}
                      />
                     {intl.formatMessage({ defaultMessage: "Edit"})} 
                    </Button>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (withStyles(styles)(InfDetailCard)) ;
