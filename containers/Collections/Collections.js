import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
// core components
import Pagination from "components/Pagination/Pagination.jsx";
import ContentCollections from "components/ContentCollections";
import ControllerCollectionNav from "components/ControllerCollectionNav";
import CollectionModalDialog from "components/CollectionModalDialog";
import ShareCollectionModalDialog from "components/ShareCollectionModalDialog";
import Breadcrumbs from "components/Breadcrumbs";
import ConfirmationPopup from 'components/ConfirmationPopup';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import {
  getCollections,
  postCollection,
  patchCollection,
  deleteCollection,
  getAllUsers
} from 'apis/api';

import {
  generatePageList,
  paramsToUrl,
  parseParams,
  parsePastDate,
  paramsToStateCollection,
  stateToParamsCollection
} from "utils/index.js"

import { ruleRunner } from 'utils/ruleRunner.js'
import { minLength, maxLength } from 'utils/rules.js';

// styles
import collectionsStyle from "assets/jss/material-dashboard-pro-react/containers/collectionsStyle.jsx";

// redux
import { connect } from 'react-redux';
import {
  dispatchNotification
} from 'reducers/NotificationReducer';
import {
  openLoading,
  closeLoading
} from 'reducers/ScreenLoadingReducer';
import {
  updateRouteParams,
  fromCollection
} from 'reducers/BreadcrumbsReducer';

import { options as sortByOptions } from "constants/collectionsSortBy";
import { options as filterByOptions } from "constants/collectionsFilterBy";
import { options as perPageOptions } from "constants/collectionsPerPage";
import AddAlert from '@material-ui/icons/AddAlert';
import { stringify } from "querystring";

