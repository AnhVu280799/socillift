import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Scrollbar from 'react-perfect-scrollbar';

import { withStyles } from '@material-ui/core';

import ChipFilter from 'components/FilterChip';
import { injectIntl } from 'react-intl';
import styles from './styles';

class FilterChips extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    onRemove: PropTypes.func,
    onClear: PropTypes.func
  };

  ignoreKeys = [
    'platform',
    'page_size',
    'page_index',
    'sort_type',
    'sort_field'
  ];

  handleRemoveItem = (filterKey, index) => e => {
    if (this.props.onRemove) this.props.onRemove(filterKey, index);
  };

  handleClearAllItems = () => {
    if (this.props.onClear) this.props.onClear();
  };

  render() {
    const { classes, className, items } = this.props;
    const intl = this.props.intl;

    const elmArr = items.reduce((arr, { key, displayKey, displayValue }) => {
      const [filterKey] = key;

      if (this.ignoreKeys.includes(filterKey)) return arr;

      const elements = displayValue.map((label, index) => (
        <ChipFilter
          key={`${filterKey}-${index}`}
          label={`${displayKey}${label}`}
          onRemove={this.handleRemoveItem(filterKey, index)}
        />
      ));

      arr.push(...elements);

      return arr;
    }, []);

    if (!elmArr.length) return null;

    elmArr.push(
      <ChipFilter
        key="clearAll"
        label={intl.formatMessage({ defaultMessage: "Clear all"})}
        onClick={this.handleClearAllItems}
        clearAll
      />
    );

    return (
      <>
        <Scrollbar
          className={clsx(classes.root, className)}
          option={{
            suppressScrollX: true,
            wheelPropagation: true
          }}
        >
          {intl.formatMessage({ defaultMessage: "elmArr"})}
        </Scrollbar>
        <div className={classes.line} />
      </>
    );
  }
}

export default injectIntl(withStyles(styles, { name: 'FilterChips' })(FilterChips));
