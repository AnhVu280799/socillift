import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles, Chip, Tooltip, Typography } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import ErrorIcon from "@material-ui/icons/Error";

import styles from "./styles";

const FileInfoChip = ({ classes, fileName, variant, error }) => {
  let otherProps = {};

  if (variant === "invalid" && !!error) {
    otherProps = {
      deleteIcon: (
        <Tooltip title={error} classes={{ tooltip: classes.invalid }}>
          <ErrorIcon />
        </Tooltip>
      ),
      onDelete: () => {}
    };
  }

  return (
    <Chip
      classes={{
        root: clsx(
          classes.root,
          variant === "valid" && classes.valid,
          variant === "invalid" && classes.invalid
        ),
        label: classes.label,
        icon: clsx(
          classes.icon,
          variant === "valid" && classes.valid,
          variant === "invalid" && classes.invalid
        ),
        deleteIcon: clsx(
          classes.deleteIcon,
          classes.errorIcon,
          variant === "invalid" && classes.invalid
        )
      }}
      icon={<DescriptionIcon />}
      label={
        <Tooltip title={fileName}>
          <Typography variant="inherit">{fileName}</Typography>
        </Tooltip>
      }
      {...otherProps}
    />
  );
};

FileInfoChip.propTypes = {
  classes: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "valid", "invalid"]),
  error: PropTypes.string
};

export default withStyles(styles, { name: "FileInfoChip" })(FileInfoChip);
