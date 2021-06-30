import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import controllerContainerStyle from "assets/jss/material-dashboard-pro-react/components/controllerContainerStyle.jsx"

class ControllerContainer extends React.Component {
  render() {
    const {
      topContent,
      bottomContent
    } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          {topContent}
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          {bottomContent}
        </GridItem>
      </GridContainer>
    )
  }
};

ControllerContainer.propTypes = {
};
export default withStyles(controllerContainerStyle)(ControllerContainer);
