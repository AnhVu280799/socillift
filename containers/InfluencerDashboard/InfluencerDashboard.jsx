import React from 'react';
import PropTypes from "prop-types";
import styles from './InfluencerDashboardStyle';
import InfDetailCard from './InfDetailCard';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SocialMetrics from './SocialMetrics';
import Breadcrumbs from "components/Breadcrumbs";
import Tracker from 'apis/tracker';
import { injectIntl } from 'react-intl';
import FbTracker from 'apis/fbtracker';
import { compose } from "redux";
import { connect } from 'react-redux';
import {
  resetState,
  fetchInfluencers,
  changePlatform,
  changeSelectedTab
} from "redux/influencer/dashboard/actions";
import PLATFORMS from 'constants/platforms';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import {
  openLoading,
  closeLoading
} from 'reducers/ScreenLoadingReducer';
import moment from "moment";

class InfluencerDashboard extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  get socialAccounts() {
    return this.props.accounts;
  }

  get listPlatform() {
    return Object.keys(this.props.accounts);
  }

  componentDidMount() {
    Tracker.pageview();
    FbTracker.pageview();
    this.props.minimizeSidebar(true, 'permanent');
  }

  componentDidUpdate(prevProps) {
    if (this.props.accounts !== prevProps.accounts && Object.keys(this.props.accounts).length > 0) {
      const influencerIds = this.listPlatform.map((platform) => { 
        return {
          id: this.socialAccounts[platform].influencerId,
          platform: platform
        }
      });
      this.props.fetchInfluencers(influencerIds);
    }
  }

  componentWillUnmount() {
    this.props.resetState();
    this.props.closeLoading();
  }

  renderHeader = () => {
    const {
      name,
      breadcrumbs: { bcRoutes }
    } = this.props;

    return this.props.drawHeader({
      name: (
        <Breadcrumbs
          name={name}
          bcRoutes={bcRoutes}
        />   
      ),
      hide: true
    });
  };

  render() {
    const { influencers, platform, selectedTab, isWaiting, classes } = this.props;
    const intl = this.props.intl;
    const socialMetrics = influencers ? this.listPlatform.map(platformK => {
      return (influencers[platformK] && <SocialMetrics
        platform={platformK === 'youtube' ? 'youtube' : (platformK === 'insta' ? intl.formatMessage({ defaultMessage: 'insta'}) : intl.formatMessage({ defaultMessage: 'facebook'}))}
        showTooltip={true}
        size={influencers[platformK].size}
        {...influencers[platformK].platformDetail[platformK]}
        categories={influencers[platformK].categories}
        overallPerformanceOneWeek={influencers[platformK].platformDetail[platformK].overallPerformanceOneWeek ? influencers[platformK].platformDetail[platformK].overallPerformanceOneWeek : {}}
        overallPerformanceTwoWeek={influencers[platformK].platformDetail[platformK].overallPerformanceTwoWeek ? influencers[platformK].platformDetail[platformK].overallPerformanceTwoWeek : {}}
        overallPerformanceOneMonth={influencers[platformK].platformDetail[platformK].overallPerformanceOneMonth ? influencers[platformK].platformDetail[platformK].overallPerformanceOneMonth : {}}
        overallPerformanceThreeMonth={influencers[platformK].platformDetail[platformK].overallPerformanceThreeMonth ? influencers[platformK].platformDetail[platformK].overallPerformanceThreeMonth : {}}
        tagCloud={platformK === 'fb' || platformK === 'page' ? influencers[platformK].platformDetail[platformK].tagCloud : []}
        tabPlatform={selectedTab}
        isWaiting={influencers[platformK].platformDetail[platformK].overallPerformanceOneWeek && Object.keys(influencers[platformK].platformDetail[platformK].overallPerformanceOneWeek).length > 1 ? false : isWaiting[selectedTab]}
        linkedTime={this.socialAccounts[platform] ? this.socialAccounts[platform].linkedTime : ''}
      />)
    }) : [];
    return (
      <div className={classes.mainDiv}>
        {this.renderHeader()}
        { !!this.listPlatform.length && influencers && influencers[platform] && (
          <React.Fragment>
            <InfDetailCard
              {...influencers[platform]}
              facebookId={Object.keys(influencers[platform].platformDetail.fb).length > 2 ? influencers[platform].platformDetail['fb'].id : null}
              pageId={Object.keys(influencers[platform].platformDetail.page).length > 2 ? influencers[platform].platformDetail['page'].id : null}
              youtubeId={Object.keys(influencers[platform].platformDetail.youtube).length > 2 ? influencers[platform].platformDetail['youtube'].id : null}
              instaUserName={Object.keys(influencers[platform].platformDetail.insta).length > 2 ? influencers[platform].platformDetail['insta'].userName : null}
              platform={platform}
              platformCategories={influencers[platform].platformCategories}
              onEdit={() => this.props.history.push(`/influencer/${influencers[platform].id}`)}
            />
            <Tabs
              classes={{ indicator: classes.tabsIndicator }}
              className={classes.tabs}
              value={selectedTab}
              onChange={(e, tabNetwork) => {
                this.props.changeSelectedTab(tabNetwork);
                this.props.changePlatform(this.listPlatform[tabNetwork]);
              }}
            >
              { !!this.listPlatform.length &&
                this.listPlatform.map(platformK => (
                  <Tab
                    key={platformK}
                    classes={{
                      root: classes.tabRoot,
                      selected: classes.selectedTab,
                      labelContainer: classes.tabLabelContainer
                    }}
                    label={PLATFORMS[platformK]}
                  />
                ))
              }
            </Tabs>
            {socialMetrics[selectedTab]}
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  breadcrumbs: state.breadcrumbs,
  influencers: state.influencer.dashboard.influencers,
  accounts: state.socialAccounts.accounts,
  platform: state.influencer.dashboard.platform,
  selectedTab: state.influencer.dashboard.selectedTab,
  isWaiting: Object.keys(state.socialAccounts.accounts).map(key => moment(moment(state.socialAccounts.accounts[key].linkedTime).add(1, 'd').format()).isAfter(moment(), 'second')),
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  dispatchFetchResult,
  resetState,
  fetchInfluencers,
  changePlatform,
  changeSelectedTab
};

export default injectIntl (
  compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "InfluencerDashboard" })
)(InfluencerDashboard)) ;
