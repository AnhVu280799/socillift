import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import leftRightContainerStyle from "assets/jss/material-dashboard-pro-react/components/leftRightContainerStyle.jsx"
import { injectIntl } from 'react-intl';
class LeftRightContainer extends React.Component {
  render() {
    const {
      classes,
      leftContent,
      rightContent
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          {intl.formatMessage({ defaultMessage: "leftContent"})}
        </div>
        <div className={classes.right}>
          {intl.formatMessage({ defaultMessage: "rightContent"})}
        </div>
      </div>
    )
  }
};

LeftRightContainer.propTypes = {
  leftContent: PropTypes.object.isRequired,
  rightContent: PropTypes.object.isRequired
};
export default injectIntl (withStyles(leftRightContainerStyle)(LeftRightContainer)) ;
