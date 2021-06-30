import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Hidden from '@material-ui/core/Hidden';
import { injectIntl } from 'react-intl';
// custom components

// utils
import { parseKMBNoPlus } from "utils";

// rechart component
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  Legend,
  ResponsiveContainer,
  LabelList,
  Rectangle
} from "recharts";

// styles
import advocacyChartStyle from "./AdvocacyChartStyle";

// constants
import defaultAvatar from "assets/img/Avatar Default.png";

class AdvocacyChart extends React.Component {
  render() {
    const { classes, className, data, ...props } = this.props;
    const intl = this.props.intl;
    const top5Influencer =
      data &&
      data.map(element => {
        return {
          name: element.influencerId,
          "Total Generated Posts": element.totalPost,
          "Total Generated Engagement": element.totalEngagement,
          "Advocacy Score": element.avgAdvocacy
        };
      });
    
    const avatarDict = {};
    const nameDict = {};
    let maxTotalPost = 0;
    data.forEach(element => {
      avatarDict[element.influencerId] = element.avatar;
    });
    data.forEach(element => {
      nameDict[element.influencerId] = element.name;
    });
    data.forEach(element => {
      if (maxTotalPost < element.totalPost) {
        maxTotalPost = element.totalPost
      }
    });

    const renderLegend = props => {
      const { payload } = props;
      return (
        <ul className={classes.lengendListContainer}>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className={classes.lengendListStyle}>
              <div 
                className={classes.lengendIcon}
                style={{
                  backgroundColor: `${entry.color}`,
                }}  
              />
              <div className={classes.lengendName}>{entry.value}</div>
            </li>
          ))}
        </ul>
      );
    };

    const CustomizedAxisTick = props => {
      const { avatarDict, nameDict, payload, x, y, index } = props;
      const intl = props.intl;

      const name = nameDict[payload.value] ? nameDict[payload.value] : "_";
      return (
        <g>
          <a href={`https://www.facebook.com/${payload.value}`} target="_blank">
            <filter
              id="shadow"
              x="-0.3"
              y="0"
              width="60px"
              height="60px"
              cx="60"
              cy="60"
              rx="30"
              ry="60"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="5"
                floodColor="#6F7897"
                floodOpacity="0.25"
              />
            </filter>
            <rect
              id={`rect${index}`}
              x={x - 30}
              y={y}
              cx="60"
              cy="60"
              rx="30"
              ry="60"
              width="60px"
              height="60px"
              stroke="#FFFFFF"
              strokeWidth="10"
              filter="url(#shadow)"
            />
            <clipPath id={`clip${index}`}>
              <use xlinkHref={`#rect${index}`} />
            </clipPath>
            <image
              xlinkHref={
                avatarDict[payload.value]
                  ? avatarDict[payload.value]
                  : defaultAvatar
              }
              x={x - 30}
              y={y}
              height="60px"
              width="60px"
              textAnchor="middle"
              clipPath={`url(#clip${index}`}
            />
          </a>
          <text
            x={x}
            y={y + 65}
            fill="#3C4859"
            textAnchor="middle"
            dy={16}
            style={{
              fontFamily: "Nunito",
              fontSize: "14px",
              fontWeight: "bold",
              lineHeight: "19px",
              color: "#3C4859"
            }}
          >
            {name.length <= 25 ? name : name.slice(0, 25) + "..."}
          </text>
        </g>
      );
    };

    const CustomizedAxisTickMobile = props => {
      const { avatarDict, nameDict, payload, x, y, index } = props;

      const name = nameDict[payload.value] ? nameDict[payload.value] : "_";
      const nameArray = name ? name.split(" ") : [];
      return (
        <g>
          <a href={`https://www.facebook.com/${payload.value}`} target="_blank">
            <filter
              id="shadow"
              x="-0.3"
              y="0"
              width="20px"
              height="20px"
              cx="20"
              cy="20"
              rx="10"
              ry="20"
            >
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="5"
                floodColor="#6F7897"
                floodOpacity="0.25"
              />
            </filter>
            <rect
              id={`rect${index}`}
              x={x-10}
              y={y-5}
              width="20px"
              height="20px"
              cx="20"
              cy="20"
              rx="10"
              ry="20"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#shadow)"
            />
            <clipPath id={`clip${index}`}>
              <use xlinkHref={`#rect${index}`} />
            </clipPath>
            <image
              xlinkHref={
                avatarDict[payload.value]
                  ? avatarDict[payload.value]
                  : defaultAvatar
              }
              x={x-10}
              y={y-5}
              height="20px"
              width="20px"
              textAnchor="middle"
              clipPath={`url(#clip${index}`}
            />
          </a>
          <text
            x={x}
            y={y + 16}
            fill="#3C4859"
            textAnchor="middle"
            dy={16}
            style={{
              fontFamily: "Nunito",
              fontSize: "9px",
              fontWeight: "bold",
              lineHeight: "19px",
              color: "#3C4859",
            }}
            height="40px"
          >
            {
              nameArray.map((element, index) => (
                <tspan x={x} dy={12} key={index}>{intl.formatMessage({ defaultMessage: "element"})}</tspan>
              ))
            }
          </text>
        </g>
      );
    };

    const AdvocacyChartContainer = props => {
      const { top5Influencer } = props;
      const intl = props.intl;
      return (
        <div className={classes.wrapper}>
          <Hidden smDown>
            <ResponsiveContainer width={"100%"} height={510}>
              <ComposedChart
                data={top5Influencer}
                margin={{ top: 30, right: 30, left: 0, bottom: 80 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#01BBD3"
                  tick={
                    <CustomizedAxisTick
                      avatarDict={avatarDict}
                      nameDict={nameDict}
                    />
                  }
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#3C4859"
                  }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis yAxisId="score" hide={true} />
                <YAxis
                  yAxisId="posts"
                  orientation="left"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#9DA4BA"
                  }}
                  stroke="#00B04B"
                  tick={{ fill: "#9DA4BA" }}
                  domain={maxTotalPost < 4 ? [0, 4] : [0, maxTotalPost]}
                />
                <YAxis
                  yAxisId="engagements"
                  orientation="right"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#9DA4BA"
                  }}
                  stroke="#FF9900"
                  tick={{ fill: "#9DA4BA" }}
                  tickFormatter={value => value.toLocaleString("en")}
                />
                <TooltipChart
                  formatter={value => value.toLocaleString("en")}
                  labelFormatter={value => nameDict[value]}
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
                <Legend
                  align="right"
                  verticalAlign="top"
                  height={80}
                  wrapperStyle={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}
                  payload={[
                    {
                      id: "Advocacy Score",
                      value: "Advocacy Score",
                      color: "#009FDB"
                    },
                    {
                      id: "Total Generated Engagement",
                      value: "Total Generated Engagement",
                      color: "#FF9900"
                    },
                    {
                      id: "Total Generated Posts",
                      value: "Total Generated Posts",
                      color: "#00B04B"
                    }
                  ]}
                  content={renderLegend}
                />
                <CartesianGrid
                  stroke="#DCDFEA"
                  strokeDasharray="10 10"
                  vertical={false}
                />
                <Bar
                  yAxisId="score"
                  type={intl.formatMessage({ defaultMessage: "monotone"})}
                  dataKey="Advocacy Score"
                  barSize={50}
                  fill="#009FDB"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey="Advocacy Score"
                    position="top"
                    fill="#3C4859"
                    fontSize={28}
                    fontWeight="bold"
                    formatter={value => value.toFixed(0)}
                  />
                </Bar>
                <Line
                  yAxisId="posts"
                  type={intl.formatMessage({ defaultMessage: "monotone"})}
                  dataKey="Total Generated Posts"
                  strokeWidth={2}
                  activeDot={{ stroke: "#00B04B", strokeWidth: 3, r: 5 }}
                  stroke="#00B04B"
                />
                <Line
                  yAxisId="engagements"
                  type={intl.formatMessage({ defaultMessage: "monotone"})}
                  dataKey="Total Generated Engagement"
                  strokeWidth={2}
                  activeDot={{ stroke: "#FF9900", strokeWidth: 3, r: 5 }}
                  stroke="#FF9900"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Hidden>
          <Hidden mdUp>
            <ResponsiveContainer width={"100%"} height={510}>
              <ComposedChart
                data={top5Influencer}
                margin={{ top: 30, right: 0, left: 0, bottom: 60 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#01BBD3"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "10px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#3C4859",
                  }}
                  tickLine={false}
                  tick={
                    <CustomizedAxisTickMobile
                      avatarDict={avatarDict}
                      nameDict={nameDict}
                    />
                  }
                  // tick={{ fill: "#3C4859" }}
                  tickFormatter={value => nameDict[value]}
                  angle={40}
                  dy={16}
                  width={30}
                  interval={0}
                />
                <YAxis yAxisId="score" hide={true} />
                <YAxis
                  yAxisId="posts"
                  orientation="left"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#9DA4BA"
                  }}
                  stroke="#00B04B"
                  tick={{ fill: "#9DA4BA" }}
                  domain={maxTotalPost < 4 ? [0, 4] : [0, maxTotalPost]}
                />
                <YAxis
                  yAxisId="engagements"
                  orientation="right"
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "19px",
                    color: "#9DA4BA"
                  }}
                  stroke="#FF9900"
                  tick={{ fill: "#9DA4BA" }}
                  tickFormatter={value => parseKMBNoPlus(value)}
                />
                <TooltipChart
                  formatter={value => value.toLocaleString("en")}
                  labelFormatter={value => nameDict[value]}
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
                    fontSize: "12px",
                    borderRadius: "10px"
                  }}
                />
                <Legend
                  align="right"
                  verticalAlign="top"
                  height={80}
                  wrapperStyle={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}
                  payload={[
                    {
                      id: "Advocacy Score",
                      value: "Advocacy Score",
                      color: "#009FDB"
                    },
                    {
                      id: "Total Generated Engagement",
                      value: "Total Generated Engagement",
                      color: "#FF9900"
                    },
                    {
                      id: "Total Generated Posts",
                      value: "Total Generated Posts",
                      color: "#00B04B"
                    }
                  ]}
                  content={renderLegend}
                />
                <CartesianGrid
                  stroke="#DCDFEA"
                  strokeDasharray="10 10"
                  vertical={false}
                />
                <Bar
                  yAxisId="score"
                  type="monotone"
                  dataKey="Advocacy Score"
                  barSize={20}
                  fill="#009FDB"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey="Advocacy Score"
                    position="top"
                    fill="#3C4859"
                    fontSize={14}
                    fontWeight="bold"
                    formatter={value => value.toFixed(0)}
                  />
                </Bar>
                <Line
                  yAxisId="posts"
                  type={intl.formatMessage({ defaultMessage: "monotone"})}
                  dataKey="Total Generated Posts"
                  strokeWidth={2}
                  activeDot={{ stroke: "#00B04B", strokeWidth: 3, r: 5 }}
                  stroke="#00B04B"
                />
                <Line
                  yAxisId="engagements"
                  type={intl.formatMessage({ defaultMessage: "monotone"})}
                  dataKey="Total Generated Engagement"
                  strokeWidth={2}
                  activeDot={{ stroke: "#FF9900", strokeWidth: 3, r: 5 }}
                  stroke="#FF9900"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Hidden>
        </div>
      );
    };
    return (
      <Paper className={classes.container}>
        <AdvocacyChartContainer top5Influencer={top5Influencer} />
      </Paper>
    );
  }
}

AdvocacyChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(advocacyChartStyle)(AdvocacyChart)) ;
