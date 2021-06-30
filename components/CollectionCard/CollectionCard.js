import React from 'react';
import PropTypes, { element } from 'prop-types';
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// custom components
import CustomPopupState from 'components/CustomPopupState/CustomPopupState.jsx';
import FormContainer from "components/FormContainer";
import { injectIntl } from 'react-intl';
import styles from "assets/jss/material-dashboard-pro-react/components/collectionCardStyle.jsx"

class CollectionCard extends React.Component {
  render() {
    const {
      classes,
      formLabel,
      formControlProp,
      placeholder,
      collectionName,
      lastEditedTime,
      pendingNumber,
      sharedNumber,
      totalItemsNumber,
      linkToDetail,
      onClickEdit,
      onClickDelete,
      onClickShare,
      value,
      key,
      isOwner,
      isExternalAccount,
      ...rest
    } = this.props;
    const intl = this.props.intl;

    const informationList = [
      {
        name: "Pending",
        number: pendingNumber
      },
      {
        name: totalItemsNumber > 1 ? intl.formatMessage({defaultMessage: "Total items"}) : intl.formatMessage({defaultMessage: "Total item"}),
        number: totalItemsNumber
      },
      {
        name: "Shared",
        number: sharedNumber
      }
    ].filter(({ number }) => number);

    const options = [
      {
        'icon': 'edit',
        'name': 'Edit',
        'onClick': onClickEdit
      },
      {
        'icon': 'share',
        'name': 'Share',
        'onClick': onClickShare
      },
      {
        'icon': 'delete',
        'name': 'Delete',
        'onClick': onClickDelete
      }
    ]

    const collectionNameDisplay = collectionName ? collectionName : 'N/A';
    const lastEditedTimeDisplay = lastEditedTime ? lastEditedTime : 'N/A';

    return (
      <Card className={classes.card}>
        <div className={classes.titleCard}>
          <Link to={linkToDetail} className={classes.titleCard} title={intl.formatMessage({ defaultMessage: "collectionNameDisplay"}) }>
            {intl.formatMessage({ defaultMessage: "collectionNameDisplay"}) }
          </Link>
        </div>
        {isOwner && (<CustomPopupState
          options={isExternalAccount ? options.filter(element => element.name !== 'Share') : options}
          className={classes.moreActions}
        />)}
        <p className={classes.lastEdited}>{intl.formatMessage({ defaultMessage: "Last edited:"})} {intl.formatMessage({ defaultMessage: "lastEditedTimeDisplay"})}</p>
        <div className={classes.sepHorizontalDiv}></div>
        <GridContainer className={classes.infoContainer}>
          {
            informationList.map(({ name, number }, idx) => (
              <GridItem xs={4} sm={4} md={4} lg={4} className={(idx + 1) === informationList.length ?
                classes.infoItem + " " + classes.noBorderRight : classes.infoItem} key={idx}>
                <p className={classes.infoItemName}>{intl.formatMessage({ defaultMessage: "name"})}</p>
                <p className={classes.infoItemNumber}>{intl.formatMessage({ defaultMessage: "number"})}</p>
              </GridItem>
            ))
          }
        </GridContainer>
      </Card>
    )
  }
};

FormContainer.propTypes = {
};
export default injectIntl (
  withStyles(styles)(CollectionCard)
);
