import React from "react";
import postDetailCardStyle from "./PostDetailCardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import withTheme from "@material-ui/core/styles/withTheme";
import DotDotDot from "react-dotdotdot";
import { Grid, Paper, Icon, Hidden } from "@material-ui/core";
import cx from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import { parseKMB } from "utils";
import defaultAvatar from "assets/img/Avatar Default.png";
import { injectIntl } from 'react-intl';
const defaultImagePost =
  "https://storage.googleapis.com/yn-influencer/NoImageFound.png";

class PostDetailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTooltipTotalEngagementTitle: false,
      openTooltipTotalEngagementValue: false,
      openTooltipEngagedUserTitle: false,
      openTooltipEngagedUserValue: false,
      openTooltipActiveEngagedUserTitle: false
    };
  }

  handleTooltipCloseTotalEngagementTitle = () => {
    this.setState({ openTooltipTotalEngagementTitle: false });
  };

  handleTooltipOpenTotalEngagementTitle = () => {
    this.setState({ openTooltipTotalEngagementTitle: true });
  };

  handleTooltipCloseTotalEngagementValue = () => {
    this.setState({ openTooltipTotalEngagementValue: false });
  };

  handleTooltipOpenTotalEngagementValue = () => {
    this.setState({ openTooltipTotalEngagementValue: true });
  };

  handleTooltipCloseEngagedUserTitle = () => {
    this.setState({ openTooltipEngagedUserTitle: false });
  };

  handleTooltipOpenEngagedUserTitle = () => {
    this.setState({ openTooltipEngagedUserTitle: true });
  };

  handleTooltipCloseEngagedUserValue = () => {
    this.setState({ openTooltipEngagedUserValue: false });
  };

  handleTooltipOpenEngagedUserValue = () => {
    this.setState({ openTooltipEngagedUserValue: true });
  };

  handleTooltipCloseActiveEngagedUserTitle = () => {
    this.setState({ openTooltipActiveEngagedUserTitle: false });
  };

  handleTooltipOpenActiveEngagedUserTitle = () => {
    this.setState({ openTooltipActiveEngagedUserTitle: true });
  };

  render() {
    const {
      classes,
      // theme,
      name,
      avatar,
      totalEngagements,
      postPhotos,
      postType,
      postMessage,
      postCreatedTime,
      postLink,
      engagedUser,
      activeUserPercent
    } = this.props;
    const intl = this.props.intl;
    const {
      openTooltipTotalEngagementTitle,
      openTooltipTotalEngagementValue,
      openTooltipEngagedUserTitle,
      openTooltipEngagedUserValue,
      openTooltipActiveEngagedUserTitle
    } = this.state;

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const namePostIcon = {
      status: "format_quote",
      photo: "collections_outlined",
      video: "videocam",
      link: "insert_link",
      event: "event",
      note: "note"
    };
    const postIcon = postType ? namePostIcon[postType] : namePostIcon["status"];
    const numOfImage = postPhotos ? postPhotos.length : 0;
    const styleOverplayVideo = cx({
      [classes.overlayVideo]: postType === "video",
      [classes.postNonImage]: numOfImage <= 0
    });

    const PostType = props => {
      const stylePost = cx(classes.ellipsePostType, classes.post, {
        [classes.postStatus]: postType === "status",
        [classes.postPhoto]: postType === "photo",
        [classes.postVideo]: postType === "video",
        [classes.postLink]: postType === "link",
        [classes.postEvent]: postType === "event",
        [classes.postNote]: postType === "note"
      });
      return (
        <Grid
          item
          container
          className={stylePost}
          alignItems="center"
          justify="center"
        >
          <a target="_blank" href={props.link} className={classes.iconPostType}>
            <Icon className={classes.iconPostType}>{props.icon}</Icon>
          </a>
        </Grid>
      );
    };
    return (
      <Paper className={classes.paperSize}>
        <PostType icon={postIcon} link={postLink} postType={postType} />
        <Grid
          container
          direction="row"
          className={classes.firstRow}
          spacing={8}
        >
          <Grid
            item
            container
            direction="column"
            lg={4}
            xl={4}
            md={4}
            sm={4}
            xs={4}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.titleStyle}
            >
              <Tooltip
                title={
                  <span>
                    {intl.formatMessage({ defaultMessage: "Total engagement = Total reactions + comments + shares"})}
                    <br />
                    {intl.formatMessage({ defaultMessage: "Including active and inactive users."})}
                  </span>
                }
                classes={{ tooltip: classes.tooltipTitle }}
                onClose={this.handleTooltipCloseTotalEngagementTitle}
                open={openTooltipTotalEngagementTitle}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <div
                  className={classes.titleStyle}
                  onClick={this.handleTooltipOpenTotalEngagementTitle}
                  onMouseOver={this.handleTooltipOpenTotalEngagementTitle}
                  onMouseLeave={this.handleTooltipCloseTotalEngagementTitle}
                >
                  {intl.formatMessage({ defaultMessage: "Total Engagement"})}
                </div>
              </Tooltip>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.valueStyle}
            >
              {typeof totalEngagements === "number" ? (
                <Tooltip
                  title={totalEngagements.toLocaleString("en")}
                  classes={{ tooltip: classes.tooltipTitle }}
                  onClose={this.handleTooltipCloseTotalEngagementValue}
                  open={openTooltipTotalEngagementValue}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <div
                    className={classes.innerValue}
                    onClick={this.handleTooltipOpenTotalEngagementValue}
                    onMouseOver={this.handleTooltipOpenTotalEngagementValue}
                    onMouseLeave={this.handleTooltipCloseTotalEngagementValue}
                  >
                    {parseKMB(totalEngagements)}
                  </div>
                </Tooltip>
              ) : (
                  '_'
                )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={4}
            xl={4}
            md={4}
            sm={4}
            xs={4}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.titleStyle}
            >
              <Tooltip
                title={
                  intl.formatMessage({ defaultMessage: "Total number of unique users that engaged with the post."})
                }
                classes={{ tooltip: classes.tooltipTitle }}
                onClose={this.handleTooltipCloseEngagedUserTitle}
                open={openTooltipEngagedUserTitle}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <div
                  className={classes.titleStyle}
                  onClick={this.handleTooltipOpenEngagedUserTitle}
                  onMouseOver={this.handleTooltipOpenEngagedUserTitle}
                  onMouseLeave={this.handleTooltipCloseEngagedUserTitle}
                >
                  Engaged Users
                </div>
              </Tooltip>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.valueStyleBlue}
            >
              {typeof engagedUser === "number" ? (
                <Tooltip
                  title={Number(engagedUser.toFixed(0)).toLocaleString("en")}
                  classes={{ tooltip: classes.tooltipTitle }}
                  onClose={this.handleTooltipCloseEngagedUserValue}
                  open={openTooltipEngagedUserValue}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <div
                    className={classes.innerValue}
                    onClick={this.handleTooltipOpenEngagedUserValue}
                    onMouseOver={this.handleTooltipOpenEngagedUserValue}
                    onMouseLeave={this.handleTooltipCloseEngagedUserValue}
                  >
                    {parseKMB(Number(engagedUser.toFixed(0)))}
                  </div>
                </Tooltip>
              ) : (
                  "_"
                )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={4}
            xl={4}
            md={4}
            sm={4}
            xs={4}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.titleStyle}
            >
              <Tooltip
                title={
                  <span>
                    {
                      intl.formatMessage({ defaultMessage: "Percentage of unique active users/ followers on this post."})
                    }
                    <br />
                    {
                      intl.formatMessage({ defaultMessage: "Active users/ followers: users that have any activity on Facebook in last 3-months."})
                    }
                  </span>
                }
                classes={{ tooltip: classes.tooltipTitle }}
                onClose={this.handleTooltipCloseActiveEngagedUserTitle}
                open={openTooltipActiveEngagedUserTitle}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <div
                  className={classes.titleStyle}
                  onClick={this.handleTooltipOpenActiveEngagedUserTitle}
                  onMouseOver={this.handleTooltipOpenActiveEngagedUserTitle}
                  onMouseLeave={this.handleTooltipCloseActiveEngagedUserTitle}
                >
                 {intl.formatMessage({ defaultMessage: "Active Engaged Users"})} 
                </div>
              </Tooltip>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.valueStyleBlue}
            >
              {(typeof activeUserPercent === "number"
                ? (activeUserPercent * 100).toFixed(0)
                : "_") + "%"}
            </Grid>
          </Grid>
        </Grid>
        {
          Array.isArray(postPhotos) && numOfImage > 0 && (
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.postMedia}
            >
              <img
                src={postPhotos[0] ? postPhotos[0] : defaultImagePost}
                onError={event => (event.target.src = defaultImagePost)}
                alt="Can not load image..."
                className={classes.postImage}
              />
              {numOfImage > 1 && postType !== "video" && (
                <Grid
                  item
                  container
                  className={classes.overlayExtNumImage}
                  alignItems="center"
                  justify="center"
                >
                  <Grid
                    item
                    container
                    className={classes.extNumImage}
                    alignItems="center"
                    justify="center"
                  >
                    {"+" + (numOfImage - 1).toString() + " photos"}
                  </Grid>
                </Grid>
              )}
              {postType === "video" && (
                <Grid
                  item
                  container
                  className={styleOverplayVideo}
                  alignItems="center"
                  justify="center"
                >
                  <Icon className={classes.playIcon}>{intl.formatMessage({ defaultMessage: "play_circle_outline"})}</Icon>
                </Grid>
              )}
            </Grid>
          )
        }
        <Hidden smDown>
          <Grid
            container
            direction="row"
            className={classes.influencerContainer}
          >
            <Grid
              item
              container
              direction="column"
              lg={2}
              xl={2}
              md={2}
              sm={2}
              xs={2}
              className={classes.avatarContainer}
            >
              <img
                src={avatar ? avatar : defaultAvatar}
                onError={event => (event.target.src = defaultAvatar)}
                className={classes.avatarStyle}
              />
            </Grid>
            <Grid
              item
              container
              direction="column"
              lg={10}
              xl={10}
              md={10}
              sm={10}
              xs={10}
              className={classes.nameTimeContainer}
            >
              <Grid
                item
                container
                direction="row"
                alignItems="flex-start"
                justify="flex-start"
                className={classes.nameStyle}
              >
                {name}
              </Grid>

              <Grid
                item
                container
                direction="row"
                alignItems="flex-start"
                justify="flex-start"
                className={classes.postCreatedTime}
              >
                {new Date(postCreatedTime * 1000).toLocaleDateString(
                  "en-us",
                  options
                )}
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        {postMessage && postMessage.length > 0 && (
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
            className={classes.postMessageStyle}
          >
            {postPhotos && numOfImage > 0 ? (
              <DotDotDot clamp={"2"}>{postMessage}</DotDotDot>
            ) : (
                <DotDotDot clamp={"10"}>{postMessage}</DotDotDot>
              )}
          </Grid>
        )}
      </Paper>
    );
  }
}

export default injectIntl (withTheme()(withStyles(postDetailCardStyle)(PostDetailCard))) ;
