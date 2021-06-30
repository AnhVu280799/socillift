import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// custom components
import CollectionCard from "components/CollectionCard";


import contentCollectionsStyle from "assets/jss/material-dashboard-pro-react/components/contentCollectionsStyle.jsx"

class ContentCollections extends React.Component {
  render() {
    const { classes, collections, onClickEdit, onClickShare, onClickDelete, isExternalAccount } = this.props;
    return (
      <GridContainer className={classes.gridContainerCustom}>
        {
          collections && collections.map(({ id, collectionName, lastEditedTime, pendingNumber, sharedNumber, totalItemsNumber, linkToDetail, isOwner }, idx) => (
            <GridItem xs={12} sm={6} md={6} lg={4} className={classes.gridItemCustom} key={`GridItem-${id}`}>
              <CollectionCard
                id={id}
                collectionName={collectionName}
                lastEditedTime={lastEditedTime}
                pendingNumber={pendingNumber}
                sharedNumber={sharedNumber}
                totalItemsNumber={totalItemsNumber}
                linkToDetail={linkToDetail}
                isOwner={isOwner}
                onClickEdit={() => onClickEdit(idx)}
                onClickDelete={() => onClickDelete(idx)}
                onClickShare={() => onClickShare(idx)}
                isExternalAccount={isExternalAccount}
              />
            </GridItem>
          ))
        }
      </GridContainer>
    );
  }
}

ContentCollections.propTypes = {
};
export default withStyles(contentCollectionsStyle)(ContentCollections);
