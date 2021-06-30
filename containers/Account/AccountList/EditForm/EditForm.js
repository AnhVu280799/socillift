import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { fetchDropdownRoles } from "redux/role";
import { createUser, updateUser, closeUserEditForm } from "redux/user";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { dispatchNotification } from "reducers/NotificationReducer";

import { withStyles, Grid, FormControlLabel, Switch } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EditIcon from "@material-ui/icons/Edit";
import { injectIntl } from 'react-intl';
import TypingSelect from "components/TypingSelect";
import Button from "components/CustomButtons/ButtonInf";
import TextField from "components/TextInput";

import FormHelper from "helpers/form-helper";

import styles from "./styles";

class AccountEditForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChangeTitle: PropTypes.func,
    onClose: PropTypes.func
  };

  static validate(values, props) {
    const { isEdit } = props;
    const intl = props.intl;  
    const errors = {};

    const requiredFields = ["name", "email", "role", "phone"];

    if (!isEdit) {
      requiredFields.push("password");
    }

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: "Required"});
      }
    });

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = intl.formatMessage({ defaultMessage: "Invalid email address"});
    }

    if (
      values.phone &&
      !/^[+]{0,1}?([0-9]{10,11})$/.test(
        values.phone
      )
    ) {
      errors.phone = intl.formatMessage({ defaultMessage: "Invalid phone number"});
    }

    if (!!values.password && values.password !== values.confirmPassword) {
      errors.confirmPassword = intl.formatMessage({ defaultMessage: "Re-type password not match."});
    }

    const minLength = (field, value) => {
      if (values[field] && values[field].length < value) {
        errors[field] = intl.formatMessage({ defaultMessage:  `Must be at least {value} characters`} ,{value : value});
      }
    };

    const maxLength = (field, value) => {
      if (values[field] && values[field].length > value) {
        errors[field] = intl.formatMessage({ defaultMessage:  `Must be less than {value} characters`} ,{value : value});
      }
    };

    minLength("name", 2);
    maxLength("name", 100);
    minLength("company", 2);
    maxLength("company", 100);
    minLength("position", 2);
    maxLength("position", 100);

    if (!!values.password) {
      minLength("password", 6);
      maxLength("password", 20);
    }

    return errors;
  }

  get formTitle() {
    return this.props.isEdit ? intl.formatMessage({ defaultMessage: `Edit Account`}) : intl.formatMessage({ defaultMessage: "Add New Account"});
  }

  componentDidMount() {
    if (this.props.onChangeTitle) {
      this.props.onChangeTitle(this.formTitle);
    }

    if (!this.props.dropdownRoles || !this.props.dropdownRoles.length) {
      this.props.fetchDropdownRoles();
    }
  }

  notify(user) {
    const { isEdit, dispatchNotification } = this.props;

    const intl = this.props.intl;
    let params = { open: true };

    if (isEdit) {
      params.icon = EditIcon;
      params.message = `User ${user.name} <${user.email}> was updated successfully!`;
    } else {
      params.icon = AddAlertIcon;
      params.message = `${intl.formatMessage({ defaultMessage: "User"})} ${user.name} <${user.email}>  ${intl.formatMessage({ defaultMessage: "was created successfully!"})}`;
    }

    dispatchNotification(params);
  }

  notifyError(error) {
    const { isEdit, dispatchNotification } = this.props;
    const intl = this.props.intl;
    let params = { open: true, color: "danger", message: error.message };

    if (isEdit) {
      params.icon = EditIcon;
    } else {
      params.icon = AddAlertIcon;
    }

    dispatchNotification(params);
  }

  handleSubmit = values => {
    const {
      isEdit,
      openLoading,
      createUser,
      updateUser,
      onFetchData,
      closeLoading,
      closeUserEditForm
    } = this.props;

    openLoading();

    let action = isEdit ? updateUser : createUser;

    action(values)
      .then(user => {
        closeUserEditForm();
        onFetchData().then(() => {
          this.notify(user);
        });
      })
      .catch(error => {
        closeLoading();
        this.notifyError(error);
      });
  };

  renderTextField({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) {
    return (
      <TextField
        formLabel={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        textFieldProp={{ ...custom }}
      />
    );
  }

  renderSelectField = ({
    input,
    label,
    meta: { touched, invalid, error },
    placeholder,
    options,
    required,
    ...custom
  }) => {
    const { classes } = this.props;

    if (!options) options = [];

    return (
      <TypingSelect
        textFieldProps={{
          required,
          label,
          value: input.value,
          error: touched && invalid,
          helperText: touched && error,
          InputLabelProps: {
            shrink: true,
            className: classes.typingSelectLabel
          }
        }}
        placeholder={placeholder || ""}
        options={options}
        errorText={touched && error}
        value={options.filter(elm => elm.value === input.value)}
        onChange={({ value }) => {
          input.onChange(value);
        }}
        {...custom}
      />
    );
  };

  renderSwitch({
    label,
    input,
    meta: { touched, invalid, error },
    value,
    ...custom
  }) {
    return (
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={!!input.value}
            onChange={event => {
              input.onChange(event.target.checked);
            }}
            value={value}
          />
        }
        label={label}
      />
    );
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      dropdownRoles,
      isEdit,
      onClose
    } = this.props;
    const intl = this.props.intl;
    return (
      <form
        className={classes.root}
        onSubmit={handleSubmit(this.handleSubmit)}
        autoComplete="off"
      >
        <Grid container>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              required
              name="name"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Name *"})}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              required
              type={intl.formatMessage({ defaultMessage: "email"})}
              name="email"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Email *"})}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              required
              name="role"
              component={this.renderSelectField}
              label={intl.formatMessage({ defaultMessage: "Role"})}
              options={dropdownRoles}
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              required
              name="phone"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Phone *"})}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              name="company"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Company"})}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              name="position"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Position"})}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              name="isActive"
              component={this.renderSwitch}
              label={intl.formatMessage({ defaultMessage: "Active"})}
              value={intl.formatMessage({ defaultMessage: "active"})}
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              name="isPhoneNumberVerified"
              component={this.renderSwitch}
              label={intl.formatMessage({ defaultMessage: "Phone Number Verified"})}
              value={intl.formatMessage({ defaultMessage: "isPhoneNumberVerified"})}
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              type={intl.formatMessage({ defaultMessage: "password"})}
              required={!isEdit}
              name="password"
              component={FormHelper.oldTextField}
              label={`${intl.formatMessage({ defaultMessage: "Password"})} ${isEdit ? "" : "*"}`}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              type={intl.formatMessage({ defaultMessage: "password"})}
              required={!isEdit}
              name="confirmPassword"
              component={FormHelper.oldTextField}
              label={`${intl.formatMessage({ defaultMessage: "Re-type Password"})} ${isEdit ? "" : "*"}`}
              fullWidth
            />
          </Grid>
          <Grid className={classes.buttonGroup} item xs={12} container>
            {onClose && (
              <div className={classes.buttonBack} onClick={onClose}>
               {intl.formatMessage({ defaultMessage: "Cancel"})} 
              </div>
            )}
            <Button
              type={intl.formatMessage({ defaultMessage: "submit"})}
              color="primary"
              className={classes.buttonSave}
              disabled={pristine || submitting}
            >
              {isEdit ? intl.formatMessage({ defaultMessage: "Edit"}) : intl.formatMessage({ defaultMessage: "Create"})}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = ({ user: { editForm }, role: { dropdown } }) => ({
  isEdit: editForm.isEdit,
  initialValues: editForm.data,
  dropdownRoles: dropdown.items.map(({ id, name }) => ({
    label: name,
    value: id
  }))
});

const mapDispatchToProps = {
  fetchDropdownRoles,
  createUser,
  updateUser,
  openLoading,
  closeLoading,
  closeUserEditForm,
  dispatchNotification
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "AccountEditForm",
      validate: AccountEditForm.validate
    }),
    withStyles(styles, { name: "AccountEditForm" })
  )(AccountEditForm)
) ;
