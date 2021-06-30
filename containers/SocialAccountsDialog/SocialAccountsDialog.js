import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import {
  resetState,
  toggleDialog
  // toggleEnterPageId,
  // changePageId
} from "redux/social-accounts";

import MdiIcon from "@mdi/react";
import { mdiWindowClose } from "@mdi/js";

import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

import IconButton from "components/CustomButtons/IconButton.jsx";
import ChoosePlatform from "./ChoosePlatform";
import ChooseFanpage from "./ChooseFanpage";

import styles from "./styles";

class SocialAccountsDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  handleCloseDialog = () => {
    if (!this.props.canClose) return;

    this.props.toggleDialog(false);
  };

  handleChangeTitle = title => {
    this.props.changeTitle(title);
  };

  renderCloseButton = () => {
    const { classes, canClose } = this.props;

    return (
      canClose && (
        <IconButton
          color="infoNoBackground"
          classes={{
            button: classes.closeRight
          }}
          onClick={this.handleCloseDialog}
        >
          <MdiIcon path={mdiWindowClose} size="24px" color="#999" />
        </IconButton>
      )
    );
  };

  renderDialogView = () => {
    const { view } = this.props;

    if (view === "chooseFanpage") {
      return <ChooseFanpage />;
    }

    return <ChoosePlatform />;
  };

  render() {
    const { classes, title, open } = this.props;

    return (
      <Dialog
        open={open}
        classes={{
          paper: classes.paper,
          container: classes.container
        }}
        onClose={this.handleCloseDialog}
      >
        <DialogTitle
          classes={{
            root: classes.titleDialog
          }}
          disableTypography
        >
          <p className={classes.title}>{title}</p>
          {this.renderCloseButton()}
        </DialogTitle>
        <DialogContent
          classes={{
            root: classes.contentDialog
          }}
        >
          {this.renderDialogView()}
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({
  socialAccounts: {
    dialog: { title, open, view },
    accounts
  }
}) => ({
  title,
  open,
  canClose: !!accounts && !!Object.keys(accounts).length,
  view
});

const mapDispatchToProps = {
  resetState,
  toggleDialog
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "SocialAccountsDialog" })
)(SocialAccountsDialog);
