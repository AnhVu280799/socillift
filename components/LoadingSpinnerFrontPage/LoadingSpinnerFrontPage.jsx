import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import MdiIcon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { withStyles } from "@material-ui/core";

import styles from "./styles";

const LoadingSpinnerFrontPage = ({ className, classes }) => {
  return (
    <div className={clsx(classes.root, className)}>
      <MdiIcon path={mdiLoading} size="32px" color="#b4b4b4" spin />
    </div>
  );
};

LoadingSpinnerFrontPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "LoadingSpinnerFrontPage" })(
  LoadingSpinnerFrontPage
);
