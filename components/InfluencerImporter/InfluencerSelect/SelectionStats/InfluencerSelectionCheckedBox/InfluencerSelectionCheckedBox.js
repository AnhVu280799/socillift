import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _ from "lodash";

import { withStyles, Tooltip, Typography, Checkbox } from "@material-ui/core";

import { parseKMB } from "utils";

import styles from "./styles";

const InfluencerSelectionCheckedBox = ({
  classes,
  variant,
  label,
  number,
  checked,
  onChange
}) => {
  const classSuffix = ["approved", "rejected", "unavailable"].includes(variant)
    ? _.upperFirst(variant)
    : "Default";

  return (
    <div className={clsx(classes.root, classes[`bg${classSuffix}`])}>
      <Tooltip title={Intl.NumberFormat("en-US").format(number)}>
        <Typography
          variant="inherit"
          className={clsx(classes.textBold, classes[`text${classSuffix}`])}
        >
          {parseKMB(number)}
        </Typography>
      </Tooltip>
      <Typography className={classes.text}>{label}</Typography>
      <Checkbox
        color="primary"
        className={classes.last}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
    </div>
  );
};

InfluencerSelectionCheckedBox.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["default", "approved", "rejected", "unavailable"]),
  label: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool
};

InfluencerSelectionCheckedBox.defaultProps = {
  variant: "default"
};

export default withStyles(styles, { name: "InfluencerSelectionCheckedBox" })(
  InfluencerSelectionCheckedBox
);
