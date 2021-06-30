import React from 'react';
import style from './ValueCardStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import { injectIntl } from 'react-intl';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
class ValueCard extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  render (){
    const { classes, theme, Title, Value, Icon, tooltipContent, color, valueStyles, showTooltip, ...props } = this.props;
    const intl = this.props.intl;
    return (
      <Paper classes={{ root: classes.paperRoot }}>
        <div className={classes.topCircle} style={{ backgroundColor: theme.colors[color](0.04) }} />
        <div className={classes.rightCircle} style={{ backgroundColor: theme.colors[color](0.06) }} />
        <div className={classes.icon} style={{ color: theme.colors[color](0.6) }}>
          {intl.formatMessage({ defaultMessage: "Icon"})}
        </div>
        <div className={classes.value} style={{ color: theme.colors[color](1.0), ...valueStyles }}>{intl.formatMessage({ defaultMessage: "Value"})}</div>
        <div className={classes.title}>{Title}</div>
        {
          showTooltip && <Tooltip
            title={
              <React.Fragment>
                {tooltipContent}
              </React.Fragment>
            }
            classes={{ 
              popper: classes.lastTooltip,
              tooltip: classes.tooltipTitle,
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            onClose={this.handleTooltipClose}
            open={this.state.open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <ErrorOutline onClick={this.handleTooltipOpen} onMouseLeave={this.handleTooltipClose} className={classes.toolTipIcon}/>
          </Tooltip>
        }
      </Paper>
    )
  }
}
export default  injectIntl (withTheme()(withStyles(style)(ValueCard))) ;
