import React, { useState } from "react";
import styles from "./RecentActivitiesStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Paper, Icon } from "@material-ui/core";
import DotDotDot from "react-dotdotdot";
import cx from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Hidden from "@material-ui/core/Hidden";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";
import { getInfluencerRecentPostsById } from "../../apis/api";
import { parseKMB } from "utils";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { injectIntl } from 'react-intl';
import moment from "moment";
import arrowImage from "assets/img/Arrow.svg";
const defaultImagePost =
  "https://storage.googleapis.com/yn-influencer/NoImageFound.png";

class RecentActivities extends React.Component {
  state = {
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
  };

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
      summary: true,
      pageSize: 30,
      pageIndex: 0
    };

    return new Promise((resolve, reject) => {
      getInfluencerRecentPostsById(params, response => resolve(response));
    });
  };

  componentDidMount() {
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

  render() {
    const { classes, platform, showTooltip } = this.props;
    const intl = this.props.intl;
    const { totalPosts, totalEngagements, avgEngagements, totalReactions, totalComments, totalShares, totalViews, totalLikes, totalDislikes, posts } = this.state;

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
        open: false,
        openValue: false
      };

      handleTooltipClose = () => {
        this.setState({ open: false });
      };

      handleTooltipOpen = () => {
        this.setState({ open: true });
      };

      handleTooltipCloseValue = () => {
        this.setState({ openValue: false });
      };

      handleTooltipOpenValue = () => {
        this.setState({ openValue: true });
      };

      render() {
        const props = this.props;
        const intl = this.props.intl;
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
                xl={props.leftSize}
                lg={props.leftSize}
                md={2}
                sm={4}
                xs={4}
                alignItems="center"
                justify="center"
                className={classes.iconContainer}
              >
                <Icon className={classes.iconDesign}>{props.icon}</Icon>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={props.middleSize}
                lg={props.middleSize}
                md={props.middleSize === 5 ? 5 : 10}
                sm={8}
                xs={8}
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
                  {
                    typeof props.value === "number" ?
                      (props.maximum && props.value > props.maximum ?
                        <Tooltip
                          title={props.value.toLocaleString("en")}
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          PopperProps={{
                            disablePortal: true
                          }}
                          onClose={this.handleTooltipCloseValue}
                          open={this.state.openValue}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                        >
                          <div
                            onClick={this.handleTooltipOpenValue}
                            onMouseLeave={this.handleTooltipCloseValue}
                            onMouseOver={this.handleTooltipOpenValue}
                          >
                            {parseKMB(props.value)}
                          </div>
                        </Tooltip>
                        :
                        props.value.toLocaleString("en")) :
                      "N/A"
                  }
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
          xl={5}
          lg={5}
          md={5}
          sm={12}
          xs={12}
          alignItems="center"
          justify="center"
          className={classes.subContent}
        >
          {
            platform === "facebook" &&
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
          }
          {
            (platform === "insta" || platform === "youtube") &&
            <Grid item container direction="row" spacing={16}>
              <Grid
                item
                container
                direction="column"
                xs={6}
                className={classes.subTitle}
                alignItems="flex-start"
              >
                Likes
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
          }
          {
            platform === "youtube" &&
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
          }
          {
            (platform === "insta" || platform === "youtube") &&
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
          }
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
          {
            platform === "facebook" &&
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
          }
          <Hidden mdDown>
            <Icon className={classes.arrowIcon}>{intl.formatMessage({ defaultMessage: "arrow_right"})}</Icon>
          </Hidden>
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
            {
              platform === "facebook" &&
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
            }
            {
              (platform === "insta" || platform === "youtube") &&
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
            }
            {
              platform === "youtube" &&
              <Grid item container direction="row">
                <Grid
                  item
                  container
                  xs={6}
                  className={classes.subTitlePost}
                  alignItems="flex-start"
                >
                  {intl.formatMessage({ defaultMessage: "Dislike"})}
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
            }
            {
              (platform === "insta" || platform === "youtube") &&
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
            }
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
            {
              platform === "facebook" &&
              <Grid item container direction="row">
                <Grid
                  item
                  container
                  xs={6}
                  className={classes.subTitlePost}
                  alignItems="flex-start"
                >
                  Shares{intl.formatMessage({ defaultMessage: "Shares"})}
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
            }
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
      const {
        title,
        content,
        time,
        postType,
        imageNum,
        postPlatform,
        pic1,
        pic2,
        activeUser,
        totalEngagement,
        reactions,
        likes,
        dislikes,
        views,
        comments,
        shares,
        postLink,
        postIcon
      } = props;
      const intl = props.intl;

      const [openTooltipYoutubeTitle, handleTooltipYoutubeTitle] = useState(false);

      const styleImage = cx(classes.postImage, {
        [classes.postVideoImage]: postType === "video"
      });
      const styleImageWrapper = cx(classes.secondImageOverlay, {
        [classes.postImgWrapperYoutube]: postPlatform === "youtube"
      });
      const styleOverplay = cx({
        [classes.overlayVideo]: postType === "video",
        [classes.postNonImage]: imageNum <= 0
      });
      const stylePlayIcon = cx({
        [classes.playIcon]: postType === "video"
      });
      const stylePostContent = cx({
        [classes.postContentYoutube]: postPlatform === "youtube",
        [classes.postContent]:
          postPlatform === "facebook" || postPlatform === "insta"
      });
      const stylePostContentWrapper = cx({
        [classes.contentWrapper]: postType !== "status",
        [classes.contentWrapperStatus]: postType === "status"
      });
      const styleAudioContent = cx({
        [classes.audioContent]: postType !== "status",
        [classes.audioContentStatus]: postType === "status"
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
                  <Tooltip
                    title={title}
                    classes={{ tooltip: classes.tooltipTitle }}
                    onClose={() => handleTooltipYoutubeTitle(false)}
                    open={openTooltipYoutubeTitle}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.postTilte}
                      onClick={() => handleTooltipYoutubeTitle(true)}
                      onMouseOver={() => handleTooltipYoutubeTitle(true)}
                      onMouseLeave={() => handleTooltipYoutubeTitle(false)}
                    >
                      <DotDotDot clamp={1}>{intl.formatMessage({ defaultMessage: "title"})}</DotDotDot>
                    </Grid>
                  </Tooltip>
                )}
                <Grid
                  item
                  container
                  direction="row"
                  className={stylePostContent}
                >
                  <DotDotDot clamp={3}>{content}</DotDotDot>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.postTime}
                >
                  {time}
                </Grid>
              </Grid>
              {postType !== "status" && (
                <Grid item container className={styleAudioContent}>
                  {/* <Grid item container direction='column' xs={6} alignItems='center' justify='center'>
                        {
                          (imageNum >= 2) &&
                            (
                              <img src={pic1} className={classes.postImage} />
                            )
                        }
                      </Grid> */}
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    alignItems="center"
                    justify="center"
                    className={styleImageWrapper}
                  >
                    {imageNum >= 1 && (
                      <img
                        src={pic1 ? pic1 : defaultImagePost}
                        onError={event => (event.target.src = defaultImagePost)}
                        className={styleImage}
                      />
                    )}
                    {imageNum >= 2 && postType !== "video" && (
                      <Grid item container className={classes.overlay}>
                        <Grid item className={classes.extNumImage}>
                          +{imageNum - 1}
                        </Grid>
                      </Grid>
                    )}
                    {postType === "video" && (
                      <Grid item container className={styleOverplay}>
                        <Icon className={stylePlayIcon}>
                          {intl.formatMessage({ defaultMessage: "play_circle_outline"})}
                        </Icon>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
              <Grid
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
                  {intl.formatMessage({ defaultMessage: "Active User"})}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.activeUserStyleValue}
                >
                  {activeUser != null
                    ? (activeUser * 100).toFixed(2) + "%"
                    : "_"}
                </Grid>
              </Grid>
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
                  {intl.formatMessage({ defaultMessage: "Total Engagement"})}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.totalEngagementValue}
                >
                  {
                    typeof totalEngagement === "number" ? (
                      totalEngagement > 100000 ? (
                        <Tooltip
                          title={totalEngagement.toLocaleString("en")}
                          classes={{ tooltip: classes.tooltipTitle }}
                        >
                          <div>{parseKMB(totalEngagement)}</div>
                        </Tooltip>
                      ) : (
                          totalEngagement.toLocaleString("en")
                        )
                    ) : (
                        "N/A"
                      )
                  }
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                className={classes.listContainer}
              >
                <ListValuePost
                  reactions={reactions}
                  likes={likes}
                  dislikes={dislikes}
                  views={views}
                  comments={comments}
                  shares={shares}
                  postLink={postLink}
                />
              </Grid>
            </Grid>
          </Paper>
          <PostType icon={postIcon} postType={postType} />
        </Grid>
      );
    };

    const RecentPostMobile = props => {
      const {
        title,
        content,
        time,
        postType,
        imageNum,
        pic1,
        activeUser,
        totalEngagement,
        reactions,
        likes,
        dislikes,
        views,
        comments,
        shares,
        postLink,
        postIcon
      } = props;
      const intl = props.intl;
      const [openTooltipYoutubeTitle, handleTooltipYoutubeTitle] = useState(false);

      const styleOverplayVideo = cx({
        [classes.overlayVideoMobile]: postType === "video",
        [classes.postNonImage]: imageNum <= 0
      });

      return (
        <Grid container direction="row" className={classes.postWrapper}>
          <PostType icon={postIcon} postType={postType} />
          <Paper className={classes.postPaper}>
            <Grid
              item
              container
              direction="row"
              className={classes.infoContainer}
            >
              {
                title &&
                <Tooltip
                  title={title}
                  classes={{ tooltip: classes.tooltipTitle }}
                  onClose={() => handleTooltipYoutubeTitle(false)}
                  open={openTooltipYoutubeTitle}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <Grid
                    item
                    container
                    direction="row"
                    className={classes.postTilte}
                    onClick={() => handleTooltipYoutubeTitle(true)}
                    onMouseOver={() => handleTooltipYoutubeTitle(true)}
                    onMouseLeave={() => handleTooltipYoutubeTitle(false)}
                  >
                    <DotDotDot clamp={1}>{intl.formatMessage({ defaultMessage: "title"})}</DotDotDot>
                  </Grid>
                </Tooltip>
              }
              <Grid
                item
                container
                direction="row"
                className={classes.postTime}
              >
                {time}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              className={classes.engagementDetailContainer}
            >
              <ListValuePost
                reactions={reactions}
                likes={likes}
                dislikes={dislikes}
                views={views}
                comments={comments}
                shares={shares}
                postLink={postLink}
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignContent="flex-start"
              alignItems="flex-start"
              justify="center"
              className={classes.viewDetailContainer}
            >
              <ExpansionPanel
                classes={{
                  root: classes.expansionPanelRoot,
                }}
              >
                <ExpansionPanelSummary
                  expandIcon={
                    <img src={arrowImage} className={classes.arrowDetailStyle} />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <span className={classes.viewDetailTitle}>
                   {intl.formatMessage({ defaultMessage: " View post detail"})}
                  </span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                  classes={{
                    root: classes.expansionPanelDetailsRoot,
                  }}
                >
                  <Paper className={classes.paperSize}>
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
                        lg={6}
                        xl={6}
                        md={6}
                        sm={6}
                        xs={6}
                      >
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.titleStyle}
                        >
                         {intl.formatMessage({ defaultMessage: " Total Engagement"})}
                      </Grid>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.valueStyle}
                        >
                          {totalEngagement.toLocaleString("en")}
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        lg={6}
                        xl={6}
                        md={6}
                        sm={6}
                        xs={6}
                      >
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.titleStyle}
                        >
                         {intl.formatMessage({ defaultMessage: " Active User"})}
                      </Grid>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.valueStyle}
                        >
                          {(typeof activeUser === "number"
                            ? (activeUser * 100).toFixed(0)
                            : "_") + "%"}
                        </Grid>
                      </Grid>
                    </Grid>
                    {pic1 && imageNum > 0 && (
                      <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        className={classes.postMedia}
                      >
                        <img
                          src={pic1 ? pic1 : defaultImagePost}
                          onError={event => (event.target.src = defaultImagePost)}
                          alt="Can not load image..."
                          className={classes.postImageMobile}
                        />
                        {
                          imageNum > 1 && postType !== "video" && (
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
                                className={classes.extNumImageMobile}
                                alignItems="center"
                                justify="center"
                              >
                                {"+" + (imageNum - 1).toString() + " photos"}
                              </Grid>
                            </Grid>
                          )
                        }
                        {
                          postType === "video" && (
                            <Grid
                              item
                              container
                              className={styleOverplayVideo}
                              alignItems="center"
                              justify="center"
                            >
                              <Icon className={classes.playIcon}>{intl.formatMessage({ defaultMessage: "play_circle_outline"})}</Icon>
                            </Grid>
                          )
                        }
                      </Grid>
                    )}
                    {
                      content && content.length > 0 && (
                        <Grid
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-start"
                          className={classes.postMessageStyle}
                        >
                          {pic1 && imageNum > 0 ? (
                            <DotDotDot clamp={"2"}>{intl.formatMessage({ defaultMessage: "content"})}</DotDotDot>
                          ) : (
                              <DotDotDot clamp={"10"}>{intl.formatMessage({ defaultMessage: "content"})}</DotDotDot>
                            )}
                        </Grid>
                      )
                    }
                  </Paper>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Paper>
        </Grid>
      );
    };

    return (
      <Grid container direction="column" className={classes.wrapPage}>
        <Grid item container direction="row" spacing={16}>
          <Grid item container direction="column" xl={3} lg={3} md={12} sm={12} xs={12}>
            <CardValue
              icon={intl.formatMessage({ defaultMessage: "list_alt"})}
              title={intl.formatMessage({ defaultMessage: "Total posts"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "In the last 30 days."})}
              showTooltip={true}
              leftSize={4}
              middleSize={8}
              value={totalPosts}
            />
          </Grid>
          <Grid item container direction="column" xl={6} lg={6} md={12} sm={12} xs={12}>
            <Hidden smDown>
              <CardValue
                icon={intl.formatMessage({ defaultMessage: "sync"})}
                title={intl.formatMessage({ defaultMessage: "Total engagement"})}
                tooltipContent={intl.formatMessage({ defaultMessage: "In the last 30 days."})}
                showTooltip={true}
                leftSize={2}
                middleSize={5}
                value={totalEngagements}
                maximum={100000000}
                children={
                  <ListValue
                    reactions={
                      typeof totalReactions === "number"
                        ? totalReactions.toLocaleString("en")
                        : intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    comments={
                      typeof totalComments === "number"
                        ? totalComments.toLocaleString("en")
                        :  intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    shares={
                      typeof totalShares === "number"
                        ? totalShares.toLocaleString("en")
                        :  intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    views={
                      typeof totalViews === "number"
                        ? totalViews.toLocaleString("en")
                        :  intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    likes={
                      typeof totalLikes === "number"
                        ? totalLikes.toLocaleString("en")
                        :  intl.formatMessage({ defaultMessage: "N/A"})
                    }
                    dislikes={
                      typeof totalDislikes === "number"
                        ? totalDislikes.toLocaleString("en")
                        :  intl.formatMessage({ defaultMessage: "N/A"})
                    }
                  />
                }
              />
            </Hidden>
            <Hidden mdUp>
              <CardValue
                icon={intl.formatMessage({ defaultMessage: "sync"})}
                title={intl.formatMessage({ defaultMessage: "Total engagement"})}
                tooltipContent={intl.formatMessage({ defaultMessage: "In the last 30 days."})}
                showTooltip={true}
                leftSize={2}
                middleSize={5}
                value={totalEngagements}
                maximum={10000000}
                children={
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
                    views={
                      typeof totalViews === "number"
                        ? totalViews.toLocaleString("en")
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
                }
              />
            </Hidden>
          </Grid>
          <Grid item container direction="column" xl={3} lg={3} md={12} sm={12} xs={12}>
            <CardValue
              icon={intl.formatMessage({ defaultMessage: "record_voice_over"})}
              title={intl.formatMessage({ defaultMessage: "Avg. Engagement"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "Total engagement / total post in the last 30 days."})}
              showTooltip={true}
              leftSize={4}
              middleSize={8}
              value={avgEngagements}
              maximum={100000}
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={32}>
          <Grid item className={classes.recentpostTitle}>
           {intl.formatMessage({ defaultMessage: " Recent Posts"})}
          </Grid>
          <Hidden mdDown>
            {posts.map((post, index) => (
              <Grid item container key={index}>
                <RecentPost
                  time={new Date(post.createdTime * 1000).toLocaleDateString(
                    "en-us",
                    options
                  )}
                  title={post.title}
                  content={post.message}
                  totalEngagement={post.totalEngagements}
                  reactions={
                    typeof post.totalLikes === "number"
                      ? post.totalLikes.toLocaleString("en")
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
                    platform === "insta" ?
                      (typeof post.postPhotos !== "undefined"
                        ? post.postPhotos.length > 2
                          ? typeof post.postPhotos[1] !== "undefined"
                            ? post.postPhotos[1]
                            : ""
                          : typeof post.postPhotos[0] !== "undefined"
                            ? post.postPhotos[0]
                            : ""
                        : ""
                      )
                      : (typeof post.postPhotos !== "undefined"
                        ? typeof post.postPhotos[0] !== "undefined"
                          ? post.postPhotos[0]
                          : ""
                        : ""
                      )
                  }
                  pic2={
                    platform === "insta" ?
                      (typeof post.postPhotos !== "undefined"
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
                      )
                      : (typeof post.postPhotos !== "undefined"
                        ? typeof post.postPhotos[1] !== "undefined"
                          ? post.postPhotos[1]
                          : typeof post.postPhotos[0] !== "undefined"
                            ? post.postPhotos[0]
                            : ""
                        : ""
                      )
                  }
                  postLink={post.postLink}
                  postPlatform={platform}
                  activeUser={post.activeUserPercent}
                />
              </Grid>
            ))}
          </Hidden>
          <Hidden lgUp>
            {posts.map((post, index) => (
              <Grid item container key={index}>
                <RecentPostMobile
                  time={new Date(post.createdTime * 1000).toLocaleDateString(
                    "en-us",
                    options
                  )}
                  title={post.title}
                  content={post.message}
                  totalEngagement={post.totalEngagements}
                  reactions={
                    typeof post.totalLikes === "number"
                      ? post.totalLikes.toLocaleString("en")
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
                    platform === "insta" ?
                      (typeof post.postPhotos !== "undefined"
                        ? post.postPhotos.length > 2
                          ? typeof post.postPhotos[1] !== "undefined"
                            ? post.postPhotos[1]
                            : ""
                          : typeof post.postPhotos[0] !== "undefined"
                            ? post.postPhotos[0]
                            : ""
                        : ""
                      )
                      : (typeof post.postPhotos !== "undefined"
                        ? typeof post.postPhotos[0] !== "undefined"
                          ? post.postPhotos[0]
                          : ""
                        : ""
                      )
                  }
                  postLink={post.postLink}
                  postPlatform={platform}
                  activeUser={post.activeUserPercent}
                />
              </Grid>
            ))}
          </Hidden>
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
