import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles, Checkbox, Icon } from '@material-ui/core';

import { parseNumber } from 'utils';
import { injectIntl } from 'react-intl';
import styles from './styles';

class SelectAllCheckBox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    selectedCount: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool
  };

  handleChange = e => {
    this.props.onChange(e.target.checked);
  };

  render() {
    const {
      classes,
      className,
      checked,
      selectedCount,
      disabled,
      indeterminate
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={clsx(classes.root, className)}>
        <Checkbox
          className={classes.checkbox}
          classes={{
            indeterminate: classes.checked
          }}
          value="checkedF"
          color="primary"
          checked={checked}
          onChange={this.handleChange}
          indeterminate={indeterminate && checked}
          disabled={disabled}
        />
        <span className={classes.selectString}>
          {checked && selectedCount > 0
            ? `${intl.formatMessage({ defaultMessage: "Un-Select all"})} $ (${parseNumber(selectedCount)})`
            : intl.formatMessage({ defaultMessage: 'Select all'})}
        </span>
      </div>
    );
  }
}

export default injectIntl (
  withStyles(styles, { name: 'SelectAllCheckBox' })(
    SelectAllCheckBox
  )
);
