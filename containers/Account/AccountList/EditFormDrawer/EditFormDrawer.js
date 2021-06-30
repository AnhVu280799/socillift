import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { closeUserEditForm } from "redux/user";
import clsx from "clsx";

import { withStyles, Drawer, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { injectIntl } from 'react-intl';
import AccountEditForm from "../EditForm";

import styles from "./styles";

class AccountEditFormDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onFetchData: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool
  };

  static defaultProps = {
    showCloseButton: true
  };

  state = {
    title: ""
  };

  handleCloseDrawer = () => {
    this.props.closeUserEditForm();
  };

  handleChangeDrawerTitle = title => {
    this.setState({ title });
  };

  render() {
    const { classes, open, onFetchData, showCloseButton } = this.props;
    const intl = this.props.intl;
    const { title } = this.state;

    return (
      <Drawer
        open={open}
        onClose={this.handleCloseDrawer}
        anchor="right"
        PaperProps={{ classes: { root: classes.root } }}
      >
        <div className={classes.header}>
          <Typography variant="title" align="center" className={classes.title}>
            {intl.formatMessage({ defaultMessage: "title"})}
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
        <AccountEditForm
          onFetchData={onFetchData}
          onChangeTitle={this.handleChangeDrawerTitle}
          onClose={this.handleCloseDrawer}
        />
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({ open: state.user.editForm.openDrawer });

const mapDispatchToProps = {
  closeUserEditForm
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: "AccountEditFormDrawer" })
  )(AccountEditFormDrawer)
) ;
