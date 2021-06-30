import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
// custom components
import Pagination from "components/Pagination/Pagination.jsx";
import ContentBrands from "components/ContentBrands";
import ControllerBrandsNav from "components/ControllerBrandsNav";
import BrandModalDialog from "components/BrandModalDialog";
import Breadcrumbs from "components/Breadcrumbs";
import ConfirmationPopup from "components/ConfirmationPopup";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import {
  getBrands,
  postBrand,
  patchBrand,
  deleteBrand,
  getAllCategory
} from "apis/api";

import {
  generatePageList,
  paramsToUrl,
  parseParams,
  parsePastDate,
  paramsToStateCollection,
  stateToParamsCollection,
  stateToParamsBrand
} from "utils/index.js";

import { ruleRunner } from "utils/ruleRunner.js";
import { minLength, maxLength } from "utils/rules.js";
import { validateLinkUrl } from "utils/index.js";

// styles
import collectionsStyle from "assets/jss/material-dashboard-pro-react/containers/collectionsStyle.jsx";

// redux
import { connect } from "react-redux";
import { dispatchNotification } from "reducers/NotificationReducer";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { updateRouteParams, fromCollection } from "reducers/BreadcrumbsReducer";

import { options as sortByOptions } from "constants/collectionsSortBy";
import { options as filterByOptions } from "constants/collectionsFilterBy";
import { options as perPageOptions } from "constants/collectionsPerPage";
import AddAlert from "@material-ui/icons/AddAlert";
import { stringify } from "querystring";

// const validationRulesDesc = ruleRunner("descriptionError", "description", maxLength(100))
const validationRulesName = ruleRunner(
  "nameError",
  "name",
  minLength(1),
  maxLength(80)
);

const validationRulesKeywords = ruleRunner(
  "keywordError",
  "keywords",
  minLength(2),
  maxLength(1000)
);

const validationRulesImageURL = ruleRunner(
  "imageURLError",
  "imageURL",
  minLength(2),
  maxLength(200)
);

