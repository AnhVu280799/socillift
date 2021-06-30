import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, stopSubmit } from "redux-form";
import { updateUserPassword } from "redux/user/profile/actions";
import { dispatchNotification } from "reducers/NotificationReducer";
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import FormHelper from "helpers/form-helper";

import styles from "./styles";

class ChangePasswordCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const  {errors}= props ;
    const intl = props.intl;

    const requiredFields = [intl.formatMessage({ defaultMessage: "currentPassword"}),intl.formatMessage({ defaultMessage: "newPassword"}) ];

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: "Required"});
      }
    });

    const minLength = (field, value) => {
      if (values[field] && values[field].length < value) {
        errors[field] = intl.formatMessage({ defaultMessage:  `Must be at least{value} characters`} ,{value : value});
      }
    };

    const maxLength = (field, value) => {
      if (values[field] && values[field].length > value) {
        errors[field] = intl.formatMessage({ defaultMessage:  `Must be less than {value} characters`} ,{value : value});
      }
    };

    if (!!values.newPassword) {
      minLength(intl.formatMessage({ defaultMessage: "newPassword"}), 6);
      maxLength(intl.formatMessage({ defaultMessage: "newPassword"}), 20);
    }

    if (!!values.newPassword && values.newPassword !== values.retypePassword) {
      errors.retypePassword = intl.formatMessage({ defaultMessage: "Re-type password not match."});
    }

    return errors;
  }

  handleSubmit = values => {
    const data = {
      currentPassword: values.currentPassword.trim(),
      newPassword: values.newPassword.trim()
    };

    this.props.updateUserPassword(data).then(() => {
      const { success, message, requestError: error } = this.props;
      const intl = this.props.intl;
      if (success) {
        this.props.reset(intl.formatMessage({ defaultMessage: "ChangePasswordForm"}));
      } else {
        if (
          error.code &&
          error.code === 400 &&
          error.data.message === "Your current password does not match."
        ) {
          this.props.dispatch(
            stopSubmit(intl.formatMessage({ defaultMessage: "ChangePasswordForm"}), {
              currentPassword: error.data.message
            })
          );
        }
      }

      this.props.dispatchNotification(
        {
          open: true,
          icon: EditIcon,
          message,
          color: !success ? "danger" : undefined
        },
        2000
      );
    });
  };

  render() {
    const { classes, pristine, submitting, handleSubmit } = this.props;
    const intl = this.props.intl;
    return (
      <Card className={classes.root}>
        <CardHeader title={intl.formatMessage({ defaultMessage: "Change Password"})} />
        <CardContent className={classes.cardContent}>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            <Grid container direction="column" spacing={16}>
              <Grid item md>
                <Field
                  type="password"
                  name="currentPassword"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Current Password"})}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 100
                  }}
                />
              </Grid>
              <Grid item md>
                <Field
                  type="password"
                  name="newPassword"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "New Password"})}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 100
                  }}
                />
              </Grid>
              <Grid item md>
                <Field
                  type="password"
                  name="retypePassword"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Retype Password"})}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 100
                  }}
                />
              </Grid>
              <Grid item md>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  {intl.formatMessage({ defaultMessage: "Save"})}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  ...user.profile,
  requestError: user.profile.error
});

const mapDispatchToProps = {
  updateUserPassword,
  dispatchNotification,
  stopSubmit
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "ChangePasswordForm",
    validate: ChangePasswordCard.validate,
    enableReinitialize: true
  }),
  withStyles(styles, { name: "ChangePasswordCard" })
)(ChangePasswordCard)) ;
