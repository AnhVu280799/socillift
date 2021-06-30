import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { updateUserInfo } from "redux/user/profile/actions";
import { dispatchNotification } from "reducers/NotificationReducer";
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import FormHelper from "helpers/form-helper";

import styles from "./styles";

class PersonalInformationCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const  {errors} = props;
    const intl = props.intl;
    const requiredFields = [intl.formatMessage({ defaultMessage: "name"}), intl.formatMessage({ defaultMessage: "company"})];

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: "Required"});
      }
    });

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

    return errors;
  }

  handleSubmit = values => {
    const data = {
      name: values.name.trim(),
      company: values.company.trim(),
      position: (values.position || '').trim()
    };

    this.props.updateUserInfo(data).then(() => {
      const { success, message } = this.props;
      const intl = this.props.intl;
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
    const {
      classes,
      pristine,
      submitting,
      handleSubmit,
      avatar,
      name,
      email
    } = this.props;
    const intl = this.props.intl;
    return (
      <Card className={classes.root}>
        <CardHeader title={intl.formatMessage({ defaultMessage: "Personal Information"})} />
        <CardContent className={classes.cardContent}>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            <Grid container direction="column" spacing={16}>
              <Grid item md>
                <div className={classes.avatarWrapper}>
                  <Avatar
                    className={classes.avatar}
                    src={avatar}
                    alt={intl.formatMessage({ defaultMessage:  `Avatar of {name}.`} ,{name : name})}
                  />
                  <div className={classes.avatarDescription}>
                    <Typography>
                    {intl.formatMessage({ defaultMessage: " We use the avatar you set for"})}{" "}
                      <span className={classes.emailText}>{email}</span> {intl.formatMessage({ defaultMessage: "on"})}
                      {intl.formatMessage({ defaultMessage: " Gravatar."})}
                    </Typography>
                    <a
                      rel="noopener noreferrer"
                      href="https://gravatar.com/emails"
                      target="_blank"
                    >
                     {intl.formatMessage({ defaultMessage: " Update your gravatar"})} &raquo;
                    </a>
                  </div>
                </div>
              </Grid>
              <Grid item md>
                <Field
                  name="name"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Name"})}
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
                  name="email"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Email"})}
                  disabled
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md>
                <Field
                  name="phone"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Phone"})}
                  disabled
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md>
                <Field
                  name="company"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Company"})}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md>
                <Field
                  name="position"
                  component={FormHelper.textField}
                  label={intl.formatMessage({ defaultMessage: "Position"})}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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

const mapStateToProps = ({ user: { profile } }) => {
  const { name, email, phone, company, position } = profile;

  return {
    ...profile,
    initialValues: {
      name,
      email,
      phone,
      company,
      position
    }
  };
};

const mapDispatchToProps = {
  updateUserInfo,
  dispatchNotification
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "UserInfoEditForm",
      validate: PersonalInformationCard.validate,
      enableReinitialize: true
    }),
    withStyles(styles, { name: "PersonalInformationCard" })
  )(PersonalInformationCard)
) ;
