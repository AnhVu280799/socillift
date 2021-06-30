import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { login, resetState, closeDialog } from 'redux/auth/login/actions';
import { injectIntl } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import IconCard from 'components/Cards/IconCard.jsx';
import AlertModalDialog from 'components/AlertModalDialog';
import Button from 'components/CustomButtons/ButtonInf.jsx';
import LoadingScreen from 'components/LoadingScreen';

import FormHelper from 'helpers/form-helper';

import styles from './styles';
import { LOGO, APP_NAME } from 'constants/common';

class LoginPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static validate(values, props) {
    const { error } = props;
    const intl = props.intl;
    const requiredFields = ['email', 'password'];

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: 'Required'});
      }
    });

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = intl.formatMessage({ defaultMessage: 'Invalid email address'});
    }

    return errors;
  }

  componentDidMount() {
    this.props.resetState();
  }

  handleSubmit = ({ email, password }) => {
    this.props.login(email, password).then(() => {
      const { requestError: error } = this.props;

      if (error && error.code === 500) {
        this.props.history.push(intl.formatMessage({ defaultMessage: '/internal-server-error'}));
      }
    });
  };

  renderLogo = () => {
    const { classes } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.logoWrapper}>
        <img src={LOGO} className={classes.logo} alt={intl.formatMessage({ defaultMessage:  `{APP_NAME} Logo`} ,{APP_NAME : APP_NAME})} />
      </div>
    );
  };

  renderForm = () => {
    const {
      classes,
      handleSubmit,
      pristine,
      loading,
      errorMessage
    } = this.props;
    const intl = this.props.intl;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          required
          type="email"
          name="email"
          component={FormHelper.oldTextField}
          textFieldLabel={intl.formatMessage({ defaultMessage: "Email"})}
          autoFocus
        />
        <Field
          last
          required
          type="password"
          name="password"
          component={FormHelper.oldTextField}
          textFieldLabel={intl.formatMessage({ defaultMessage: "Password"})}
        />
        <Grid className={classes.cardFooter} container>
          <Grid className={classes.loginButtonWrapper} item xs={12} sm={6}>
            <Button
              type="submit"
              color="primary"
              className={classes.loginButton}
              disabled={pristine || loading}
            >
              {intl.formatMessage({ defaultMessage: "SIGN IN"})}
            </Button>
          </Grid>
          <Grid className={classes.signUpButtonWrapper} item xs={12} sm={6}>
            <div>?{intl.formatMessage({ defaultMessage: "Do not have an account"})}</div>
            <Link className={classes.requestLink} to="/sign-up">
             {intl.formatMessage({ defaultMessage: " SIGN UP"})}
            </Link>
          </Grid>
        </Grid>
        {errorMessage && (
          <div className={classes.errorMessage}>{intl.formatMessage({ defaultMessage: "errorMessage"})}</div>
        )}
      </form>
    );
  };

  renderDialog = () => {
    const { closeDialog } = this.props;
    const intl = this.props.intl;
    return (
      <AlertModalDialog
        open={true}
        onCloseClick={closeDialog}
        onClickButton={closeDialog}
        modalTitle={intl.formatMessage({ defaultMessage: "ERROR"})}
        content={
          <div>
           {intl.formatMessage({ defaultMessage: "Your account has been deactivated. If you have any concerns, contact"})} 
           {intl.formatMessage({ defaultMessage: "or request a demo"})}{' '}
            <a
              rel="noopener noreferrer"
              href="https://socialift.asia/"
              target="_blank"
            >
              {intl.formatMessage({ defaultMessage: "here"})}
            </a>
            .
          </div>
        }
      />
    );
  };

  render() {
    const { classes, loading, openDialog } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <LoadingScreen open={loading} signUp />
          <IconCard
            customCardClass={classes.formWrapper}
            customCardTitleClass={classes.cardTitle}
            customCardContentClass={classes.cardContent}
            title={this.renderLogo()}
            content={this.renderForm()}
          />
        </div>
        {openDialog && this.renderDialog()}
      </div>
    );
  }
}

export const mapStateToProps = ({ auth: { login } }) => ({
  ...login,
  requestError: login.error
});

const mapDispatchToProps = {
  login,
  resetState,
  closeDialog
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'LoginForm',
      validate: LoginPage.validate
    }),
    withStyles(styles, { name: 'LoginPage' })
  )(LoginPage)
) ;
