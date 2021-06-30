import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import badgeStyle from "assets/jss/material-dashboard-pro-react/components/badgeStyle.jsx";

function Badge({ ...props }) {
  const { classes, color, children } = props;  const intl = props.intl;
  return (
    <span className={classes.badge + " " + classes[color]}>{intl.formatMessage({ defaultMessage: "children"})}</span>
  );
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};

export default injectIntl (withStyles(badgeStyle)(Badge)) ;
