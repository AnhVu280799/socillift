import React from 'react';
import styles from './CollectionDetailStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, MenuItem, TextField } from '@material-ui/core';
import AddAlert from '@material-ui/icons/AddAlert';
import AlertModalDialog from 'components/AlertModalDialog';
import { connect } from 'react-redux';
// import _ from 'lodash';

// core components
import TextInput from 'components/TextInput';
import Selector from 'components/Selector';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import DiscoverCard from 'components/DiscoverCard';
import Pagination from 'components/Pagination/Pagination.jsx';
import CollectionDetailSortNav from 'components/CollectionDetailSortNav';
import FormContainer from 'components/FormContainer';
import ShareCollectionModalDialog from 'components/ShareCollectionModalDialog';
import ButtonInf from 'components/CustomButtons/ButtonInf';
import CustomPopupState from 'components/CustomPopupState/CustomPopupState.jsx';
import CollectionModalDialog from 'components/CollectionModalDialog';
import Breadcrumbs from 'components/Breadcrumbs';
import CustomizedTooltip from 'components/CustomizedTooltip';
import ConfirmationPopup from 'components/ConfirmationPopup';
import cx from 'classnames';
import {
  dispatchNotification
  // closeNotification
} from 'reducers/NotificationReducer';
import Tracker from 'apis/tracker';
import FbTracker from 'apis/fbtracker';

import { dispatchFetchResult } from 'reducers/FetchResultReducer';

import {
  getCollection,
  patchCollection,
  moveInfluencerInCollection,
  addQueryToCollection,
  deleteCollection,
  getAllUsers,
  exportInfluencer,
  getCollections,
  postCollection
} from '../../apis/api';

import { openLoading, closeLoading } from 'reducers/ScreenLoadingReducer';

import {
  updateRouteParams,
  fromCollection,
  updateRouteCollectionName
} from 'reducers/BreadcrumbsReducer';

import {
  paramsToUrl,
  parseFloatNumberString,
  parseParams,
  stateToParamsCollectionDetail,
  paramsToStateCollectionDetail,
  parseInfluenceType,
  parseKMB,
  parseCheckKMB,
  generatePageList,
  parseTime,
  parsePlatformDetail
} from 'utils';

import { options as sortFieldOptions } from 'constants/collectionDetailSortField';
import { options as perPageOptions } from 'constants/collectionDetailPerPage';
import { options as platformOptions } from 'constants/collectionDetailPlatform';
import InfluencerStates from 'constants/influencerstates';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import { ruleRunner } from 'utils/ruleRunner.js';
import { minLength, maxLength } from 'utils/rules.js';

const validationRulesDesc = ruleRunner(
  'descriptionError',
  'description',
  maxLength(500)
);
const validationRulesName = ruleRunner(
  'nameError',
  'name',
  minLength(2),
  maxLength(80)
);
const VisibleCanExportCollection = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo &&
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canExportCollection,
  wrapperDisplayName: 'visibleCanExportCollection',
  FailureComponent: () => ''
})(({ children }) => children);

class CollectionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      userList: [],
      userListNotShare: [],
      influencerList: [],
      processedParam: '',
      userInfo: null,
      collection: null,
      collectionId: '',
      collectionName: '',
      collectionOwner: '',
      collectionOwnerName: '',
      shareName: [],
      lastUpdatedDate: '',
      collectionDescription: '',
      totalResult: 0,
      shareUser: [],
      selectedUser: [],
      forceUpdate: false,
      allUser: [],
      sortField: { value: 'total_followers', label: 'Total Followers' },
      showing: { value: 'influencers_page_size', label: '12 Per Page' },
      influencerName: '',
      openShareModal: false,
      openEditModal: false,
      selectedInfluencerList: {},
      selectedInfluencerIdCurrentPage: [],
      isSelectAll: true,
      selectAll: false,
      collectionEdit: {
        name: '',
        description: ''
      },
      collectionShare: {
        shareIds: []
      },
      collectionOtherList: [],
      nameError: false,
      descriptionError: false,
      displaySelectAll: false,
      allResults: false,
      // allInfluencerId: [],
      stateField: '',
      nameField: '',
      platformShowing: '',
      platform: 'fb',
      openModal: false,
      openExceedNumberOfInfluencerModal: false,
      openConfirmationPopupDeleteCollection: false,
      openConfirmationPopupRemoveInfluencer: false
    };
  }

  fetchData = (platform, collectionId, processedParam) => {
    const parsePlatform = parsePlatformDetail(platform);
    getAllUsers(({ data }) => {
      this.setState(
        {
          allUser: data
            ? data.reduce((prevIn, curr) => {
                const { _id, ...rest } = curr;
                prevIn[_id] = rest;
                return prevIn;
              }, {})
            : [],
          userList: data
        },
        () => {
          // Get collection after get all users
          getCollection(collectionId, processedParam, ({ result }) => {
            const selectedInfluencerList = this.state.allResults
              ? {}
              : this.state.selectedInfluencerList;
            const newInfluencerList = result.listInfluencers.results
              ? result.listInfluencers.results.map(result => ({
                  ...parsePlatform(result),
                  selected: selectedInfluencerList[result.id]
                    ? selectedInfluencerList[result.id]
                    : false
                }))
              : [];
            // const newInfluencerList = result.listInfluencers.results ? result.listInfluencers.results.map(result => ({ ...result, selected: this.state.selectedInfluencerList[result.id] ? this.state.selectedInfluencerList[result.id] : false })) : []
            // const newSelectedInfluencerIdCurrentPage = newInfluencerList.filter(
            //   ({ id }) => this.state.selectedInfluencerList[id] ? true : false).map(({ id }) => id)
            const newSelectedInfluencerIdCurrentPage = newInfluencerList
              .filter(({ id }) => (selectedInfluencerList[id] ? true : false))
              .map(({ id }) => id);

            this.props.updateRouteCollectionName(result.name); // Update Route Collection name
            this.setState(
              {
                collection: result ? result : [],
                collectionDescription: result.description
                  ? result.description
                  : '',
                collectionName: result.name ? result.name : '',
                collectionOwner: result.owner ? result.owner : '',
                collectionOwnerName: result.owner
                  ? this.state.allUser[result.owner].name
                  : '',
                shareName: result.shareIds
                  ? result.shareIds
                      .filter(
                        shareId =>
                          typeof this.state.allUser[shareId] !== 'undefined'
                      )
                      .map(shareId => this.state.allUser[shareId].name)
                  : [],
                lastUpdatedDate: result.lastUpdatedDate
                  ? parseTime(result.lastUpdatedDate)
                  : '',
                totalResult: result.listInfluencers.totalResult
                  ? result.listInfluencers.totalResult
                  : 0,
                shareUser:
                  result.shareIds && this.state.allUser
                    ? result.shareIds
                        .filter(
                          idItem =>
                            typeof this.state.allUser[idItem] !== 'undefined'
                        )
                        .map(idItem =>
                          Object({
                            id: idItem,
                            name: this.state.allUser[idItem].name,
                            role: this.state.allUser[idItem].role.name
                          })
                        )
                    : [],
                influencerList: newInfluencerList,
                selectedInfluencerList: selectedInfluencerList,
                selectedInfluencerIdCurrentPage: newSelectedInfluencerIdCurrentPage,
                selectAll: newSelectedInfluencerIdCurrentPage.length > 0,
                isSelectAll:
                  newInfluencerList.length ===
                  newSelectedInfluencerIdCurrentPage.length,
                displaySelectAll: false,
                allResults: false
              },
              () => {
                getCollections(
                  'page_size=10000&page_index=0&owner=1',
                  false,
                  ({ data }) => {
                    this.setState(
                      {
                        collectionOtherList: data
                          .filter(item => item.id !== this.state.collectionId)
                          .map(item => ({
                            ...item,
                            selected: false
                          }))
                      },
                      () => this.props.closeLoading()
                    );
                  }
                ).catch(({ status }) => {
                  this.props.closeLoading();
                  this.props.dispatchFetchResult(status);
                });
              }
            );
          }).catch(({ status }) => {
            this.props.closeLoading();
            this.props.dispatchFetchResult(status);
          });
        }
      );
    }).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };
  componentDidMount() {
    Tracker.pageview();
    FbTracker.pageview();
    this.props.openLoading();
    this.props.updateRouteParams(this.props.name, this.props.location);
    this.props.fromCollection();
    const { collectionId, processedParam, platform } = this.state;
    this.fetchData(platform, collectionId, processedParam);
  }
  static getDerivedStateFromProps(props, state) {
    const collectionId = props.match.params.id;
    let processedParam = props.location.search.slice(1);
    if (state.processedParam === processedParam) return null;
    const params = parseParams(processedParam);
    const stateCollectionDetail = paramsToStateCollectionDetail(params);
    return {
      params,
      collectionId,
      processedParam,
      ...stateCollectionDetail
    };
  }
  componentDidUpdate(prevProps) {
    const { processedParam, forceUpdate, collectionId, platform } = this.state;
    if (forceUpdate || processedParam !== prevProps.location.search.slice(1)) {
      this.setState(
        {
          forceUpdate: false
        },
        () => {
          this.props.openLoading();
          this.props.updateRouteParams(this.props.name, this.props.location);
          this.props.fromCollection();
        }
      );
      this.fetchData(platform, collectionId, processedParam);
    }
  }
  componentWillUnmount() {
    this.props.closeLoading();
  }
  toPage = pageIndex => {
    const params = stateToParamsCollectionDetail({ ...this.state, pageIndex });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.props.history.push(url);
  };
  changeSortBy = sortField => {
    const params = stateToParamsCollectionDetail({
      ...this.state,
      sortField,
      pageIndex: 0
    });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.props.history.push(url);
  };
  changePlatform = platformShowing => {
    const params = stateToParamsCollectionDetail({
      ...this.state,
      platformShowing,
      pageIndex: 0
    });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.props.history.push(url);
  };
  changePageSize = showing => {
    const params = stateToParamsCollectionDetail({
      ...this.state,
      showing,
      pageIndex: 0
    });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.props.history.push(url);
  };
  changeFilterName = () => {
    const params = stateToParamsCollectionDetail({
      ...this.state,
      pageIndex: 0
    });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.props.history.push(url);
  };
  changeFilterField = state => {
    const params = stateToParamsCollectionDetail({
      ...this.state,
      filterValues: state,
      pageIndex: 0
    });
    const url = `/collections/${this.state.collectionId}?${paramsToUrl(
      params
    )}`;
    this.state.stateField = state;
    this.props.history.push(url);
  };
  openShareCollection = () => {
    const { collectionShare } = this.state;
    collectionShare.id = this.state.collection.id;
    this.setState({
      openShareModal: true,
      userListNotShare:
        this.state.userList &&
        this.state.collection &&
        this.state.collection.shareIds
          ? this.state.userList
              .filter(
                user =>
                  !this.state.collection.shareIds.includes(user._id) &&
                  user._id !== this.state.collection.owner
              )
              .map(({ _id, name }) => ({ value: _id, label: name }))
          : this.state.userList && this.state.collection
          ? this.state.userList
              .filter(user => user._id !== this.state.collection.owner)
              .map(({ _id, name }) => ({ value: _id, label: name }))
          : []
    });
  };
  closeShareDialog = () => {
    const { collectionShare } = this.state;
    collectionShare.shareIds = [];
    this.setState({
      openShareModal: false,
      selectedUser: []
    });
  };
  changeShareIds = options => {
    const { collectionShare } = this.state;
    collectionShare.shareIds = options
      ? options.map(item => item.value)
      : collectionShare.shareIds;
    this.setState({
      selectedUser: options
    });
  };
  shareUserCollection = () => {
    const {
      collectionName,
      collectionShare,
      selectedUser,
      platform
    } = this.state;
    if (
      !Array.isArray(collectionShare.shareIds) ||
      collectionShare.shareIds.length <= 0
    ) {
      this.props.dispatchNotification({
        message: 'Please select a user to share',
        icon: AddAlert,
        open: true,
        color: 'danger'
      });
      return;
    }
    this.props.openLoading();
    patchCollection(
      {
        id: collectionShare.id,
        share_ids: collectionShare.shareIds,
        share_ids_action: 'add',
        platform: platform
      },
      () => {
        this.setState(
          {
            openShareModal: true,
            forceUpdate: true,
            selectedUser: [],
            userListNotShare: this.state.userListNotShare.filter(
              user => !collectionShare.shareIds.includes(user.value)
            ),
            shareUser: this.state.shareUser.concat(
              collectionShare.shareIds.map(idItem =>
                Object({
                  id: idItem,
                  name: this.state.allUser[idItem].name,
                  role: this.state.allUser[idItem].role.name
                })
              )
            )
          },
          () => {
            this.props.closeLoading();
            this.props.dispatchNotification({
              message: `Add successfully ${selectedUser
                .map(item => item.label)
                .join(', ')} to share list of  ${collectionName} collection.`,
              open: true,
              icon: AddAlert
            });
          }
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
      if (status === 330) {
        this.props.dispatchNotification(
          {
            message: `Can not share the collection with not exist user. Please try another.`,
            open: true,
            icon: AddAlert,
            color: 'danger'
          },
          4000
        );
      }
    });
  };
  removeShareUser = id => {
    const {
      collectionName,
      collectionId,
      userListNotShare,
      platform
    } = this.state;
    this.props.openLoading();
    userListNotShare.push({ value: id, label: this.state.allUser[id].name });
    patchCollection(
      {
        id: collectionId,
        share_ids: id,
        share_ids_action: 'remove',
        platform: platform
      },
      () => {
        this.setState(
          {
            openShareModal: true,
            forceUpdate: true,
            shareUser: this.state.shareUser.filter(user => user.id !== id)
          },
          () => {
            this.props.closeLoading();
            this.props.dispatchNotification({
              message: `Remove ${this.state.allUser[id].name} successfully in share list of ${collectionName} collection.`,
              open: true,
              icon: AddAlert
            });
          }
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };
  openEditCollection = () => {
    this.setState({
      openEditModal: true,
      collectionEdit: {
        id: this.state.collection.id,
        name: this.state.collection.name,
        description: this.state.collection.description
      },
      ...validationRulesName(this.state.collection.name),
      ...validationRulesDesc(this.state.collection.description)
    });
  };
  closeEditDialog = () => {
    this.setState({
      openEditModal: false
    });
  };
  onChangeCollectionName = name => {
    const { collectionEdit } = this.state;
    collectionEdit.name = name;
    this.setState({
      collectionEdit,
      ...validationRulesName(name)
    });
  };
  onChangeCollectionDescription = description => {
    const { collectionEdit } = this.state;
    collectionEdit.description = description;
    this.setState({
      collectionEdit,
      ...validationRulesDesc(description)
    });
  };
  editCollection = () => {
    const {
      collectionEdit,
      platform,
      nameError,
      descriptionError
    } = this.state;

    if (
      collectionEdit.name.trim() === '' ||
      nameError !== false ||
      descriptionError !== false
    ) {
      return;
    }

    collectionEdit.name = collectionEdit.name ? collectionEdit.name.trim() : '';
    collectionEdit.description = collectionEdit.description
      ? collectionEdit.description.trim()
      : '';
    this.props.openLoading();
    patchCollection({ ...collectionEdit, platform }, () => {
      this.props.closeLoading();
      this.setState(
        {
          openEditModal: false,
          forceUpdate: true
        },
        () =>
          this.props.dispatchNotification({
            message: `Collection ${collectionEdit.name} is edited.`,
            open: true,
            icon: AddAlert
          })
      );
    }).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };
  removeCollection = () => {
    this.closeConfirmationPopupDeleteCollection();
    this.props.openLoading();
    deleteCollection({ ...this.state.collection }, () => {
      this.closeConfirmationPopupDeleteCollection();
      this.props.closeLoading();
      this.props.dispatchNotification({
        message: `Collection ${this.state.collection.name} successfully deleted.`,
        open: true,
        icon: AddAlert
      });
      const url = '/collections';
      this.props.history.replace(url);
    }).catch(({ status }) => {
      this.closeConfirmationPopupDeleteCollection();
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };
  clickSelectedInfluencer = (id, selected) => {
    const newInfluencerList = this.state.influencerList.map(influencer =>
      influencer.id === id ? { ...influencer, selected } : influencer
    );
    const selectedInfluencerList = { ...this.state.selectedInfluencerList };
    selectedInfluencerList[id] = selected;
    const newSelectedInfluencerIdCurrentPage = newInfluencerList
      .filter(({ id }) => (selectedInfluencerList[id] ? true : false))
      .map(({ id }) => id);
    this.setState({
      selectedInfluencerList,
      influencerList: newInfluencerList,
      selectedInfluencerIdCurrentPage: newSelectedInfluencerIdCurrentPage,
      selectAll: newSelectedInfluencerIdCurrentPage.length > 0,
      isSelectAll:
        newInfluencerList.length === newSelectedInfluencerIdCurrentPage.length,
      displaySelectAll: false,
      allResults: false
    });
  };
  changeSelectAll = checked => {
    const selectedInfluencerList = { ...this.state.selectedInfluencerList };
    this.state.influencerList.map(
      ({ id }) => (selectedInfluencerList[id] = checked)
    );
    this.setState({
      selectedInfluencerList,
      influencerList: this.state.influencerList.map(influencer => ({
        ...influencer,
        selected: checked
      })),
      selectedInfluencerIdCurrentPage: checked
        ? this.state.influencerList.map(({ id }) => id)
        : [],
      selectAll: checked,
      isSelectAll: checked,
      displaySelectAll: checked,
      allResults: false
    });
  };
  addCollection = collectionName => {
    this.props.openLoading();
    postCollection(
      { name: collectionName },
      ({ name, owner, _id: id, last_updated_date: lastUpdatedDate }) => {
        const newCollections = [
          { name, id, owner, lastUpdatedDate, selected: false },
          ...this.state.collectionOtherList
        ];
        this.setState(
          {
            collectionOtherList: newCollections
          },
          () =>
            this.props.closeLoading() &&
            this.props.dispatchNotification({
              open: true,
              icon: AddAlert,
              color: 'success',
              message: `Collection ${collectionName} is created.`
            })
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };
  clickSelectedCollections = (
    selectedInfluencerIdList,
    updatedCollection,
    selectedCollection,
    selected
  ) => {
    const { id, name } = selectedCollection;
    const {
      collectionId,
      allResults,
      totalResult,
      platform,
      processedParam
    } = this.state;
    const pageIndex = 0;
    const newSelectedInfluencerList = { ...this.state.selectedInfluencerList };
    selectedInfluencerIdList.map(
      id => (newSelectedInfluencerList[id] = { selected: false })
    );
    if (allResults) {
      this.setState(
        {
          collectionOtherList: updatedCollection
        },
        () => {
          this.props.openLoading();
          let processedParamAll = `influencers_page_size=${totalResult.toString()}&influencers_page_index=0&sort_field=total_followers&platform=${platform}`;
          if (
            Array.isArray(this.state.stateField) &&
            this.state.stateField.length > 0
          ) {
            processedParamAll =
              processedParamAll + '&state=' + this.state.stateField.join(',');
          }
          if (this.state.nameField.length > 0) {
            processedParamAll =
              processedParamAll + '&name=' + this.state.nameField;
          }

          addQueryToCollection(
            processedParam,
            {
              platform,
              collections: [collectionId],
              collections_action: 'move',
              to_collection: selectedCollection.id
            },
            () => {
              this.setState(
                {
                  forceUpdate: true,
                  selectedInfluencerIdList: [],
                  selectedInfluencerIdCurrentPage: [],
                  isSelectAll: true,
                  selectAll: false,
                  allResults: false,
                  displaySelectAll: false
                },
                () => {
                  this.props.closeLoading();
                  this.props.dispatchNotification({
                    message: `Move successfully ${totalResult} influencer(s) to ${name} collection.`,
                    open: true,
                    icon: AddAlert
                  });
                  this.toPage(pageIndex);
                }
              );
            }
          ).catch(({ status }) => {
            this.props.closeLoading();
            if (status === 340) {
              this.setState({
                openExceedNumberOfInfluencerModal: true,
                collectionOtherList: this.state.collectionOtherList.map(
                  collection => ({ ...collection, selected: false })
                )
              });
            } else {
              this.props.dispatchFetchResult(status);
            }
          });

          // getCollection(collectionId, processedParamAll,
          //   ({ result }) => {
          //     patchCollection(
          //       {
          //         id: id,
          //         list_ids: result.listInfluencers.results ? result.listInfluencers.results.map(result => result.id) : [],
          //         list_ids_action: 'add',
          //         platform: platform
          //       }, () => {
          //         patchCollection(
          //           {
          //             id: collectionId,
          //             list_ids: result.listInfluencers.results ? result.listInfluencers.results.map(result => result.id) : [],
          //             list_ids_action: 'remove',
          //             platform: platform
          //           }, () => {
          //             this.setState({
          //               forceUpdate: true,
          //               selectedInfluencerIdList: [],
          //               selectedInfluencerIdCurrentPage: [],
          //               isSelectAll: true,
          //               selectAll: false,
          //               allResults: false,
          //               displaySelectAll: false
          //             }, () => {
          //               this.props.closeLoading()
          //               this.props.dispatchNotification({
          //                 message: `Move successfully ${totalResult} influencer(s) to ${name} collection.`,
          //                 open: true,
          //                 icon: AddAlert
          //               })
          //               this.toPage(pageIndex)
          //             })
          //           }).catch(({ status }) => {
          //             this.props.closeLoading()
          //             this.props.dispatchFetchResult(status)
          //           })
          //       }).catch(({ status }) => {
          //         this.props.closeLoading()
          //         if (status === 340) {
          //           this.setState({
          //             openExceedNumberOfInfluencerModal: true,
          //             collectionOtherList: this.state.collectionOtherList.map(collection => ({ ...collection, selected: false }))
          //           })
          //         } else {
          //           this.props.dispatchFetchResult(status)
          //         }
          //       })
          //   }
          // ).catch(({ status }) => {
          //   this.props.closeLoading()
          //   this.props.dispatchFetchResult(status)
          // });
        }
      );
    } else if (Object.keys(selectedInfluencerIdList).length > 0) {
      this.setState(
        {
          collectionOtherList: updatedCollection
        },
        () => {
          this.props.openLoading();
          moveInfluencerInCollection(
            collectionId,
            {
              platform,
              list_ids_action: 'move',
              list_ids: selectedInfluencerIdList,
              to_collection_id: id
            },
            () => {
              this.setState(
                {
                  forceUpdate: true,
                  selectedInfluencerIdList: [],
                  selectedInfluencerIdCurrentPage: [],
                  isSelectAll: true,
                  selectAll: false,
                  allResults: false,
                  displaySelectAll: false
                },
                () => {
                  this.props.closeLoading();
                  this.props.dispatchNotification({
                    message: `Move successfully ${selectedInfluencerIdList.length} influencer(s) to ${name} collection.`,
                    open: true,
                    icon: AddAlert
                  });
                  this.toPage(pageIndex);
                }
              );
            }
          ).catch(({ status }) => {
            this.props.closeLoading();
            if (status === 340) {
              this.setState({
                openExceedNumberOfInfluencerModal: true,
                collectionOtherList: this.state.collectionOtherList.map(
                  collection => ({ ...collection, selected: false })
                )
              });
            } else if (status === 400) {
              this.props.dispatchNotification(
                {
                  message: `Can not move non existing influences to another collection. Please try another.`,
                  open: true,
                  icon: AddAlert,
                  color: 'danger'
                },
                4000
              );
            } else {
              this.props.dispatchFetchResult(status);
            }
          });

          // patchCollection(
          //   {
          //     id: id,
          //     list_ids: selectedInfluencerIdList,
          //     list_ids_action: 'add',
          //     platform: platform
          //   }, () => {
          //     patchCollection(
          //       {
          //         id: collectionId,
          //         list_ids: selectedInfluencerIdList,
          //         list_ids_action: 'remove',
          //         platform: platform
          //       }, () => {
          //         this.setState({
          //           forceUpdate: true,
          //           selectedInfluencerIdList: [],
          //           selectedInfluencerIdCurrentPage: [],
          //           isSelectAll: true,
          //           selectAll: false,
          //           allResults: false,
          //           displaySelectAll: false
          //         }, () => {
          //           this.props.closeLoading()
          //           this.props.dispatchNotification({
          //             message: `Move successfully ${selectedInfluencerIdList.length} influencer(s) to ${name} collection.`,
          //             open: true,
          //             icon: AddAlert
          //           })
          //           this.toPage(pageIndex)
          //         })
          //       }).catch(({ status }) => {
          //         this.props.closeLoading()
          //         this.props.dispatchFetchResult(status)
          //       })
          //   }).catch(({ status }) => {
          //     this.props.closeLoading()
          //     if (status === 340) {
          //       this.setState({
          //         openExceedNumberOfInfluencerModal: true,
          //         collectionOtherList: this.state.collectionOtherList.map(collection => ({ ...collection, selected: false }))
          //       })
          //     } else {
          //       this.props.dispatchFetchResult(status)
          //     }
          //   })
        }
      );
    } else {
      this.props.dispatchNotification({
        open: true,
        icon: AddAlert,
        color: 'danger',
        message: 'Please select influencer to add to collection'
      });
    }
  };
  removeSelectedInfluencer = () => {
    const {
      selectedInfluencerIdCurrentPage,
      collectionId,
      collectionName,
      allResults,
      totalResult,
      platform
    } = this.state;
    const pageIndex = 0;
    this.closeConfirmationPopupRemoveInfluencer();
    if (allResults) {
      this.props.openLoading();
      let processedParamAll = `influencers_page_size=${totalResult.toString()}&influencers_page_index=0&sort_field=total_followers&platform=${platform}`;
      if (
        Array.isArray(this.state.stateField) &&
        this.state.stateField.length > 0
      ) {
        processedParamAll =
          processedParamAll + '&state=' + this.state.stateField.join(',');
      }
      if (this.state.nameField.length > 0) {
        processedParamAll = processedParamAll + '&name=' + this.state.nameField;
      }
      getCollection(collectionId, processedParamAll, ({ result }) => {
        patchCollection(
          {
            id: collectionId,
            list_ids: result.listInfluencers.results
              ? result.listInfluencers.results.map(result => result.id)
              : [],
            list_ids_action: 'remove',
            platform: platform
          },
          () => {
            this.setState(
              {
                forceUpdate: true,
                selectedInfluencerIdCurrentPage: []
              },
              () => {
                this.props.closeLoading();
                this.props.dispatchNotification({
                  message: `Remove successfully ${totalResult} influencer(s) in collection ${collectionName}.`,
                  open: true,
                  icon: AddAlert
                });
                this.toPage(pageIndex);
              }
            );
          }
        ).catch(({ status }) => {
          this.props.closeLoading();
          this.props.dispatchFetchResult(status);
        });
      }).catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status);
      });
    } else if (selectedInfluencerIdCurrentPage.length > 0) {
      this.props.openLoading();
      patchCollection(
        {
          id: collectionId,
          list_ids: selectedInfluencerIdCurrentPage,
          list_ids_action: 'remove',
          platform: platform
        },
        () => {
          this.setState(
            {
              forceUpdate: true,
              selectedInfluencerIdCurrentPage: []
            },
            () => {
              this.props.closeLoading();
              this.props.dispatchNotification({
                message: `Remove successfully ${selectedInfluencerIdCurrentPage.length} influencer(s) in collection ${collectionName}.`,
                open: true,
                icon: AddAlert
              });
              this.toPage(pageIndex);
            }
          );
        }
      ).catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status);
      });
    } else {
      this.props.dispatchNotification({
        message: 'Please select influencer to remove from collection',
        icon: AddAlert,
        open: true,
        color: 'danger'
      });
      return;
    }
  };

  selectAllResult = () => {
    this.setState({
      displaySelectAll: false,
      allResults: true
    });
  };

  closeDialog = () => {
    this.setState({
      openModal: false
    });
  };

  closeExceedNumberOfInfluencerDialog = () => {
    this.setState({
      openExceedNumberOfInfluencerModal: false
    });
  };

  openConfirmationPopupDeleteCollection = idx => {
    this.setState({
      openConfirmationPopupDeleteCollection: true
    });
  };

  closeConfirmationPopupDeleteCollection = () => {
    this.setState({
      openConfirmationPopupDeleteCollection: false
    });
  };

  openConfirmationPopupRemoveInfluencer = idx => {
    this.setState({
      openConfirmationPopupRemoveInfluencer: true
    });
  };

  closeConfirmationPopupRemoveInfluencer = () => {
    this.setState({
      openConfirmationPopupRemoveInfluencer: false
    });
  };

  render() {
    const {
      params,
      userListNotShare,
      influencerList,
      collection,
      collectionName,
      collectionId,
      collectionOwner,
      collectionOwnerName,
      shareName,
      lastUpdatedDate,
      collectionDescription,
      totalResult,
      selectedUser,
      shareUser,
      sortField,
      showing,
      influencerName,
      openShareModal,
      openEditModal,
      collectionEdit,
      selectAll,
      isSelectAll,
      selectedInfluencerIdCurrentPage,
      collectionOtherList,
      nameError,
      descriptionError,
      displaySelectAll,
      platformShowing,
      allResults,
      platform,
      openModal,
      openExceedNumberOfInfluencerModal,
      openConfirmationPopupDeleteCollection,
      openConfirmationPopupRemoveInfluencer
    } = this.state;
    const {
      classes,
      name,
      routeCollectionName,
      userInfo,
      bcRoutes,
      isFromDiscoverPage,
      sideBarState
    } = this.props;
    const generatedPages = generatePageList(this.state, this.toPage);
    const returnToolTipShareUser = shareUser => {
      const lengthShareUser = shareUser.length;
      const newShareUser = [...shareUser];
      const [firstUser, secondUser, ...rest] = newShareUser;
      const lastUser = newShareUser.pop();
      if (lengthShareUser === 1) {
        return <p>{firstUser}</p>;
      }
      if (lengthShareUser === 2) {
        return (
          <p>
            {firstUser} and {secondUser}
          </p>
        );
      }
      if (lengthShareUser >= 3) {
        return (
          <CustomizedTooltip
            categories={newShareUser}
            firstCat={firstUser}
            lastCat={lastUser}
            classes={{
              influencerCategories: classes.toolTipShareUser
            }}
          />
        );
      } else {
        return <p>N/A</p>;
      }
    };
    const tooltipShareUser = shareName && returnToolTipShareUser(shareName);
    return (
      collectionName && (
        <div className={classes.mainDiv}>
          {this.props.drawHeader({
            name: (
              <Breadcrumbs
                name={name}
                routeCollectionName={routeCollectionName}
                bcRoutes={bcRoutes}
                isFromDiscoverPage={isFromDiscoverPage}
              />
            )
          })}
          {collection && (
            <CollectionModalDialog
              open={openEditModal}
              onCloseClick={this.closeEditDialog}
              onClickButton={this.closeEditDialog}
              onClickCancel={this.closeEditDialog}
              collection={collectionEdit}
              onClickEdit={this.editCollection}
              onChangeCollectionName={this.onChangeCollectionName}
              onChangeCollectionDescription={this.onChangeCollectionDescription}
              nameError={nameError}
              descriptionError={descriptionError}
            />
          )}
          <ShareCollectionModalDialog
            open={openShareModal}
            onCloseClick={this.closeShareDialog}
            onClickButton={this.closeShareDialog}
            onClickCancel={this.closeShareDialog}
            onClickShare={this.shareUserCollection}
            userList={userListNotShare}
            userListChosen={selectedUser}
            onChangeUserList={this.changeShareIds}
            shareUser={shareUser}
            removeShareUser={this.removeShareUser}
          />
          <AlertModalDialog
            open={openModal}
            onCloseClick={this.closeDialog}
            onClickButton={this.closeDialog}
            content={
              "You've exceeded the maximum number of export collection. Please contact us for further support & information."
            }
          />
          <AlertModalDialog
            open={openExceedNumberOfInfluencerModal}
            onCloseClick={this.closeExceedNumberOfInfluencerDialog}
            onClickButton={this.closeExceedNumberOfInfluencerDialog}
            content={
              "You've exceeded the maximum number of profile can be added to a collection. Please contact us for further support & information."
            }
          />
          <ConfirmationPopup
            id="confirm-delete-collection"
            keepMounted
            openConfirmationPopup={openConfirmationPopupDeleteCollection}
            onCloseClick={this.closeConfirmationPopupDeleteCollection}
            onClose={this.closeConfirmationPopupDeleteCollection}
            onClickConfirmation={this.removeCollection}
            onClickCancel={this.closeConfirmationPopupDeleteCollection}
            confirmationTitle={'Confirmation'}
            confirmationBtnText={'Yes, Delete It'}
            cancelBtnText={'Cancel'}
            confirmationQuestion={'Are You Sure?'}
            confirmationStatement={
              'You want to delete this item and its related data.'
            }
          />
          <ConfirmationPopup
            id="confirm-remove-influencer"
            keepMounted
            openConfirmationPopup={openConfirmationPopupRemoveInfluencer}
            onCloseClick={this.closeConfirmationPopupRemoveInfluencer}
            onClose={this.closeConfirmationPopupRemoveInfluencer}
            onClickConfirmation={this.removeSelectedInfluencer}
            onClickCancel={this.closeConfirmationPopupRemoveInfluencer}
            confirmationTitle={'Confirmation'}
            confirmationBtnText={'Yes, Delete It'}
            cancelBtnText={'Cancel'}
            confirmationQuestion={'Are You Sure?'}
            confirmationStatement={
              'You want to delete this item and its related data.'
            }
          />
          <Paper className={classes.collectionCard}>
            <Grid item container direction="row">
              <Grid
                item
                container
                direction="column"
                xs={6}
                className={classes.leftColumn}
              >
                <Grid item className={classes.collectionName}>
                  {collectionName}
                </Grid>
                <Grid item container className={classes.collectionOwner}>
                  <Grid item>Owner:&nbsp;</Grid>
                  <Grid item className={classes.collectionInfo}>
                    {collectionOwnerName}.&nbsp;
                  </Grid>
                  <Grid item>Last update:&nbsp;</Grid>
                  <Grid item className={classes.collectionInfo}>
                    {lastUpdatedDate}
                  </Grid>
                </Grid>
                <Grid item className={classes.collectionDesctiption}>
                  {collectionDescription}
                </Grid>
                <Grid item className={classes.totalItem}>
                  Total items: {totalResult}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={6}
                className={classes.rightColumn}
              >
                {shareName && shareName.length > 0 && (
                  <Grid
                    item
                    container
                    direction="row"
                    className={classes.shareInfo}
                  >
                    <Grid item className={classes.shareWith}>
                      Shared with:&nbsp;
                    </Grid>
                    <Grid item className={classes.shareUserInfo}>
                      {tooltipShareUser}
                    </Grid>
                  </Grid>
                )}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="flex-end"
                  justify="flex-end"
                  className={classes.buttonWrapper}
                >
                  <VisibleCanExportCollection
                    children={
                      <Grid>
                        <ButtonInf
                          outline
                          round
                          color="primary"
                          className={classes.buttonExport}
                          key="export"
                          onClick={() => {
                            this.props.openLoading();
                            exportInfluencer(
                              `/api/v1/download-influencers?platform=${platform}&collections=${collectionId}&page_size=100000&page_index=0&download=1&file_name=${collectionName}`,
                              blob => {
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${collectionName}.xlsx`;
                                document.body.appendChild(a);
                                a.click();
                                this.props.closeLoading();
                              }
                            ).catch(({ status }) => {
                              this.props.closeLoading();
                              if (status === 343) {
                                this.setState({
                                  openModal: true
                                });
                              } else {
                                this.props.dispatchFetchResult(status);
                              }
                            });
                          }}
                        >
                          Export collection
                        </ButtonInf>
                      </Grid>
                    }
                  />
                  {userInfo._id === collectionOwner && (
                    <Grid>
                      {userInfo.isExternalAccount === false && (
                        <ButtonInf
                          outline
                          round
                          color="primary"
                          className={classes.buttonShare}
                          onClick={this.openShareCollection}
                        >
                          Share
                        </ButtonInf>
                      )}
                      <CustomPopupState
                        options={[
                          {
                            icon: 'edit',
                            name: 'Edit',
                            onClick: this.openEditCollection
                          },
                          {
                            icon: 'delete',
                            name: 'Delete',
                            onClick: this.openConfirmationPopupDeleteCollection
                          }
                        ]}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <GridContainer className={classes.searchBar}>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              lg={3}
              className={classes.searchBarGridItem}
            >
              <TextInput
                formLabel="Search influencers"
                textFieldProp={{
                  placeholder: 'Enter name, platform ID or URL',
                  onKeyDown: e => {
                    if (e.keyCode === 13) this.changeFilterName();
                  }
                }}
                onChange={e => {
                  const [influencerName] = e.target.value.split(',');
                  this.setState({ influencerName });
                }}
                value={influencerName}
              />
            </GridItem>
            {/* <IsExternalAccount
            children={
              <GridItem xs={12} sm={6} md={6} lg={2}>
                <Selector
                  formLabel="Filter by platform"
                  options={platformOptions}
                  onChange={this.changePlatform}
                  value={platformShowing}
                  isSearchable={false}
                />
              </GridItem>
            }
          /> */}
            <GridItem
              xs={12}
              sm={6}
              md={6}
              lg={2}
              className={classes.searchBarGridItem}
            >
              <Selector
                formLabel="Filter by platform"
                options={platformOptions}
                onChange={this.changePlatform}
                value={platformShowing}
                isSearchable={false}
                isDisabledSelect={this.props.userInfo.isExternalAccount}
              />
            </GridItem>
            <GridItem
              xs={27}
              sm={13}
              md={13}
              lg={3}
              className={classes.searchBarGridItem}
            >
              <FormContainer
                formLabel="Filter by state"
                formControl={
                  <TextField
                    select={true}
                    // InputProps={{
                    //   className: classes.textField
                    // }}
                    InputProps={{
                      className: cx(classes.textField, {
                        [classes.textFieldHover]:
                          this.props.userInfo.isExternalAccount === false
                      })
                    }}
                    SelectProps={{ multiple: true }}
                    margin="normal"
                    value={
                      this.props.userInfo.isExternalAccount === false
                        ? params['state'] || Object.keys(InfluencerStates)
                        : [InfluencerStates['Approved']]
                    }
                    onChange={({ target: { value } }) =>
                      this.changeFilterField(value)
                    }
                    disabled={this.props.userInfo.isExternalAccount}
                  >
                    {Object.keys(InfluencerStates).map(key => (
                      <MenuItem key={key} value={key}>
                        {InfluencerStates[key]}
                      </MenuItem>
                    ))}
                  </TextField>
                }
              />
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              lg={2}
              className={classes.searchBarGridItem}
            >
              <Selector
                formLabel="Sort by"
                options={sortFieldOptions}
                onChange={this.changeSortBy}
                value={sortField}
                isSearchable={false}
              />
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              lg={2}
              className={classes.searchBarGridItem}
            >
              <Selector
                formLabel="Showing"
                options={perPageOptions}
                onChange={this.changePageSize}
                value={showing}
                isSearchable={false}
              />
            </GridItem>
          </GridContainer>
          {userInfo._id === collectionOwner && (
            <CollectionDetailSortNav
              checkedValueSelectAllButton={selectAll}
              onChangeSelectAllButton={this.changeSelectAll}
              isSelectAll={isSelectAll}
              numberSelected={
                allResults
                  ? totalResult
                  : selectedInfluencerIdCurrentPage.length
              }
              disabledStatus={influencerList && influencerList.length === 0}
              onChangeCheckboxMenuItem={(
                newDropdownList,
                item,
                checkedState
              ) => {
                this.clickSelectedCollections(
                  selectedInfluencerIdCurrentPage,
                  newDropdownList,
                  item,
                  checkedState
                );
              }}
              addCollection={this.addCollection}
              onCollectionAdd={this.addCollection}
              collectionList={collectionOtherList}
              onClickSelectAll={this.selectAllResult}
              isDisplaySelectAll={displaySelectAll}
              disabledButton={influencerList && influencerList.length === 0}
              optionsMore={[
                // {
                // 'icon': 'cloud_download',
                // 'name': 'Export selected items',
                // 'onClick': () => console.log('OnClick Export selected items')
                // },
                {
                  icon: 'delete',
                  name: 'Remove selected items',
                  onClick: this.openConfirmationPopupRemoveInfluencer
                }
              ]}
            />
          )}

          <GridContainer className={classes.resultsContainer}>
            {influencerList &&
              influencerList
                .map(
                  (
                    {
                      id,
                      name,
                      photoUrl,
                      location,
                      size,
                      career,
                      categories,
                      selected,
                      facebookId,
                      pageId,
                      instaUserName,
                      youtubeId,
                      avgEngagement,
                      totalFollowers,
                      reachFollowers,
                      avgInfluenceScore,
                      platformCategories
                    },
                    idx
                  ) => {
                    return {
                      id,
                      name,
                      facebookId,
                      pageId,
                      instaUserName,
                      youtubeId,
                      photoUrl,
                      avgInfluenceScore:
                        avgInfluenceScore &&
                        !Number.isNaN(avgInfluenceScore) &&
                        avgInfluenceScore !== 'N/A'
                          ? parseFloatNumberString(avgInfluenceScore, 0)
                          : 'N/A',
                      location,
                      size,
                      avgInfluenceScoreType: parseInfluenceType(
                        avgInfluenceScore
                      ),
                      categories:
                        categories && categories.length > 0
                          ? categories
                          : ['updating'],
                      professions:
                        platform === 'fb' || platform === 'insta'
                          ? career && career.length > 0
                            ? career
                            : ['updating']
                          : platformCategories && platformCategories.length > 0
                          ? platformCategories
                          : ['updating'],
                      avgEngagement:
                        !Number.isNaN(avgEngagement) && avgEngagement
                          ? parseKMB(avgEngagement)
                          : 'N/A',
                      totalFollowers:
                        typeof reachFollowers !== 'undefined'
                          ? parseCheckKMB(reachFollowers)
                          : parseCheckKMB(totalFollowers),
                      key: id,
                      checkedCheckbox: selected,
                      onClickSelect: event =>
                        this.clickSelectedInfluencer(id, event.target.checked)
                    };
                  }
                )
                .map(itemContent => (
                  <GridItem
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    key={itemContent.key}
                    className={classes.influencerCard}
                  >
                    <DiscoverCard
                      viewDetailInfluencer={true}
                      isDemoAccount={false}
                      checkedCheckbox={itemContent.checkedCheckbox}
                      onClickSelect={itemContent.onClickSelect}
                      {...itemContent}
                    />
                  </GridItem>
                ))}
          </GridContainer>
          <Pagination
            pages={generatedPages.length > 3 ? generatedPages : []}
            color="influencer"
          />
        </div>
      )
    );
  }
}
export default connect(
  ({ userInfo, breadcrumbs }) => ({ userInfo, ...breadcrumbs }),
  {
    dispatchNotification,
    dispatchFetchResult,
    openLoading,
    closeLoading,
    fromCollection,
    updateRouteParams,
    updateRouteCollectionName
  }
)(withStyles(styles)(CollectionDetail));
