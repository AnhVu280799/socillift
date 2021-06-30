import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiWindowClose } from '@mdi/js';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { injectIntl } from 'react-intl';
// custom components
import IconButton from 'components/CustomButtons/IconButton.jsx';
import ButtonInf from 'components/CustomButtons/ButtonInf.jsx';
import styles from "assets/jss/material-dashboard-pro-react/components/confirmationPopupStyle.jsx"

class ConfirmationPopup extends React.Component {
  render() {
    const { 
      classes, 
      openConfirmationPopup, 
      confirmationTitle, 
      onCloseClick, 
      onClose,
      onClickConfirmation,
      onClickCancel,
      confirmationBtnText,
      cancelBtnText,
      confirmationQuestion,
      confirmationStatement,
      disabledConfirmationButton
    } = this.props;
    const intl = this.props.intl;
    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={openConfirmationPopup}
          onClose={onClose}
          classes={{
            paper: classes.paper,
            container: classes.container,
            paperWidthXs: classes.paperWidthXsStyle,
          }}
        >
          <DialogTitle classes={{
            root: classes.titleDialog
          }} disableTypography>
            <p className={classes.title}>{intl.formatMessage({ defaultMessage: "confirmationTitle"})}</p>
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
            <div>
              <div className={classes.questionStyle}>
                {intl.formatMessage({ defaultMessage: "confirmationQuestion"})}
              </div>
              <div className={classes.statementStyle}>
                {intl.formatMessage({ defaultMessage: "confirmationStatement"})}
              </div>
            </div>
          </DialogContent>
          <DialogActions
            classes={{
              root: classes.actionsDialog
            }}
          >
            {cancelBtnText && <ButtonInf 
              round
              className={classes.cancelButton} 
              onClick={() => onClickCancel()}
            >
              {intl.formatMessage({ defaultMessage: "cancelBtnText"})}
            </ButtonInf>}
            {confirmationBtnText && <ButtonInf 
              round 
              color="dangerLight"
              disabled={disabledConfirmationButton}
              onClick={() => onClickConfirmation()}
              className={classes.confirmationButton} 
            >
              {intl.formatMessage({ defaultMessage: "confirmationBtnText"})}
            </ButtonInf>}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
};
ConfirmationPopup.propTypes = {
  openConfirmationPopup: PropTypes.bool.isRequired,
  confirmationTitle: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickConfirmation: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  confirmationBtnText: PropTypes.string.isRequired,
  cancelBtnText: PropTypes.string.isRequired,
  confirmationQuestion: PropTypes.string.isRequired,
  disabledConfirmationButton: PropTypes.bool
};
export default injectIntl (withStyles(styles)(ConfirmationPopup));
