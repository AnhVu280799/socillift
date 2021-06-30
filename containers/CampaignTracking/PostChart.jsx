import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Tooltip from "@material-ui/core/Tooltip";
import { injectIntl } from 'react-intl';
// custom components
import PostDetailCard from "./PostDetailCard";

// rechart component
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  LabelList
} from "recharts";

// styles
import postChartStyle from "./PostChartStyle";

// constants
import defaultAvatar from "assets/img/Avatar Default.png";
import rankImage from "assets/img/Rank.svg";
import arrowImage from "assets/img/Arrow.svg";

// libs
import DotDotDot from 'react-dotdotdot';

class PostChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicator: 0,
      openTooltip: false
    };
  }

  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  };

  changeInfluencer = indexValue => {
    this.setState({
      indicator: indexValue
    });
  };

  render() {
    const {
      classes,
      data,
      maxEngagementPost
    } = this.props;
    const intl = this.props.intl;
    const { indicator } = this.state;
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };

    const top5Post = data.map((element, index) => {
      return {
        name: element.name,
        rank: index + 1,
        avatar:
          typeof element.avatar === "string" ? element.avatar : defaultAvatar,
        postCreatedTime: element.createdTime,
        totalEngagements: element.totalEngagement,
        engagedUser: element.engagedUser,
        activeUserPercent: element.activeUserPercent,
        postMessage: element.message,
        postLink: "https://www.facebook.com/" + element.postId,
        postType: element.postType,
        postPhotos: element.postPhotos,
        data: [
          {
            Name: element.name,
            Reactions: element.reactions,
            Comments: element.comments,
            Shares: element.shares
          }
        ]
      };
    });

    const legend = [
      {
        id: "Reactions",
        value: "Reactions",
        color: "#009FDB"
      },
      {
        id: "Comments",
        value: "Comments",
        color: "#FF9900"
      },
      {
        id: "Shares",
        value: "Shares",
        color: "#00B04B"
      }
    ];

    const RenderLegend = props => {
      const { payload } = props;
      return (
        <ul className={classes.lengendListContainer}>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className={classes.lengendListStyle}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  backgroundColor: `${entry.color}`
                }}
                className={classes.iconLengend}
              />
              <div className={classes.lengendName}>{entry.value}</div>
            </li>
          ))}
        </ul>
      );
    };

    const TabChart = props => {
      const {
        domain,
        name,
        avatar,
        rank,
        data,
        postCreatedTime,
        onClick,
        show,
        maxEngagementPost
      } = props;
      const intl = props.intl
      return (
        <Grid
          container
          direction="row"
          className={classes.tabContainer}
          onClick={onClick}
        >
          <Grid
            item
            container
            direction="column"
            xl={1}
            lg={1}
            md={1}
            sm={3}
            xs={3}
            alignContent="flex-start"
            alignItems="flex-start"
            justify="center"
            className={classes.avatarContainer}
          >
            <img
              src={avatar ? avatar : defaultAvatar}
              onError={event => (event.target.src = defaultAvatar)}
              className={classes.avatarStyle}
            />
            <div className={classes.rankContainer}>
              <img src={rankImage} className={classes.rankImageStyle} />
              <p className={classes.rankTextStyle}>{intl.formatMessage({ defaultMessage: "rank"})}</p>
            </div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={2}
            lg={2}
            md={2}
            sm={9}
            xs={9}
            alignContent="flex-start"
            alignItems="flex-start"
            justify="center"
            className={classes.infoContainer}
          >
            <p className={classes.nameStyle}>{intl.formatMessage({ defaultMessage: "name"})}</p>
            <p className={classes.timeStyle}>{intl.formatMessage({ defaultMessage: "postCreatedTime"})}</p>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={8}
            lg={8}
            md={8}
            sm={12}
            xs={12}
            alignItems="flex-start"
            justify="center"
            className={classes.chartContainer}
          >
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <XAxis type="number" hide={true} domain={domain} />
                <YAxis type="category" dataKey="Name" hide={true} />
                <TooltipChart
                  formatter={value => value.toLocaleString("en")}
                  formatter={value => value.toLocaleString("en")}
                  wrapperStyle={{
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                    border: "0.5px solid #DCDFEA",
                    borderRadius: "10px",
                    boxShadow: "20px 20px 30px rgba(122, 131, 163, 0.1)"
                  }}
                  labelStyle={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    borderRadius: "10px"
                  }}
                  contentStyle={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    borderRadius: "10px"
                  }}
                />
                <Bar
                  dataKey="Reactions"
                  stackId="a"
                  fill="#009FDB"
                  barSize={25}
                  isAnimationActive={false}
                  radius={[4, 0, 0, 4]}
                >
                  <LabelList
                    dataKey="Reactions"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 10
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
                <Bar
                  dataKey="Comments"
                  stackId="a"
                  fill="#FF9900"
                  barSize={25}
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="Comments"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 10
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
                <Bar
                  dataKey="Shares"
                  stackId="a"
                  fill="#00B04B"
                  barSize={25}
                  isAnimationActive={false}
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey="Shares"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 10
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Hidden smDown>
            <Grid
              item
              container
              direction="column"
              xl={1}
              lg={1}
              md={1}
              sm={false}
              xs={false}
              alignContent="flex-end"
              alignItems="flex-end"
              justify="center"
              className={classes.arrowContainer}
            >
              {show && <img src={arrowImage} className={classes.arrowStyle} />}
            </Grid>
          </Hidden>
        </Grid>
      );
    };

    const TabChartMobile = props => {
      const {
        domain,
        name,
        avatar,
        rank,
        data,
        postCreatedTime,
        maxEngagementPost,
        totalEngagements,
        engagedUser,
        activeUserPercent,
        postMessage,
        postLink,
        postType,
        postPhotos
      } = props;
      const intl = props.intl;
      return (
        <Grid container direction="row" className={classes.tabContainer}>
          <Grid
            item
            container
            direction="column"
            xl={1}
            lg={1}
            md={1}
            sm={4}
            xs={4}
            alignContent="flex-start"
            alignItems="flex-start"
            justify="center"
            className={classes.avatarContainer}
          >
            <img
              src={avatar ? avatar : defaultAvatar}
              onError={event => (event.target.src = defaultAvatar)}
              className={classes.avatarStyle}
            />
            <div className={classes.rankContainer}>
              <img src={rankImage} className={classes.rankImageStyle} />
              <p className={classes.rankTextStyle}>{intl.formatMessage({ defaultMessage: "rank"})}</p>
            </div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={2}
            lg={2}
            md={2}
            sm={8}
            xs={8}
            alignContent="flex-start"
            alignItems="flex-start"
            justify="center"
            className={classes.infoContainer}
          >
            <div className={classes.nameStyle}>
              <Tooltip
                title={name}
                classes={{
                  tooltip: classes.tooltipTitle,
                  popper: classes.lastTooltip
                }}
                TransitionProps={{ timeout: 300 }}
              >
                <DotDotDot clamp={1}>{intl.formatMessage({ defaultMessage: "name"})}</DotDotDot>
              </Tooltip>
            </div>
            <div className={classes.timeStyle}>{intl.formatMessage({ defaultMessage: "postCreatedTime"})}</div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={8}
            lg={8}
            md={8}
            sm={12}
            xs={12}
            alignItems="flex-start"
            justify="center"
            className={classes.chartContainer}
          >
            <ResponsiveContainer width="100%" height={50}>
              <BarChart
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <XAxis type="number" hide={true} domain={domain} />
                <YAxis type="category" dataKey="Name" hide={true} />
                <TooltipChart
                  formatter={value => value.toLocaleString("en")}
                  formatter={value => value.toLocaleString("en")}
                  wrapperStyle={{
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                    border: "0.5px solid #DCDFEA",
                    borderRadius: "10px",
                    boxShadow: "20px 20px 30px rgba(122, 131, 163, 0.1)",
                    zIndex: "100"
                  }}
                  labelStyle={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    borderRadius: "10px"
                  }}
                  contentStyle={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    borderRadius: "10px"
                  }}
                  cursor={{ fill: "none" }}
                />
                <Bar
                  dataKey="Reactions"
                  stackId="a"
                  fill="#009FDB"
                  barSize={25}
                  isAnimationActive={false}
                  radius={[4, 0, 0, 4]}
                >
                  <LabelList
                    dataKey="Reactions"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 7
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
                <Bar
                  dataKey="Comments"
                  stackId="a"
                  fill="#FF9900"
                  barSize={25}
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="Comments"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 7
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
                <Bar
                  dataKey="Shares"
                  stackId="a"
                  fill="#00B04B"
                  barSize={25}
                  isAnimationActive={false}
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey="Shares"
                    position="insideLeft"
                    fill="#FFFFFF"
                    fontSize={16}
                    fontWeight="bold"
                    formatter={value =>
                      value > maxEngagementPost / 7
                        ? value.toLocaleString("en")
                        : ""
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={false}
            lg={false}
            md={false}
            sm={12}
            xs={12}
            alignContent="flex-start"
            alignItems="flex-start"
            justify="center"
            className={classes.viewDetailContainer}
          >
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={
                  <img src={arrowImage} className={classes.arrowDetailStyle} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className={classes.viewDetailTitle}>
                {intl.formatMessage({ defaultMessage: "View post detail"})}
                </span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                classes={{
                  root: classes.expansionPanelDetailsRoot,
                }}
              >
                <PostDetailCard
                  name={name}
                  avatar={avatar}
                  totalEngagements={totalEngagements}
                  engagedUser={engagedUser}
                  activeUserPercent={activeUserPercent}
                  postCreatedTime={postCreatedTime}
                  postMessage={postMessage}
                  postLink={postLink}
                  postType={postType}
                  postPhotos={postPhotos}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      );
    };

    return (
      <Grid container direction="row" className={classes.container}>
        <Hidden mdUp>
          <RenderLegend payload={legend} />
        </Hidden>
        <Grid
          item
          container
          direction="column"
          xl={8}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          className={classes.tabChartContainer}
        >
          <Hidden smDown>
            <RenderLegend payload={legend} />
            {top5Post &&
              top5Post.map((element, index) => (
                <TabChart
                  domain={[0, maxEngagementPost]}
                  data={element.data}
                  name={element.name}
                  rank={element.rank}
                  avatar={element.avatar}
                  postCreatedTime={new Date(
                    element.postCreatedTime * 1000
                  ).toLocaleDateString("en-us", options)}
                  key={index}
                  show={element.rank === indicator + 1}
                  maxEngagementPost={maxEngagementPost}
                  onClick={() => this.changeInfluencer(index)}
                />
              ))}
          </Hidden>
          <Hidden mdUp>
            {top5Post &&
              top5Post.map((element, index) => (
                <TabChartMobile
                  domain={[0, maxEngagementPost]}
                  data={element.data}
                  name={element.name}
                  rank={element.rank}
                  avatar={element.avatar}
                  postCreatedTime={new Date(
                    element.postCreatedTime * 1000
                  ).toLocaleDateString("en-us", options)}
                  key={index}
                  show={element.rank === indicator + 1}
                  maxEngagementPost={maxEngagementPost}
                  totalEngagements={element.totalEngagements}
                  engagedUser={element.engagedUser}
                  activeUserPercent={element.activeUserPercent}
                  postMessage={element.postMessage}
                  postLink={element.postLink}
                  postType={element.postType}
                  postPhotos={element.postPhotos}
                />
              ))}
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid
            item
            container
            direction="column"
            xl={4}
            lg={4}
            md={4}
            sm={false}
            xs={false}
            alignContent="flex-start"
            alignItems="center"
            justify="flex-start"
            className={classes.postDetailContainer}
          >
            {top5Post && top5Post.length > 0 && (
              <PostDetailCard
                name={top5Post[indicator].name}
                avatar={top5Post[indicator].avatar}
                totalEngagements={top5Post[indicator].totalEngagements}
                engagedUser={top5Post[indicator].engagedUser}
                activeUserPercent={top5Post[indicator].activeUserPercent}
                postCreatedTime={top5Post[indicator].postCreatedTime}
                postMessage={top5Post[indicator].postMessage}
                postLink={top5Post[indicator].postLink}
                postType={top5Post[indicator].postType}
                postPhotos={top5Post[indicator].postPhotos}
              />
            )}
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

PostChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(postChartStyle)(PostChart)) ;
