import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { injectIntl } from 'react-intl';

import customizedTooltipStyle from "assets/jss/material-dashboard-pro-react/components/customizedTooltipStyle.jsx";


class CustomizedTooltip extends React.Component {
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
    const {
      categories,
      iconUsed,
      firstCat,
      lastCat,
      classes
    } = this.props;
    const intl = this.props.intl;

    const [_, ...restCategories] = categories;

    const returnTooltipContainer = (restCategories) => {
      if ((restCategories.length + 1) <= 5) {
        const mappedCategories = restCategories.map((category) => (<div className={classes.tooltipChild} key={category}>{intl.formatMessage({ defaultMessage: "category"})}</div>))
        return (
          <div className={classes.tooltipContainer}>
            {mappedCategories}
            <div className={classNames(classes.tooltipChild, classes.tooltipChildLastChild)}>{intl.formatMessage({ defaultMessage: "lastCat"})}</div>
          </div>
        )
      } else {
        const mappedCategories = restCategories.filter((_, idx) => idx < 4).map((category) => (<div className={classes.tooltipChild} key={category}>{intl.formatMessage({ defaultMessage: "categoryd"})}</div>))
        const numberRest = restCategories.length - mappedCategories.length
        const pluralNoun = numberRest > 1 ? 's' : ''
        return (
          <div className={classes.tooltipContainer}>
            {mappedCategories}
            <div className={classNames(classes.tooltipChild)}>{intl.formatMessage({ defaultMessage: "lastCat"})}</div>
            <div className={classNames(classes.tooltipChild, classes.tooltipChildLastChild)}>{`${numberRest} other${pluralNoun}`}</div>
          </div>
        )
      }
    }

    return (
      <div>
        <div className={classes.influencerCategories}>
          {iconUsed}
          <span className={classes.firstCatStyle} title={firstCat}>{firstCat} </span> <span>&nbsp; and &nbsp;</span>
          <Tooltip
            title={returnTooltipContainer(restCategories)}
            classes={{ tooltip: classes.tooltipCategories }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={this.handleTooltipClose}
            open={this.state.open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            interactive
          >

            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <span className={classes.others} onClick={this.handleTooltipOpen}> {restCategories.length + 1} {intl.formatMessage({ defaultMessage: "others"})}</span>
            </ClickAwayListener>
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default injectIntl(withStyles(customizedTooltipStyle)(CustomizedTooltip)) ;
