import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import headingStyle from "assets/jss/material-dashboard-pro-react/components/headingStyle.jsx";

function Heading({ ...props }) {
  const { textAlign, category, title, classes } = props;const intl = props.intl;
  const heading =
    classes.heading +
    " " +
    cx({
      [classes[textAlign + "TextAlign"]]: textAlign !== undefined
    });
  if (title !== undefined || category !== undefined) {
    return (
      <div className={heading}>
        {title !== undefined ? (
          <h3 className={classes.title}>{intl.formatMessage({ defaultMessage: "title"})}</h3>
        ) : null}
        {category !== undefined ? (
          <p className={classes.category}>{intl.formatMessage({ defaultMessage: "category"})}</p>
        ) : null}
      </div>
    );
  }
  return null;
}

Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  category: PropTypes.node,
  textAlign: PropTypes.oneOf(["right", "left", "center"])
};

export default injectIntl (withStyles(headingStyle)(Heading)) ;
