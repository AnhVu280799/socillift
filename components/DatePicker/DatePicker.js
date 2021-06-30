import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NativeSelect from '@material-ui/core/NativeSelect';
import Select, { components } from 'react-select';
import DateTime from "react-datetime";
import { injectIntl } from 'react-intl';
// custom components
import FormContainer from "components/FormContainer";
import datePickerStyle from "assets/jss/material-dashboard-pro-react/components/datePickerStyle.jsx"

class DatePicker extends React.Component {
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
      ...rest
    } = this.props;
    const intl = this.props.intl;
    return (
      <FormContainer
        formLabel={intl.formatMessage({ defaultMessage: "formLabel"})}
        formControl={
          <DateTime
            // defaultValue={new Date()}
            className={classes.datePicker}
            dateFormat={intl.formatMessage({ defaultMessage:"MMM DD, YYYY"})}
            timeFormat={false}
            value={value}
            onChange={onChange}
            inputProps={{ 
              input:false,
              placeholder: placeholder,
              className: classes.inputDatePicker
            }}
            {...rest}
            />
        }
        formControlProp={formControlProp}
        formContainerClassName={formContainerClassName}
        labelClassName={labelClassName}
      />
    )
  }
};

FormContainer.propTypes = {
};
export default injectIntl(withStyles(datePickerStyle)(DatePicker));
