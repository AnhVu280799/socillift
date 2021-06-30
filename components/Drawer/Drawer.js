import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Drawer as BaseDrawer,
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./styles";

class Drawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    showCloseButton: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    title: "",
    showCloseButton: true
  };

  handleCloseDrawer = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { classes, open, title, showCloseButton, children } = this.props;
    const intl = this.props.intl;

    return (
      <BaseDrawer
        open={open}
        onClose={this.handleCloseDrawer}
        anchor="right"
        PaperProps={{ classes: { root: classes.root } }}
      >
        <div className={classes.header}>
          <Typography variant="title" align="center" className={classes.title}>
            {intl.formatMessage({ defaultMessage: "titlei"})}
          </Typography>
          <IconButton
            className={clsx({
              [classes.buttonClose]: true,
              [classes.hidden]: !showCloseButton
            })}
            onClick={this.handleCloseDrawer}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {intl.formatMessage({ defaultMessage: "children"})}
      </BaseDrawer>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "Drawer" })(Drawer)) ;
