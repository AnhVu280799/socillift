import React from "react";

// style
import styles from "./DiscoverInfluencersStyle";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// custom component
import Breadcrumbs from "components/Breadcrumbs";
import AlertModalDialog from "components/AlertModalDialog";

// discover-influencers component
import PlatformFilter from "./PlatformFilter";
import ConditionFilter from "./ConditionFilter";
import InfluencerDemographic from "./InfluencerDemographic";
import AudienceDemographic from "./AudienceDemographic";
import InfluencedCategory from "./InfluencedCategory";
import { injectIntl } from 'react-intl';
// tracker GA
import Tracker from "apis/tracker";
import FbTracker from "apis/fbtracker";
import { connect } from "react-redux";

// reducer
import { dispatchNotification } from "reducers/NotificationReducer";
import {
  updateRouteParams,
  fromDiscoverPage
} from "reducers/BreadcrumbsReducer";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";

// util
import {
  stateToParams,
  paramsToUrl,
  parseParamsDiscoverPage,
  paramsToStateDiscoverPage,
} from 'utils';

// api
import { getUserInfo } from "apis/api";

class DiscoverInfluencers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      platform: "fb",
      openModal: false,
      openModalDemo: false,
      subscriptionPlan: {},
      roleId: ""
    };
    this.props.minimizeSidebar(true);
  }

  componentDidMount() {
    Tracker.pageview();
    FbTracker.pageview();
    this.props.openLoading()
    getUserInfo(this.props.userInfo._id,
      (result) => {
        this.setState({
          subscriptionPlan: result.remaining_pricing_plan ? result.remaining_pricing_plan : null,
          roleId: result.role && result.role._id ? result.role._id : ""
        }, () => this.props.closeLoading()
        )
      }
    ).catch(({ status }) => {
      this.props.dispatchFetchResult(status);
      this.props.closeLoading();
    });
  }

  componentWillUnmount() {
    this.props.closeLoading();
  }

  handleBack = currentStep => {
    this.props.openLoading()
    this.setState({
      activeStep: currentStep - 1
    }, () => this.props.closeLoading());
  };

  choosePlatform = platform => {
    this.props.openLoading()
    this.setState({
      activeStep: 1,
      platform: platform
    }, () => this.props.closeLoading());
  };

  handleNextInfDemo = () => {
    this.props.openLoading()
    this.setState({
      activeStep: 2
    }, () => this.props.closeLoading());
  };

  handleNextAudDemo = () => {
    this.props.openLoading()
    this.setState({
      activeStep: 3
    }, () => this.props.closeLoading());
  };

  handleNextInfCate = () => {
    this.props.openLoading()
    this.setState({
      activeStep: 4
    }, () => this.props.closeLoading());
  };

  handleBackCondtionFilter = () => {
    this.props.openLoading()
    this.setState({
      activeStep: 1
    }, () => this.props.closeLoading());
  };

  closeDialog = () => {
    this.setState({
      openModal: false
    });
  };

  applyFilter = state => {
    Tracker.event("Advanced Search", "Apply Filter");
    const isDemoAccount = this.props.userInfo.globalPermissions.isDemoAccount;

    if (
      this.props.userInfo.isExternalAccount &&
      typeof this.state.subscriptionPlan.search === 'object' &&
      Object.keys(this.state.subscriptionPlan.search) > 0 &&
      this.state.subscriptionPlan.search.remaining <= 0
    ) {
      this.setState({
        openModal: true,
      });
      return;
    }
    const params = stateToParams({ ...state, pageSize: 12, pageIndex: 0 });
    const newState = paramsToStateDiscoverPage(parseParamsDiscoverPage(paramsToUrl(params)));

    if (newState.numberParams > 5 && isDemoAccount) {
      this.setState({
        openModalDemo: true
      });
      return
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
          ? "avg_influencer_score"
          : filterByAudience
            ? "detail_demographics"
            : params.categories
              ? "avg_influencer_score"
              : "total_followers"
    };

    const url = `/advanced-search?${paramsToUrl(newParams)}`;
    this.props.history.push(url);
  };

  closeDialogModalDemo = () => {
    this.setState({
      openModalDemo: false
    })
  }

  render() {
    const { classes, name, bcRoutes, userInfo } = this.props;
    const intl = this.props.intl;
    const { activeStep, platform, openModal, openModalDemo, roleId } = this.state;
    const disableExternalAccount =
      userInfo.globalPermissions !== null && userInfo.isExternalAccount;

    const steps = [
      <PlatformFilter
        choosePlatform={this.choosePlatform}
        userName={userInfo.username ? userInfo.username : "_"}
        disableExternalAccount={disableExternalAccount}
        isDemoAccount={this.props.userInfo.globalPermissions.isDemoAccount || false}
      />,
      <ConditionFilter
        platform={platform}
        onBack={this.handleBack}
        onNextInfDemo={this.handleNextInfDemo}
        onNextAudDemo={this.handleNextAudDemo}
        onNextInfCate={this.handleNextInfCate}
      />,
      <InfluencerDemographic
        platform={platform}
        onBack={this.handleBackCondtionFilter}
        onApply={this.applyFilter}
      />,
      <AudienceDemographic
        platform={platform}
        onBack={this.handleBackCondtionFilter}
        onApply={this.applyFilter}
      />,
      <InfluencedCategory
        platform={platform}
        onBack={this.handleBackCondtionFilter}
        onApply={this.applyFilter}
        roleId={roleId}
      />
    ];

    return (
      <Grid container direction="column" className={classes.mainDiv}>
        {this.props.drawHeader({
          name: <Breadcrumbs name={name} bcRoutes={bcRoutes} />,
          hide: true
        })}
        <AlertModalDialog
          open={openModalDemo}
          onClose={this.closeDialogModalDemo}
          onCloseClick={this.closeDialogModalDemo}
          onClickButton={this.closeDialogModalDemo}
          content={intl.formatMessage({ defaultMessage: "You're in a demo account that can't have more than 5 parameters for each filters. Please contact us to find more!" })}
        />
        <AlertModalDialog
          open={openModal}
          onCloseClick={this.closeDialog}
          onClickButton={this.closeDialog}
          content={
            intl.formatMessage({ defaultMessage: "You've exceeded the maximum of number profile searching. Please contact us for further support & information."})
          }
        />
        {steps[activeStep]}
      </Grid>
    );
  }
}

export default injectIntl ( connect(
  ({ breadcrumbs, userInfo }) => ({ userInfo, ...breadcrumbs }),
  {
    dispatchNotification,
    updateRouteParams,
    fromDiscoverPage,
    openLoading,
    closeLoading,
    dispatchFetchResult
  }
)(withStyles(styles)(DiscoverInfluencers)));
