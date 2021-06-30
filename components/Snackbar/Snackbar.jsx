import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Snack from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { injectIntl } from 'react-intl';
// @material-ui/icons
import Close from '@material-ui/icons/Close';

import snackbarContentStyle from 'assets/jss/material-dashboard-pro-react/components/snackbarContentStyle.jsx';

function Snackbar({ ...props }) {
  const {
    classes,
    className,
    id,
    message,
    color,
    close,
    icon,
    place,
    open,
    isDemo
  } = props; const intl = props.intl;
  var action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  const iconClasses = cx({
    [classes.icon]: classes.icon,
    [classes.infoIcon]: color === 'info',
    [classes.successIcon]: color === 'success',
    [classes.warningIcon]: color === 'warning',
    [classes.dangerIcon]: color === 'danger',
    [classes.primaryIcon]: color === 'primary',
    [classes.roseIcon]: color === 'rose'
  });
  const rootClasses = cx({
    [classes.isDemo]: isDemo
  });
  const contentMessageClasses = cx({
    [classes.message]: classes.message,
    [classes.isDemoContentMessage]: isDemo
  });
  return (
    <Snack
      id={id}
      className={className}
      classes={{
        root: rootClasses,
        anchorOriginTopCenter: classes.top20,
        anchorOriginTopRight: classes.top40,
        anchorOriginTopLeft: classes.top40
      }}
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1
            ? 'center'
            : 'right'
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={iconClasses} /> : null}
          <span className={messageClasses}>{intl.formatMessage({ defaultMessage: "message"})}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color],
          message: contentMessageClasses
        }
      }}
    />
  );
}

Snackbar.defaultProps = {
  color: 'info'
};

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'danger',
    'primary',
    'rose'
  ]),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  open: PropTypes.bool
};

export default injectIntl (withStyles(snackbarContentStyle)(Snackbar)) ;
