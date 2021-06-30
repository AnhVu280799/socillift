import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { closeCollectionEditForm } from "redux/collection";
import clsx from "clsx";

import { withStyles, Drawer, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import CollectionEditForm from "../EditForm";

import styles from "./styles";

class CollectionEditFormDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onFetchData: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool
  };

  static defaultProps = {
    showCloseButton: true
  };

  handleCloseEditForm = () => {
    this.props.closeCollectionEditForm();
  };

  render() {
    const { classes, open, onFetchData, showCloseButton } = this.props;

    return (
      <Drawer
        open={open}
        onClose={this.handleCloseEditForm}
        anchor="right"
        PaperProps={{ classes: { root: classes.root } }}
      >
        <div
          className={clsx({
            [classes.closeButtonWrapper]: true,
            [classes.hidden]: !showCloseButton
          })}
        >
          <IconButton onClick={this.handleCloseEditForm}>
            <CloseIcon />
          </IconButton>
        </div>
        <CollectionEditForm
          onFetchData={onFetchData}
          onClose={this.handleCloseEditForm}
        />
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  open: state.collection.editForm.openDrawer
});

const mapDispatchToProps = {
  closeCollectionEditForm
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "CollectionEditFormDrawer" })
)(CollectionEditFormDrawer);
