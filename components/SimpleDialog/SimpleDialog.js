import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import notificationsStyle from 'assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx';
import DialogActions from '@material-ui/core/DialogActions';
import Transition from './Transition';

export default withStyles(notificationsStyle)(
  ({
    isOpen,
    message,
    onConfirm,
    onClose,
    confirmText,
    showClose,
    title,
    color,
    classes
  }) => (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      open={isOpen}
      transition={Transition}
      keepMounted
      onClose={onClose}
      style={{ textAlign: 'left' }}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        style={{ textAlign: 'center' }}
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <h4 className={classes.modalTitle}>{title}</h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={12} lg={12}>
            {message}
          </ItemGrid>
        </GridContainer>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button color={color} onClick={onConfirm}>
          {confirmText}
        </Button>
        {showClose && (
          <Button onClick={onClose} color={color}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
);
