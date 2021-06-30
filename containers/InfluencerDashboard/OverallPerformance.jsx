// react
import React, { Fragment } from "react";

// style
import styles from "./OverallPerformanceStyle";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import { injectIntl } from 'react-intl';
// custom component
import OverallValueCard from "../InfluencerDetail/OverallValueCard";
import StatisticValueCard from "../InfluencerDetail/StatisticValueCard";
import BigStatisticValueCard from "../InfluencerDetail/BigStatisticValueCard";
import MostEngagementPost from "../InfluencerDetail/MostEngagementPost";
import MostMentionedCategories from "../InfluencerDetail/MostMentionedCategories";
import TagsCloudCard from "../InfluencerDetail/TagsCloudCard";
import ChartCard from "../InfluencerDetail/ChartCard";
import Selector from "components/Selector";

// redux
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";

// chart
import ReactChartist from "react-chartist";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";

// api
import { getInfluencerRecentPostsById, getCategory } from "../../apis/api";

// source image
import commercialImg from "assets/img/commercial.svg";
import advocacyImg from "assets/img/advocacy.svg";

// libs
import cx from "classnames";
import moment from "moment";

// constants
import { options as timeRangeOptions } from "constants/timeRangeOverall";
import { dictionary as timeRangeDict } from "constants/timeRangeOverall";
const titleCommercialPieChart = {
  commercial: "Commercial Posts",
  organic: "Organic Posts"
};

function generateArrayDateRange(toTime, numOfWeek) {
  const days = [];
  let current = moment(toTime).subtract(parseInt(numOfWeek)*7, 'days');

  while (current <= toTime) {
    days.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "days");
  }

  return days;
}

class OverallPerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mostEngagementPost: [],
      mostMentionedCategotires: [],
      timeRangeField: { value: "1", label: "Last 7 days" },
      totalPost: "--Updating--",
      totalEngagement: "--Updating--",
      avgPostPerDay: "--Updating--",
      avgCommentPerPost: "--Updating--",
      avgEngagementPerPost: "--Updating--",
      avgEngagementScore: "--Updating--",
      totalCommercialPost: "--Updating--",
      totalOrganicPost: "--Updating--",
      commercialRate: "--Updating--",
      totalAdvocacyScore: "--Updating--",
      topCategoryPost: [],
      topEngagementPost: [],
      trendlineActivity: [],
      lastUpdatedTime: "--Updating--",
      openTooltip: false,
      maxPostPerDay: 0,
      isNoTrendLineChartData: true,
      tabPlatform: 0
    };
  }

  loadData = timeRangeField => {
    const data = this.props[timeRangeDict[timeRangeField.value]];
    this.props.openLoading();
    let maxPost = 0;

    if (data.trendlineActivity && data.trendlineActivity.length) {
      this.setState({ isNoTrendLineChartData: false });
    }

    (data.trendlineActivity || []).forEach(element => {
      if (maxPost < element.posts) {
        maxPost = element.posts;
      }
    });

    const toTime = typeof data.lastUpdatedOverallPerformanceDateTime === 'undefined' ?
    (this.props.linkedTime ?
      moment(moment(this.props.linkedTime).add(1, 'days')).subtract(7, 'days') :
      moment().subtract(7, 'days')) :
    moment(data.lastUpdatedOverallPerformanceDateTime).subtract(7, 'days');

    this.setState(
      {
        totalPost: data.totalPost,
        totalEngagement: data.totalEngagement,
        avgPostPerDay: data.avgPostPerDay,
        avgCommentPerPost: data.avgCommentPerPost,
        avgEngagementPerPost: data.avgEngagementPerPost,
        avgEngagementScore: data.avgEngagementScore,
        totalCommercialPost: data.totalCommercialPost,
        totalOrganicPost: data.totalOrganicPost,
        commercialRate: data.commercialRate,
        totalAdvocacyScore: data.totalAdvocacyScore,
        topCategoryPost: data.topCategoryPost,
        topEngagementPost: data.topEngagementPost,
        trendlineActivity:
          data.trendlineActivity ||
          generateArrayDateRange(toTime, timeRangeField.value).map(date => ({ createdTime: date })),
        lastUpdatedTime: data.lastUpdatedOverallPerformanceDateTime,
        maxPostPerDay: maxPost
      },
      () => {
        if (this.state.topEngagementPost) {
          getInfluencerRecentPostsById(
            {
              postIds: this.state.topEngagementPost.join(","),
              pageSize: 4,
              pageIndex: 0,
              platform: this.props.platform,
              sortField: "total_engagements",
              sortType: -1
            },
            response => {
              this.setState({ mostEngagementPost: response.data }, () => {
                if (this.state.topCategoryPost) {
                  getCategory(
                    {
                      page_size: 10,
                      page_index: 0,
                      category_code: this.state.topCategoryPost
                        .map(element => element.category)
                        .join(",")
                    },
                    ({ results }) => {
                      const categoryDict = {};
                      const codeList = results.map(
                        element => element.categoryCode
                      );
                      results.forEach(element => {
                        categoryDict[element.categoryCode] = element;
                      });
                      const topCategoryPost = this.state.topCategoryPost.filter(
                        element => codeList.includes(element.category)
                      );
                      topCategoryPost.forEach(element => {
                        element["categoryName"] =
                          categoryDict[element.category].categoryName;
                        element["categoryUid"] =
                          categoryDict[element.category].categoryUid;
                      });
                      this.setState(
                        {
                          mostMentionedCategotires: topCategoryPost
                        },
                        () => {
                          this.props.closeLoading();
                        }
                      );
                    }
                  ).catch(({ status }) => {
                    this.props.closeLoading();
                    this.props.dispatchFetchResult(status);
                  });
                }
              });
            }
          ).catch(({ status }) => {
            this.props.closeLoading();
            this.props.dispatchFetchResult(status);
          });
        } else {
          this.props.closeLoading();
        }
      }
    );
  };

  componentDidMount() {
    const { timeRangeField } = this.state;
    this.loadData(timeRangeField);
  }

  componentDidUpdate() {
    if (this.state.tabPlatform !== this.props.tabPlatform) {
      this.setState({
        tabPlatform: this.props.tabPlatform
      });
      const { timeRangeField } = this.state;
      this.loadData(timeRangeField);
    }
  }

  changeTimeRange = timeRangeFieldSelected => {
    this.setState({
      timeRangeField: timeRangeFieldSelected
    });
    this.loadData(timeRangeFieldSelected);
  };

  handleTooltipTimeRangeClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipTimeRangeOpen = () => {
    this.setState({ openTooltip: true });
  };

  render() {
    const {
      mostEngagementPost,
      mostMentionedCategotires,
      timeRangeField,
      totalPost,
      totalEngagement,
      avgPostPerDay,
      avgCommentPerPost,
      avgEngagementPerPost,
      avgEngagementScore,
      totalCommercialPost,
      totalOrganicPost,
      commercialRate,
      totalAdvocacyScore,
      trendlineActivity,
      lastUpdatedTime,
      openTooltip,
      maxPostPerDay
    } = this.state;
    const { classes, showTooltip, tagCloud, isWaiting, linkedTime } = this.props;
    const intl = this.props.intl;
    const fromTime = typeof lastUpdatedTime === 'undefined' || lastUpdatedTime === '--Updating--' ?
    moment(moment(moment(linkedTime).add(1, 'days')).subtract(7, 'days')).subtract(3, 'months').format('MMMM Do YYYY') :
    moment(moment(moment(new Date(lastUpdatedTime * 1000).toLocaleDateString()).add(1, 'days')).subtract(7, 'days')).subtract(3, 'months').format('MMMM Do YYYY');
    const toTime = typeof lastUpdatedTime === 'undefined' || lastUpdatedTime === '--Updating--' ?
    moment(moment(linkedTime).add(1, 'days')).subtract(7, 'days').format('MMMM Do YYYY') :
    moment(new Date(lastUpdatedTime * 1000).toLocaleDateString()).subtract(7, 'days').format('MMMM Do YYYY');;
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const commercialDemographic = {
      commercial: totalCommercialPost ? totalCommercialPost : 0,
      organic: totalOrganicPost ? totalOrganicPost : 0
    };
    const Donut = ({ data, titles }) => {
      if (typeof data !== "object") {
        return null;
      }
      const list = Object.keys(data);
      return (
        <Grid container direction="row">
          <Grid
            item
            container
            direction="column"
            className={classes.fitContent}
            xs={8}
          >
            <ReactChartist
              data={{
                series: list.map(v => data[v])
              }}
              type="Pie"
              options={{
                width: "280px",
                height: "280px",
                chartPadding: 5,
                labelInterpolationFnc: (value, index) => {
                  return data[list[index]] && data[list[index]] > 0
                    ? data[list[index]].toFixed(0)
                    : "";
                },
                donut: true,
                donutSolid: true,
                donutWidth: "100%",
                labelPosition:
                  totalCommercialPost === 0 || totalOrganicPost === 0
                    ? "center"
                    : "inside",
                classNames: {
                  series:
                    "ct-series " +
                    cx(classes.pieChartColorWithGap, {
                      [classes.pieChartColorNoGap]:
                        totalCommercialPost === 0 || totalOrganicPost === 0
                    }),
                  label: "ct-label " + classes.pieChartLabel
                }
              }}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            className={classes.fitTitleContent}
            xs={3}
            direction="column"
          >
            {list.map((v, key) => (
              <Grid
                container
                alignItems="center"
                item
                className={
                  classes.pieChartColorWithGap + " " + classes.pieChartLegend
                }
                key={key}
              >
                <svg viewBox="0 0 200 200" className={classes.dot}>
                  <circle cx="100" cy="100" r="75" />
                </svg>
                {titles[v]}
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    };
    const renderLegend = props => {
      const { payload } = props;
      const intl = props.intl;
      return (
        <ul className={classes.lengendListContainer}>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className={classes.lengendListStyle}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  backgroundColor: `${entry.color}`,
                  margin: "0 15px 0 0"
                }}
              />
              <div className={classes.lengendName}>{entry.value}</div>
            </li>
          ))}
        </ul>
      );
    };
    return (
      <Grid container direction="column">
        {isWaiting &&
          <Grid
            item
            container
            direction="row"
            justify="space-evenly"
            spacing={24}
            className={classes.loadingWrapper}
          >
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
              {intl.formatMessage({ defaultMessage: "Your data is being processing and available after 24hrs, please feel the example below in your waiting time."})} 
          </div>
              <div className={classes.progressBarContainer}>
                <LinearProgress className={classes.progressBar} />
              </div>
            </Grid>
          </Grid>}
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          spacing={24}
          className={classes.firstRow}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <Selector
              formLabel={intl.formatMessage({ defaultMessage: "Time range"})}
              options={timeRangeOptions}
              onChange={this.changeTimeRange}
              value={timeRangeField}
              isSearchable={false}
              isDisabledSelect={false}
              formContainerClassName={classes.formContainerClassName}
              labelClassName={classes.labelClassName}
              formControlCustomClassName={classes.formControlCustomClassName}
              typingSelectClassName={classes.typingSelectClassName}
            />
          </Grid>
          <Tooltip
            title={
              <div>
                <p>
                  {lastUpdatedTime ? `To ensure accuracy of data, our performance report is updated on ${new Date(
                    lastUpdatedTime * 1000
                  ).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                  })}.` :
                  intl.formatMessage({ defaultMessage: 'Select the suitable time-range for tracking performance of posts.'})}
                </p>
                {lastUpdatedTime &&
                <p>
                 {intl.formatMessage({ defaultMessage: "So data of the selected time range will be analyzed from the"})} 
                 {intl.formatMessage({ defaultMessage: "So data of the selected time range will be analyzed from the"})}lx
                </p>}
              </div>
            }
            classes={{
              tooltip: classes.tooltipTitle,
              popper: classes.lastTooltip
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            PopperProps={{
              disablePortal: true
            }}
            onClose={this.handleTooltipTimeRangeClose}
            open={openTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <ErrorOutline
              onClick={this.handleTooltipTimeRangeOpen}
              onMouseLeave={this.handleTooltipTimeRangeClose}
              className={classes.toolTipIcon}
            />
          </Tooltip>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-end"
            justify="flex-end"
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
          >
            <div className={classes.availableDuration}>{`Available Duration for Tracking from ${fromTime} to ${toTime}`}</div>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.secondRow}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
          >
            <OverallValueCard
              title={intl.formatMessage({ defaultMessage: "Total Posts"})}
              value={totalPost}
              icon="library_books"
              content={intl.formatMessage({ defaultMessage: "The volume of influencer's post in the chosen period."})}
              color="chartOrange"
            />
            <OverallValueCard
              title={intl.formatMessage({ defaultMessage: "Total Engagement"})}
              value={totalEngagement}
              icon="sync"
              content={
                intl.formatMessage({ defaultMessage:"The volume of total influencer's generated engagement in the chosen period." }) 
              }
              color="primary"
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            className={classes.trendlineChart}
            alignItems="center"
            justify="flex-start"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
          >
            <ChartCard
              Title={
                <Fragment>
                  <span>{intl.formatMessage({ defaultMessage: "Activity Trendline"})}</span>
                </Fragment>
              }
              Chart={
                Array.isArray(trendlineActivity) &&
                trendlineActivity.length > 0 && (
                  <div className="chart-wrapper">
                    {this.state.isNoTrendLineChartData && (
                      <div className="no-result">
                       {intl.formatMessage({ defaultMessage: "Not enough data to generate chart"})} 
                      </div>
                    )}
                    <ResponsiveContainer width="99%" height={280}>
                      <AreaChart
                        data={trendlineActivity.length > 0 ? trendlineActivity : [{'createdTime': '123'}]}
                        margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPosts"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="100%"
                              stopColor="#ffb74d"
                              stopOpacity={0.58}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorEngagements"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="100%"
                              stopColor="#4dbce6"
                              stopOpacity={0.58}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="createdTime"
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "11px"
                          }}
                          interval={
                            trendlineActivity.length <= 35 && trendlineActivity.length > 0 ? 0 : intl.formatMessage({ defaultMessage: "preserveEnd"})
                          }
                          tickFormatter={value =>
                            new Date(value).toLocaleDateString("en-GB", {
                              month: "short",
                              day: "2-digit"
                            })
                          }
                          angle={40}
                          dy={8}
                        />
                        <YAxis
                          yAxisId="left"
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "11px"
                          }}
                          stroke="#ff9800"
                          strokeWidth="2"
                          tick={{ fill: "#999999" }}
                          domain={
                            maxPostPerDay < 4 ? [0, 4] : [0, maxPostPerDay]
                          }
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "11px"
                          }}
                          tickFormatter={value => value.toLocaleString("en")}
                          stroke="#009fdb"
                          strokeWidth="2"
                          tick={{ fill: "#999999" }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#DCDFEA" />
                        <TooltipChart
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
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="posts"
                          stroke="#ff9800"
                          strokeWidth={3}
                          activeDot={{
                            stroke: "#ff9800",
                            strokeWidth: 3,
                            r: 5
                          }}
                          fillOpacity={1}
                          fill="url(#colorPosts)"
                          dot={true}
                        />
                        <Area
                          yAxisId="right"
                          type="monotone"
                          dataKey="engagements"
                          stroke="#009fdb"
                          strokeWidth={3}
                          activeDot={{
                            stroke: "#009fdb",
                            strokeWidth: 3,
                            r: 5
                          }}
                          fillOpacity={1}
                          fill="url(#colorEngagements)"
                          dot={true}
                        />
                        <Legend
                          align="right"
                          verticalAlign="top"
                          height={0}
                          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                          wrapperStyle={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            textTransform: "capitalize"
                          }}
                          payload={[
                            {
                              id: "Total Generated Engagements",
                              value: "Total Generated Engagements",
                              color: "#009fdb"
                            },
                            {
                              id: "Total Generated Posts",
                              value: "Total Generated Posts",
                              color: "#ff9800"
                            }
                          ]}
                          content={renderLegend}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )
              }
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.otherRow}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
          >
            <StatisticValueCard
              icon={intl.formatMessage({ defaultMessage: "list_alt"})}
              title={intl.formatMessage({ defaultMessage: "Avg. Post per day"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "The average volume of created posts per day." })}
              showTooltip={showTooltip}
              value={avgPostPerDay}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
          >
            <StatisticValueCard
              icon={intl.formatMessage({ defaultMessage: "chat"})}
              title={intl.formatMessage({ defaultMessage: "Avg. comment Per post"})}
              tooltipContent={
                intl.formatMessage({ defaultMessage:"The average volume of generated comments per post." }) 
              }
              showTooltip={showTooltip}
              value={avgCommentPerPost}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
          >
            <StatisticValueCard
              icon={intl.formatMessage({ defaultMessage: "record_voice_over"})}
              title={intl.formatMessage({ defaultMessage: "Avg. Engagement Per post"})}
              tooltipContent={
                intl.formatMessage({ defaultMessage: "The average volume of generated engagement per post."})
              }
              showTooltip={showTooltip}
              value={avgEngagementPerPost}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
          >
            <StatisticValueCard
              icon={intl.formatMessage({ defaultMessage: "flash_on"})}
              title={intl.formatMessage({ defaultMessage: "Avg. Engagement score"})}
              tooltipContent={intl.formatMessage({ defaultMessage: "The average engagement score of all posts."})}
              showTooltip={showTooltip}
              value={avgEngagementScore}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.otherRow}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            xs={4}
          >
            <ChartCard
              Title="Commercial/Organic"
              Chart={
                typeof commercialDemographic.commercial === "number" &&
                  typeof commercialDemographic.organic === "number" ? (
                    <Donut
                      data={commercialDemographic}
                      titles={titleCommercialPieChart}
                    />
                  ) : (
                    <div className="commercial-organic no-result">
                     {intl.formatMessage({ defaultMessage: " Not enough data to generate chart"})}
                  </div>
                  )
              }
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={4}
          >
            <BigStatisticValueCard
              title={intl.formatMessage({ defaultMessage: "Commercial Rate"})}
              value={typeof commercialRate === "number" ? commercialRate : null}
              image={commercialImg}
              content={intl.formatMessage({ defaultMessage: "The ratio of commercial posts over the total posts."})}
              percentage={true}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="flex-end"
            xs={4}
          >
            <BigStatisticValueCard
              title={intl.formatMessage({ defaultMessage: "Advocacy Score"})}
              value={
                typeof totalAdvocacyScore === "number"
                  ? totalAdvocacyScore
                  : null
              }
              image={advocacyImg}
              content={
                intl.formatMessage({ defaultMessage: "Scoring the effective of commercial posts' performance." })
              }
              percentage={false}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.mostPostTitle}
          alignItems="flex-start"
          justify="flex-start"
        >
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            xs={12}
          >
           {intl.formatMessage({ defaultMessage: " MOST ENGAGEMENT POSTS"})}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          spacing={24}
          className={classes.otherRow}
        >
          {mostEngagementPost && mostEngagementPost.length ? (
            mostEngagementPost.map(post => (
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justify="center"
                xs={3}
              >
                <MostEngagementPost
                  totalEngagements={post.totalEngagements}
                  postPhotos={post.postPhotos}
                  postType={post.postType}
                  postMessage={post.message}
                  postCreatedTime={new Date(
                    post.createdTime * 1000
                  ).toLocaleDateString("en-us", options)}
                  postLink={post.postLink}
                />
              </Grid>
            ))
          ) : (
              <div className="most-engagement-posts no-result">
               {intl.formatMessage({ defaultMessage: " Not enough data"})}
            </div>
            )}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={24}
          className={classes.otherRow}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            xs={12}
            sm={6}
            md={6}
            lg={6}
          >
            <MostMentionedCategories
              title={intl.formatMessage({ defaultMessage: "Most Mentioned Categories"})}
              data={mostMentionedCategotires}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            xs={12}
            sm={6}
            md={6}
            lg={6}
          >
            <TagsCloudCard title={intl.formatMessage({ defaultMessage: "Tags cloud"})} data={tagCloud} />
          </Grid>
        </Grid>
      </Grid>
    )

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
  )(withStyles(styles)(OverallPerformance))
) ;