const validationRulesDesc = ruleRunner("descriptionError", "description", maxLength(500))
const validationRulesName = ruleRunner("nameError", "name", minLength(2), maxLength(80))
class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openShareModal: false,
      allUser: [],
      selectedUser: [],
      userList: [],
      userListNotShare: [],
      processedParam: '',
      collectionSelected: {
        name: "",
        description: "",
        shareIds: []
      },
      isEdit: false,
      collections: [],
      params: {},
      totalResult: 0,
      pageIndex: "0",
      pageSize: "12",
      filterBy: { value: 'show_all', label: "All" },
      sortBy: { value: 'last_updated_date', label: 'Lastest Modified' },
      showing: { value: 'page_size12', label: '12 per page' },
      filterName: "",
      forceUpdate: false,
      nameError: false,
      descriptionError: false,
      openConfirmationPopup: false,
      collectionDeletedIndex: null,
    }
  }
  componentDidMount() {
    this.props.minimizeSidebar(true, 'permanent');
    this.props.openLoading()
    this.props.updateRouteParams(this.props.name, this.props.location)
    this.props.fromCollection()
    getCollections(
      this.state.processedParam ? this.state.processedParam : "page_index=0&sort_field=last_updated_date&sort_type=-1&page_size=12&show_all=1",
      true,
      ({ data, total }) => {
        this.setState({
          collections: data,
          totalResult: total
        }, () => this.props.closeLoading());
      }
    ).catch(({status}) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    });
    getAllUsers(
      ({ data }) => {
        this.setState({
          allUser: (data ? data.reduce((prevIn, curr) => {
            const { _id, ...rest } = curr;
            prevIn[_id] = rest;
            return prevIn;
          }, {}) : []),
          userList: data
        })
      }
    ).catch(({status}) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    });
  }
  static getDerivedStateFromProps(props, state) {
    let processedParam = props.location.search.slice(1);
    if (state.processedParam === processedParam) return null;
    const params = parseParams(processedParam);
    const stateCollection = paramsToStateCollection(params)
    return {
      params,
      processedParam,
      ...stateCollection
    }
  }
  componentDidUpdate(prevProps) {
    const { processedParam, forceUpdate } = this.state;
    if (forceUpdate || processedParam !== prevProps.location.search.slice(1)) {
      this.setState({
        forceUpdate: false
      }, () => {
        this.props.openLoading()
        this.props.updateRouteParams(this.props.name, this.props.location)
        this.props.fromCollection()
      })
      getCollections(
        processedParam ? processedParam : "page_index=0&sort_field=last_updated_date&sort_type=-1&page_size=12&show_all=1",
        true,
        ({ data, total }) => {
          this.setState({
            ...this.state,
            collections: data,
            totalResult: total
          }, () => this.props.closeLoading());
        }).catch(({status}) => {
          this.props.closeLoading()
          this.props.dispatchFetchResult(status)
        });
      getAllUsers(
        ({ data }) => {
          this.setState({
            allUser: (data ? data.reduce((prevIn, curr) => {
              const { _id, ...rest } = curr;
              prevIn[_id] = rest;
              return prevIn;
            }, {}) : []),
            userList: data
          })
        }
      ).catch(({status}) => {
        this.props.closeLoading()
        this.props.dispatchFetchResult(status)
      });
    }
  }
  componentWillUnmount() {
    this.props.closeLoading()
  }
  toPage = pageIndex => {
    const params = stateToParamsCollection({ ...this.state, pageIndex });
    const url = `/collections?${paramsToUrl(params)}`;
    this.props.history.push(url);
  };
  changeSortBy = sortBy => {
    const params = stateToParamsCollection({ ...this.state, sortBy, pageIndex: 0 });
    const url = `/collections?${paramsToUrl(params)}`;
    this.props.history.push(url);
  };
  changePageSize = showing => {
    const params = stateToParamsCollection({ ...this.state, showing, pageIndex: 0 });
    const url = `/collections?${paramsToUrl(params)}`;
    this.props.history.push(url);
  }
  changeFilterBy = filterBy => {
    const params = stateToParamsCollection({ ...this.state, filterBy, pageIndex: 0 });
    const url = `/collections?${paramsToUrl(params)}`;
    this.props.history.push(url);
  }
  changeFilterName = name => {
    const params = stateToParamsCollection({ ...this.state, filterName: name, pageIndex: 0 });
    const url = `/collections?${paramsToUrl(params)}`;
    this.props.history.push(url);
  }
  editCollection = () => {
    const { collectionSelected, nameError, descriptionError } = this.state;

    if (collectionSelected.name.trim() === '' ||
        nameError !== false ||
        descriptionError !== false) {
      return;
    }

    this.props.openLoading()
    patchCollection({
      id: collectionSelected.id,
      name: collectionSelected.name ? collectionSelected.name.trim() : "",
      description: collectionSelected.description ? collectionSelected.description.trim() : "",
    }, ({ code }) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(code)
      this.setState({
        openModal: false,
        forceUpdate: true
      }, () => this.props.dispatchNotification({
        message: `Collection ${collectionSelected.name} is edited.`,
        open: true,
        icon: AddAlert
      }))
    }).catch(({status}) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    })
  }
  createCollection = () => {
    const { collectionSelected, nameError, descriptionError } = this.state;

    if (collectionSelected.name.trim() === '' ||
        nameError !== false ||
        descriptionError !== false) {
      return;
    }

    this.props.openLoading()
    postCollection({
      name: collectionSelected.name.trim(),
      description: collectionSelected.description.trim()
    }, ({ code }) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(code)
      this.setState({
        openModal: false,
        forceUpdate: true
      }, () => this.props.dispatchNotification({
        message: `Collection ${collectionSelected.name} is created.`,
        open: true,
        icon: AddAlert
      }))
    }).catch(({status}) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    })
  }
  openNewCollection = () => {
    this.setState({
      openModal: true,
      collectionSelected: {
        name: "",
        description: ""
      },
    })
  }
  editOpenCollection = (idx) => {
    const collectionSelected = { ...this.state.collections[idx] }
    this.setState({
      openModal: true,
      collectionSelected,
      ...validationRulesName(collectionSelected.name),
      ...validationRulesDesc(collectionSelected.description)
    })
  }
  shareOpenCollection = (idx) => {
    const selectedCollection = this.state.collections[idx];

    this.setState({
      openShareModal: true,
      collectionSelected: { ...selectedCollection },
      userListNotShare: (this.state.userList && selectedCollection && selectedCollection.shareIds ?
        this.state.userList.filter((user) => !selectedCollection.shareIds.includes(user._id) &&
          user._id !== selectedCollection.owner).map(
            ({ _id, name }) => ({ value: _id, label: name })) :
        (this.state.userList && selectedCollection ? this.state.userList.filter(
          (user) => user._id !== selectedCollection.owner).map(
            ({ _id, name }) => ({ value: _id, label: name })) : [])),
      shareUser: (selectedCollection.shareIds && this.state.allUser ?
        selectedCollection.shareIds.filter((idItem) =>
          typeof this.state.allUser[idItem] !== 'undefined').map(idItem =>
            Object({
              id: idItem,
              name: this.state.allUser[idItem].name,
              role: this.state.allUser[idItem].role.name
            })) : [])
    })
  }
  closeShareDialog = () => {
    this.setState({
      openShareModal: false,
      selectedUser: [],
      selectedCollection: {},
    })
  }
  removeCollection = (idx) => {
    this.closeConfirmationPopup()
    this.props.openLoading()
    deleteCollection(this.state.collections[idx], ({ code }) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(code)
      this.setState({
        forceUpdate: true
      }, () => {
        this.props.dispatchNotification({
          message: `Collection ${this.state.collections[idx].name} successfully deleted.`,
          open: true,
          icon: AddAlert
        })
      })
    }).catch(({status}) => {
      this.closeConfirmationPopup()
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    })
  }
  closeDialog = () => {
    this.setState({
      openModal: false,
      nameError: false,
      descriptionError: false
    })
  }
  onChangeCollectionName = (name) => {
    const { collectionSelected } = this.state;
    collectionSelected.name = name
    this.setState({
      collectionSelected,
      ...validationRulesName(collectionSelected.name),
    })
  }
  onChangeCollectionDescription = (description) => {
    const { collectionSelected } = this.state;
    collectionSelected.description = description
    this.setState({
      collectionSelected,
      ...validationRulesDesc(collectionSelected.description)
    })
  }
  changeShareIds = options => {
    const { collectionSelected } = this.state;
    this.setState({
      selectedUser: options,
      collectionSelected: {
        ...collectionSelected,
        shareIds: options ? options.map(item => (item.value)) : collectionSelected.shareIds
      }
    })
  }
  shareUserCollection = () => {
    const { collectionSelected, shareUser, userListNotShare, allUser } = this.state;
    const shareUserIds = shareUser.map(({ id }) => id)
    const dupCollection = collectionSelected.shareIds && !collectionSelected.shareIds.map((id) => shareUserIds.includes(id)).includes(false)

    if (dupCollection) {
      this.props.dispatchNotification({
        message: 'Please select a new user to share',
        icon: AddAlert,
        open: true,
        color: 'danger'
      });
      return;
    }
    if (typeof collectionSelected.shareIds === "undefined" || collectionSelected.shareIds.length <= 0) {
      this.props.dispatchNotification({
        message: 'Please select a user to share',
        icon: AddAlert,
        open: true,
        color: 'danger'
      });
      return;
    }
    this.props.openLoading()
    patchCollection({
      id: collectionSelected.id,
      share_ids: collectionSelected.shareIds,
      share_ids_action: 'add'
    }, () => {
      this.props.closeLoading()
      this.setState({
        openShareModal: true,
        forceUpdate: true,
        selectedUser: [],
        userListNotShare: userListNotShare.filter(user => !collectionSelected.shareIds.includes(user.value)),
        shareUser: shareUser.concat(collectionSelected.shareIds.map(idItem => Object({
          id: idItem,
          name: allUser[idItem].name,
          role: allUser[idItem].role.name
        })))
      }, () => this.props.dispatchNotification({
        message: `Share collection ${collectionSelected.name} with ${shareUser.map(item => item.label).join(', ')}.`,
        open: true,
        icon: AddAlert
      }))
    }
    ).catch(({status}) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    })
  }
  removeShareUser = userId => {
    const { collectionSelected, allUser, shareUser, userListNotShare } = this.state;
    const { name, id } = collectionSelected;
    userListNotShare.push({ value: userId, label: allUser[userId].name })
    this.props.openLoading()
    patchCollection({
      id,
      share_ids: userId,
      share_ids_action: 'remove'
    }, () => {
      this.setState({
        openShareModal: true,
        forceUpdate: true,
        shareUser: shareUser.filter((user) => user.id !== userId),
        userListNotShare
      }, () => {
        this.props.closeLoading()
        this.props.dispatchNotification({
          message: `Remove ${allUser[userId].name} successfully in share list of ${name} collection.`,
          open: true,
          icon: AddAlert
        })
      })
    }
    ).catch(({ status }) => {
      this.props.closeLoading()
      this.props.dispatchFetchResult(status)
    });
  }
  openConfirmationPopup = (idx) => {
    this.setState({
      openConfirmationPopup: true,
      collectionDeletedIndex: idx,
    })
  }
  closeConfirmationPopup = () => {
    this.setState({
      openConfirmationPopup: false,
      collectionDeletedIndex: null,
    })
  }

  render() {
    const { classes, name, bcRoutes, isFromDiscoverPage, userInfo, sideBarState } = this.props;
    const intl = this.props.intl;
    const {
      collections,
      totalResult,
      filterBy,
      sortBy,
      showing,
      filterName,
      openModal,
      openShareModal,
      shareUser,
      selectedUser,
      userListNotShare,
      collectionSelected,
      nameError,
      descriptionError,
      openConfirmationPopup,
      collectionDeletedIndex,
    } = this.state;
    const generatedPages = generatePageList(this.state, this.toPage)
    return (
      <div className={classes.mainDiv}>
        {this.props.drawHeader({
          name: <Breadcrumbs name={name} bcRoutes={bcRoutes} isFromDiscoverPage={isFromDiscoverPage} />
        })}
        <CollectionModalDialog
          open={intl.formatMessage({ defaultMessage: "openModal"})}
          onCloseClick={this.closeDialog}
          onClickButton={this.closeDialog}
          onClickCancel={this.closeDialog}
          collection={intl.formatMessage({ defaultMessage: "collectionSelected"})}
          onClickEdit={this.editCollection}
          onClickCreate={this.createCollection}
          onChangeCollectionName={this.onChangeCollectionName}
          onChangeCollectionDescription={this.onChangeCollectionDescription}
          nameError={intl.formatMessage({ defaultMessage: "nameError"})}
          descriptionError={intl.formatMessage({ defaultMessage: "descriptionError"})}
        />
        <ShareCollectionModalDialog
          open={intl.formatMessage({ defaultMessage: "openShareModal"})}
          onCloseClick={this.closeShareDialog}
          onClickButton={this.closeShareDialog}
          onClickCancel={this.closeShareDialog}
          onClickShare={this.shareUserCollection}
          userList={intl.formatMessage({ defaultMessage: "userListNotShare"})}
          userListChosen={selectedUser}
          onChangeUserList={this.changeShareIds}
          shareUser={intl.formatMessage({ defaultMessage: "shareUser"})}
          removeShareUser={this.removeShareUser}
        />
        <ConfirmationPopup
          id="confirm-delete-collection"
          keepMounted
          openConfirmationPopup={openConfirmationPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClose={this.closeConfirmationPopup}
          onClickConfirmation={() => this.removeCollection(collectionDeletedIndex)}
          onClickCancel={this.closeConfirmationPopup}
          confirmationTitle={intl.formatMessage({ defaultMessage: "Confirmation"})}
          confirmationBtnText={intl.formatMessage({ defaultMessage: "Yes, Delete It"})}
          cancelBtnText={intl.formatMessage({ defaultMessage: "Cancel"})}
          confirmationQuestion={intl.formatMessage({ defaultMessage: "Are You Sure?"})}
          confirmationStatement={intl.formatMessage({ defaultMessage: "You want to delete this item and its related data."})}
        />
        <ControllerCollectionNav
          numberResults={totalResult}
          filterByOptions={filterByOptions}
          filterBySelectedValue={filterBy}
          filterByOnChange={this.changeFilterBy}
          sortByOptions={sortByOptions}
          sortBySelectedValue={sortBy}
          sortByOnChange={this.changeSortBy}
          showingOptions={perPageOptions}
          showingSelectedValue={showing}
          showingOnChange={this.changePageSize}
          filterName={({ target: { value } }) => this.changeFilterName(value)}
          filterNameValue={filterName}
          onClickNewCollection={this.openNewCollection}
        />
        <ContentCollections
          collections={collections.map(({ id, name, lastUpdatedDate, shareNames, totalInfluencers, totalPendingInfluencers, owner }) => ({
            id,
            collectionName: name,
            lastEditedTime: parsePastDate(lastUpdatedDate),
            pendingNumber: totalPendingInfluencers,
            sharedNumber: shareNames.length,
            totalItemsNumber: totalInfluencers ? totalInfluencers : "0",
            linkToDetail: `/collections/${id}?influencers_page_size=12&influencers_page_index=0&sort_field=total_followers&platform=fb`,
            isOwner: owner === userInfo._id
          }))}
          onClickEdit={this.editOpenCollection}
          onClickDelete={this.openConfirmationPopup}
          onClickShare={this.shareOpenCollection}
          isExternalAccount={this.props.userInfo.isExternalAccount}
        />
        <Pagination
          pages={generatedPages.length > 3 ? generatedPages : []}
          color="influencer"
        />
      </div>
    );
  }
}

Collections.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectIntl (
  connect(({
    breadcrumbs,
    userInfo
  }) => ({
    userInfo,
    ...breadcrumbs
  }), {
      dispatchNotification,
      dispatchFetchResult,
      openLoading,
      closeLoading,
      fromCollection,
      updateRouteParams
    })(withStyles(collectionsStyle)(Collections))
)
  ;
