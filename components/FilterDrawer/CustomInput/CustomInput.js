import React from "react";
import PropTypes from "prop-types";

import { withStyles, Input } from "@material-ui/core";

import styles from "./styles";

const CustomInput = ({ classes, ...props }) => {
  return <Input classes={classes} {...props} />;
};

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "CustomInput" })(CustomInput);
