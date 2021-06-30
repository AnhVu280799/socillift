import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit, change } from 'redux-form';
import { dispatchNotification } from 'reducers/NotificationReducer';
import { register, closeDialog, resetState } from 'redux/auth/register/actions';

import queryString from 'query-string';

import { withStyles, Grid, Hidden, Typography } from '@material-ui/core';
import AddAlert from '@material-ui/icons/AddAlert';
import { injectIntl } from 'react-intl';
import IconCard from 'components/Cards/IconCard.jsx';
import Button from 'components/CustomButtons/ButtonInf.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import LoadingScreen from 'components/LoadingScreen';
import AlertModalDialog from 'components/AlertModalDialog';
import DialogTermsAndServices from 'components/DialogTermsAndServices';

import { options as sourceUserSignUp } from 'constants/sourceUserSignUp';

import FormElementsHelper from 'helpers/form-elements-helper';
import FormValidationHelper from 'helpers/form-validation-helper';

import styles from './styles';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { LOGO, RECAPTCHA_SITE_KEY, APP_NAME } from 'constants/common';

class SignUpInfluencerPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'password',
      'youtubeURL',
      'captcha',
      'agreeWithTermsAndServices'
    ];

    const youtubeURLRegex = /^((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|user\/)([a-zA-Z0-9\-_]{1,})/;

    const formValidation = new FormValidationHelper(values);

    formValidation.checkRequiredFields(requiredFields);
    formValidation.checkLengthBetween('name', 2, 100);
    formValidation.checkLengthBetween('password', 6, 20);
    formValidation.checkIsEmail('email');
    formValidation.checkIsPhoneNumber('phone');
    formValidation.checkReTypePasswordMatch('password', 'reTypePassword');
    formValidation.checkIsYoutubeChannelURL('youtubeURL');

    return formValidation.getErrors();
  }

  state = {
    openDialogTermsAndServices: false
  };

  captchaRef = React.createRef();

  componentDidMount() {
    this.props.resetState();
  }

  handleSubmit = ({ name, email, phone, password, captcha, youtubeURL }) => {
    const { register, dispatch, dispatchNotification } = this.props;
    const intl = this.props.intl;
    const payload = {
      name,
      email,
      phone,
      password,
      captcha,
      type: 'influencer',
      platform: 'youtube',
      youtubeURL
    };

    register(payload).then(() => {
      const { requestError: error } = this.props;
      const intl = this.props.intl;
      if (error) {
        if (this.captchaRef && this.captchaRef.current) {
          this.captchaRef.current.reset();
        }

        const formName = 'SignUpInfluencerForm';

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

        if (
          error.code === 400 &&
          [
            intl.formatMessage({ defaultMessage: 'Invalid youtube channel URL'}),
            intl.formatMessage({ defaultMessage: 'This social account already linked to another user'}),
            intl.formatMessage({ defaultMessage: 'Youtube channel or user not found'})
          ].includes(error.message)
        ) {
          dispatch(
            stopSubmit(formName, {
              youtubeURL: error.message
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
    const { closeDialog, history } = this.props;
    const intl = this.props.intl;
    const { email, password } = this.state;

    closeDialog();
    history.replace('/sign-in');
  };

  handleOpenDialogTermsAndService = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ openDialogTermsAndServices: true });
  };

  handleCloseDialogTermsAndService = () => {
    this.setState({ openDialogTermsAndServices: false });
  };

  handleClickAgreeTermsAndService = () => {
    this.props.dispatch(
      change('SignUpInfluencerForm', 'agreeWithTermsAndServices', true)
    );
    this.handleCloseDialogTermsAndService();
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
         {intl.formatMessage({ defaultMessage: " Please fill out information to request a influencer account."})}
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
          <Grid item xs={12}>
            <Field
              name="youtubeURL"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Youtube channel URL"})}
              component={FormElementsHelper.OldTextField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="agreeWithTermsAndServices"
              label={
                <>
                {intl.formatMessage({ defaultMessage: "  I agree to the SociaLift"})}
                  <span
                    className={classes.buttonTermsAndServices}
                    onClick={this.handleOpenDialogTermsAndService}
                  >
                    {intl.formatMessage({ defaultMessage: "Terms and Conditions"})}
                  </span>
                  .
                </>
              }
              component={FormElementsHelper.Checkbox}
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
             {intl.formatMessage({ defaultMessage: " SIGN IN"})}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  };

  renderDialog = () => {
    const { openDialog } = this.props;
    const intl = this.props.intl;
    return (
      <AlertModalDialog
        open={openDialog}
        onCloseClick={this.handleCloseDialog}
        onClickButton={this.handleCloseDialog}
        content={
          <>
           {intl.formatMessage({ defaultMessage: " Nice to have you on board."})}
            <br />
            <br />
           {intl.formatMessage({ defaultMessage: " Your profile is being a reviewing process. Our Customer Service Team"})}
           {intl.formatMessage({ defaultMessage: "will contact"})}  & {intl.formatMessage({ defaultMessage: "send an invitation email in the next 24h if here is"})}
            {intl.formatMessage({ defaultMessage: "your own channel."})}
          </>
        }
      />
    );
  };

  render() {
    const { classes, loading, notification } = this.props;
    const intl = this.props.intl;
    const { openDialogTermsAndServices } = this.state;

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
        <DialogTermsAndServices
          open={openDialogTermsAndServices}
          onClose={this.handleCloseDialogTermsAndService}
          onCloseClick={this.handleCloseDialogTermsAndService}
          onButtonClick={this.handleClickAgreeTermsAndService}
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
  resetState
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'SignUpInfluencerForm',
      validate: SignUpInfluencerPage.validate
    }),
    withStyles(styles, { name: 'SignUpInfluencerPage' })
  )(SignUpInfluencerPage)
) ;