class Brands extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      openShareModal: false,
      brandSelected: {
        brandName: "",
        keywords: "",
        categoriesChosen: [],
        categories: [],
        imageURL: "https://storage.googleapis.com/yn-influencer/Default.jpg",
        description: ""
      },
      isEdit: false,
      brands: [],
      params: {},
      allCategories: [],
      categories: [],
      categoriesChosen: [],
      totalResult: 0,
      pageIndex: "0",
      pageSize: "12",
      filterBy: { value: "show_all", label: "All" },
      sortBy: { value: "last_updated_date", label: "Lastest Modified" },
      showing: { value: "page_size12", label: "12 Per Page" },
      filterName: "",
      forceUpdate: false,
      nameError: false,
      keywordError: false,
      imageURLError: false,
      // descriptionError: false,
      openConfirmationPopup: false,
      brandDeletedIndex: null
    };
  }

  componentDidMount() {
    this.props.minimizeSidebar(true, "permanent");
    this.props.openLoading();
    this.props.updateRouteParams(this.props.name, this.props.location);
    this.props.fromCollection();

    const default_page = {
      page_size: 12
    };

    this.pushParams(default_page);

    getBrands(
      this.state.processedParam
        ? this.state.processedParam
        : "page_index=0&sort_field=last_updated_date&sort_type=-1&page_size=12&show_all=1",
      true,
      ({ data, total }) => {
        this.setState(
          {
            brands: data,
            totalResult: total
          },
          () => this.props.closeLoading()
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
    getAllCategory(({ results }) => {
      const categoriesDict = {};
      results.map(item => {
        categoriesDict[item.categoryCode] = {
          categoryCode: item.categoryCode,
          categoryName: item.categoryName
        };
      });

      this.setState({
        allCategories: categoriesDict,
        categories: results.map(({ categoryCode, categoryName }) => ({
          value: categoryCode,
          label: categoryName
        }))
      });
    }).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  }

  static getDerivedStateFromProps(props, state) {
    let processedParam = props.location.search.slice(1);
    if (state.processedParam === processedParam) return null;
    const params = parseParams(processedParam);
    const stateCollection = paramsToStateCollection(params);
    return {
      params,
      processedParam,
      ...stateCollection
    };
  }

  componentDidUpdate(prevProps) {
    const { processedParam, forceUpdate } = this.state;
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
      getBrands(
        processedParam
          ? processedParam
          : "page_index=0&sort_field=last_updated_date&sort_type=-1&page_size=12&show_all=1",
        true,
        ({ data, total }) => {
          // console.log('what data in did update: ', JSON.stringify(data));

          this.setState(
            {
              ...this.state,
              brands: data,
              totalResult: total
            },
            () => this.props.closeLoading()
          );
        }
      ).catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status);
      });

      getAllCategory(({ results }) => {
        const categoriesDict = {};
        results.map(item => {
          categoriesDict[item.categoryCode] = {
            categoryCode: item.categoryCode,
            categoryName: item.categoryName
          };
        });

        this.setState({
          allCategories: categoriesDict,
          categories: results.map(({ categoryCode, categoryName }) => ({
            value: categoryCode,
            label: categoryName
          }))
        });
      }).catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status);
      });
    }
  }

  componentWillUnmount() {
    this.props.closeLoading();
  }

  pushParams = params => {
    this.props.history.push(
      `/brands?${Object.keys(params)
        .map(v => `${encodeURIComponent(v)}=${encodeURIComponent(params[v])}`)
        .join("&")}`
    );
  };

  toPage = pageIndex => {
    const params = stateToParamsCollection({ ...this.state, pageIndex });
    const url = `/brands?${paramsToUrl(params)}`;

    // console.log('what to page: ', url);

    this.props.history.push(url);
  };

  changeSortBy = sortBy => {
    const params = stateToParamsBrand({ ...this.state, sortBy, pageIndex: 0 });
    const url = `/brands?${paramsToUrl(params)}`;

    // console.log('what url: ', url);

    this.props.history.push(url);
  };

  changePageSize = showing => {
    const params = stateToParamsCollection({
      ...this.state,
      showing,
      pageIndex: 0
    });
    const url = `/brands?${paramsToUrl(params)}`;

    // console.log('what showing: ', url, ' and showing: ', showing);

    this.props.history.push(url);
  };

  changeFilterBy = filterBy => {
    const params = stateToParamsCollection({
      ...this.state,
      filterBy,
      pageIndex: 0
    });
    const url = `/brands?${paramsToUrl(params)}`;
    this.props.history.push(url);
  };

  changeFilterName = name => {
    const params = stateToParamsCollection({
      ...this.state,
      filterName: name,
      pageIndex: 0
    });
    const url = `/brands?${paramsToUrl(params)}`;
    this.props.history.push(url);
  };

  editBrand = () => {
    const {
      brandSelected,
      nameError,
      keywordError,
      imageURLError,
      intl
    } = this.state;
    if (
      typeof brandSelected.imageURL !== "undefined" &&
      brandSelected.imageURL !== "" &&
      !validateLinkUrl(brandSelected.imageURL)
    ) {
      this.props.dispatchNotification({
        message: intl.formatMessage({ defaultMessage: "Invalid URL"}),
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }

    if (
      brandSelected.brandName.trim() === "" ||
      brandSelected.keywords.trim() === "" ||
      nameError !== false ||
      keywordError !== false ||
      imageURLError !== false
    ) {
      return;
    }

    this.props.openLoading();
    patchBrand(
      {
        id: brandSelected.id,
        brand_name: brandSelected.brandName
          ? brandSelected.brandName.trim()
          : "",
        keywords: brandSelected.keywords ? brandSelected.keywords.trim() : "",
        categories: brandSelected.categories,
        image_url: brandSelected.imageURL ? brandSelected.imageURL.trim() : "",
        description: brandSelected.description
          ? brandSelected.description.trim()
          : ""
      },
      ({ code }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(code);
        this.setState(
          {
            openModal: false,
            forceUpdate: true
          },
          () =>
            this.props.dispatchNotification({
              message: `${intl.formatMessage({ defaultMessage: "Brand"})} ${brandSelected.brandName} ${intl.formatMessage({ defaultMessage: "is edited."})}`,
              open: true,
              icon: AddAlert
            })
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
      if (status === 337) {
        this.props.dispatchNotification(
          {
            message: `${intl.formatMessage({ defaultMessage: "Brand"})} ${brandSelected.brandName} ${intl.formatMessage({ defaultMessage: "was existed. Please try another."})}`,
            open: true,
            icon: AddAlert,
            color: "danger"
          },
          2000
        );
      }
      if (status === 331) {
        this.props.dispatchNotification(
          {
            message: intl.formatMessage({ defaultMessage: `Some categories did not exist. Please try another.`}),
            open: true,
            icon: AddAlert,
            color: "danger"
          },
          2000
        );
      }
    });
  };

  createBrand = () => {
    const {
      brandSelected,
      nameError,
      keywordError,
      imageURLError
    } = this.state;
    if (
      typeof brandSelected.imageURL !== "undefined" &&
      brandSelected.imageURL !== "" &&
      !validateLinkUrl(brandSelected.imageURL)
    ) {
      this.props.dispatchNotification({
        message: intl.formatMessage({ defaultMessage: "Invalid URL"}),
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }

    if (
      brandSelected.brandName.trim() === "" ||
      brandSelected.keywords.trim() === "" ||
      nameError !== false ||
      keywordError !== false ||
      imageURLError !== false
    ) {
      return;
    }

    this.props.openLoading();
    postBrand(
      {
        brand_name: brandSelected.brandName.trim(),
        image_url: brandSelected.imageURL.trim(),
        categories: brandSelected.categories,
        keywords: brandSelected.keywords.trim(),
        description: brandSelected.description.trim()
      },
      ({ code }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(code);
        this.setState(
          {
            openModal: false,
            forceUpdate: true
          },
          () =>
            this.props.dispatchNotification({
              message: `Brand ${brandSelected.brandName} is created.`,
              open: true,
              icon: AddAlert
            })
        );
      }
    ).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
      if (status === 337) {
        this.props.dispatchNotification(
          {
            message: `Brand ${brandSelected.brandName} was existed. Please try another.`,
            open: true,
            icon: AddAlert,
            color: "danger"
          },
          2000
        );
      }
      if (status === 331) {
        this.props.dispatchNotification(
          {
            message: `Some categories did not exist. Please try another.`,
            open: true,
            icon: AddAlert,
            color: "danger"
          },
          2000
        );
      }
    });
  };

  openNewBrand = () => {
    this.setState({
      openModal: true,
      categoriesChosen: [],
      brandSelected: {
        brandName: "",
        keywords: "",
        categories: [],
        imageURL: "https://storage.googleapis.com/yn-influencer/Default.jpg",
        description: ""
      }
    });
  };

  editOpenBrand = idx => {
    const brandSelected = { ...this.state.brands[idx] };
    const { allCategories } = this.state;

    this.setState({
      openModal: true,
      brandSelected,
      categoriesChosen: brandSelected.categories
        ? brandSelected.categories.map(itemId => ({
            value: allCategories[itemId].categoryCode,
            label: allCategories[itemId].categoryName
          }))
        : [],
      ...validationRulesName(brandSelected.brandName),
      ...validationRulesImageURL(brandSelected.imageURL),
      // ...validationRulesDesc(brandSelected.description),
      ...validationRulesKeywords(brandSelected.keywords)
    });
  };

  removeBrand = idx => {
    this.closeConfirmationPopup();
    this.props.openLoading();
    deleteBrand(this.state.brands[idx], ({ code }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(code);
      this.toPage(0);
    }).catch(({ status }) => {
      this.props.closeLoading();
      this.props.dispatchFetchResult(status);
    });
  };

  closeDialog = () => {
    this.setState({
      openModal: false,
      nameError: false,
      keywordError: false,
      imageURLError: false
      // descriptionError: false
    });
  };

  onChangeBrandName = brandName => {
    const { brandSelected } = this.state;
    brandSelected.brandName = brandName;
    this.setState({
      brandSelected,
      ...validationRulesName(brandSelected.brandName)
    });
  };

  onChangeKeywords = keywords => {
    const { brandSelected } = this.state;
    brandSelected.keywords = keywords;
    this.setState({
      brandSelected,
      ...validationRulesKeywords(brandSelected.keywords)
    });
  };

  onChangeImageURL = imageURL => {
    const { brandSelected } = this.state;
    brandSelected.imageURL = imageURL;
    this.setState({
      brandSelected,
      ...validationRulesImageURL(brandSelected.imageURL)
    });
  };

  onChangeDescription = description => {
    const { brandSelected } = this.state;
    brandSelected.description = description;
    this.setState({
      brandSelected
      // ...validationRulesDesc(brandSelected.description)
    });
  };

  onChangeCategories = options => {
    const { brandSelected } = this.state;
    this.setState({
      categoriesChosen: options,
      brandSelected: {
        ...brandSelected,
        categories: options
          ? options.map(item => item.value)
          : brandSelected.categories
      }
    });
  };

  openConfirmationPopup = idx => {
    this.setState({
      openConfirmationPopup: true,
      brandDeletedIndex: idx
    });
  };

  closeConfirmationPopup = () => {
    this.setState({
      openConfirmationPopup: false,
      brandDeletedIndex: null
    });
  };

  render() {
    const { classes, name, bcRoutes, isFromDiscoverPage, sideBarState } = this.props;
    const intl = this.props.intl;
    const {
      categories,
      brands,
      brandSelected,
      categoriesChosen,
      totalResult,
      filterBy,
      sortBy,
      showing,
      filterName,
      openModal,
      nameError,
      keywordError,
      imageURLError,
      // descriptionError,
      openConfirmationPopup,
      brandDeletedIndex
    } = this.state;

    const generatedPages = generatePageList(this.state, this.toPage);

    const result = generatedPages.length > 3 ? generatedPages : [];
    // console.log('what generated page: ', JSON.stringify(result));

    return (
      <div className={classes.mainDiv}>
        {this.props.drawHeader({
          name: <Breadcrumbs name={name} bcRoutes={bcRoutes} isFromDiscoverPage={isFromDiscoverPage} />
        })}
        <ConfirmationPopup
          id="confirm-delete-brand"
          keepMounted
          openConfirmationPopup={openConfirmationPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClose={this.closeConfirmationPopup}
          onClickConfirmation={() => this.removeBrand(brandDeletedIndex)}
          onClickCancel={this.closeConfirmationPopup}
          confirmationTitle={intl.formatMessage({ defaultMessage: "Confirmation"})}
          confirmationBtnText={intl.formatMessage({ defaultMessage: "Yes, Delete It"})}
          cancelBtnText={intl.formatMessage({ defaultMessage: "Cancel"})}
          confirmationQuestion={intl.formatMessage({ defaultMessage: "Are You Sure?"})}
          confirmationStatement={
            intl.formatMessage({ defaultMessage: "You want to delete this item and its related data."})
          }
        />
        <BrandModalDialog
          open={intl.formatMessage({ defaultMessage: "openModal"})}
          onCloseClick={this.closeDialog}
          onClickButton={this.closeDialog}
          onClickCancel={this.closeDialog}
          brand={intl.formatMessage({ defaultMessage: "brandSelected"})}
          categoriesChosen={intl.formatMessage({ defaultMessage: "categoriesChosen"})}
          categories={intl.formatMessage({ defaultMessage: "categories"})}
          onClickEdit={this.editBrand}
          onClickCreate={this.createBrand}
          onChangeCategories={this.onChangeCategories}
          onChangeBrandName={this.onChangeBrandName}
          onChangeName={this.onChangeName}
          onChangeKeywords={this.onChangeKeywords}
          onChangeImageURL={this.onChangeImageURL}
          onChangeDescription={this.onChangeDescription}
          nameError={nameError}
          keywordError={keywordError}
          imageURLError={imageURLError}
          // descriptionError={descriptionError}
        />
        <ControllerBrandsNav
          numberResults={intl.formatMessage({ defaultMessage: "totalResult"})}
          filterByOptions={intl.formatMessage({ defaultMessage: "filterByOptions"})}
          filterBySelectedValue={intl.formatMessage({ defaultMessage: "filterBy"})}
          filterByOnChange={this.changeFilterBy}
          sortByOptions={sortByOptions}
          sortBySelectedValue={sortBy}
          sortByOnChange={this.changeSortBy}
          showingOptions={perPageOptions}
          showingSelectedValue={showing}
          showingOnChange={this.changePageSize}
          filterName={({ target: { value } }) => this.changeFilterName(value)}
          filterNameValue={filterName}
          onClickNewCollection={this.openNewBrand}
        />
        <ContentBrands
          collections={brands.map(
            ({
              id,
              brandName,
              imageURL,
              description,
              categoryName,
              categories,
              keywords
            }) => ({
              id: id,
              brandName: brandName,
              categories: categories,
              keywords: keywords,
              categoryName: categoryName,
              imageURL: imageURL,
              description: description
            })
          )}
          onClickEdit={this.editOpenBrand}
          onClickDelete={this.openConfirmationPopup}
        />
        <Pagination
          pages={generatedPages.length > 3 ? generatedPages : []}
          color="influencer"
        />
      </div>
    );
  }
}

Brands.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    ...state.breadcrumbs
  };
};

const mapDispatchToProps = {
  dispatchNotification,
  dispatchFetchResult,
  openLoading,
  closeLoading,
  fromCollection,
  updateRouteParams
};

export default injectIntl (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(collectionsStyle)(Brands))
) ;
