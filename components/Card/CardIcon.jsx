import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// @material-ui/icons
import { injectIntl } from 'react-intl';
// core components
import cardIconStyle from "assets/jss/material-dashboard-pro-react/components/cardIconStyle.jsx";

function CardIcon({ ...props }) {
  const { classes, className, children, color, ...rest } = props;const intl = props.intl;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

CardIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ])
};

export default injectIntl (withStyles(cardIconStyle)(CardIcon)) ;
