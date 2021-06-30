// react
import React from "react";

// style
import styles from "./RecentActivitiesStyle";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Paper, Icon } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";
import { injectIntl } from 'react-intl';
// libs
import DotDotDot from "react-dotdotdot";
import cx from "classnames";
import moment from "moment";
import { parseKMB } from "utils";

// api
import { getInfluencerRecentPostsById } from "../../apis/api";

// redux
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";

class RecentActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPosts: 0,
      totalEngagements: 0,
      totalReactions: 0,
      totalComments: 0,
      totalShares: 0,
      totalViews: 0,
      totalLikes: 0,
      totalDislikes: 0,
      avgEngagements: 0,
      posts: [],
      tabPlatform: 0,
      openTotalFollower: false
    };
  }

  fetchData = async () => {
    const toDate = moment().endOf("day");
    const fromDate = moment()
      .subtract(30, "days")
      .startOf("day");

    const params = {
      platform: this.props.platform,
      platformId: this.props.authorId,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      summary: true
    };

    return new Promise((resolve, reject) => {
      getInfluencerRecentPostsById(params, response => resolve(response));
    });
  };

  loadData = () => {
    this.props.openLoading();

    this.fetchData()
      .then(response => {
        this.setState({
          posts: response.data,
          totalPosts: response.total,
          totalReactions: response.summary.totalReactions,
          totalComments: response.summary.totalComments,
          totalShares: response.summary.totalShares,
          totalLikes: response.summary.totalLikes,
          totalViews: response.summary.totalViews,
          totalDislikes: response.summary.totalDislikes,
          totalEngagements: response.summary.totalEngagements,
          avgEngagements: response.summary.avgEngagements
        });
      })
      .then(() => {
        this.props.closeLoading();
      })
      .catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    if (this.state.tabPlatform !== this.props.tabPlatform) {
      this.setState({
        tabPlatform: this.props.tabPlatform
      })
      this.loadData();
    }
  }

  render() {
    const { classes, platform, showTooltip, totalFollowers, isWaiting } = this.props;
    const intl = this.props.intl;
    const {
      totalPosts,
      totalEngagements,
      avgEngagements,
      totalReactions,
      totalComments,
      totalShares,
      totalViews,
      totalLikes,
      totalDislikes,
      posts
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

    class CardValue extends React.Component {
      state = {
        open: false
      };

      handleTooltipClose = () => {
        this.setState({ open: false });
      };

      handleTooltipOpen = () => {
        this.setState({ open: true });
      };

      render() {
        const props = this.props;

        return (
          <Paper className={classes.paperSize}>
            <Grid
              container
              item
              direction="row"
              className={classes.valueContainer}
            >
              <Grid
                item
                container
                xs={props.leftSize}
                alignItems="center"
                justify="center"
                className={classes.iconContainer}
              >
                <Icon className={classes.iconDesign}>{props.icon}</Icon>
              </Grid>
              {
                props.toggleValueDetail && typeof props.value === "number" ?
                  (
                    <Tooltip
                      title={
                        props.valueDetail
                      }
                      classes={{ tooltip: classes.tooltipTitle }}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        xs={props.middleSize}
                        className={classes.contentSize}
                      >
                        <Grid
                          item
                          container
                          direction="row"
                          className={classes.titleSize}
                        >
                          {props.title}
                        </Grid>
                        <Grid
                          item
                          container
                          direction="row"
                          className={classes.valueSize}
                        >
                          {props.value > 10000000 ? parseKMB(props.value) : props.value.toLocaleString("en")}
                        </Grid>
                        {props.showTooltip && (
                          <Tooltip
                            title={props.tooltipContent}
                            classes={{
                              tooltip: classes.tooltipTitle,
                              popper: classes.lastTooltip
                            }}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 300 }}
                            PopperProps={{
                              disablePortal: true
                            }}
                            onClose={this.handleTooltipClose}
                            open={this.state.open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                          >
                            <ErrorOutline
                              onClick={this.handleTooltipOpen}
                              onMouseLeave={this.handleTooltipClose}
                              className={classes.toolTipIcon}
                            />
                          </Tooltip>
                        )}
                      </Grid>

                    </Tooltip>

                  ) :
                  (<Grid
                    item
                    container
                    direction="column"
                    xs={props.middleSize}
                    className={classes.contentSize}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.titleSize}
                    >
                      {props.title}
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.valueSize}
                    >
                      {props.value}
                    </Grid>
                    {props.showTooltip && (
                      <Tooltip
                        title={props.tooltipContent}
                        classes={{
                          tooltip: classes.tooltipTitle,
                          popper: classes.lastTooltip
                        }}
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        PopperProps={{
                          disablePortal: true
                        }}
                        onClose={this.handleTooltipClose}
                        open={this.state.open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                      >
                        <ErrorOutline
                          onClick={this.handleTooltipOpen}
                          onMouseLeave={this.handleTooltipClose}
                          className={classes.toolTipIcon}
                        />
                      </Tooltip>
                    )}
                  </Grid>)
              }
              {props.children}
            </Grid>
          </Paper>
        );
      }
    }

    const ListValue = props => {
      return (
        <Grid
          item
          container
          xs={5}
          alignItems="center"
          justify="center"
          className={classes.subContent}
        >
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Reactions"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.reactions}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Comments"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.comments}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Shares"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.shares}
            </Grid>
          </Grid>
          <Icon className={classes.arrowIcon}>{intl.formatMessage({ defaultMessage: "arrow_right"})}</Icon>
        </Grid>
      );
    };

    const ListValueYoutube = props => {
      return (
        <Grid
          item
          container
          xs={5}
          alignItems="center"
          justify="center"
          className={classes.subContent}
        >
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Views"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.views}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Comments"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.comments}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Likes"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.likes}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Dislikes"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.dislikes}
            </Grid>
          </Grid>
          <Icon className={classes.arrowIcon}>{intl.formatMessage({ defaultMessage: "arrow_right"})}</Icon>
        </Grid>
      );
    };

    const ListValueInsta = props => {
      return (
        <Grid
          item
          container
          xs={5}
          alignItems="center"
          justify="center"
          className={classes.subContent}
        >
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Likes"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.likes}
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={16}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subTitle}
              alignItems="flex-start"
            >
              {intl.formatMessage({ defaultMessage: "Comments"})}
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              className={classes.subValue}
              alignItems="flex-start"
            >
              {props.comments}
            </Grid>
          </Grid>
          {props.views !== "N/A" && (
            <Grid item container direction="row" spacing={16}>
              <Grid
                item
                container
                direction="column"
                xs={6}
                className={classes.subTitle}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Views"})}
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={6}
                className={classes.subValue}
                alignItems="flex-start"
              >
                {props.views}
              </Grid>
            </Grid>
          )}
          <Icon className={classes.arrowIcon}>{intl.formatMessage({ defaultMessage: "arrow_right"})}</Icon>
        </Grid>
      );
    };

    const ListValuePost = props => {
      return (
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          className={classes.subContentPost}
          spacing={0}
        >
          <Grid item container direction="column" xs={9}>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Reactions"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.reactions}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Comments"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.comments}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Shares"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.shares}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={3}
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              container
              className={classes.ellipseLaunch}
              alignItems="center"
              justify="center"
            >
              <a href={props.postLink} target="_blank" rel="noopener noreferrer">
                <Icon className={classes.launchIcon}>{intl.formatMessage({ defaultMessage: "launch"})}</Icon>
              </a>
            </Grid>
          </Grid>
        </Grid>
      );
    };

    const ListValuePostYoutube = props => {
      return (
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          className={classes.subContentPost}
          spacing={0}
        >
          <Grid item container direction="column" xs={9}>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Views"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.views}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Comments"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.comments}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Likes"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.likes}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Dislikes"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.dislikes}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={3}
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              container
              className={classes.ellipseLaunch}
              alignItems="center"
              justify="center"
            >
              <a href={props.postLink} target="_blank" rel="noopener noreferrer">
                <Icon className={classes.launchIcon}>{intl.formatMessage({ defaultMessage: "launch"})}</Icon>
              </a>
            </Grid>
          </Grid>
        </Grid>
      );
    };

    const ListValuePostInsta = props => {
      return (
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          className={classes.subContentPost}
          spacing={0}
        >
          <Grid item container direction="column" xs={9}>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Likes"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.likes}
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                xs={6}
                className={classes.subTitlePost}
                alignItems="flex-start"
              >
                {intl.formatMessage({ defaultMessage: "Comments"})}
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.subValuePost}
                alignItems="flex-start"
              >
                {props.comments}
              </Grid>
            </Grid>
            {props.views !== "N/A" && (
              <Grid item container direction="row">
                <Grid
                  item
                  container
                  xs={6}
                  className={classes.subTitlePost}
                  alignItems="flex-start"
                >
                  {intl.formatMessage({ defaultMessage: "Views"})}
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  className={classes.subValuePost}
                  alignItems="flex-start"
                >
                  {props.views}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={3}
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              container
              className={classes.ellipseLaunch}
              alignItems="center"
              justify="center"
            >
              <a href={props.postLink} target="_blank" rel="noopener noreferrer">
                <Icon className={classes.launchIcon}>{intl.formatMessage({ defaultMessage: "launch"})}</Icon>
              </a>
            </Grid>
          </Grid>
        </Grid>
      );
    };

    const PostType = props => {
      const stylePost = cx(classes.ellipsePostType, classes.post, {
        [classes.postStatus]: props.postType === "status",
        [classes.postPhoto]: props.postType === "photo",
        [classes.postVideo]: props.postType === "video",
        [classes.postLink]: props.postType === "link",
        [classes.postEvent]: props.postType === "event",
        [classes.postNote]: props.postType === "note"
      });

      return (
        <Grid
          item
          container
          className={stylePost}
          alignItems="center"
          justify="center"
        >
          <Icon className={classes.iconPostType}>{props.icon}</Icon>
        </Grid>
      );
    };

    const RecentPost = props => {
      const styleImage = cx(classes.postImage, {
        [classes.postVideoImage]:
          props.postType === "video" && props.imageNum === 1
      });
      const styleImageWrapper = cx(classes.secondImageOverlay, {
        [classes.postImgWrapperYoutube]: props.postPlatform === "youtube"
      });
      const styleOverplay = cx(classes.overlay, {
        [classes.overlayVideoYoutube]: props.postPlatform === "youtube",
        [classes.postNonImage]: props.imageNum <= 0
      });
      // const stylePlayIcon = cx({
      //   [classes.playIcon]: props.postType === "video"
      // });
      const stylePostContent = cx({
        [classes.postContentYoutube]: props.postPlatform === "youtube",
        [classes.postContent]:
          props.postPlatform === "facebook" || props.postPlatform === "insta"
      });
      const stylePostContentWrapper = cx({
        [classes.contentWrapper]: props.postType !== "status",
        [classes.contentWrapperStatus]: props.postType === "status"
      });
      const styleAudioContent = cx({
        [classes.audioContent]: props.postType !== "status",
        [classes.audioContentStatus]: props.postType === "status"
      });
      return (
        <Grid item container className={classes.postWrapper}>
          <Paper className={classes.postPaper}>
            <Grid
              item
              container
              direction="row"
              className={classes.postContainer}
              xs={12}
            >
              <Grid
                item
                container
                direction="column"
                className={stylePostContentWrapper}
              >
                {platform === "youtube" && (
                  <Grid
                    item
                    container
                    direction="row"
                    className={classes.postTilte}
                  >
                    <DotDotDot clamp={1}>{props.title}</DotDotDot>
                  </Grid>
                )}
                <Grid
                  item
                  container
                  direction="row"
                  className={stylePostContent}
                >
                  <DotDotDot clamp={3}>{props.content}</DotDotDot>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.postTime}
                >
                  {props.time}
                </Grid>
              </Grid>
              {props.postType !== "status" && (
                <Grid item container className={styleAudioContent}>
                  <Grid item container direction='column' xs={6} alignItems='center' justify='center'>
                    {
                      (props.imageNum >= 2) &&
                      (
                        <img src={props.pic1} className={classes.postImage} alt="post-info" />
                      )
                    }
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={6}
                    alignItems="center"
                    justify="center"
                    className={styleImageWrapper}
                  >
                    {props.imageNum === 1 && (
                      <img src={props.pic1} className={styleImage} alt="post-info" />
                    )}
                    {props.imageNum >= 2 && (
                      <img src={props.pic2} className={styleImage} alt="post-info" />
                    )}
                    {props.imageNum >= 2 && (
                      <Grid item container className={classes.overlay}>
                        <Grid item className={classes.extNumImage}>
                          +{props.imageNum - 1}
                        </Grid>
                      </Grid>
                    )}
                    {props.postType === "video" && (
                      <Grid item container className={styleOverplay}>
                        {
                          platform !== "youtube" ?
                            <Icon className={classes.playIcon}>
                              {intl.formatMessage({ defaultMessage: "play_circle_outline"})}
                            </Icon> :
                            <img
                              src={require("assets/img/youtube_play_icon.svg")}
                              className={classes.playIconYoutube}
                            />
                        }
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
              {/* <Grid
                item
                container
                direction="column"
                className={classes.activeUserStyle}
              >
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.activeUserStyleTitle}
                >
                  Active User
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.activeUserStyleValue}
                >
                  {props.activeUser != null
                    ? (props.activeUser * 100).toFixed(2) + "%"
                    : "_"}
                </Grid>
              </Grid> */}
              <Grid
                item
                container
                direction="column"
                className={classes.totalEngagement}
              >
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.totalEngagementTitle}
                >
                 {intl.formatMessage({ defaultMessage: " Total Engagement"})}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.totalEngagementValue}
                >
                  {typeof props.totalEngagement === "number" ? (
                    props.totalEngagement > 1000000 ? (
                      <Tooltip
                        title={props.totalEngagement.toLocaleString("en")}
                        classes={{ tooltip: classes.tooltipTitle }}
                      >
                        <div>{parseKMB(props.totalEngagement)}</div>
                      </Tooltip>
                    ) : (
                        props.totalEngagement.toLocaleString("en")
                      )
                  ) : (
                      "N/A"
                    )}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                className={classes.listContainer}
              >
                {platform === "youtube" ? (
                  <ListValuePostYoutube
                    views={props.views}
                    comments={props.comments}
                    likes={props.likes}
                    dislikes={props.dislikes}
                    postLink={props.postLink}
                  />
                ) : platform === "insta" ? (
                  <ListValuePostInsta
                    views={props.views}
                    comments={props.comments}
                    likes={props.likes}
                    postLink={props.postLink}
                  />
                ) : (
                      <ListValuePost
                        reactions={props.reactions}
                        comments={props.comments}
                        shares={props.shares}
                        postLink={props.postLink}
                      />
                    )}
              </Grid>
            </Grid>
          </Paper>
          <PostType icon={props.postIcon} postType={props.postType} />
        </Grid>
      );
    };

    return (
      <Grid container direction="column" className={classes.wrapPage}>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.loadingWrapper}
        >
          {
            isWaiting &&
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className={classes.loadingNotification}
            >
              <div className={classes.loadingText}>
              {intl.formatMessage({ defaultMessage: "Your data is being processing and available after 24hrs."})}
              </div>
              <div className={classes.progressBarContainer}>
                <LinearProgress className={classes.progressBar} />
              </div>
            </Grid>
          }
        </Grid>
        <Grid item container direction="row" spacing={16}>
          <Grid item container xs={6} sm={3}>
            <CardValue
              icon="people"
              title={platform === "youtube" ? intl.formatMessage({ defaultMessage: "Total Subscribers"}) : intl.formatMessage({ defaultMessage: "Total follower"})}
              tooltipContent="Total volume of influencer's followers."
              showTooltip={showTooltip}
              leftSize="4"
              middleSize="8"
              value={
                typeof totalFollowers === "number"
                  ? (
                    totalFollowers > 10000000 ? (
                      <Tooltip
                        title={totalFollowers.toLocaleString("en")}
                        classes={{ tooltip: classes.tooltipTitle }}
                      >
                        <div>{parseKMB(totalFollowers)}</div>
                      </Tooltip>
                    ) : (
                        totalFollowers.toLocaleString("en")
                      )
                  )
                  : "N/A"
              }
            />
          </Grid>
          <Grid item container xs={6} sm={3}>
            <CardValue
              icon="list_alt"
              title={platform === "youtube" ? intl.formatMessage({ defaultMessage: "Total videos"}) : intl.formatMessage({ defaultMessage: "Total posts"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "In the last 30 days."})}
              showTooltip={showTooltip}
              leftSize="4"
              middleSize="8"
              value={
                typeof totalPosts === "number"
                  ? totalPosts.toLocaleString("en")
                  : "N/A"
              }
            />
          </Grid>
          <Grid item container xs={12} sm={6}>
            <CardValue
              icon={intl.formatMessage({ defaultMessage: "sync"})}
              title={intl.formatMessage({ defaultMessage: "Total engagement"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "In the last 30 days."})}
              showTooltip={showTooltip}
              leftSize="2"
              middleSize="5"
              // toggleValueDetail={true}
              // valueDetail={
              //   <ul className={classes.detailEngagement}>
              //     {platform === 'facebook' &&
              //       <li>
              //         Reactions: {typeof totalReactions === "number" ? totalReactions.toLocaleString("en") : "N/A"}
              //       </li>
              //     }
              //     <li>
              //       Comments: {typeof totalComments === "number" ? totalComments.toLocaleString("en") : "N/A"}
              //     </li>
              //     {platform !== 'facebook' &&
              //       <li>
              //         View: {typeof totalViews === "number" ? totalViews.toLocaleString("en") : "N/A"}
              //       </li>
              //     }
              //     {platform !== 'facebook' &&
              //       <li>
              //         Likes: {typeof totalLikes === "number" ? totalLikes.toLocaleString("en") : "N/A"}
              //       </li>
              //     }
              //     {platform === 'youtube' &&
              //       <li>
              //         Dislikes: {typeof totalDislikes === "number" ? totalDislikes.toLocaleString("en") : "N/A"}
              //       </li>
              //     }
              //     {platform === 'facebook' &&
              //       <li>
              //         Shares: {typeof totalShares === "number" ? totalShares.toLocaleString("en") : "N/A"}
              //       </li>
              //     }
              //   </ul>
              // }
              value={
                typeof totalEngagements === "number"
                  ? totalEngagements.toLocaleString("en")
                  : "N/A"
              }
              children={
                platform === "youtube" ? (
                  <ListValueYoutube
                    views={
                      typeof totalViews === "number"
                        ? totalViews.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    comments={
                      typeof totalComments === "number"
                        ? totalComments.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    likes={
                      typeof totalLikes === "number"
                        ? totalLikes.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    dislikes={
                      typeof totalDislikes === "number"
                        ? totalDislikes.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                  />
                ) : platform === "insta" ? (
                  <ListValueInsta
                    views={
                      typeof totalViews === "number"
                        ? totalViews.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    comments={
                      typeof totalComments === "number"
                        ? totalComments.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    likes={
                      typeof totalLikes === "number"
                        ? totalLikes.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                  />
                ) : (
                      <ListValue
                        reactions={
                          typeof totalReactions === "number"
                            ? totalReactions.toLocaleString("en")
                            : intl.formatMessage({ defaultMessage: "N/A"})
                        }
                        comments={
                          typeof totalComments === "number"
                            ? totalComments.toLocaleString("en")
                            : intl.formatMessage({ defaultMessage: "N/A"})
                        }
                        shares={
                          typeof totalShares === "number"
                            ? totalShares.toLocaleString("en")
                            : intl.formatMessage({ defaultMessage: "N/A"})
                        }
                      />
                    )
              }
            />
          </Grid>
          {/* <Grid item container xs={6} sm={3}>
            <CardValue
              icon="record_voice_over"
              title="Avg. Engagement"
              tooltipContent="Total engagement / total post in the last 30 days."
              showTooltip={showTooltip}
              leftSize="4"
              middleSize="8"
              value={
                typeof avgEngagements === "number" ? (
                  avgEngagements >= 1000000 ? (
                    <Tooltip
                      title={parseFloat(
                        avgEngagements.toFixed(1)
                      ).toLocaleString("en")}
                      classes={{ tooltip: classes.tooltipTitle }}
                    >
                      <div>{parseKMB(avgEngagements)}</div>
                    </Tooltip>
                  ) : (
                      parseFloat(avgEngagements.toFixed(1)).toLocaleString("en")
                    )
                ) : (
                    "N/A"
                  )
              }
            />
          </Grid> */}
        </Grid>
        <Grid item container direction="row" spacing={32}>
          <Grid item className={classes.recentpostTitle}>
            Recent Posts
          </Grid>
          {posts.map(post => (
            <Grid item container>
              {platform === "youtube" ? (
                <RecentPost
                  time={new Date(post.createdTime * 1000).toLocaleDateString(
                    "en-us",
                    options
                  )}
                  content={post.message}
                  totalEngagement={post.totalEngagements}
                  views={
                    typeof post.totalViews === "number"
                      ? post.totalViews.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  comments={
                    typeof post.totalComments === "number"
                      ? post.totalComments.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  likes={
                    typeof post.totalLikes === "number"
                      ? post.totalLikes.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  dislikes={
                    typeof post.totalDislikes === "number"
                      ? post.totalDislikes.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  postType={post.postType}
                  postIcon={
                    post.postType
                      ? namePostIcon[post.postType]
                      : namePostIcon["status"]
                  }
                  title={post.title}
                  imageNum={
                    typeof post.postPhotos !== "undefined"
                      ? post.postPhotos.length
                      : 0
                  }
                  pic1={
                    typeof post.postPhotos !== "undefined"
                      ? typeof post.postPhotos[0] !== "undefined"
                        ? post.postPhotos[0]
                        : ""
                      : ""
                  }
                  pic2={
                    typeof post.postPhotos !== "undefined"
                      ? typeof post.postPhotos[1] !== "undefined"
                        ? post.postPhotos[1]
                        : typeof post.postPhotos[0] !== "undefined"
                          ? post.postPhotos[0]
                          : ""
                      : ""
                  }
                  postLink={post.postLink}
                  postPlatform={"youtube"}
                  activeUser={post.activeUserPercent}
                />
              ) : platform === "insta" ? (
                <RecentPost
                  time={new Date(post.createdTime * 1000).toLocaleDateString(
                    "en-us",
                    options
                  )}
                  content={post.message}
                  totalEngagement={post.totalEngagements}
                  views={
                    typeof post.totalViews === "number"
                      ? post.totalViews.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  comments={
                    typeof post.totalComments === "number"
                      ? post.totalComments.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  likes={
                    typeof post.totalLikes === "number"
                      ? post.totalLikes.toLocaleString("en")
                      : intl.formatMessage({ defaultMessage: "N/A"})
                  }
                  postType={post.postType}
                  postIcon={
                    post.postType
                      ? namePostIcon[post.postType]
                      : namePostIcon["status"]
                  }
                  title={post.title}
                  imageNum={
                    typeof post.postPhotos !== "undefined"
                      ? post.postPhotos.length > 2
                        ? post.postPhotos.length - 1
                        : post.postPhotos.length
                      : 0
                  }
                  pic1={
                    typeof post.postPhotos !== "undefined"
                      ? post.postPhotos.length > 2
                        ? typeof post.postPhotos[1] !== "undefined"
                          ? post.postPhotos[1]
                          : ""
                        : typeof post.postPhotos[0] !== "undefined"
                          ? post.postPhotos[0]
                          : ""
                      : ""
                  }
                  pic2={
                    typeof post.postPhotos !== "undefined"
                      ? post.postPhotos.length > 2
                        ? typeof post.postPhotos[2] !== "undefined"
                          ? post.postPhotos[2]
                          : ""
                        : typeof post.postPhotos[1] !== "undefined"
                          ? post.postPhotos[1]
                          : typeof post.postPhotos[0] !== "undefined"
                            ? post.postPhotos[0]
                            : ""
                      : ""
                  }
                  postLink={post.postLink}
                  postPlatform={"insta"}
                  activeUser={post.activeUserPercent}
                />
              ) : (
                    <RecentPost
                      time={new Date(post.createdTime * 1000).toLocaleDateString(
                        "en-us",
                        options
                      )}
                      content={post.message}
                      totalEngagement={post.totalEngagements}
                      reactions={
                        typeof post.totalLikes === "number"
                          ? post.totalLikes.toLocaleString("en")
                          : intl.formatMessage({ defaultMessage: "N/A"})
                      }
                      comments={
                        typeof post.totalComments === "number"
                          ? post.totalComments.toLocaleString("en")
                          : intl.formatMessage({ defaultMessage: "N/A"})
                      }
                      shares={
                        typeof post.totalShares === "number"
                          ? post.totalShares.toLocaleString("en")
                          : intl.formatMessage({ defaultMessage: "N/A"})
                      }
                      postType={post.postType}
                      postIcon={
                        post.postType
                          ? namePostIcon[post.postType]
                          : namePostIcon["status"]
                      }
                      imageNum={
                        typeof post.postPhotos !== "undefined"
                          ? post.postPhotos.length
                          : 0
                      }
                      pic1={
                        typeof post.postPhotos !== "undefined"
                          ? typeof post.postPhotos[0] !== "undefined"
                            ? post.postPhotos[0]
                            : ""
                          : ""
                      }
                      pic2={
                        typeof post.postPhotos !== "undefined"
                          ? typeof post.postPhotos[1] !== "undefined"
                            ? post.postPhotos[1]
                            : typeof post.postPhotos[0] !== "undefined"
                              ? post.postPhotos[0]
                              : ""
                          : ""
                      }
                      postLink={post.postLink}
                      postPlatform={"facebook"}
                      activeUser={post.activeUserPercent}
                    />
                  )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  dispatchFetchResult,
  openLoading,
  closeLoading
};

export default injectIntl (
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(RecentActivities))
) ;
