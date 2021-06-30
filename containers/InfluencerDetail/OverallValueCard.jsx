import React from 'react';
import style from './OverallValueCardStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import { Grid, Paper, Icon } from "@material-ui/core";
import { injectIntl } from 'react-intl';
import Tooltip from "@material-ui/core/Tooltip";
import {
  parseKMB,
} from 'utils';

class OverallValueCard extends React.Component {
  render (){
    const { classes, theme, title, value, icon, content, color } = this.props;
    const intl = this.props.intl;
    return (
      <Paper classes={{ root: classes.paperRoot }}>
        <Grid container item direction="column">
          <Grid container item direction="row" className={classes.containerFirstRow}>
            <Grid container item direction="column" xs={4}
              alignItems='center' justify='center'>
              <Grid container item alignItems='center' justify='center'
                className={classes.iconContainer} style={{ backgroundColor: theme.colors[color](0.16) }}>
                <Icon className={classes.iconStyle}
                  style={{ color: theme.colors[color](1.0) }}>{intl.formatMessage({ defaultMessage: "icon"})}</Icon>
              </Grid>
            </Grid>
            <Grid container item direction="column" xs={8}
              alignItems='center' justify='center'
              className={classes.containerValue}>
              <Grid container item direction="row" className={classes.valueStyle}>
                { 
                  (typeof value === 'number' ?
                  (
                    value > 1000000 ?
                    (
                      <Tooltip title={value.toLocaleString('en')} classes={{ tooltip: classes.tooltipTitle}}>
                        <div>
                          {parseKMB(value)}
                        </div>
                      </Tooltip>
                    ):
                    (value.toLocaleString('en'))
                  ) :
                  (<div className="no-result">{intl.formatMessage({ defaultMessage: "--Updating--"})}</div>))
                }
                {/* {value} */}
              </Grid>
              <Grid container item direction="row" className={classes.titleStyle}>
                {title}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="row" className={classes.contentStyle}
            alignItems='flex-start' justify='flex-start'>
            {content}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
export default injectIntl (withTheme()(withStyles(style)(OverallValueCard))) ;
