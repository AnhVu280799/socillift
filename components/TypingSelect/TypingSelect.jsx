/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Select, { components } from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/typingSelectStyle.jsx";

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        },
        className: props.selectProps.classes.TextField,
        classes: { underline: props.selectProps.classes.inputUnderline }
      }}
      disabled={props.isDisabled}
      {...props.selectProps.textFieldProps}
    />
  );
}

const Option = props => {
  const {
    isFocused,
    isSelected,
    selectProps: {
      classes: { Option, OptionSelected, CustomOption }
    }
  } = props;
  return isFocused ? (
    <components.Option {...props} className={CustomOption} />
  ) : (
    <components.Option
      {...props}
      className={cx(Option, {
        [OptionSelected]: isSelected
      })}
    />
  );
};

function Placeholder(props) {
  return (
    <span
      className={cx(props.selectProps.classes.singleValue, {
        [props.selectProps.classes.singleValueDisabled]:
          props.isDisabled === true
      })}
      {...props.innerProps}
    >
      {props.children}
    </span>
  );
}

function SingleValue(props) {
  return (
    <span
      className={cx(props.selectProps.classes.singleValue, {
        [props.selectProps.classes.singleValueDisabled]:
          props.isDisabled === true
      })}
      {...props.innerProps}
    >
      {props.children}
    </span>
  );
}

function ValueContainer(props) {
  return (
    <div
      className={cx(props.selectProps.classes.valueContainer, {
        [props.selectProps.classes.nonSearchable]: !props.selectProps
          .isSearchable
      })}
    >
      {props.children}
    </div>
  );
}

const MenuList = props => {
  const {
    selectProps: {
      classes: { MenuList }
    }
  } = props;
  return (
    <components.MenuList {...props} className={MenuList}>
      {props.children}
    </components.MenuList>
  );
};
class MenuInner extends React.Component {
  componentDidMount() {
    // this.ps = new PerfectScrollbar(this.refs.main, {
    //     suppressScrollX: true,
    //     suppressScrollY: false,
    //     wheelPropagation: false
    // });
  }
  componentWillUnmount() {
    // this.ps.destroy();
    // this.ps = null;
  }
  componentDidUpdate() {
    // this.ps.update();
  }
  render() {
    const { children, ...rest } = this.props;
    return (
      <div ref="main" {...rest}>
        {children}
      </div>
    );
  }
}
const SelectContainer = ({ children, ...props }) => {
  const {
    selectProps: {
      classes: { container }
    }
  } = props;
  return (
    <components.SelectContainer {...props} className={container}>
      {children}
    </components.SelectContainer>
  );
};
class Menu extends React.Component {
  render() {
    const {
      innerProps,
      children,
      selectProps: {
        classes: { paper }
      }
    } = this.props;
    return (
      <Paper
        className={paper}
        {...innerProps}
        component={MenuInner}
        children={children}
      />
    );
  }
}
const DropdownIndicator = props => {
  const {
    selectProps: {
      classes: { DropdownIndicator }
    }
  } = pcops;
  const intl = pcops.intl;
  return <Icon className={DropdownIndicator}>{intl.formatMessage({ defaultMessage: "arrow_drop_down"})}</Icon>;
};
const customComponents = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  IndicatorSeparator: null,
  DropdownIndicator,
  MenuList,
  SelectContainer
};

const TypingSelect = ({ classes, theme, options, ...rest }) => {
  const selectStyles = {
    input: base => ({
      ...base,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <NoSsr>
      <Select
        classes={classes}
        styles={selectStyles}
        options={options}
        isDisabled={rest.isDisabled}
        components={customComponents}
        {...rest}
      />
    </NoSsr>
  );
};

TypingSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default injectIntl (withStyles(styles, { withTheme: true })(TypingSelect)) ;
