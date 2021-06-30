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
import MultiSelect from 'components/MultiSelect/MultiSelect';
import ModalDialog from 'components/ModalDialog';
import TextInput from "components/TextInput";
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/collectionModalDialogStyle.jsx"

class BrandModalDialog extends React.Component {
  onChangeBrandName = event => {
    this.props.onChangeBrandName(event.target.value)
  }
  onChangeKeywords = event => {
    this.props.onChangeKeywords(event.target.value)
  }
  onChangeImageURL = event => {
    this.props.onChangeImageURL(event.target.value)
  }
  onChangeDescription = event => {
    this.props.onChangeDescription(event.target.value)
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
      brand,
      nameError,
      imageURLError,
      keywordError,
      // descriptionError,
      categories,
      categoriesChosen,
      onChangeCategories
    } = this.props;
    const intl  = this.props.intl;

    const { id, brandName, imageURL, keywords, description } = brand;

    return (
      <div>
        {brand && (<ModalDialog
          keepMounted
          open={open}
          onClose={onClose}
          onCloseClick={onCloseClick}
          onClickButton={id ? onClickEdit : onClickCreate}
          onClickCancel={onClickCancel}
          modalTitle={id ? intl.formatMessage({defaultMessage: "Edit Brand"}) : intl.formatMessage({defaultMessage: "Edit Brand"})}
          buttonText={id ? intl.formatMessage({defaultMessage: "Edit"}) : intl.formatMessage({defaultMessage: "Create"})}
          cancelText={intl.formatMessage({defaultMessage: "Cancel"})}
          disabledButton={
            brandName === "" ||
            keywords === "" ||
            nameError !== false ||
            imageURLError !== false ||
            keywordError !== false
            // descriptionError !== false
          }
          modalContent={
            <div
              className={classes.divContent}
            >
              <TextInput
                formLabel={intl.formatMessage({defaultMessage: "Brand name *"})}
                value={brandName}
                onChange={this.onChangeBrandName}
                error={nameError !== false}
                helperText={nameError}
                textFieldCustom={classes.textFieldCustom}
              />
              <TextInput
                formLabel={intl.formatMessage({defaultMessage: "Image URL (optional)"})}
                value={imageURL}
                onChange={this.onChangeImageURL}
                error={imageURLError !== false}
                helperText={imageURLError}
                textFieldCustom={classes.textFieldCustom}
              />
              <div className={classes.divContent}>
                <div className={classes.subTitle}>{intl.formatMessage({defaultMessage: "Categories (optional)"})}</div>
                <MultiSelect
                  options={categories}
                  classes={{
                    Menu: classes.menuRelative
                  }}
                  value={categoriesChosen}
                  onChange={onChangeCategories}
                  closeMenuOnSelect={false}
                  isSearchable
                  isClearable
                  isMulti
                  placeholder=''
                />
              </div>
              <TextInput
                formLabel={intl.formatMessage({defaultMessage: "Keywords *"})}
                rows="3"
                multiline
                value={keywords}
                onChange={this.onChangeKeywords}
                error={keywordError !== false}
                helperText={keywordError}
                textFieldCustom={classes.textFieldCustom}
              />
              <TextInput
                formLabel={intl.formatMessage({defaultMessage: "Description (optional)"})}
                rows="2"
                multiline
                last
                value={description}
                onChange={this.onChangeDescription}
                // error={descriptionError !== false}
                // helperText={descriptionError}
                textFieldCustom={classes.textFieldCustom}
              />
            </div>
          }
        />)}
      </div>
    )
  }
};
BrandModalDialog.propTypes = {
};
export default injectIntl (
  withStyles(styles)(BrandModalDialog)
);
