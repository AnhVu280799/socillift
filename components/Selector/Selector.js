import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NativeSelect from '@material-ui/core/NativeSelect';
import Select, { components } from 'react-select';

// custom components
import FormContainer from "components/FormContainer";
import TypingSelect from "components/TypingSelect";
import selectorStyle from "assets/jss/material-dashboard-pro-react/components/selectorStyle.jsx"
import classNames from "classnames";

class Selector extends React.Component {
  render() {
    const {
      classes,
      formLabel,
      formControlProp,
      placeholder,
      options,
      value,
      onChange,
      formContainerClassName,
      labelClassName,
      formControlCustomClassName,
      typingSelectClassName,
      isDisabledSelect,
      ...rest
    } = this.props;
    let formContainerClasses;
    if (formContainerClassName !== undefined) {
      formContainerClasses = classNames(
        formContainerClassName,
        classes.formContainer
      );
    } else {
      formContainerClasses = classes.formContainer;
    }
    let typingSelectClasses;
    if (typingSelectClassName !== undefined){
      typingSelectClasses = typingSelectClassName
    } else {
      typingSelectClasses = classes.typingSelect
    }
    return (
      <FormContainer
        formLabel={formLabel}
        formControl={
          <TypingSelect
            classes={{ container: typingSelectClasses }}
            options={options}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isDisabled={isDisabledSelect}
            {...rest}
          />
        }
        formControlProp={formControlProp}
        formContainerClassName={formContainerClasses}
        labelClassName={labelClassName}
        formControlCustomClassName={formControlCustomClassName}
      />
    )
  }
};

FormContainer.propTypes = {
};
export default withStyles(selectorStyle)(Selector);
