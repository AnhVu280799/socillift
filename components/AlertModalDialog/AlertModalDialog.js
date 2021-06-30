import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// custom components
import ModalDialog from 'components/ModalDialog';
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/collectionModalDialogStyle.jsx"


class AlertModalDialog extends React.Component {
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
      onClickButton,
      content,
      modalTitle,
      buttonText
    } = this.props;
    const intl = this.props.intl;

    return (
      <div>
        <ModalDialog
          keepMounted
          open={open}
          onClose={onClose}
          onCloseClick={onCloseClick}
          onClickButton={onClickButton}
          modalTitle={modalTitle ? modalTitle : intl.formatMessage({defaultMessage: "Info"})}
          buttonText={buttonText ? buttonText : intl.formatMessage({defaultMessage: "Ok"})}
          modalContent={
            <div
              className={classes.divContent}
            >
              <div className={classes.contentStyle}>{content}</div>
            </div>
          }
        />
      </div>
    )
  }
};
AlertModalDialog.propTypes = {
};
export default injectIntl()
withStyles(styles)(AlertModalDialog) ;
