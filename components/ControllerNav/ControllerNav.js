import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core';

import NumberResults from 'components/NumberResults';
import ButtonNav from 'components/ButtonNav';
import SortNav from 'components/SortNav';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import ControllerContainer from 'components/ControllerContainer';
import LeftRightContainer from 'components/LeftRightContainer';
import { injectIntl } from 'react-intl';

class ControllerNav extends React.Component {
  render() {
    const {
      numberResults,
      onClickViewList,
      onClickViewTable,
      onClickSort,
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
      selectedCollections,
      numberSelectedInfluencer,
      selectedInfluencerId,
      activeSort,
      isSelectAll,
      addCollection,
      disabledStatus,
      onClickSelectAll,
      isDisplaySelectAll,
      isShowCollectionDropDown
    } = this.props;
    const intl = props.intl;

    return (
      <ControllerContainer
        topContent={
          <LeftRightContainer
            leftContent={
              <NumberResults number={ intl.formatMessage({ defaultMessage: `{numberResults} results found`},{numberResults: numberResults}) } />
            }
            rightContent={
              <ButtonNav
                onClickViewList={onClickViewList}
                onClickViewTable={onClickViewTable}
                onClickSort={onClickSort}
                activeSort={activeSort}
              />
            }
          />
        }
        bottomContent={
          <SortNav
            selectedInfluencerId={selectedInfluencerId}
            sortBySelectValue={sortBySelectValue}
            sortByMenuItems={sortByMenuItems}
            sortByOnChange={sortByOnChange}
            showingSelectValue={showingSelectValue}
            showingMenuItems={showingMenuItems}
            showingOnChange={showingOnChange}
            checkedValueSelectAllButton={checkedValueSelectAllButton}
            onChangeSelectAllButton={onChangeSelectAllButton}
            collectionList={collectionList}
            onChangeCheckboxMenuItem={onChangeCheckboxMenuItem}
            dropdownListSelected={selectedCollections}
            isSelectAll={isSelectAll}
            numberSelected={numberSelectedInfluencer}
            disabledStatus={disabledStatus}
            addCollection={addCollection}
            onClickSelectAll={onClickSelectAll}
            isDisplaySelectAll={isDisplaySelectAll}
            isShowCollectionDropDown={isShowCollectionDropDown}
          />
        }
      />
    );
  }
}

export default injectIntl(ControllerNav);
