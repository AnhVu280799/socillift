import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import { injectIntl } from 'react-intl';
// core components
import MenuSelection from 'components/MenuSelection';
import SelectAllCheckBox from 'components/SelectAllCheckBox';
import CollectionDropdown from 'components/CollectionDropdown/CollectionDropdown.jsx';
import MoreActions from 'components/MoreActions';

import sortNavStyle from 'assets/jss/material-dashboard-pro-react/components/sortNavStyle.jsx';

class SortNav extends React.Component {
  render() {
    const {
      classes,
      sortBySelectValue,
      sortByMenuItems,
      sortByOnChange,
      showingSelectValue,
      showingMenuItems,
      showingOnChange,
      checkedValueSelectAllButton,
      onChangeSelectAllButton,
      collectionList,
      onChangeCheckboxMenuItem,
      dropdownListSelected,
      selectedInfluencerId,
      numberSelected,
      isSelectAll,
      disabledStatus,
      addCollection,
      isDisplaySelectAll,
      onClickSelectAll,
      isShowCollectionDropDown
    } = this.props;
    const intl = this.props.intl;

    return (
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
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
               {intl.formatMessage({ defaultMessage: " select all results found"})}
              </p>
            )}
          </div>
          <div className={classes.dropDownCollection}>
            {isShowCollectionDropDown && (
              <CollectionDropdown
                isShow
                dropdownList={collectionList}
                onChangeCheckboxMenuItem={onChangeCheckboxMenuItem}
                onCollectionAdd={addCollection}
                dropdownText={intl.formatMessage({ defaultMessage: 'Add to Collection'})}
                dropdownIcon={intl.formatMessage({ defaultMessage: "bookmark_border"})}
                pannelTitle={intl.formatMessage({ defaultMessage: "ADD NEW COLLECTION"})}
                cancelText={intl.formatMessage({ defaultMessage: "CANCEL"})}
                addText={intl.formatMessage({ defaultMessage: "ADD"})}
              />
            )}
          </div>
          {/* <div className={classes.dropDownCollection}><MoreActions /></div> */}
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className={classes.alignmentSort}
        >
          <MenuSelection
            selectValue={sortBySelectValue}
            onChange={sortByOnChange}
            iconText={'Sort by:'}
            menuItems={sortByMenuItems}
            className={classes.menuSelection}
          />
          <MenuSelection
            selectValue={showingSelectValue}
            onChange={showingOnChange}
            iconText={'Showing:'}
            menuItems={showingMenuItems}
            className={classes.menuSelection}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

SortNav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectIntl(withStyles(sortNavStyle)(SortNav));
