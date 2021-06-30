import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import classNames from 'classnames';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { injectIntl } from 'react-intl';
import moreActionsStyle from "assets/jss/material-dashboard-pro-react/components/moreActionsStyle.jsx";

class MoreActions extends React.Component {
  render() {
    const { classes, onClick, className } = this.props;
    const intl = this.props.intl;
    const buttonClass = cx(classes.buttonIcon, { [classes.active]: false })
    return (
      <Button variant="fab" className={classNames(classes.moreActionsButton, className)} onClick={onClick}>
        <Icon className={buttonClass}>{intl.formatMessage({ defaultMessage: "more_vert"})}</Icon>
      </Button>
    )
  }
};

MoreActions.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectIntl (withStyles(moreActionsStyle)(MoreActions));
