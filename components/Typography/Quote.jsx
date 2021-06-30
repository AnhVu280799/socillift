import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';  
import typographyStyle from "assets/jss/material-dashboard-pro-react/components/typographyStyle.jsx";

function Quote({ ...props }) {
  const { classes, text, author } = props; const intl = props.intl;
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>{intl.formatMessage({ defaultMessage: "text"})}</p>
      <small className={classes.quoteAuthor}>{intl.formatMessage({ defaultMessage: "author"})}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.node,
  author: PropTypes.node
};

export default injectIntl (withStyles(typographyStyle)(Quote)) ;
