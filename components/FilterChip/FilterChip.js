import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles, Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { injectIntl } from 'react-intl';
import styles from "./styles";

class FilterChip extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    clearAll: PropTypes.bool,
    onRemove: PropTypes.func,
    onClick: PropTypes.func
  };

  handleRemove = e => {
    if (this.props.onRemove) this.props.onRemove();
  };

  handleClick = e => {
    if (this.props.onClick) this.props.onClick(e);
  };

  render() {
    const { classes, className, label, clearAll } = this.props;
    const intl = this.props.intl;
    let otherProps = {};

    if (!clearAll) {
      otherProps = {
        deleteIcon: <CloseIcon className={classes.deleteIcon} />,
        onDelete: this.handleRemove
      };
    }

    return (
      <Chip
        className={clsx({
          [classes.root]: true,
          [classes.clearAll]: clearAll
        })}
        classes={{
          label: classes.label
        }}
        label={<span title={intl.formatMessage({ defaultMessage: "label"})}>{intl.formatMessage({ defaultMessage: "label"})}</span>}
        onClick={this.handleClick}
        {...otherProps}
      />
    );
  }
}

export default injectIntl (withStyles(styles, { name: "FilterChip" })(FilterChip));
