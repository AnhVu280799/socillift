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
import cardHeaderStyle from "assets/jss/material-dashboard-pro-react/components/cardHeaderStyle.jsx";

function CardHeader({ ...props }) {
  const {
    classes,
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    stats,
    icon,
    text,
    ...rest
  } = props; const intl = props.intl;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderText]: text,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

CardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  text: PropTypes.bool
};

export default injectIntl (withStyles(cardHeaderStyle)(CardHeader)) ;
