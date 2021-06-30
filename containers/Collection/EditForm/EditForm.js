import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { injectIntl } from 'react-intl';
import { withStyles, Grid, Typography } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EditIcon from "@material-ui/icons/Edit";

import {
  createCollection,
  updateCollection,
  closeCollectionEditForm
} from "redux/collection";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { dispatchNotification } from "reducers/NotificationReducer";

import TextField from "components/TextInput";
import Button from "components/CustomButtons/ButtonInf";

import styles from "./styles";

class CollectionEditForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func
  };

  static validate(values, props) {
    const {} = props;
    const intl = props.intl;
    const errors = {};

    const requiredFields = ["name"];

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
        errors[field] = intl.formatMessage({ defaultMessage: `Must be less than {value} characters` } ,{value : value});
      }
    };

    minLength("name", 2);
    maxLength("name", 80);
    maxLength("description", 500);

    return errors;
  }

  get formTitle() {
    return this.props.isEdit ? intl.formatMessage({ defaultMessage: `Edit Collection`}) : intl.formatMessage({ defaultMessage: "Add New Collection"});
  }

  notify(collection) {
    const { isEdit, dispatchNotification } = this.props;

    let params = { open: true };

    if (isEdit) {
      params.icon = EditIcon;
      params.message = `${intl.formatMessage({ defaultMessage: "Collection "})}${collection.name} ${intl.formatMessage({ defaultMessage: "was updated successfully!"})}`;
    } else {
      params.icon = AddAlertIcon;
      params.message = `${intl.formatMessage({ defaultMessage: "Collection"})} ${collection.name} ${intl.formatMessage({ defaultMessage: "was created successfully!"})}`;
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
      openLoading,
      closeLoading,
      onFetchData,
      createCollection,
      updateCollection,
      closeCollectionEditForm
    } = this.props;
    {intl.formatMessage({ defaultMessage: ""})}

    openLoading();

    let action = isEdit ? intl.formatMessage({ defaultMessage: "updateCollection"}) : intl.formatMessage({ defaultMessage: "createCollection"});

    action(values)
      .then(collection => {
        closeCollectionEditForm();
        onFetchData().then(() => {
          closeLoading();
          this.notify(collection);
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
        formLabel={intl.formatMessage({ defaultMessage: "label"})}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      isEdit,
      onClose
    } = this.props;

    return (
      <form
        className={classes.root}
        onSubmit={handleSubmit(this.handleSubmit)}
        autoComplete="off"
      >
        <Typography variant="title" align="center" className={classes.title}>
          {this.formTitle}
        </Typography>
        <Grid container>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              required
              name="name"
              component={this.renderTextField}
              label={intl.formatMessage({ defaultMessage: "Collection name *"})}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.formGroup} xs={12}>
            <Field
              name="description"
              component={this.renderTextField}
              label={intl.formatMessage({ defaultMessage: "Description (optional)"})}
              fullWidth
              multiline
              last
              rows={3}
            />
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
                type={intl.formatMessage({ defaultMessage: "submit"})}
                color="primary"
                className={classes.buttonSave}
                disabled={pristine || submitting}
              >
                {isEdit ? intl.formatMessage({ defaultMessage: "Edit" }): intl.formatMessage({ defaultMessage: "Create"})}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.collection.editForm.isEdit
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  dispatchNotification,
  createCollection,
  updateCollection,
  closeCollectionEditForm
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "CollectionEditForm",
      validate: CollectionEditForm.validate
    }),
    withStyles(styles, { name: "CollectionEditForm" })
  )(CollectionEditForm)
) ;
