import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./SocialMetricsStyle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { injectIntl } from 'react-intl';
import AudienceDemo from "./AudienceDemo";
import Analytics from "./Analytics";
import RecentActivities from "./RecentActivities";
import OverallPerformance from "./OverallPerformance";

import SwipeableViews from 'react-swipeable-views';

class SocialMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  handleBack = (value) => {
    this.setState({
      tab: value - 1
    })
  }

  handleNext = (value) => {
    this.setState({
      tab: value + 1
    })
  }

  render() {
    const {
      classes,
      followersHistory,
      size,
      engagementRate,
      reachRate,
      sentimentRate,
      influenceScore,
      categories,
      trueResonance,
      demographicsJob,
      demographicsEducation,
      demographicsGender,
      demographicsAge,
      demographicsLocation,
      totalFollowers,
      totalFollowersGrowth4w: followerGrowth,
      followerGrowthByPercentage,
      followerInactivePercent,
      totalPosts,
      totalEngagement,
      avgEngagement,
      totalReactions,
      totalComments,
      totalShares,
      platform,
      isFacebook,
      hasPermissionViewOverall,
      id,
      totalDislikes,
      totalLikes,
      totalViews,
      showTooltip,
      overallPerformanceOneWeek,
      overallPerformanceTwoWeek,
      overallPerformanceOneMonth,
      overallPerformanceThreeMonth,
      tagCloud
    } = this.props;
    const intl = this.props.intl;
    let tabs = [];

    if (isFacebook && hasPermissionViewOverall) {
      tabs.push(<OverallPerformance
        showTooltip={true}
        platform={platform}
        overallPerformanceOneWeek={overallPerformanceOneWeek}
        overallPerformanceTwoWeek={overallPerformanceTwoWeek}
        overallPerformanceOneMonth={overallPerformanceOneMonth}
        overallPerformanceThreeMonth={overallPerformanceThreeMonth}
        tagCloud={tagCloud}
      />);
    }

    tabs = tabs.concat([
      <AudienceDemo
        followersHistory={followersHistory}
        demographicsJob={demographicsJob}
        demographicsEducation={demographicsEducation}
        demographicsGender={demographicsGender}
        demographicsAge={demographicsAge}
        demographicsLocation={demographicsLocation}
        followerInactivePercent={followerInactivePercent}
        size={size}
        totalFollowers={totalFollowers}
        followerGrowth={followerGrowth}
        followerGrowthByPercentage={followerGrowthByPercentage}
        platform={platform}
        showTooltip={showTooltip}
      />,
      <Analytics
        engagementRate={engagementRate}
        reachRate={reachRate}
        sentimentRate={sentimentRate}
        influenceScore={influenceScore}
        resonanceScore={trueResonance}
        showTooltip={showTooltip}
        categories={categories}
      />,
      <RecentActivities
        totalPosts={totalPosts}
        totalEngagement={totalEngagement}
        avgEngagement={avgEngagement}
        totalReactions={totalReactions}
        totalLikes={totalLikes}
        totalDislikes={totalDislikes}
        totalViews={totalViews}
        totalComments={totalComments}
        totalShares={totalShares}
        authorId={id}
        showTooltip={showTooltip}
        platform={platform}
        totalPosts={totalPosts}
      />
    ]);

    const tabFourLabel = ['Overall', 'Audience', 'Analytics', 'Activities']
    const tabThreeLabel = ['Audience', 'Analytics', 'Activities']

    return (
      <React.Fragment>
        <Hidden smDown>
          <Tabs
            classes={{ indicator: classes.tabsIndicator, root: classes.tabsRoot }}
            value={this.state.tab}
            onChange={(e, tab) => this.setState({ tab })}
          >
            {isFacebook && hasPermissionViewOverall &&
              <Tab
                classes={{
                  labelContainer: classes.tabLabelContainer,
                  selected: classes.selectedTab,
                  root: classes.tabRoot
                }}
                label={intl.formatMessage({ defaultMessage: 'Overall Performance'})}
              />}
            <Tab
              classes={{
                labelContainer: classes.tabLabelContainer,
                selected: classes.selectedTab,
                root: classes.tabRoot
              }}
              label={intl.formatMessage({ defaultMessage: "Audience"})}
            />
            <Tab
              classes={{
                labelContainer: classes.tabLabelContainer,
                selected: classes.selectedTab,
                root: classes.tabRoot
              }}
              label={intl.formatMessage({ defaultMessage: "Analytics"})}
            />
            <Tab
              classes={{
                labelContainer: classes.tabLabelContainer,
                selected: classes.selectedTab,
                root: classes.tabRoot
              }}
              label={intl.formatMessage({ defaultMessage: "Recent activities"})}
            />
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <Grid
            container
            direction="row"
            className={classes.navWrapper}
          >
            <Grid
              item
              container
              direction="column"
              sm={2}
              xs={2}
            >
              <Button size="small" onClick={() => this.handleBack(this.state.tab)} disabled={this.state.tab === 0} className={classes.btnArrow}>
                {this.state.tab > 0 &&
                  <KeyboardArrowLeft className={classes.arrowIcon} />
                }
              </Button>
            </Grid>
            <Grid
              item
              container
              direction="column"
              sm={8}
              xs={8}
              alignItems="center"
              justify="center"
            >
              <div className={classes.tabLable}>
                {isFacebook && hasPermissionViewOverall
                  ? tabFourLabel[this.state.tab]
                  : tabThreeLabel[this.state.tab]}
              </div>
            </Grid>
            <Grid
              item
              container
              direction="column"
              sm={2}
              xs={2}
            >
              <Button size="small" onClick={() => this.handleNext(this.state.tab)} disabled={this.state.tab === 3} className={classes.btnArrow}>
                {this.state.tab < 3 &&
                  <KeyboardArrowRight className={classes.arrowIcon} />
                }
              </Button>
            </Grid>
          </Grid>
        </Hidden>
        {tabs[this.state.tab]}
      </React.Fragment>
    );
  }
}

export default injectIntl (withStyles(styles)(SocialMetrics)) ;
