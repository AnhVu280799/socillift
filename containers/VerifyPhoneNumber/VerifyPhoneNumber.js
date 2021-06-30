import React from "react";
import PropTypes from "prop-types";
import Scrollbar from "react-perfect-scrollbar";

import firebase from "firebase/app";
import "firebase/auth";
import { injectIntl } from 'react-intl';
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { dispatchNotification } from "reducers/NotificationReducer";
import {
  sendCode as sendVerifyCode,
  verifyCode,
  resetState,
  toggleResendButton,
  toggleVerifyButton,
  toggleSendButton,
  toggleLoading
} from "redux/user/verify-phone-number/actions";
import { fetchUserData } from "redux/user/profile/actions";

import { withStyles, Grid, Typography } from "@material-ui/core";
import AddAlert from "@material-ui/icons/AddAlert";

import IconCard from "components/Cards/IconCard.jsx";
import Button from "components/CustomButtons/ButtonInf.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import LoadingScreen from "components/LoadingScreen";
import CountDown from "components/CountDown";

import FormHelper from "helpers/form-helper";

import styles from "./styles";
import "react-perfect-scrollbar/dist/css/styles.css";

import { LOGO } from "constants/common";
import clsx from "clsx";

const FORM_NAME = "VerifyPhoneNumberForm";

class VerifyPhoneNumberPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const  {errors}= props;
    const intl = props.intl;

    let requiredFields = [];

    if (values.formAction !== "resendCode") {
      requiredFields = props.sentCode ? [intl.formatMessage({ defaultMessage: "code"})] : [intl.formatMessage({ defaultMessage: "phone"})];
    }

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: "Required"});
      }
    });

    if (
      values.phone &&
      !/^[+]{0,1}\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/.test(
        values.phone
      )
    ) {
      errors.phone = intl.formatMessage({ defaultMessage: "Invalid phone number"});
    }

    if (values.code && !/^\d{6}$/.test(values.code)) {
      errors.code = intl.formatMessage({ defaultMessage: "Invalid code"});
    }

    return errors;
  }

  submitButtonRef = React.createRef();
  captchaButtonRef = React.createRef();

  componentDidMount() {
    const { resetState, fetchUserData } = this.props;
    const intl = this.props.intl;
    this.initCaptcha();

    resetState();
    fetchUserData().then(() => {
      const { isPhoneNumberVerified, history } = this.props;

      if (isPhoneNumberVerified) {
        history.replace(intl.formatMessage({ defaultMessage: "/sign-in"}));
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sentCode !== this.props.sentCode) {
      this.props.reset();
      this.resetCaptcha();
    }
  }

  initCaptcha = () => {
    const { toggleSendButton, toggleLoading } = this.props;

    var firebaseConfig = {
      apiKey: intl.formatMessage({ defaultMessage: "AIzaSyAco6Cqfs3nZXORDsrSGhZgLgLZ9DL8VeM"}),
      authDomain: intl.formatMessage({ defaultMessage: "influencer-staging-248405.firebaseapp.com"}),
      projectId: intl.formatMessage({ defaultMessage: "influencer-staging-248405"})
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      intl.formatMessage({ defaultMessage: "get-captcha"}),
      {
        size: "invisible",
        hl: "en",
        callback: this.handleChangeCaptcha
      }
    );

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;

      toggleSendButton(true);
      toggleLoading(false);
    });
  };

  resetCaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.reset();
    }
  };

  handleChangeCaptcha = captcha => {
    this.props.dispatch(change(FORM_NAME, "captcha", captcha));

    if (!this.submitButtonRef || !this.submitButtonRef.current) return;

    this.submitButtonRef.current.click();
  };

  submitForm = action => () => {
    const { dispatch } = this.props;
    const intl = this.props.intl;
    dispatch(change(FORM_NAME, "formAction", action));

    if (!this.captchaButtonRef || !this.captchaButtonRef.current) return;

    this.captchaButtonRef.current.click();
  };

  handleSubmit = ({ phone, code, captcha, formAction }) => {
    const {
      sendVerifyCode,
      verifyCode,
      dispatchNotification,
      history,
      canSend,
      canResend,
      canVerify,
      dispatch
    } = this.props;
    const intl = this.props.intl;
    switch (formAction) {
      case "sendCode":
        if (!canSend) return;

        sendVerifyCode(phone, captcha).then(() => {
          const { requestError: error } = this.props;

          dispatchNotification(
            {
              message: error
                ? error.message
                : intl.formatMessage({ defaultMessage: `Verify code sent to your phone number.`}),
              open: true,
              icon: AddAlert,
              color: error ? intl.formatMessage({ defaultMessage: "danger"}) : intl.formatMessage({ defaultMessage: "success"})
            },
            5000
          );
        });
        break;

      case intl.formatMessage({ defaultMessage: "resendCode"}):
        if (!canResend) return;

        dispatch(change(FORM_NAME, "code", null));

        sendVerifyCode(phone, captcha).then(() => {
          const { requestError: error } = this.props;

          dispatchNotification(
            {
              message: error
                ? error.message
                : intl.formatMessage({ defaultMessage: `Verify code sent to your phone number.`}),
              open: true,
              icon: AddAlert,
              color: error ? intl.formatMessage({ defaultMessage: "danger"}) :intl.formatMessage({ defaultMessage:  "success"})
            },
            5000
          );
        });
        break;

      case intl.formatMessage({ defaultMessage: "verifyCode"}):
        if (!canVerify) break;

        verifyCode(code).then(() => {
          const { requestError: error } = this.props;

          dispatchNotification(
            {
              message: error
                ? error.message
                :intl.formatMessage({ defaultMessage:  `Your phone number is verified successfully.`}),
              open: true,
              icon: AddAlert,
              color: error ? intl.formatMessage({ defaultMessage: "danger" }): intl.formatMessage({ defaultMessage: "success"})
            },
            5000
          );

          if (!error) {
            setTimeout(() => {
              history.replace(intl.formatMessage({ defaultMessage: "/sign-in"}));
            }, 1000);
          }
        });
        break;

      default: // nothing
    }

    this.resetCaptcha();
  };

  handleChangePhoneNumber = () => {
    const { resetState, toggleSendButton, toggleLoading } = this.props;

    resetState();
    toggleSendButton(true);
    toggleLoading(false);
  };

  handleResendCountdownFinish = () => {
    this.props.toggleResendButton(true);
  };

  handleExpiredInCountdownFinish = () => {
    const { toggleVerifyButton, dispatchNotification } = this.props;
    const intl = this.props.intl;
    dispatchNotification(
      {
        message:
        intl.formatMessage({ defaultMessage: "Verify code is expired. Please press Re-send button to try again."}),
        open: true,
        icon: AddAlert,
        color: "danger"
      },
      5000
    );

    toggleVerifyButton(false);
  };

  handleFormKeyPress = e => {
    // const { sentCode } = this.props;

    if (e.charCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      // if (sentCode) {
      //   this.submitForm("verifyCode")();
      //   return;
      // }

      // this.submitForm("sendCode")();
    }
  };

  renderLogo = () => {
    const { classes } = this.props;

    return (
      <div className={classes.logoWrapper}>
        <img src={LOGO} className={classes.logo} alt={intl.formatMessage({ defaultMessage: "Socialift Logo"})} />
      </div>
    );
  };

  renderFormEnterPhoneNumber = () => {
    const { classes, loading, invalid, canSend } = this.props;
    const intl = this.props.intl;
    return (
      <>
        <Typography variant="inherit" className={classes.description}>
         {intl.formatMessage({ defaultMessage: " Please enter your phone number to receive verify code."})}
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="phone"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Phone number"})}
              component={FormHelper.oldTextField}
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid className={classes.cardFooter} container>
          <Grid
            className={classes.leftButtonWrapper}
            item
            xs={12}
            sm={6}
          ></Grid>
          <Grid className={classes.rightButtonWrapper} item xs={12} sm={6}>
            <Button
              color="primary"
              className={classes.rightButton}
              disabled={invalid || loading || !canSend}
              onClick={this.submitForm("sendCode")}
            >
             {intl.formatMessage({ defaultMessage: " Send Code"})}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  renderFormVerifyCode = () => {
    const {
      classes,
      invalid,
      loading,
      expiredIn,
      resendAfter,
      canResend,
      canVerify
    } = this.props;
    const intl = this.props.intl;
    return (
      <>
        <Typography variant="inherit" className={classes.description}>
         {intl.formatMessage({ defaultMessage: " Please enter your code you received to verify your phone number."})}
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="code"
              textFieldLabel={intl.formatMessage({ defaultMessage: "Verify code"})}
              component={FormHelper.oldTextField}
              autoFocus
              inputProps={{ maxLength: 6 }}
              disabled={!canVerify}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={clsx({
              [classes.expiredInCountdown]: true,
              [classes.expiredInCountdownRunOut]: !canVerify
            })}
          >
           {intl.formatMessage({ defaultMessage: " Expired In:"})}{" "}
            <span>
              <CountDown
                format="mm:ss"
                date={expiredIn}
                onFinish={this.handleExpiredInCountdownFinish}
              />
            </span>
          </Grid>
        </Grid>
        <Grid className={classes.cardFooter} container>
          <Grid
            className={classes.leftButtonWrapper}
            item
            xs={12}
            sm={6}
            container
          >
            <Grid item xs={12} className={classes.buttonResend}>
              <Button
                className={classes.rightButton}
                disabled={!canResend || loading}
                onClick={this.submitForm("resendCode")}
              >
                Re-send Code{" "}
                {!canResend && (
                  <CountDown
                    format="mm:ss"
                    date={resendAfter}
                    onFinish={this.handleResendCountdownFinish}
                  />
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div
                className={classes.buttonChangePhoneNumber}
                onClick={this.handleChangePhoneNumber}
              >
               {intl.formatMessage({ defaultMessage: " Change Phone Number"})}
              </div>
            </Grid>
          </Grid>
          <Grid className={classes.rightButtonWrapper} item xs={12} sm={6}>
            <Button
              type="submit"
              color="primary"
              className={classes.leftButton}
              disabled={invalid || !canVerify || loading}
              onClick={this.submitForm("verifyCode")}
            >
              {intl.formatMessage({ defaultMessage: "Verify"})}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  renderForm = () => {
    const { classes, sentCode, handleSubmit } = this.props;
    const intl = this.props.intl;
    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit)}
        autoComplete="off"
        onKeyPress={this.handleFormKeyPress}
      >
        {sentCode
          ? this.renderFormVerifyCode()
          : this.renderFormEnterPhoneNumber()}
        <button
          ref={this.submitButtonRef}
          type={intl.formatMessage({ defaultMessage: "submit"})}
          className={classes.hidden}
        />
        <button
          ref={this.captchaButtonRef}
          id="get-captcha"
          className={classes.hidden}
        />
        <Field component="input" type="hidden" name="captcha" />
        <Field component="input" type="hidden" name="formAction" />
      </form>
    );
  };

  render() {
    const { classes, loading, notification } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.root}>
        <LoadingScreen open={loading} signUp={true} />
        <Scrollbar options={{ suppressScrollX: true }}>
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
  user: { profile, verifyPhoneNumber },
  notification
}) => {
  return {
    ...verifyPhoneNumber,
    initialValues: {
      phone: profile.phone
    },
    requestError: verifyPhoneNumber.error,
    notification,
    loading: profile.isLoading || verifyPhoneNumber.loading,
    isPhoneNumberVerified: profile.isPhoneNumberVerified
  };
};

const mapDispatchToProps = {
  dispatchNotification,
  fetchUserData,
  sendVerifyCode,
  verifyCode,
  resetState,
  toggleResendButton,
  toggleVerifyButton,
  toggleSendButton,
  toggleLoading
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: FORM_NAME,
      validate: VerifyPhoneNumberPage.validate,
      enableReinitialize: true
    }),
    withStyles(styles, { name: "VerifyPhoneNumberPage" })
  )(VerifyPhoneNumberPage)
) ;
