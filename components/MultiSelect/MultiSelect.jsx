import React from 'react';
import Select, { components } from 'react-select';
import { withStyles, Icon, Paper } from '@material-ui/core';
import cx from 'clsx';
import Scrollbar from 'react-perfect-scrollbar';
import { injectIntl } from 'react-intl';
import style from 'assets/jss/material-dashboard-pro-react/components/MultiSelectStyle.js';

const ClearIndicator = props => {
  const {
    innerProps: { ref, ...restInnerProps },
    selectProps: {
      classes: { ClearIndicator }
    }
  } = props;
  const intl = props.intl;

  return (
    <div {...restInnerProps} ref={ref} className={ClearIndicator}>
      {intl.formatMessage({ defaultMessage: "Clear alld"})}
    </div>
  );
};

const Input = props => {
  return (
    <div id="multiselect-child-input">
      <components.Input {...props} />
    </div>
  );
};

const Placeholder = props => {
  const {
    selectProps: {
      classes: { Placeholder }
    }
  } = props;

  return <components.Placeholder {...props} className={Placeholder} />;
};

const IndicatorsContainer = props => {
  const {
    selectProps: {
      classes: { IndicatorsContainer }
    }
  } = props;
  return (
    <components.IndicatorsContainer
      {...props}
      className={IndicatorsContainer}
    />
  );
};

const DropdownIndicator = props => {
  const {
    isFocused,
    selectProps: {
      classes: { DropdownIndicator, DropdownIndicatorFocus }
    }
  } = props;
  return (
    <div
      className={cx(DropdownIndicator, { [DropdownIndicatorFocus]: isFocused })}
    />
  );
};

const Control = ({ children, ...props }) => {
  const {
    selectProps: {
      classes: { Control }
    }
  } = props;
  return (
    <components.Control {...props} className={Control}>
      {children}
    </components.Control>
  );
};

class ValueContainer extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const {
      selectProps: {
        classes: {
          ValueContainerContainer,
          ValueContainer,
          ValueContainerHasValue
        }
      },
      hasValue
    } = props;

    return (
      <div className={ValueContainerContainer}>
        <components.ValueContainer
          {...props}
          className={cx(ValueContainer, { [ValueContainerHasValue]: hasValue })}
        >
          {children}
        </components.ValueContainer>
      </div>
    );
  }
}

const MultiValueContainer = props => {
  const {
    selectProps: {
      classes: { MultiValueContainer }
    }
  } = props;

  return (
    <div className={MultiValueContainer}>
      <components.MultiValueContainer {...props} />
    </div>
  );
};

const MultiValueLabel = props => {
  const {
    selectProps: {
      classes: { MultiValueLabel }
    }
  } = props;

  return (
    <div className={MultiValueLabel}>
      <components.MultiValueLabel {...props} />
    </div>
  );
};

const Option = props => {
  const {
    isFocused,
    selectProps: {
      classes: { Option, CustomOption }
    }
  } = props;

  return (
    // <components.Option {...props} className={Option} />
    isFocused ? (
      <components.Option {...props} className={CustomOption} />
    ) : (
      <components.Option {...props} className={Option} />
    )
  );
};

const MultiValueRemove = props => {
  const {
    selectProps: {
      classes: { MultiValueRemove, MultiValueRemoveIcon }
    }
  } = props;

  return (
    <div className={MultiValueRemove}>
      <components.MultiValueRemove {...props}>
        <Icon className={MultiValueRemoveIcon}>close</Icon>
      </components.MultiValueRemove>
    </div>
  );
};

class Menu extends React.Component {
  render() {
    const {
      innerProps,
      children,
      selectProps: {
        classes: { Menu }
      }
    } = this.props;

    return <Paper className={Menu} {...innerProps} children={children} />;
  }
}

const MenuList = props => {
  const {
    selectProps: {
      classes: { MenuList }
    }
  } = props;

  return (
    // <Scrollbar
    //   options={{ suppressScrollX: true /*, wheelPropagation: false */ }}
    //   className={MenuList}
    // >
    //   {props.children}
    // </Scrollbar>
    <components.MenuList {...props} className={MenuList}>
      {props.children}
    </components.MenuList>
  );
};

class MultiSelect extends React.Component {
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      options,
      isMulti,
      classes,
      placeholder,
      ...rest
    } = this.props;

    return (
      <div
        onWheel={e => {
          e.stopPropagation();
        }}
      >
        <Select
          options={options}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isMulti={isMulti}
          components={{
            IndicatorsContainer,
            ValueContainer,
            Control,
            ClearIndicator,
            IndicatorSeparator: null,
            DropdownIndicator,
            MultiValueContainer,
            MultiValueLabel,
            MultiValueRemove,
            Placeholder,
            Input,
            Menu,
            MenuList,
            Option
          }}
          styles={{
            input: (base, state) => ({
              fontSize: '14px',
              fontFamily: 'Nunito'
            })
          }}
          classes={classes}
          placeholder={placeholder}
          captureMenuScroll={false}
          menuShouldBlockScroll
          {...rest}
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(style, { name: 'MultiSelect' })(MultiSelect));
