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
import { injectIntl } from 'react-intl';
// custom components
import IconButton from 'components/CustomButtons/IconButton.jsx';
import ButtonInf from 'components/CustomButtons/ButtonInf.jsx';
import styles from "assets/jss/material-dashboard-pro-react/components/modalDialogStyle.jsx"

import cx from "classnames";

class ModalDialog extends React.Component {
  render() {
    const { 
      classes, 
      open, 
      modalTitle, 
      onCloseClick, 
      onClose,
      onClickButton,
      onClickCancel,
      buttonText,
      cancelText,
      modalContent,
      modalFooter,
      disabledButton
    } = this.props;
    const intl = this.props.intl;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.paper,
            container: classes.container
          }}
        >
          <DialogTitle classes={{
            root: classes.titleDialog
          }} disableTypography>
            <p className={classes.title}>{intl.formatMessage({ defaultMessage: "modalTitle"})}</p>
            <IconButton
              color="infoNoBackground"
              classes={{
                button: classes.closeRight
              }}
              onClick={onCloseClick}
            >
              <MdiIcon
                path={mdiWindowClose}
                size="24px"
                color="#999"
              />
            </IconButton>
          </DialogTitle>
          <DialogContent
            classes={{
              root: classes.contentDialog
            }}
          >
            {modalContent}
          </DialogContent>
          <DialogActions
            classes={{
              root: cx(
                classes.actionsDialog,
                {
                  [classes.nonActionsDialog]: typeof cancelText === 'undefined' && typeof buttonText === 'undefined',
                },
            )
            }}
          >
            {cancelText && <ButtonInf 
              outline 
              className={classes.cancelButton} 
              onClick={onClickCancel}
            >
              {cancelText}
            </ButtonInf>}
            {buttonText && <ButtonInf 
              round 
              color="primary"
              disabled={disabledButton}
              onClick={onClickButton}
            >
              {buttonText}
            </ButtonInf>}
          </DialogActions>
          {
            intl.formatMessage({ defaultMessage: "modalFooter"})
          }
        </Dialog>
      </div>
    )
  }
};
ModalDialog.propTypes = {
};
export default injectIntl (withStyles(styles)(ModalDialog)) ;
