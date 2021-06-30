import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { injectIntl } from 'react-intl';
import formContainerStyle from "assets/jss/material-dashboard-pro-react/components/formContainerStyle.jsx"

class FormContainer extends React.Component {
  render() {
    const {
      classes,
      formLabel,
      formControl,
      formContainerClassName,
      labelClassName,
      formControlCustomClassName
    } = this.props;
    const intl = this.props.intl;
    let formContainerClasses;
    if (formContainerClassName !== undefined) {
      formContainerClasses = classNames(
        formContainerClassName,
        classes.formContainer
      );
    } else {
      formContainerClasses = classes.formContainer;
    }
    let labelClasses;
    if (labelClassName !== undefined) {
      labelClasses = classNames(
        labelClassName,
        classes.label
      );
    } else {
      labelClasses = classes.label;
    }
    let formControlCustomClasses;
    if (formControlCustomClassName !== undefined){
      formControlCustomClasses = formControlCustomClassName
    } else {
      formControlCustomClasses = classes.formControlCustom
    }
    return (
      <div className={formContainerClasses}>
        <InputLabel className={labelClasses}>{intl.formatMessage({ defaultMessage: "formLabel"})}</InputLabel>
        <FormControl classes={{
          root: formControlCustomClasses
        }} fullWidth>
          {intl.formatMessage({ defaultMessage: "formControl"})}
        </FormControl>
      </div>
    )
  }
};

FormContainer.propTypes = {
};
export default injectIntl (withStyles(formContainerStyle)(FormContainer)) ;
