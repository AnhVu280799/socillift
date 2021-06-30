import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import typographyStyle from "assets/jss/material-dashboard-pro-react/components/typographyStyle.jsx";

function Info({ ...props }) {
  const { classes, children } = props; const intl = props.intl;
  return (
    <div className={classes.defaultFontStyle + " " + classes.infoText}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(typographyStyle)(Info)) ;
