import React from "react";
import PropTypes from "prop-types";
import MdiIcon from '@mdi/react';
import {
  mdiGenderFemale,
  mdiGenderMale
} from '@mdi/js';

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { injectIntl } from 'react-intl';
// custom components

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
import genderChartStyle from "./GenderChartStyle";

// constants

class GenderChart extends React.Component {
  render() {
    const { classes, className, data, ...props } = this.props;
    const intl = this.props.intl;
    // const data = {
    //   male: 55.56,
    //   female: 44.44
    // }
    const male = [
      {
        male: data.male
      }
    ];
    const female = [
      {
        female: data.female
      }
    ];

    return (
      <Paper className={classes.container}>
        <Grid container direction="row" className={classes.titleStyle}>
         {intl.formatMessage({ defaultMessage: " Active Follower’s Gender"})}
        </Grid>
        <Grid container direction="row" className={classes.chartContainer}>
          <Grid
            item
            container
            direction="column"
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.valueStyle}
            >
              {(data.male ? data.male.toFixed(2) : '_') + "%"}
            </Grid>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={male}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <YAxis
                  yAxisId="rate"
                  type="number"
                  hide={true}
                  domain={[0, 100]}
                />
                <Bar
                  yAxisId="rate"
                  dataKey="male"
                  type="monotone"
                  barSize={50}
                  fill="#1B5DC0"
                  background={{ fill: "#DBE3FF" }}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <Grid
              item
              container
              direction="row"
              className={classes.labelContainer}
              alignItems="center"
              justify="center"
            >
              <MdiIcon path={mdiGenderMale} size='30px' color={"#1B5DC0"} />
              <div className={classes.labelStyleMale}>
                Male
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.valueStyle}
            >
              {(data.female ? data.female.toFixed(2) : '_') + "%"}
            </Grid>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={female}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <YAxis
                  yAxisId="rate"
                  type="number"
                  domain={[0, 100]}
                  hide={true}
                />
                <Bar
                  yAxisId="rate"
                  dataKey="female"
                  type="monotone"
                  barSize={50}
                  fill="#E91E63"
                  background={{ fill: "#FEE7F7" }}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <Grid
              item
              container
              direction="row"
              className={classes.labelContainer}
              alignItems="center"
              justify="center"
            >
              <MdiIcon path={mdiGenderFemale} size='30px' color={"#E91E63"} />
              <div className={classes.labelStyleFemale}>
              {intl.formatMessage({ defaultMessage: "Female"})} 
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

GenderChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(genderChartStyle)(GenderChart)) ;
