import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import _ from "lodash";

import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import {
  resetState,
  fetchListCollections,
  selectCollections,
  selectInfluencers,
  sortListInfluencers,
  filterInfluencers,
  addInfluencersToMultiCollections
} from "redux/influencer/importer/actions";
import { dispatchNotification } from "reducers/NotificationReducer";
import { openCollectionEditForm } from "redux/collection";

import Breadcrumbs from "components/Breadcrumbs";
import InfluencerImporter from "components/InfluencerImporter";
import CollectionEditFormDrawer from "containers/Collection/EditFormDrawer";
import Snackbar from "components/Snackbar/Snackbar";

import styles from "./styles";

class InfluencerImporterPage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    snackbar: {
      open: false,
      icon: undefined,
      message: undefined,
      color: undefined
    }
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  notify = (icon, message, color = undefined) => {
    const timeOut = 2000;

    this.setState(
      {
        snackbar: {
          open: true,
          icon,
          message,
          color
        }
      },
      () => {
        setTimeout(() => {
          this.setState({
            snackbar: {
              open: false,
              icon: undefined,
              message: undefined,
              color: undefined
            }
          });
        }, timeOut);
      }
    );
  };

  handleToggleLoading = open => {
    if (open) return this.props.openLoading();
    this.props.closeLoading();
  };

  renderSnackbar = () => {
    const { snackbar } = this.state;

    const defaultProps = {
      place: "tc",
      color: "success",
      icon: undefined,
      message: "",
      open: false,
      closeNotification: undefined
    };

    const props = _.merge(defaultProps, snackbar);

    return <Snackbar close {...props} />;
  };

  renderHeader = () => {
    const {
      name,
      breadcrumbs: { bcRoutes, isFromDiscoverPage }
    } = this.props;

    return this.props.drawHeader({
      name: (
        <Breadcrumbs
          name={name}
          bcRoutes={bcRoutes}
          isFromDiscoverPage={isFromDiscoverPage}
        />
      )
    });
  };

  render() {
    const {
      classes,
      importerProps,
      fetchListCollections,
      selectCollections,
      sortListInfluencers,
      filterInfluencers,
      selectInfluencers,
      resetState,
      addInfluencersToMultiCollections,
      openCollectionEditForm
    } = this.props;

    return (
      <div className={classes.root}>
        {this.renderSnackbar()}
        {this.renderHeader()}
        <InfluencerImporter
          toggleLoading={this.handleToggleLoading}
          notify={this.notify}
          {...importerProps}
          {...{
            fetchListCollections,
            selectCollections,
            selectInfluencers,
            sortListInfluencers,
            filterInfluencers,
            resetState,
            addInfluencersToMultiCollections,
            openCollectionEditForm
          }}
        />
        <CollectionEditFormDrawer
          onFetchData={fetchListCollections}
          showCloseButton={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs,
  importerProps: state.influencer.importer
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  resetState,
  fetchListCollections,
  selectCollections,
  selectInfluencers,
  sortListInfluencers,
  filterInfluencers,
  addInfluencersToMultiCollections,
  dispatchNotification,
  openCollectionEditForm
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "InfluencerImporterPage" })
)(InfluencerImporterPage);
