import React from 'react';
import style from './StatisticValueCardStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Fade from '@material-ui/core/Fade';
import { Grid, Paper, Icon } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { injectIntl } from 'react-intl';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
  parseKMB,
} from 'utils';

class StatisticValueCard extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes, theme, title, value, icon, showTooltip, tooltipContent, ...props } = this.props;
    const intl = this.props.intl;
    return (
      <Paper className={classes.paperSize}>
        <Grid
          item
          container
          direction="row"
          className={classes.valueContainer}
        >
          <Grid
            item
            container
            xs={4}
            alignItems="center"
            justify="center"
            className={classes.iconContainer}
          >
            <Icon className={classes.iconDesign}>{intl.formatMessage({ defaultMessage: "icon"})}</Icon>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={8}
            className={classes.contentSize}
          >
            <Grid
              item
              container
              direction="row"
              className={classes.titleSize}
            >
              {title}
            </Grid>
            <Grid
              item
              container
              direction="row"
              className={classes.valueSize}
            >
              
              { 
                (typeof value === 'number' ?
                (
                  <Tooltip
                    title={value.toLocaleString("en")}
                    classes={{ tooltip: classes.tooltipTitle }}
                  >
                    <div>{parseKMB(value)}</div>
                  </Tooltip>
                ) :
                (<div className="no-result">{intl.formatMessage({ defaultMessage: "--Updating--"})}</div>))
              }
            </Grid>
            {showTooltip && (
              <Tooltip
                title={tooltipContent}
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
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (withTheme()(withStyles(style)(StatisticValueCard))) ;
