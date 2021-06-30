import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

// custom components
import FormContainer from "components/FormContainer";

import textInputStyle from "assets/jss/material-dashboard-pro-react/components/textInputStyle.jsx";
import classNames from "classnames";

class TextInput extends React.Component {
  render() {
    const {
      classes,
      formLabel,
      textFieldProp,
      value,
      onChange,
      multiline,
      rows,
      last,
      disabled,
      focused,
      error,
      success,
      helperText,
      textFieldCustom
      // ...rest
    } = this.props;

    const classesFormContainer = cx(classes.formContainer, {
      [classes.lastItem]: last
    });

    let textFieldClass;
    if (textFieldCustom !== undefined) {
      textFieldClass = classNames(textFieldCustom, classes.textField);
    } else {
      textFieldClass = classes.textField;
    }

    return (
      <FormContainer
        className={classesFormContainer}
        formLabel={formLabel}
        formControl={
          <TextField
            InputProps={{
              className: textFieldClass,
              classes: {
                underline: classes.underline
              }
            }}
            inputProps={{
              className: classes.inputProp
            }}
            className={classes.textError}
            margin="normal"
            value={value}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            focused={focused}
            error={error}
            success={success}
            helperText={helperText}
            {...textFieldProp}
          />
        }
      />
    );
  }
}

FormContainer.propTypes = {
  disabled: PropTypes.bool
};
export default withStyles(textInputStyle)(TextInput);
