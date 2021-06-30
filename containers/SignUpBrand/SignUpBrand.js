import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';
import { dispatchNotification } from 'reducers/NotificationReducer';
import { register, closeDialog, resetState } from 'redux/auth/register/actions';
import { login } from 'redux/auth/login/actions';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';

import { withStyles, Grid, Hidden, Typography } from '@material-ui/core';
import AddAlert from '@material-ui/icons/AddAlert';

import IconCard from 'components/Cards/IconCard.jsx';
import Button from 'components/CustomButtons/ButtonInf.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import LoadingScreen from 'components/LoadingScreen';
import AlertModalDialog from 'components/AlertModalDialog';

import { options as sourceUserSignUp } from 'constants/sourceUserSignUp';

import FormElementsHelper from 'helpers/form-elements-helper';
import FormValidationHelper from 'helpers/form-validation-helper';

import styles from './styles';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { LOGO, RECAPTCHA_SITE_KEY, APP_NAME } from 'constants/common';

class SignUpBrandPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'password',
      'company',
      'captcha'
    ];

    const formValidation = new FormValidationHelper(values);

    formValidation.checkRequiredFields(requiredFields);
    formValidation.checkLengthBetween('name', 2, 100);
    formValidation.checkLengthBetween('password', 6, 20);
    formValidation.checkLengthBetween('company', 2, 100);
    formValidation.checkLengthBetween('position', 2, 100);
    formValidation.checkIsEmail('email');
    formValidation.checkIsPhoneNumber('phone');
    formValidation.checkReTypePasswordMatch('password', 'reTypePassword');

    return formValidation.getErrors();
  }

  captchaRef = React.createRef();

  componentDidMount() {
    this.props.resetState();
  }

  handleSubmit = ({
    name,
    email,
    phone,
    password,
    company,
    position,
    source,
    captcha
  }) => {
    const { register, dispatch, dispatchNotification } = this.props;
    const intl = this.props.intl;
    const payload = {
      name,
      email,
      phone,
      password,
      company,
      position,
      source,
      captcha
    };

    register(payload).then(() => {
      const { requestError: error } = this.props;

      if (error) {
        if (this.captchaRef && this.captchaRef.current) {
          this.captchaRef.current.reset();
        }

        const formName = 'SignUpBrandForm';

        if (error.code === 334) {
          dispatch(
            stopSubmit(formName, {
              email: intl.formatMessage({ defaultMessage: `That email is already in use, please try another!`})
            })
          );
        }

        if (error.code === 352) {
          dispatch(
            stopSubmit(formName, {
              phone: intl.formatMessage({ defaultMessage: `That phone number is already in use, please try another!`})
            })
          );
        }

        return;
      }

      const { email, password } = payload;

      this.setState({ email, password }, () => {
        dispatchNotification(
          {
            message: intl.formatMessage({ defaultMessage: `Sign up successfully`}),
            open: true,
            icon: AddAlert
          },
          1000
        );
      });
    });
  };

  handleCloseDialog = () => {
    const { closeDialog, login, history } = this.props;
    const intl = this.props.intl;
    const { email, password } = this.state;

    closeDialog();
    login(email, password).then(() => {
      history.replace(intl.formatMessage({ defaultMessage: '/verify-phone-number'}));
    });
  };

  renderLogo = () => {
    const { classes } = this.props;

    return (
      <div className={classes.logoWrapper}>
        <img src={LOGO} className={classes.logo} alt={intl.formatMessage({ defaultMessage: "Socialift Logo"})} />
      </div>
    );
  };

  renderForm = () => {
    const {
      classes,
      handleSubmit,
      pristine,
      loading,
      errorMessage,
      invalid
    } = this.props;
    const intl = this.props.intl;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} autoComplete="off">
        <Typography variant="inherit" className={classes.description}>
         {intl.formatMessage({ defaultMessage: " Please fill out information to request a demo account."})}
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="name"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Name"})}
              component={FormElementsHelper.OldTextField}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupLeft}>
            <Field
              type="email"
              name="email"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Email"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupRight}>
            <Field
              name="phone"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Phone"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupLeft}>
            <Field
              type="password"
              name="password"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Password"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupRight}>
            <Field
              type="password"
              name="reTypePassword"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Re-type Password"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupLeft}>
            <Field
              name="company"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Company"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formGroupRight}>
            <Field
              name="position"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Position (optional)"})}
              component={FormElementsHelper.OldTextField}
            />
          </Grid>
          <Grid item xs={12} className={classes.formGroupSource}>
            <Field
              name="source"
              label={intl.formatMessage({ defaultMessage: "How did you know us (optional)"})}
              component={FormElementsHelper.Selector}
              options={sourceUserSignUp}
              isSearchable={false}
              formContainerClassName={classes.inputSelectorField}
              labelClassName={classes.labelSelector}
            />
          </Grid>
          <Grid item xs={12} className={classes.formGroupCaptcha}>
            <Hidden xsDown>
              <Field
                captchaRef={this.captchaRef}
                name="captcha"
                component={FormElementsHelper.Captcha}
                sitekey={RECAPTCHA_SITE_KEY}
                hl="en"
                hideErrorMessage
              />
            </Hidden>
            <Hidden smUp>
              <Field
                captchaRef={this.captchaRef}
                name="captcha"
                component={FormElementsHelper.Captcha}
                sitekey={RECAPTCHA_SITE_KEY}
                hl="en"
                size="compact"
                hideErrorMessage
              />
            </Hidden>
          </Grid>
        </Grid>
        {errorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}
        <Grid className={classes.cardFooter} container>
          <Grid className={classes.signUpButtonWrapper} item xs={12} sm={6}>
            <Button
              type="submit"
              color="primary"
              className={classes.signUpButton}
              disabled={pristine || invalid || loading}
            >
              {intl.formatMessage({ defaultMessage: "Create Account"})}
            </Button>
          </Grid>
          <Grid className={classes.loginButtonWrapper} item xs={12} sm={6}>
            <div>{intl.formatMessage({ defaultMessage: "Have an account?"})}</div>
            <Link className={classes.requestLink} to="/sign-in">
              {intl.formatMessage({ defaultMessage: "SIGN IN"})}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  };

  renderDialog = () => {
    const { openDialog } = this.props;

    return (
      <AlertModalDialog
        open={openDialog}
        onCloseClick={this.handleCloseDialog}
        onClickButton={this.handleCloseDialog}
        content={
          <>
            {intl.formatMessage({ defaultMessage: "Nice to have you on board."})}
            <br />
            {intl.formatMessage({ defaultMessage: "Welcome to SociaLift."})}
            <br />
           {intl.formatMessage({ defaultMessage: " Please use Google Chrome browser for best experience"})}
          </>
        }
      />
    );
  };

  render() {
    const { classes, loading, notification } = this.props;

    return (
      <div className={classes.root}>
        <LoadingScreen open={loading} signUp={true} />
        <Scrollbar id="content" options={{ suppressScrollX: true }}>
          <div className={classes.content}>
            <IconCard
              classes={{ cardRoot: classes.cardRoot }}
              customCardClass={classes.customCard}
              customCardTitleClass={classes.cardTitle}
              customCardContentClass={classes.cardContent}
              title={this.renderLogo()}
              content={this.renderForm()}
            />
          </div>
        </Scrollbar>
        {this.renderDialog()}
        <Snackbar
          place={notification.place}
          color={notification.color}
          icon={notification.icon}
          message={notification.message}
          open={notification.open}
          closeNotification={notification.closeNotification}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  router: { location },
  auth: { register },
  notification
}) => {
  const query = queryString.parse(location.search);
  const initialValues = {};

  if (query.email) {
    initialValues.email = query.email;
  }

  return {
    ...register,
    initialValues,
    requestError: register.error,
    notification
  };
};

const mapDispatchToProps = {
  dispatchNotification,
  register,
  closeDialog,
  login,
  resetState
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'SignUpBrandForm',
      validate: SignUpBrandPage.validate
    }),
    withStyles(styles, { name: 'SignUpBrandPage' })
  )(SignUpBrandPage)
) ;
