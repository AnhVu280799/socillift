import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

// core components
import SelectAllCheckBox from 'components/SelectAllCheckBox';
import CustomPopupState from 'components/CustomPopupState/CustomPopupState.jsx';
import CollectionDropdown from 'components/CollectionDropdown/CollectionDropdown.jsx';
import collectionDetailSortNavStyle from 'assets/jss/material-dashboard-pro-react/components/collectionDetailSortNavStyle.jsx';
import { injectIntl } from 'react-intl';


class CollectionDetailSortNav extends React.Component {
  render() {
    const {
      classes,
      checkedValueSelectAllButton,
      onChangeSelectAllButton,
      collectionList,
      onChangeCheckboxMenuItem,
      numberSelected,
      isSelectAll,
      disabledStatus,
      addCollection,
      optionsMore,
      isDisplaySelectAll,
      onClickSelectAll,
      disabledButton
    } = this.props;
    const intl =  this.props.intl;

    return (
      <GridContainer>
        <GridItem
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className={classes.alignmentControlCard}
        >
          <div>
            <SelectAllCheckBox
              checked={checkedValueSelectAllButton}
              selectedCount={numberSelected}
              indeterminate={!isSelectAll}
              onChange={onChangeSelectAllButton}
              disabled={disabledStatus}
            />
          </div>
          <div className={classes.selectAllResultButtonDiv}>
            {isDisplaySelectAll && (
              <p
                className={classes.selectAllResultText}
                onClick={onClickSelectAll}
              >
                {intl.formatMessage({defaultMessage: "select all results found"})}
              </p>
            )}
          </div>
          <div className={classes.dropDownCollection}>
            <CollectionDropdown
              isShow
              disabledButton={disabledButton}
              dropdownList={collectionList}
              onChangeCheckboxMenuItem={onChangeCheckboxMenuItem}
              onCollectionAdd={addCollection}
              dropdownText={intl.formatMessage({defaultMessage: 'Move to other collections'})}
              dropdownIcon=""
              pannelTitle={intl.formatMessage({defaultMessage: "CREATE TO NEW COLLECTION"})}
              cancelText={intl.formatMessage({defaultMessage: "CANCEL"})}
              addText={intl.formatMessage({defaultMessage: 'CREATE'})}
            />
          </div>
          <div className={classes.moreAction}>
            <CustomPopupState options={optionsMore} />
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

CollectionDetailSortNav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectIntl (withStyles(collectionDetailSortNavStyle)(
  CollectionDetailSortNav
));
