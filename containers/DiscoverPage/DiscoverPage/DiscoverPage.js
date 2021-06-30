import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import queryString from 'query-string';
import axios from 'axios';

import collectionAPI from 'apis/collection/collection-api';
import influencerAPI from 'apis/influencer/influencer-api';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import {
  dispatchNotification,
  closeNotification
} from 'reducers/NotificationReducer';
import { openLoading, closeLoading } from 'reducers/ScreenLoadingReducer';
import {
  updateRouteParams,
  fromDiscoverPage
} from 'reducers/BreadcrumbsReducer';
import { injectIntl } from 'react-intl';
import { withStyles, withWidth, Grid } from '@material-ui/core';
import AddAlert from '@material-ui/icons/AddAlert';

import FilterChips from 'components/FilterChips';
import AlertModalDialog from 'components/AlertModalDialog';
import DiscoverCard from 'components/DiscoverCard';
import Pagination from 'components/Pagination/Pagination.jsx';
import Breadcrumbs from 'components/Breadcrumbs';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import FilterDrawer from 'components/FilterDrawer';
import AdvancedSearchToolbar from 'components/AdvancedSearchToolbar';

import Tracker from 'apis/tracker';
import FbTracker from 'apis/fbtracker';

import {
  stateToParams,
  paramsToUrl,
  parseFloatNumberString,
  parseParamsDiscoverPage,
  parseState,
  paramsToStateDiscoverPage,
  stateToParamsDiscoverPage,
  parseInfluenceType,
  parseChipDiv,
  parseNumber,
  parseCheckKMB,
  generatePageList,
  refineParamsChipFilter,
  parsePlatformDetail
} from 'utils';

import styles from './styles';

class DiscoverPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    let processedParam = props.location.search.slice(1);

    if (processedParam === '') {
      processedParam = props.userInfo.globalPermissions.isDemoAccount
        ? 'page_size=12&page_index=0&platform=page'
        : 'page_size=12&page_index=0&platform=fb';

      props.history.replace('/advanced-search?' + processedParam);

      return;
    }

    if (state.processedParam === processedParam) return null;

    const params = parseParamsDiscoverPage(processedParam);
    const stateDiscover = paramsToStateDiscoverPage(params);

    if (processedParam !== parseState(params)) {
      processedParam = parseState(params);
      props.history.replace(`/advanced-search?${processedParam}`);
    }

    return {
      params,
      processedParam,
      ...stateDiscover
    };
  }

  state = {
    params: {},
    pageIndex: 0,
    pageSize: 12,
    categories: [],
    collections: [],
    sortField: '',
    sortType: -1,
    sortByMenuItems: [],
    numberParams: 0,
    forceUpdate: false,
    action: 'discover',
    subscriptionPlan: {},
    sampleInfluencers: [],
    openFilterDrawer: false,
    selectedAllOnPage: false,
    selectedAllResults: false,
    selectedInfluencers: [],
    influencers: [],
    totalInfluencers: 0,
    totalInfluencersOnPage: 0,
    totalInfluencersPerSearch: 0,
    selectedCount: 0,
    openAlertModal: false,
    alertMessage: null,
    pinSnackbar: false
  };

  get filterChips() {
    const { params } = this.state;

    return parseChipDiv(params);
  }

  get postPerPages() {
    return [
      { itemValue: '6', itemName: '6 per page' },
      { itemValue: '12', itemName: '12 per page' }
    ];
  }

  fetchSampleInfluencers = async () => {
    const { openLoading, closeLoading, dispatchFetchResult } = this.props;
    const intl = this.props.intl;


    try {
      openLoading();

      const url =
        'https://spreadsheets.google.com/feeds/cells/1BKLTZwDCLdBm2GXIqIMPjL-0th1Iy-_ppqFrzkV2AIM/2/public/full?alt=json';

      const {
        data: {
          feed: { entry }
        }
      } = await axios.get(url, { timeout: 30000 });

      // (ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?
      const regex = /(ftp|http|https):\/\/(:w.+)\//i;

      const sample = _.uniq(
        entry
          .map(({ gs$cell: cell }) => cell)
          .filter(
            cell => cell.row !== '1' && cell.col !== '1' && cell.col !== '2'
          )
          .map(cell =>
            cell.inputValue.replace(
              /(ftp|http|https):\/\/([\w.]+)\/(influencers)\//i,
              ''
            )
          )
      );

      return new Promise(resolve => {
        this.setState({ sampleInfluencers: sample }, () => {
          closeLoading();
          resolve();
        });
      });
    } catch (error) {
      dispatchFetchResult(500);
    }
  };

  fetchCollections = async () => {
    const { openLoading, closeLoading, dispatchFetchResult } = this.props;
    const intl = this.props.intl;
    try {
      openLoading();

      const params = {
        select: ['id', 'name'].join(','),
        owner: 1
      };

      let collections = await collectionAPI.find(params);

      collections = collections.map(collection => ({
        ...collection,
        selected: false
      }));

      return new Promise(resolve => {
        this.setState({ collections }, () => {
          closeLoading();
          resolve();
        });
      });
    } catch (error) {
      dispatchFetchResult(error.code || 500);
    }
  };

  fetchData = async () => {
    const {
      platform,
      numberParams,
      processedParam,
      action,
      selectedAllResults,
      selectedInfluencers,
      sampleInfluencers
    } = this.state;
    const {
      openLoading,
      closeLoading,
      userInfo: { globalPermissions }
    } = this.props;
    const intl = this.props.intl;
    const { isDemoAccount, isBasicAccount, isPremiumAccount } =
      globalPermissions || {};

    try {
      openLoading();

      const parseInfluencerDetail = parsePlatformDetail(platform);

      const params = {
        ...queryString.parse(processedParam),
        number_params: numberParams,
        action
      };

      const {
        results: influencers,
        totalResult: totalInfluencers
      } = await influencerAPI.paginate(params);

      const totalInfluencersOnPage = influencers.length;

      let totalInfluencersPerSearch = totalInfluencers;

      if (isDemoAccount && totalInfluencersPerSearch > 24) {
        totalInfluencersPerSearch = 24;
      } else if (isBasicAccount && totalInfluencersPerSearch > 50) {
        totalInfluencersPerSearch = 50;
      } else if (isPremiumAccount && totalInfluencersPerSearch > 200) {
        totalInfluencersPerSearch = 200;
      }

      const newInfluencers = influencers
        .map(influencer => parseInfluencerDetail(influencer))
        .map(
          ({
            id,
            name,
            photoUrl,
            location,
            size,
            career,
            categories,
            platformCategories,
            facebookId,
            pageId,
            // instagramId,
            youtubeId,
            instaUserName,
            avgEngagement,
            avgInfluenceScore,
            totalFollowers,
            reachFollowers
          }) => {
            categories =
              categories && categories.length ? categories : ['updating'];

            let professions;

            if (platform === 'fb' || platform === 'insta') {
              professions = career && career.length ? career : ['updating'];
            } else {
              // case 'page' or 'youtube'
              professions =
                platformCategories && platformCategories.length
                  ? platformCategories
                  : ['updating'];
            }

            avgInfluenceScore =
              avgInfluenceScore && !Number.isNaN(avgInfluenceScore)
                ? parseFloatNumberString(avgInfluenceScore, 0)
                : 'N/A';
            const avgInfluenceScoreType = parseInfluenceType(avgInfluenceScore);

            avgEngagement = parseCheckKMB(avgEngagement);

            totalFollowers =
              reachFollowers !== undefined
                ? parseCheckKMB(reachFollowers)
                : parseCheckKMB(totalFollowers);

            let canViewDetail = true;

            if (isDemoAccount) {
              canViewDetail = sampleInfluencers.includes(id);
            }

            return {
              id,
              name,
              photoUrl,
              location,
              size,
              facebookId,
              categories,
              professions,
              pageId,
              // instagramId,
              youtubeId,
              instaUserName,
              avgInfluenceScore,
              avgInfluenceScoreType,
              avgEngagement,
              totalFollowers,
              canViewDetail
            };
          }
        );

      const newSelectedInfluencers = selectedAllResults
        ? []
        : selectedInfluencers;

      this.setState(
        {
          influencers: newInfluencers,
          totalInfluencers,
          totalInfluencersOnPage,
          totalInfluencersPerSearch,
          selectedInfluencers: newSelectedInfluencers
        },
        () => {
          closeLoading();
        }
      );
    } catch (error) {
      closeLoading();

      if (error.code === 339) {
        this.alertWhenFilterOverMaximumProfileSearch();

        return;
      }

      dispatchFetchResult(error.code || 500);
    }
  };

  componentDidMount() {
    const {
      name,
      location,
      minimizeSidebar,
      updateRouteParams,
      fromDiscoverPage,
      userInfo: { globalPermissions },
      width
    } = this.props;
    const { numberParams } = this.state;

    this.initScrollEvents();

    Tracker.pageview();
    FbTracker.pageview();

    minimizeSidebar(true);
    updateRouteParams(name, location);
    fromDiscoverPage();

    this.toggleFilterDrawer(width !== 'xs');

    this.fetchSampleInfluencers().then(async () => {
      await this.fetchCollections();

      const isDemoAccount = (globalPermissions || {}).isDemoAccount;

      if (isDemoAccount && numberParams > 5) {
        this.alertWhenFilterOverMaximumParams();

        return;
      }

      await this.fetchData();
    });
  }

  componentDidUpdate(prevProps) {
    const {
      updateRouteParams,
      fromDiscoverPage,
      name,
      location,
      userInfo: { globalPermissions },
      width
    } = this.props;
    const { processedParam, forceUpdate, numberParams } = this.state;

    if (prevProps.width !== width) {
      this.toggleFilterDrawer(width !== 'xs');
    }

    if (
      forceUpdate ||
      (processedParam !== prevProps.location.search.slice(1) &&
        processedParam !==
          parseState(
            parseParamsDiscoverPage(prevProps.location.search.slice(1))
          ))
    ) {
      this.setState(
        {
          forceUpdate: false
        },
        () => {
          updateRouteParams(name, location);
          fromDiscoverPage();

          this.fetchSampleInfluencers().then(async () => {
            await this.fetchCollections();

            const isDemoAccount = (globalPermissions || {}).isDemoAccount;

            if (isDemoAccount && numberParams > 5) {
              this.alertWhenFilterOverMaximumParams();

              return;
            }

            await this.fetchData();
          });
        }
      );
    }
  }

  componentWillUnmount() {
    this.destroyScrollEvents();
  }

  handleScrollY = () => {
    const {
      userInfo: { globalPermissions }
    } = this.props;
    const intl = this.props.intl;
    const { isDemoAccount } = globalPermissions || {};

    if (!isDemoAccount) return;

    const { scrollTop } = document.getElementById('content');
    const screenHeight = document.getElementById('content').offsetHeight;
    const pageHeight = document.getElementById('route').offsetHeight;
    const snackbarHeight = document.getElementById('snackbar').offsetHeight;

    const { pinSnackbar } = this.state;

    const offsetEnd =
      pageHeight - screenHeight - (pinSnackbar ? snackbarHeight : 0) - 100;

    this.setState({ pinSnackbar: scrollTop >= offsetEnd });
  };

  initScrollEvents = () => {
    document
      .getElementById(intl.formatMessage({ defaultMessage: 'content'}))
      .addEventListener(intl.formatMessage({ defaultMessage: 'ps-scroll-y'}), this.handleScrollY);
  };

  destroyScrollEvents = () => {
    document
      .getElementById(intl.formatMessage({ defaultMessage: 'content'}))
      .removeEventListener(intl.formatMessage({ defaultMessage: 'ps-scroll-y'}), this.handleScrollY);
  };

  applyFilter = values => {
    const {
      userInfo: { globalPermissions, isExternalAccount }
    } = this.props;
    const intl = this.props.intl;
    const { subscriptionPlan } = this.state;

    Tracker.event(intl.formatMessage({ defaultMessage: 'Advanced Search'}), intl.formatMessage({ defaultMessage: 'Apply Filter'}));

    const { isDemoAccount } = globalPermissions || {};

    if (
      isExternalAccount &&
      typeof subscriptionPlan.search === 'object' &&
      Object.keys(subscriptionPlan.search) > 0 &&
      subscriptionPlan.search.remaining <= 0
    ) {
      this.alertWhenFilterOverMaximumProfileSearch();

      return;
    }

    this.setState({ action: 'apply_filter' }, () => {
      const { pageSize, filterState } = this.state;

      const params = stateToParams({
        ...filterState,
        ...values,
        pageSize,
        pageIndex: 0
      });

      const newState = paramsToStateDiscoverPage(
        parseParamsDiscoverPage(paramsToUrl(params))
      );

      if (newState.numberParams > 5 && isDemoAccount) {
        this.alertWhenFilterOverMaximumParams();

        return;
      }

      const filterByAudience =
        params.audience_min_gender ||
        params.audience_min_location ||
        params.audience_min_age_range;

      const newParams = {
        ...params,
        sort_type: -1,
        sort_field:
          filterByAudience && params.categories
            ? 'avg_influencer_score'
            : filterByAudience
            ? 'detail_demographics'
            : params.categories
            ? 'avg_influencer_score'
            : 'total_followers'
      };

      const url = `/advanced-search?${paramsToUrl(newParams)}`;

      this.setState({ forceUpdate: true }, () => {
        this.props.history.push(url);
      });
    });
  };

  resetFilter = () => {
    this.setState({ action: 'reset_filter' }, () => {
      const url = this.props.userInfo.globalPermissions.isDemoAccount
        ? '/advanced-search?page_size=12&page_index=0&platform=page'
        : '/advanced-search?page_size=12&page_index=0&platform=fb';
      this.props.history.push(url);
    });
  };

  handleChangeFilterChips = (paramKey, paramIdx) => {
    const {
      userInfo: { isExternalAccount }
    } = this.props;
    const { subscriptionPlan } = this.state;

    if (
      isExternalAccount &&
      subscriptionPlan.search === 'object' &&
      Object.keys(subscriptionPlan.search) > 0 &&
      subscriptionPlan.search.remaining <= 0
    ) {
      this.alertWhenFilterOverMaximumProfileSearch();

      return;
    }

    this.setState({ action: 'change_chip_filter' }, () => {
      const newParams = { ...this.state.params, page_index: ['0'] };

      if (newParams.hasOwnProperty(paramKey)) {
        newParams[paramKey].splice(paramIdx, 1);
      }

      const newCleanedParams = Object.keys(newParams).reduce((object, key) => {
        if (newParams[key].length > 0) {
          object[key] = newParams[key];
        }

        return object;
      }, {});

      const params = refineParamsChipFilter(newCleanedParams);
      const url = `/advanced-search?${paramsToUrl(params)}`;

      this.props.history.push(url);
    });
  };

  handleClearAllFilters = () => {
    const { pageSize, platform } = this.state;
    const defaultParams = {
      page_index: ['0'],
      page_size: [pageSize],
      platform: [platform]
    };
    const url = `/advanced-search?${paramsToUrl(defaultParams)}`;

    this.setState({ action: 'discover' }, () => {
      this.props.history.push(url);
    });
  };

  addSelectedInfluencersToCollection = async () => {
    //
  };

  addAllInfluencersToCollection = async () => {
    //
  };

  toggleFilterDrawer = open => {
    return new Promise(resolve => {
      this.setState({ openFilterDrawer: open }, resolve);
    });
  };

  handleToggleFilterDrawer = () => {
    const { openFilterDrawer } = this.state;

    this.toggleFilterDrawer(!openFilterDrawer);
  };

  handleFilterDrawerClose = () => {
    this.toggleFilterDrawer(false);
  };

  handleFilterDrawerApply = values => {
    const { width } = this.props;

    if (width === 'xs') {
      this.toggleFilterDrawer(false);
    }

    this.applyFilter(values);
  };

  handleFilterDrawerReset = () => {
    const { width } = this.props;

    if (width === 'xs') {
      this.toggleFilterDrawer(false);
    }

    this.resetFilter();
  };

  handleHeaderSearch = fbIdOrName => {
    const { filterState } = this.state;

    this.applyFilter({ ...filterState, fbIdOrName });
  };

  handleSelectInfluencer = item => () => {
    const { selectedInfluencers, totalInfluencersOnPage } = this.state;

    let newSelectedInfluencers;

    if (selectedInfluencers.includes(item.id)) {
      // case un-selected
      newSelectedInfluencers = selectedInfluencers.filter(
        influencerId => influencerId !== item.id
      );
    } else {
      // case select
      newSelectedInfluencers = [...selectedInfluencers, item.id];
    }

    const selectedCount = newSelectedInfluencers.length;
    const selectedAllOnPage = selectedCount === totalInfluencersOnPage;

    this.setState({
      selectedAllOnPage,
      selectedAllResults: false,
      selectedInfluencers: newSelectedInfluencers,
      selectedCount
    });
  };

  handleSelectAllOnPage = checked => {
    const { influencers } = this.state;

    const selectedInfluencers = checked ? influencers.map(({ id }) => id) : [];
    const selectedCount = selectedInfluencers.length;

    this.setState({
      selectedAllOnPage: checked,
      selectedAllResults: false,
      selectedInfluencers,
      selectedCount
    });
  };

  handleSelectAllResults = () => {
    const { influencers, totalInfluencersPerSearch } = this.state;

    const selectedInfluencers = influencers.map(({ id }) => id);
    const selectedCount = totalInfluencersPerSearch;

    this.setState({
      selectedAllOnPage: true,
      selectedAllResults: true,
      selectedInfluencers,
      selectedCount
    });
  };

  handleChangeSortBy = sortField => {
    const params = stateToParamsDiscoverPage({
      ...this.state,
      sortField,
      pageIndex: 0
    });
    const url = `/advanced-search?${paramsToUrl(params)}`;

    this.setState({ action: 'sort' }, () => {
      this.props.history.push(url);
    });
  };

  handleChangeShowing = pageSize => {
    const params = stateToParamsDiscoverPage({
      ...this.state,
      pageSize,
      pageIndex: 0
    });
    const url = `/advanced-search?${paramsToUrl(params)}`;

    this.setState({ action: 'change_pagesize' }, () => {
      this.props.history.push(url);
    });
  };

  handleChangePageIndex = pageIndex => {
    const params = stateToParamsDiscoverPage({ ...this.state, pageIndex });
    const url = `/advanced-search?${paramsToUrl(params)}`;

    this.setState({ action: 'paginate' }, () => {
      this.props.history.push(url);
    });
  };

  handleSelectCollection = (newCollections, item, checked) => {
    const { openLoading, closeLoading, dispatchNotification } = this.props;
    const intl = this.props.intl;
    const {
      processedParam: query,
      selectedAllResults,
      selectedInfluencers,
      selectedCount
    } = this.state;

    if (!selectedCount) {
      dispatchNotification({
        open: true,
        icon: AddAlert,
        color: 'danger',
        message: intl.formatMessage({ defaultMessage: 'Please select influencers to add to collection'})
      });

      return;
    }

    this.setState({ collections: newCollections }, async () => {
      try {
        openLoading();

        const { id: collectionId, name: collectionName } = item;

        if (selectedAllResults) {
          await influencerAPI.addAllInfluencersToCollection(query, [
            collectionId
          ]);
        } else {
          await collectionAPI.addInfluencersToCollection(
            collectionId,
            selectedInfluencers
          );
        }

        let { collections } = this.state;

        collections = collections.map(collection => ({
          ...collection,
          selected: false
        }));

        this.setState(
          {
            selectedAllOnPage: false,
            selectedAllResults: false,
            selectedInfluencers: [],
            selectedCount: 0,
            collections
          },
          () => {
            closeLoading();

            dispatchNotification({
              open: true,
              icon: AddAlert,
              color: 'success',
              message: `${parseNumber(
                selectedCount
              )} influencer(s) added to ${collectionName}`
            });
          }
        );
      } catch (error) {
        closeLoading();

        let { collections } = this.state;

        collections = collections.map(collection => ({
          ...collection,
          selected: false
        }));

        if (error.code === 340) {
          this.setState({ collections }, () => {
            this.alertWhenAddOverMaximumInfluencersToCollection();
          });
        }
      }
    });
  };

  handleAddNewCollection = async collectionName => {
    const {
      openLoading,
      closeLoading,
      dispatchNotification,
      dispatchFetchResult
    } = this.props;
    const intl = this.props.intl;
    const { collections } = this.state;

    try {
      openLoading();

      const { _id: id, name } = await collectionAPI.create({
        name: collectionName
      });

      const newCollections = [{ id, name, selected: false }, ...collections];

      this.setState({ collections: newCollections }, () => {
        closeLoading();

        dispatchNotification({
          open: true,
          icon: AddAlert,
          color: 'success',
          message: intl.formatMessage({ defaultMessage:  `Collection {collectionName} is created`} ,{collectionName : collectionName})
        });
      });
    } catch (error) {
      closeLoading();
      dispatchFetchResult(error.code || 500);
    }
  };

  openAlertModal = message => {
    this.setState({ openAlertModal: true, alertMessage: message });
  };

  handleCloseAlertModal = () => {
    this.setState({ openAlertModal: false, alertMessage: null });
  };

  handleOpenRejectedViewDetailModal = () => {
    this.alertCanNotViewDetailProfile();
  };

  alertWhenFilterOverMaximumParams = () => {
    this.openAlertModal(
      intl.formatMessage({ defaultMessage: `You're in a demo account that can't have more than 5 parameters for each filters. Please contact us to find more!`})
    );
  };

  alertWhenFilterOverMaximumProfileSearch = () => {
    this.openAlertModal(
      intl.formatMessage({ defaultMessage: `You've exceeded the maximum of number profile searching. Please contact us for further support & information.`})
    );
  };

  alertCanNotViewDetailProfile = () => {
    this.openAlertModal(
      intl.formatMessage({ defaultMessage: `Your account is not allowed to view this influencer's full profile!`})
    );
  };

  alertWhenAddOverMaximumInfluencersToCollection = () => {
    this.openAlertModal(
      intl.formatMessage({ defaultMessage: `You've exceeded the maximum number of profile can be added to a collection. Please contact us for further support & information.`})
    );
  };

  renderHeader = () => {
    const { drawHeader, name, bcRoutes, isFromDiscoverPage } = this.props;
    const {
      params: { fb_id_name }
    } = this.state;

    const searchValue = Array.isArray(fb_id_name) ? fb_id_name.join(',') : '';

    return drawHeader({
      name: (
        <Breadcrumbs
          name={name}
          bcRoutes={bcRoutes}
          isFromDiscoverPage={isFromDiscoverPage}
        />
      ),
      onSearch: this.handleHeaderSearch,
      value: searchValue
    });
  };

  render() {
    const { classes, userInfo } = this.props;  
    const intl = this.props.intl;
    const {
      sortField,
      pageSize,
      collections,
      sortByMenuItems,
      openFilterDrawer,
      influencers,
      totalInfluencers,
      totalInfluencersOnPage,
      totalInfluencersPerSearch,
      selectedAllOnPage,
      selectedAllResults,
      selectedInfluencers,
      selectedCount,
      openAlertModal,
      alertMessage,
      pinSnackbar
    } = this.state;

    const {
      isDemoAccount,
      isBasicAccount,
      isPremiumAccount,
      canCreateCollection: displayCollectionDropdown
    } = userInfo.globalPermissions || {};

    let generatedPages = generatePageList(
      {
        ...this.state,
        totalResult: totalInfluencersPerSearch,
        realTotalResult: totalInfluencers,
        isDemoAccount,
        isBasicAccount,
        isPremiumAccount
      },
      this.handleChangePageIndex
    );
    generatedPages = generatedPages.length > 3 ? generatedPages : [];

    return (
      <div className={classes.root}>
        <div
          className={clsx({
            [classes.pageWrapper]: true,
            [classes.pageWrapperCollapsed]: openFilterDrawer
          })}
        >
          {this.renderHeader()}
          <div className={classes.content}>
            <FilterChips
              className={classes.filterChips}
              items={this.filterChips}
              onRemove={this.handleChangeFilterChips}
              onClear={this.handleClearAllFilters}
            />
            <AdvancedSearchToolbar
              totalItems={totalInfluencers}
              buttonToggleFilterDrawerProps={{
                open: openFilterDrawer,
                onChange: this.handleToggleFilterDrawer
              }}
              checkedBoxSelectAllProps={{
                selectedAllOnPage,
                selectedAllResults,
                selectedCount: selectedCount,
                onSelectAllOnPage: this.handleSelectAllOnPage,
                onSelectAllResults: this.handleSelectAllResults,
                disabled: !totalInfluencersOnPage
              }}
              dropdownSortByProps={{
                options: sortByMenuItems,
                onChange: this.handleChangeSortBy,
                value: sortField
              }}
              dropdownShowingProps={{
                options: this.postPerPages,
                onChange: this.handleChangeShowing,
                value: pageSize
              }}
              dropdownCollectionProps={{
                display: displayCollectionDropdown,
                items: collections,
                onSelect: this.handleSelectCollection,
                onAddNew: this.handleAddNewCollection
              }}
            />
            <Grid className={classes.listInfluencers} container>
              {influencers.map(influencer => {
                const selected = selectedInfluencers.includes(influencer.id);
                return (
                  <Grid
                    key={influencer.id}
                    className={classes.influencerCard}
                    item
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    <DiscoverCard
                      viewDetailInfluencer={influencer.canViewDetail}
                      isDemoAccount={isDemoAccount}
                      checkedCheckbox={selected}
                      onClickSelect={this.handleSelectInfluencer(influencer)}
                      openModalViewDetail={
                        this.handleOpenRejectedViewDetailModal
                      }
                      {...influencer}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Pagination color="influencer" pages={generatedPages} />
          </div>
        </div>
        <FilterDrawer
          open={openFilterDrawer}
          onClose={this.handleFilterDrawerClose}
          onApply={this.handleFilterDrawerApply}
          onReset={this.handleFilterDrawerReset}
          userInfo={userInfo}
          {...this.state.filterState}
        />
        {openAlertModal && (
          <AlertModalDialog
            open
            onCloseClick={this.handleCloseAlertModal}
            onClickButton={this.handleCloseAlertModal}
            content={alertMessage}
          />
        )}
        {isDemoAccount && (
          <Snackbar
            id="snackbar"
            className={classes.snackBar}
            className={clsx({
              [classes.snackBar]: true,
              [classes.snackBarPinned]: pinSnackbar,
              [classes.snackBarShrink]: openFilterDrawer
            })}
            open
            isDemo
            place="bc"
            color="success"
            message="You are experiencing a SociaLift demo with limited features: maximum 5 parameters for each filter and maximum 24 displayed results per submit. Detailed information of profiles will also be limit for viewing: 12 sample influencer/category. Get in touch with us if you need further support & information."
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ discoverPage, breadcrumbs, userInfo }) => ({
  ...discoverPage,
  ...breadcrumbs,
  userInfo
});

const mapDispatchToProps = {
  dispatchNotification,
  closeNotification,
  openLoading,
  closeLoading,
  updateRouteParams,
  fromDiscoverPage,
  dispatchFetchResult
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: 'DiscoverPage' }),
    withWidth()
  )(DiscoverPage)
) ;
