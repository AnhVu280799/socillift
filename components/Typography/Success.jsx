import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import typographyStyle from "assets/jss/material-dashboard-pro-react/components/typographyStyle.jsx";

function Success({ ...props }) {
  const { classes, children } = props; const intl = props.intl;
  return (
    <div className={classes.defaultFontStyle + " " + classes.successText}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

Success.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(typographyStyle)(Success)) ;
