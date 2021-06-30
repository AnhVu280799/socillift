import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Button } from "@material-ui/core";

import UploadZone from "./UploadZone";
import InfluencerSelect from "./InfluencerSelect";
import CollectionSelect from "./CollectionSelect";
import { injectIntl } from 'react-intl';
import AddAlertIcon from "@material-ui/icons/AddAlert";

import styles from "./styles";

class InfluencerImporter extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    fetchListCollections: PropTypes.func.isRequired,
    selectCollections: PropTypes.func.isRequired,
    sortListInfluencers: PropTypes.func.isRequired,
    filterInfluencers: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    addInfluencersToMultiCollections: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  };

  get canSubmit() {
    const { selectedInfluencers, selectedCollections } = this.props;

    return selectedInfluencers.length && selectedCollections.length;
  }

  handleCancel = () => {
    this.props.resetState();
    document.getElementById("content").scrollTop = 0;
  };

  handleSubmit = () => {
    if (!this.canSubmit) return;

    const {
      selectedInfluencers,
      selectedCollections,
      addInfluencersToMultiCollections,
      notify,
      toggleLoading
    } = this.props;
    const intl = this.props.intl; 
    toggleLoading(true);

    addInfluencersToMultiCollections(
      selectedCollections,
      selectedInfluencers.filter(elm => !!elm.id).map(elm => elm.id)
    ).then(() => {
      const { error } = this.props;

      toggleLoading(false);

      if (error) {
        notify(
          AddAlertIcon,
          error.data && error.data.message ? error.data.message : error.message,
          intl.formatMessage({ defaultMessage: "danger"})
        );
      } else {
        notify(AddAlertIcon, intl.formatMessage({ defaultMessage: "Add influencers to collections successful!"}));
      }
    });
  };

  handleAddCollection = () => {
    this.props.openCollectionEditForm();
  };

  render() {
    const {
      classes,
      toggleLoading,
      fetchListCollections,
      listCollections,
      selectedCollections,
      selectCollections,
      listInfluencers,
      selectedInfluencers,
      selectInfluencers,
      sorting,
      sortListInfluencers,
      filters,
      filterInfluencers,
      stats,
      fileInfos,
      notify
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.root}>
        <UploadZone toggleLoading={toggleLoading} notify={notify} />
        {!!fileInfos.length && (
          <React.Fragment>
            <InfluencerSelect
              fileInfos={fileInfos}
              stats={stats}
              listInfluencers={listInfluencers}
              value={selectedInfluencers}
              onChange={selectInfluencers}
              sorting={sorting}
              onSort={sortListInfluencers}
              filters={filters}
              onFilter={filterInfluencers}
            />
            <CollectionSelect
              listCollections={listCollections}
              onFetchData={fetchListCollections}
              toggleLoading={toggleLoading}
              value={selectedCollections}
              onChange={selectCollections}
              onAddCollection={this.handleAddCollection}
            />
            <div className={clsx(classes.inline, classes.lastBlock)}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={this.handleCancel}
              >
                {intl.formatMessage({ defaultMessage: "Cancel"})}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                disabled={!this.canSubmit}
              >
                {intl.formatMessage({ defaultMessage: "Add"})}
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default injectIntl (
  withStyles(styles, { name: "InfluencerImporter" })(
    InfluencerImporter
  )
);
