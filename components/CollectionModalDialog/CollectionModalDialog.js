import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiWindowClose } from '@mdi/js';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// custom components
import ModalDialog from 'components/ModalDialog';
import TextInput from "components/TextInput";
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/collectionModalDialogStyle.jsx"

class CollectionModalDialog extends React.Component {
  onChangeCollectionName = event => {
    this.props.onChangeCollectionName(event.target.value)
  }
  onChangeCollectionDescription = event => {
    this.props.onChangeCollectionDescription(event.target.value)
  }
  render() {
    const {
      classes,
      open,
      onCloseClick,
      onClose,
      onClickCancel,
      onClickEdit,
      onClickCreate,
      collection,
      nameError,
      descriptionError
    } = this.props;
    const intl = this.props.intl;

    const { id, name, description } = collection;

    return (
      <div>
        {collection && 
        (<ModalDialog
          keepMounted
          open={open}
          onClose={onClose}
          onCloseClick={onCloseClick}
          onClickButton={id ? onClickEdit : onClickCreate}
          onClickCancel={onClickCancel}
          modalTitle={id ? intl.formatMessage({ defaultMessage: "Edit Collection"}) : intl.formatMessage({ defaultMessage: "New Collection"})}
          buttonText={id ? intl.formatMessage({ defaultMessage: "Edit" }): intl.formatMessage({ defaultMessage: "Create"})}
          cancelText={intl.formatMessage({ defaultMessage: "Cancel"})}
          disabledButton={
            name === "" || nameError !== false || descriptionError !== false
          }
          modalContent={
            <div
              className={classes.divContent}
            >
              <TextInput
                formLabel={intl.formatMessage({ defaultMessage: "Collection name *"})}
                value={name}
                onChange={this.onChangeCollectionName}
                error={nameError !== false}
                helperText={nameError}
                textFieldCustom={classes.textFieldCustom}
              />
              <TextInput
                formLabel={intl.formatMessage({ defaultMessage: "Description (optional)"})}
                rows="3"
                multiline
                last
                value={description}
                onChange={this.onChangeCollectionDescription}
                error={descriptionError !== false}
                helperText={descriptionError}
                textFieldCustom={classes.textFieldCustom}
              />
            </div>
          }
        />)}
      </div>
    )
  }
};
CollectionModalDialog.propTypes = {
};
export default injectIntl(
  withStyles(styles)(CollectionModalDialog)
);
