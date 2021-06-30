import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import buttonNavStyle from "assets/jss/material-dashboard-pro-react/components/buttonNavStyle.jsx";

class ButtonNav extends React.Component {
  render() {
    const { onClickViewList, onClickViewTable , onClickSort, 
            activeViewList, activeViewTable, activeSort, classes } = this.props;

    // TODO: add logic active button
    const buttonViewList = cx(classes.button, { [classes.buttonActive]: activeSort })
    const iconViewList = cx(classes.buttonIcon, { [classes.active]: activeSort })
    const buttonViewTable = cx(classes.button, { [classes.buttonActive]: activeSort })
    const iconViewTable = cx(classes.buttonIcon, { [classes.active]: activeSort })
    const buttonSort = cx(classes.button, { [classes.buttonActive]: activeSort })
    const iconSort = cx(classes.buttonIcon, { [classes.active]: activeSort })
    return (<div>
      {/* <Button variant="fab" className={classes.button} onClick={onClickViewList}>
        <Icon className={buttonClass}>view_list</Icon>
      </Button>
      <Button variant="fab" className={classes.button} onClick={onClickViewTable}>
        <Icon className={buttonClass}>view_module</Icon>
      </Button> */}
      <Button variant="fab" className={buttonSort} onClick={onClickSort}>
        <Icon className={iconSort}>filter_list</Icon>
      </Button>
      </div>)
  }
};

ButtonNav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(buttonNavStyle)(ButtonNav);
