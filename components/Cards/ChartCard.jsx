import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';
import chartCardStyle from 'assets/jss/material-dashboard-pro-react/components/chartCardStyle';

class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  render() {
    const {
      classes,
      chartColor,
      statIconColor,
      chart,
      title,
      text,
      statLink,
      statText,
      underChart,
      hover
    } = this.props;
    const intl = this.props.intl;
    const cardHeaderClasses =
      classes.cardHeader +
      ' ' +
      classes[chartColor + 'CardHeader'] +
      cx({
        [' ' + classes.moveChartUp]: this.state.hover && hover
      });
    var addHoverEvent = {};
    if (hover) {
      if (navigator.userAgent.match(/iPad/i) != null) {
        addHoverEvent.onClick = () =>
          this.setState({ hover: !this.state.hover });
      } else {
        addHoverEvent.onMouseEnter = () => this.setState({ hover: true });
        addHoverEvent.onMouseLeave = () => this.setState({ hover: false });
      }
    }
    return (
      <Card className={classes.card} {...addHoverEvent}>
        <CardHeader className={cardHeaderClasses} subheader={chart} />
        <CardContent className={classes.cardContent}>
          {hover ? (
            <div className={classes.underChart}>{intl.formatMessage({ defaultMessage: "underChart"})}</div>
          ) : null}
          <Typography
            variant="title"
            component="h4"
            className={classes.cardTitle}
          >
            {intl.formatMessage({ defaultMessage: "title"})}
          </Typography>
          <Typography component="p" className={classes.cardCategory}>
            {intl.formatMessage({ defaultMessage: "text"})}
          </Typography>
        </CardContent>
        {this.props.statIcon !== undefined ||
        statLink !== undefined ||
        statText !== undefined ? (
          <CardActions className={classes.cardActions}>
            <div className={classes.cardStats}>
              {this.props.statIcon !== undefined ? (
                <this.props.statIcon
                  className={
                    classes.cardStatsIcon +
                    ' ' +
                    classes[statIconColor + 'CardStatsIcon']
                  }
                />
              ) : null}{' '}
              {statLink !== undefined ? (
                <a href={statLink.href} className={classes.cardStatsLink}>
                  {statLink.text}
                </a>
              ) : statText !== undefined ? (
                statText
              ) : null}
            </div>
          </CardActions>
        ) : null}
      </Card>
    );
  }
}

ChartCard.defaultProps = {
  statIconColor: 'gray',
  chartColor: 'purple',
  hover: false
};

ChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  title: PropTypes.node,
  text: PropTypes.node,
  statIcon: PropTypes.func,
  statIconColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  chartColor: PropTypes.oneOf([
    'orange',
    'green',
    'red',
    'blue',
    'purple',
    'rose'
  ]),
  statLink: PropTypes.object,
  statText: PropTypes.node,
  // if the chart should move up on hover
  hover: PropTypes.bool,
  // what to be displayed under tha chart on hover
  underChart: PropTypes.node
};

export default injectIntl(withStyles(chartCardStyle)(ChartCard));
