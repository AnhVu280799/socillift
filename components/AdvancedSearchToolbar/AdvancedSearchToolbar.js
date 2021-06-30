import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles, Grid, Typography, Button, Icon } from '@material-ui/core';

import SelectAllCheckBox from 'components/SelectAllCheckBox';
import CollectionDropdown from 'components/CollectionDropdown';
import MenuSelection from 'components/MenuSelection';

import { parseNumber } from 'utils';

import styles from './styles';
import { injectIntl } from 'react-intl';

class AdvancedSearchToolbar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    totalItems: PropTypes.number.isRequired,
    buttonToggleFilterDrawerProps: PropTypes.shape({
      open: PropTypes.bool.isRequired,
      onChange: PropTypes.func.isRequired
    }).isRequired,
    dropdownSortByProps: PropTypes.shape({
      options: PropTypes.array.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    }).isRequired,
    dropdownShowingProps: PropTypes.shape({
      options: PropTypes.array.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    }).isRequired,
    checkedBoxSelectAllProps: PropTypes.shape({
      selectedAllOnPage: PropTypes.bool.isRequired,
      selectedAllResults: PropTypes.bool.isRequired,
      selectedCount: PropTypes.number.isRequired,
      onSelectAllOnPage: PropTypes.func.isRequired,
      onSelectAllResults: PropTypes.func.isRequired,
      disabled: PropTypes.bool
    }).isRequired,
    dropdownCollectionProps: PropTypes.shape({
      display: PropTypes.bool.isRequired,
      items: PropTypes.array.isRequired,
      onSelect: PropTypes.func.isRequired,
      onAddNew: PropTypes.func.isRequired
    })
  };

  handleToggleFilterDrawer = e => {
    this.props.buttonToggleFilterDrawerProps.onChange(e);
  };

  handleSelectAllOnPage = e => {
    this.props.checkedBoxSelectAllProps.onSelectAllOnPage(e);
  };

  handleSelectAllResults = e => {
    this.props.checkedBoxSelectAllProps.onSelectAllResults(e);
  };

  handleSelectCollection = (newDropdownList, item, checkedState) => {
    this.props.dropdownCollectionProps.onSelect(
      newDropdownList,
      item,
      checkedState
    );
  };

  handleAddNewCollection = collectionName => {
    this.props.dropdownCollectionProps.onAddNew(collectionName);
  };

  handleSelectSortBy = e => {
    this.props.dropdownSortByProps.onChange(e.target.value);
  };

  handleSelectShowing = e => {
    this.props.dropdownShowingProps.onChange(e.target.value);
  };

  renderTotalItems = () => {
    const { classes, totalItems } = this.props;
    const intl = this.props.intl;
    let totalItemsText = parseNumber(totalItems);
    totalItemsText += totalItems === 1 ? intl.formatMessage({ defaultMessage: ` result found` }) : intl.formatMessage({ defaultMessage: ` results found` });

    return (
      <Typography
        variant="inherit"
        className={classes.totalItems}
        align="center"
      >
        {totalItemsText}
      </Typography>
    );
  };

  renderButtonToggleFilterDrawer = () => {
    const {
      classes,
      buttonToggleFilterDrawerProps: { open }
    } = this.props;
    const intl = this.props.intl;
    return (
      <Button
        variant="fab"
        className={clsx({
          [classes.buttonToggleFilterDrawer]: true,
          [classes.buttonToggleFilterDrawerActive]: open
        })}
        onClick={this.handleToggleFilterDrawer}
      >
        <Icon
          className={clsx({
            [classes.buttonIcon]: true,
            [classes.buttonIconActive]: open
          })}
        >
         {intl.formatMessage({ defaultMessage: " filter_list"})}
        </Icon>
      </Button>
    );
  };

  renderCheckedBoxSelectAll = () => {
    const {
      classes,
      checkedBoxSelectAllProps: {
        selectedAllOnPage,
        selectedAllResults,
        selectedCount,
        disabled
      }
    } = this.props;

    let checked = false;
    let indeterminate = false;

    if (selectedAllOnPage || selectedAllResults) {
      checked = true;
      indeterminate = false;
    } else if (selectedCount) {
      checked = true;
      indeterminate = true;
    }

    return (
      <SelectAllCheckBox
        className={classes.checkboxSelectAll}
        checked={checked}
        selectedCount={selectedCount}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={this.handleSelectAllOnPage}
      />
    );
  };

  renderSelectAllResultsFound = () => {
    const {
      classes,
      checkedBoxSelectAllProps: { selectedAllOnPage, selectedAllResults }
    } = this.props;
    const intl = this.props.intl;

    if (!selectedAllOnPage || selectedAllResults) return null;

    return (
      <div className={classes.buttonSelectAllResultWrapper}>
        <Typography
          variant="inherit"
          className={classes.buttonSelectAllResult}
          onClick={this.handleSelectAllResults}
          align="center"
        >
           {intl.formatMessage({ defaultMessage: "select all results found"})}
        </Typography>
      </div>
    );
  };

  renderDropdownCollection = () => {
    const {
      classes,
      dropdownCollectionProps: { items, display }
    } = this.props;
    const intl = this.props.intl;

    if (!display) return null;

    return (
      <CollectionDropdown
        className={classes.dropdownCollection}
        dropdownList={items}
        onChangeCheckboxMenuItem={this.handleSelectCollection}
        isShow
        onCollectionAdd={this.handleAddNewCollection}
        dropdownText={intl.formatMessage ({defaultMessage: "Add to Collection"})}
        dropdownIcon={intl.formatMessage ({defaultMessage: "bookmark_border"})}
        pannelTitle={intl.formatMessage ({defaultMessage: "ADD NEW COLLECTION"})}
        cancelText={intl.formatMessage ({defaultMessage: "CANCEL"})}
        addText={intl.formatMessage ({defaultMessage: "ADD"})}
      />
    );
  };

  renderSortByDropDown = () => {
    const {
      classes,
      dropdownSortByProps: { options, value }
    } = this.props;
    const intl = this.props.intl;

    return (
      <MenuSelection
        className={classes.dropdownSortBy}
        selectValue={value}
        onChange={this.handleSelectSortBy}
        iconText=  "Sort by:" /*{intl.formatMessage ({defaultMessage: "Sort by:"})}*/
        menuItems={options}
      />
    );
  };

  renderShowingDropDown = () => {                       
    const {
      classes,
      dropdownShowingProps: { options, value }
    } = this.props;
    const intl = this.props.intl;

    return (
      <MenuSelection
        className={classes.dropdownShowing}
        selectValue={value}
        onChange={this.handleSelectShowing}
        iconText= "Showing:" /*{intl.formatMessage ({defaultMessage: "Showing:"})}*/
        menuItems={options}
      />
    );
  };

  render() {
    const { classes, className } = this.props;

    return (
      <Grid container className={clsx(classes.root, className)}>
        <Grid
          className={classes.buttonToggleFilterDrawerWrapper}
          item
          xs={12}
          md={6}
        >
          {this.renderButtonToggleFilterDrawer()}
        </Grid>
        <Grid className={classes.totalItemsWrapper} item xs={12} md={6}>
          {this.renderTotalItems()}
        </Grid>
        <Grid className={classes.groupOne} item xs={12} md={6} container>
          <Grid className={classes.dropdownSortByWrapper} item xs={12}>
            {this.renderSortByDropDown()}
          </Grid>
          <Grid className={classes.dropdownShowingWrapper} item xs={12}>
            {this.renderShowingDropDown()}
          </Grid>
        </Grid>
        <Grid className={classes.groupTwo} item xs={12} md={6} container>
          <Grid className={classes.checkboxSelectAllWrapper} item xs={12}>
            {this.renderCheckedBoxSelectAll()}
            {this.renderSelectAllResultsFound()}
          </Grid>
          <Grid className={classes.dropdownCollectionWrapper} item xs={12}>
            {this.renderDropdownCollection()}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default injectIntl(
  withStyles(styles, { name: 'AdvancedSearchToolbar' })(
    AdvancedSearchToolbar
  )
) ;
 