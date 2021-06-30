import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import typographyStyle from "assets/jss/material-dashboard-pro-react/components/typographyStyle.jsx";
import { injectIntl } from 'react-intl';
function Danger({ ...props }) {
  const { classes, children } = props; const intl = props.intl;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(typographyStyle)(Danger)) ;
