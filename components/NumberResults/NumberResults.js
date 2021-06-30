import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import numberResultsStyle from "assets/jss/material-dashboard-pro-react/components/numberResultsStyle.jsx"

class NumberResults extends React.Component {
  render() {
    const { number, classes } = this.props;  const intl = this.props.intl;
    return (<p className={classes.numberDisplay}>{intl.formatMessage({ defaultMessage: "number"})}</p>)
  }
};

NumberResults.propTypes = {
};
export default injectIntl (withStyles(numberResultsStyle)(NumberResults)) ;
