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
import cardTextStyle from "assets/jss/material-dashboard-pro-react/components/cardTextStyle.jsx";

function CardText({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const intl = props.intl;
  const cardTextClasses = classNames({
    [classes.cardText]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardTextClasses} {...rest}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

CardText.propTypes = {
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

export default injectIntl (withStyles(cardTextStyle)(CardText)) ;
