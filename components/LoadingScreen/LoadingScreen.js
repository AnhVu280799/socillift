import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import MdiIcon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "assets/jss/material-dashboard-pro-react/components/loadingScreenStyle.jsx";

export const LoadingScreen = ({
  classes,
  open,
  miniActive,
  signUp,
  modalActive
}) => {
  const containerClasses = cx(classes.container, {
    [classes.open]: open
  });

  const loadingIconClasses = cx(classes.loadingIcon, {
    [classes.minimized]: miniActive,
    [classes.signUp]: signUp,
    [classes.modalLoading]: modalActive
  });

  return (
    <div className={containerClasses}>
      <div className={loadingIconClasses}>
        <MdiIcon path={mdiLoading} size="48px" color="#b4b4b4" spin={1} />
      </div>
    </div>
  );
};
LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(LoadingScreen);
