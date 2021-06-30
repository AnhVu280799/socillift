import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { injectIntl } from 'react-intl';
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { dispatchNotification } from "reducers/NotificationReducer";
import {
  changeDrawerTitle,
  createRole,
  updateRole,
  getRoleDetail,
  closeDrawer
} from "redux/role/edit-form/actions";

import { withStyles, Grid, Typography } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EditIcon from "@material-ui/icons/Edit";

import Button from "components/CustomButtons/ButtonInf";

import FormHelper from "helpers/form-helper";
import rolePermissions from "constants/rolePermissions";

import styles from "./styles";

class RoleEditForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onFetchData: PropTypes.func
  };

  static validate(values) {
    const { error } = props;
    
    const intl = props.intl; 
    const requiredFields = ["name"];

    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = intl.formatMessage({ defaultMessage: "Required"});
      }
    });

    const minLength = (field, value) => {
      if (values[field] && values[field].length < value) {
        errors[field] = intl.formatMessage({ defaultMessage: `Must be at least {value} characters`} ,{value: value});
      }
    };

    const maxLength = (field, value) => {
      if (values[field] && values[field].length > value) {
        errors[field] = intl.formatMessage({ defaultMessage:  `Must be less than {value} characters`} ,{value : value});
      }
    };

    minLength("name", 2);
    maxLength("name", 80);
    maxLength("description", 500);

    return errors;
  }

  componentDidMount() {
    const { isEdit, changeDrawerTitle } = this.props;


    const formTitle = isEdit ? intl.formatMessage({ defaultMessage: `Edit Role`}) : intl.formatMessage({ defaultMessage: "Add New Role"});

    changeDrawerTitle(formTitle);
  }

  componentDidUpdate(prevProps) {
    const {
      loading,
      openLoading,
      closeLoading,
      error,
      dispatchFetchResult
    } = this.props;

    if (prevProps.loading !== loading) {
      if (loading) {
        openLoading();
      } else {
        closeLoading();
      }
    }

    if (prevProps.error !== error) {
      if (error) {
        dispatchFetchResult(error.code || 500);
      }
    }
  }

  notify(item) {
    const { isEdit, dispatchNotification } = this.props;

    let params = { open: true };

    if (isEdit) {
      params.icon = EditIcon;
      params.message = `Role "${item.name}" was updated successfully!`;
    } else {
      params.icon = AddAlertIcon;
      params.message = `Role "${item.name}" was created successfully!`;
    }

    dispatchNotification(params);
  }

  notifyError(error) {
    const { isEdit, dispatchNotification } = this.props;

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
      data,
      createRole,
      updateRole,
      onFetchData,
      closeDrawer
    } = this.props;

    let action = isEdit ? updateRole : createRole;

    const { name, description, ...rest } = values;
    const newValues = { name, description, globalPermissions: { ...rest } };

    if (isEdit) {
      newValues.id = data.id;
    }

    action(newValues).then(() => {
      const { requestError: error, data } = this.props;

      if (error) {
        this.notifyError(error);
      } else {
        onFetchData().then(() => {
          closeDrawer();
          this.notify(data);
        });
      }
    });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
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
              name="description"
              component={FormHelper.oldTextField}
              label={intl.formatMessage({ defaultMessage: "Description (optional)"})}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Permissions:</Typography>
            <Grid container className={classes.permissionsGroup}>
              {Object.keys(rolePermissions).map(permission => {
                const label = rolePermissions[permission];

                return (
                  <Grid key={permission} item xs={12}>
                    <Field
                      name={permission}
                      component={FormHelper.switch}
                      label={label}
                      value={permission}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttonBar}>
              {onClose && (
                <div className={classes.buttonBack} onClick={onClose}>
                  {intl.formatMessage({ defaultMessage: "Cancel"})}
                </div>
              )}
              <Button
                round
                type="submit"
                color="primary"
                className={classes.buttonSave}
                disabled={pristine || submitting}
              >
                {isEdit ?  intl.formatMessage({ defaultMessage: "Edit"}): intl.formatMessage({ defaultMessage: "Create"})}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = ({ role: { editForm } }) => {
  const { data, error: requestError } = editForm;

  let initialValues;

  if (data) {
    initialValues = {
      name: data.name,
      description: data.description,
      ...data.globalPermissions
    };
  }

  return {
    ...editForm,
    requestError,
    initialValues
  };
};

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  dispatchFetchResult,
  dispatchNotification,
  changeDrawerTitle,
  createRole,
  updateRole,
  getRoleDetail,
  closeDrawer
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "RoleEditForm",
      validate: RoleEditForm.validate
    }),
    withStyles(styles, { name: "RoleEditForm" })
  )(RoleEditForm)
) ;
