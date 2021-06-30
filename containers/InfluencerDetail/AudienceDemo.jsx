import React from 'react';
import styles from './AudienceDemoStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import ValueCard from './ValueCard';
import Chip from '@material-ui/core/Chip';
import ChartCard from './ChartCard';
import ReactChartist from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import MdiIcon from '@mdi/react';
import { mdiGenderFemale, mdiGenderMale } from '@mdi/js';
import LevelToEducation from 'constants/levelsToEducation';
import LevelToJob from 'constants/levelsToJobs';
import Age2Idx from 'constants/ageRangeToLevels';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import { injectIntl } from 'react-intl';
const sizeToColor = {
  mega: 'danger',
  macro: 'warning',
  micro: 'success',
  potential: 'baseGrey',
  under_potential: 'grey'
};
const AudienceDemo = ({
  classes,
  theme,
  followersHistory,
  demographicsJob,
  demographicsEducation,
  demographicsGender,
  demographicsLocation,
  demographicsAge,
  totalFollowers,
  size,
  followerGrowth,
  followerGrowthByPercentage,
  followerInactivePercent,
  platform,
  showTooltip,
  intl,
  ...props
}) => {
  const onBarDraw = data => {
    if (data.type === 'bar') {
      const barHorizontalCenter = data.x1 + data.element.width() + 8;
      const barVerticalCenter = data.y1 + 4.5;
      const value = data.element.attr('ct:value');
      const label = new Chartist.Svg('text');
      label.text(parseFloat(value).toFixed(2) + '%');
      label.addClass(classes.barValue);
      label.attr({
        x: barHorizontalCenter,
        y: barVerticalCenter
      });
      return data.group.append(label);
    }
  };
  const GenderLine = ({ icon, title, value, color }) => {
    return (
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        direction="row"
        container
        className={classes.genderLine}
      >
        <Grid
          item
          xs={3}
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <MdiIcon path={icon} size="60px" color={color} />
        </Grid>
        <Grid direction="column" item container xs={5}>
          <Grid
            className={classes.genderLineTitle}
            item
            style={{ color }}
            container
            justify="flex-start"
          >
            {title}
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            className={classes.genderLineValue}
          >
            {value.toFixed(2)}%
          </Grid>
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <ReactChartist
            data={{
              series: [
                { value, className: classes[`${title}1`] },
                { value: 100 - value, className: classes[`${title}2`] }
              ]
            }}
            options={{
              showLabel: false,
              height: '48px',
              width: '48px',
              chartPadding: 0
            }}
            type="Pie"
          />
        </Grid>
      </Grid>
    );
  };
  const Donut = ({ data, titles }) => {
    if (typeof data !== 'object') return null;
    const list = Object.keys(data);
    return (
      <Grid container direction="row">
        <Grid item container className={classes.fitContent} xs={8}>
          <ReactChartist
            data={{
              series: list.map(v => (data[v] > 6 ? data[v] : 6))
            }}
            type={intl.formatMessage({ defaultMessage: "Pie"})}
            options={{
              width: '280px',
              height: '280px',
              chartPadding: 5,
              labelInterpolationFnc: (value, index) => {
                return data[list[index]].toFixed(2);
              },
              donut: true,
              donutSolid: true,
              donutWidth: '50%',
              classNames: {
                series: intl.formatMessage({ defaultMessage: 'ct-series '}) + classes.pieChartColorWithGap,
                label: intl.formatMessage({ defaultMessage: 'ct-label '}) + classes.pieChartLabel
              }
            }}
          />
        </Grid>
        <Grid
          item
          container
          className={classes.fitContent}
          xs={3}
          direction="column"
        >
          {list.map((v, key) => (
            <Grid
              container
              alignItems="center"
              item
              className={
                classes.pieChartColorWithGap + ' ' + classes.pieChartLegend
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
  const demoLocTop5 =
    typeof demographicsLocation === 'object'
      ? Object.keys(demographicsLocation)
          .map(v => ({ loc: v, val: demographicsLocation[v] }))
          .sort((b, a) => a.val - b.val)
          .slice(0, 5)
      : null;
  const demoAgeTop7 =
    typeof demographicsAge === 'object'
      ? Object.keys(demographicsAge)
          .map(v => ({ age: v, val: demographicsAge[v] }))
          .sort((a, b) => (Age2Idx[a.age] > Age2Idx[b.age] ? 1 : -1))
          .slice(0, 7)
      : null;
  const followersHistoryVal = followersHistory
    ? followersHistory.map(v => v.total_followers)
    : [0];
  const low = Math.floor(Math.min(...followersHistoryVal) / 1000) * 1000;
  const high = Math.ceil(Math.max(...followersHistoryVal) / 1000) * 1000;
  let lastVal = null;
  return (
    <Grid container direction="column">
      <Snackbar
        isDemo
        place={'bc'}
        color={'success'}
        message={
          intl.formatMessage({ defaultMessage: 'This Influencer has been restricted data of the audience on social media at this time!'})
        }
        open={
          platform !== 'youtube' &&
          platform !== 'insta' &&
          typeof demographicsJob === 'undefined' &&
          typeof demographicsEducation === 'undefined' &&
          typeof demographicsGender === 'undefined' &&
          typeof demographicsLocation === 'undefined' &&
          typeof demographicsAge === 'undefined'
            ? true
            : false
        }
      />
      <Grid
        item
        container
        direction="row"
        justify="space-evenly"
        spacing={24}
        className={classes.firstRow}
      >
        <Grid
          item
          container
          sm={12}
          xs={12}
          className={classes.totalFollower}
          justify="flex-start"
        >
          <ValueCard
            color={typeof size === 'string' ? sizeToColor[size] : 'grey'}
            valueStyles={size === 'potential' ? { opacity: 0.9 } : {}}
            Value={
              <div className={classes.valueInCard}>
                {typeof totalFollowers === 'number'
                  ? totalFollowers.toLocaleString('en')
                  : intl.formatMessage({ defaultMessage: 'N/A'})}
              </div>
            }
            Title={
              <div className={classes.titleInCard}>
              {intl.formatMessage({ defaultMessage: "  TOTAL FOLLOWER"})}
                {typeof size === 'string' && (
                  <Chip
                    label={size.replace('_', ' ')}
                    classes={{
                      root: classes.sizeChipRoot,
                      label: classes.sizeChipLabel
                    }}
                    style={{
                      backgroundColor: theme.colors[sizeToColor[size]](1.0)
                    }}
                  />
                )}
              </div>
            }
            Icon={
              typeof size === 'string' &&
              size !== 'under_potential' && (
                <Icon
                  style={{
                    fontSize: '67px',
                    marginRight: '16px',
                    marginBottom: '4px'
                  }}
                >
                  {intl.formatMessage({ defaultMessage: "people"})}
                </Icon>
              )
            }
            tooltipContent={intl.formatMessage({ defaultMessage: "Total volume of influencer's followers."})}
            showTooltip={showTooltip}
          />
        </Grid>
        <Grid
          item
          container
          sm={12}
          xs={12}
          className={classes.followerGrowth}
          justify="center"
        >
          <ValueCard
            color="primary"
            Icon={
              <Icon
                style={{
                  fontSize: '67px',
                  marginRight: '16px',
                  marginBottom: '4px'
                }}
              >
                {intl.formatMessage({ defaultMessage: "timeline"})}
              </Icon>
            }
            Title={
              <div className={classes.titleInCard}>
                {intl.formatMessage({ defaultMessage: "Follower Growth (Last 4w)"})}
              </div>
            }
            Value={
              <div className={classes.valueInCard}>
                {typeof followerGrowth === 'number'
                  ? followerGrowth.toLocaleString('en')
                  : intl.formatMessage({ defaultMessage: 'N/A'})}
                {typeof followerGrowthByPercentage === 'number' && (
                  <span style={{ fontSize: '26px', lineHeight: '39px' }}>
                    &nbsp;({(followerGrowthByPercentage * 100).toFixed(2)} %)
                  </span>
                )}
              </div>
            }
            tooltipContent={intl.formatMessage({ defaultMessage: 'Total volume of followers growth in last 4 weeks.'})}
            showTooltip={showTooltip}
          />
        </Grid>
        {typeof followerInactivePercent !== 'undefined' && (
          <Grid
            item
            container
            sm={12}
            xs={12}
            direction="column"
            className={classes.activeFollower}
            justify="flex-end"
          >
            <ValueCard
              color="chartPurple"
              Title={
                <div className={classes.titleInCard}>{intl.formatMessage({ defaultMessage: "% active Follower"})}</div>
              }
              Icon={
                <Icon
                  style={{
                    fontSize: '67px',
                    marginRight: '16px',
                    marginBottom: '4px'
                  }}
                >
                  {intl.formatMessage({ defaultMessage: "flash_on"})}
                </Icon>
              }
              Value={
                <div className={classes.valueInCard}>
                  {typeof followerInactivePercent === 'number'
                    ? 100 - followerInactivePercent + ' %'
                    : intl.formatMessage({ defaultMessage: 'N/A'})}
                </div>
              }
              tooltipContent={
                <div>
                  % Active follower: Active followers / total followers. <br />
                  Active follower: a Facebook user who has at least a post,
                  engagement, {intl.formatMessage({ defaultMessage: "or interaction with others in last 3 months."})}
                </div>
              }
              showTooltip={showTooltip}
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="space-evenly"
        spacing={8}
        className={classes.otherRow}
      >
        <Grid xs={12} item>
          <ChartCard
            Title={
              <React.Fragment>
                <span>{intl.formatMessage({ defaultMessage: "Follower Growth"})}</span>
                <span
                  style={{
                    color: theme.colors.grey(1.0),
                    fontSize: '13px',
                    lineHeight: '20px'
                  }}
                >
                  &nbsp;({intl.formatMessage({ defaultMessage: "Last 4 weeks"})})
                </span>
              </React.Fragment>
            }
            Chart={
              Array.isArray(followersHistory) && (
                <ReactChartist
                  type={intl.formatMessage({ defaultMessage: "Line"})}
                  className={classes.chartLineWrapper}
                  data={{
                    // labels:
                    series: [followersHistoryVal]
                  }}
                  listener={{
                    draw: data => {
                      if (data.type === 'point') {
                        const circle = new Chartist.Svg(
                          'circle',
                          {
                            cx: [data.x],
                            cy: [data.y],
                            r: [5],
                            'ct:value': data.value.y,
                            'ct:meta': data.meta
                          },
                          classes.point
                        );
                        data.element.replace(circle);
                      }
                    }
                  }}
                  options={{
                    height: '272px',
                    chartPadding: {
                      top: 10,
                      bottom: 0,
                      right: 15,
                      left: 0
                    },
                    axisY: {
                      type: Chartist.AutoScaleAxis,
                      labelInterpolationFnc: value => {
                        const val = Math.floor(value / 1000);
                        if (val === lastVal) return null;
                        else {
                          lastVal = val;
                          return `${val}k`;
                        }
                      },
                      low: low,
                      high: high
                    },
                    axisX: {
                      type: Chartist.StepAxis,
                      stretch: true,
                      ticks: followersHistory
                        .map(v => new Date(v.timestamp))
                        .map(
                          v =>
                            `${v.getDate().toString().padStart(2, '0')}/${(
                              v.getMonth() + 1
                            )
                              .toString()
                              .padStart(2, '0')}`
                        )
                    },
                    lineSmooth: false,
                    showArea: true,
                    classNames: {
                      horizontal: classes.barValueLabel,
                      area: 'ct-area ' + classes.lineArea,
                      line: 'ct-line ' + classes.line,
                      vertical: classes.verticalValue,
                      end: 'ct-end ' + classes.xlabel,
                      chart: 'ct-chart-line ' + classes.chartLine,
                      label: 'ct-label ' + classes.label
                    },
                    plugins: [
                      Chartist.plugins.tooltip({
                        anchorToPoint: true,
                        appendToBody: true,
                        class: classes.pointTooltip,
                        transformTooltipTextFnc: value =>
                          parseInt(value).toLocaleString('en'),
                        pointClass: classes.point
                      })
                    ]
                  }}
                />
              )
            }
          />
        </Grid>
      </Grid>
      {platform !== 'youtube' && platform !== 'insta' && (
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={8}
          className={classes.otherRow}
        >
          <Grid
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            item
            container
            direction="column"
            className={classes.locationChartWrapper}
          >
            <ChartCard
              Title={intl.formatMessage({ defaultMessage: "Allocated by Locations"})}
              Chart={
                Array.isArray(demoLocTop5) && (
                  <ReactChartist
                    className={classes.barChart}
                    type="Bar"
                    data={{
                      labels: demoLocTop5.map(({ loc }) => loc),
                      series: [demoLocTop5.map(({ val }) => val)]
                    }}
                    listener={{
                      draw: onBarDraw
                    }}
                    options={{
                      horizontalBars: true,
                      reverseData: true,
                      axisY: {
                        offset: 100
                      },
                      axisX: {
                        low: 0,
                        high: 110,
                        showLabel: false,
                        type: Chartist.AutoScaleAxis,
                        scaleMinSpace: 1,
                        onlyInteger: true,
                        labelInterpolationFnc: value => {
                          return value % 10 === 0 && value <= 100
                            ? value
                            : null;
                        }
                      },
                      height: 200,
                      chartPadding: {
                        top: 0,
                        right: 12,
                        bottom: 0,
                        left: 0
                      },
                      fullWidth: true,
                      classNames: {
                        label: intl.formatMessage({ defaultMessage: 'ct-label '}) + classes.barChartLabel,
                        bar: `${classes.barChartBar} ${classes.barChartBlue}`,
                        horizontal: classes.barValueLabel
                      }
                    }}
                  />
                )
              }
            />
          </Grid>
          <Grid
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            item
            container
            direction="column"
            className={classes.ageChartWrapper}
          >
            <ChartCard
              Title={intl.formatMessage({ defaultMessage: "Allocated by Ages"})}
              Chart={
                Array.isArray(demoAgeTop7) && (
                  <ReactChartist
                    className={classes.barChart}
                    type="Bar"
                    data={{
                      labels: demoAgeTop7.map(({ age }) => age),
                      series: [demoAgeTop7.map(({ val }) => val)]
                    }}
                    listener={{
                      draw: onBarDraw
                    }}
                    options={{
                      horizontalBars: true,
                      reverseData: true,
                      axisY: {
                        offset: 50
                      },
                      axisX: {
                        low: 0,
                        high: 110,
                        showLabel: false,
                        type: Chartist.AutoScaleAxis,
                        scaleMinSpace: 1,
                        onlyInteger: true,
                        labelInterpolationFnc: value => {
                          return value % 10 === 0 && value <= 100
                            ? value
                            : null;
                        }
                      },
                      height: 200,
                      chartPadding: {
                        top: 0,
                        right: 12,
                        bottom: 0,
                        left: 0
                      },
                      fullWidth: false,
                      classNames: {
                        label: intl.formatMessage({ defaultMessage: 'ct-label '}) + classes.barChartLabel,
                        bar: `${classes.barChartBar} ${classes.barChartPurple}`,
                        horizontal: classes.barValueLabel,
                        chart: intl.formatMessage({ defaultMessage: 'ct-chart-bar '}) + classes.chartBar
                      }
                    }}
                  />
                )
              }
            />
          </Grid>
        </Grid>
      )}
      {platform !== 'youtube' && platform !== 'insta' && (
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          spacing={8}
          className={classes.otherRow}
        >
          <Grid
            xl={3}
            lg={3}
            md={12}
            sm={12}
            xs={12}
            direction="column"
            justify="flex-start"
            item
            container
            className={classes.genderChartWrapper}
          >
            <ChartCard
              Title={intl.formatMessage({ defaultMessage: "Allocated by Gender"})}
              Chart={
                typeof demographicsGender === 'object' && (
                  <Grid
                    container
                    direction="column"
                    style={{ marginBottom: '-14px' }}
                  >
                    <GenderLine
                      title={intl.formatMessage({ defaultMessage: "Female"})}
                      color="#e91e62"
                      icon={mdiGenderFemale}
                      value={demographicsGender.female}
                    />
                    <GenderLine
                      title={intl.formatMessage({ defaultMessage: "Male"})}
                      color={theme.colors.chartPurple(1.0)}
                      icon={mdiGenderMale}
                      value={demographicsGender.male}
                    />
                  </Grid>
                )
              }
            />
          </Grid>
          <Grid
            justify="center"
            item
            container
            className={classes.educationChartWrapper}
          >
            <ChartCard
              Title={intl.formatMessage({ defaultMessage: "Allocated by Education"})}
              Chart={
                <Donut data={demographicsEducation} titles={intl.formatMessage({ defaultMessage: "LevelToEducation"})} />
              }
            />
          </Grid>
          <Grid
            justify="flex-end"
            container
            item
            className={classes.jobChartWrapper}
          >
            <ChartCard
              Title={intl.formatMessage({ defaultMessage: "Allocated by Job level"})}
              Chart={<Donut data={demographicsJob} titles={LevelToJob} />}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default injectIntl (withTheme()(withStyles(styles)(AudienceDemo))) ;
