// react
import React from "react";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// style
import styles from "./SocialMetricsStyle";
import { injectIntl } from 'react-intl';
// custom component
import RecentActivities from "./RecentActivities";
import OverallPerformance from "./OverallPerformance";

class SocialMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabPlatform: 0
    };
  }

  componentDidUpdate() {
    if (this.state.tabPlatform !== this.props.tabPlatform) {
      this.setState({
        tab: 0,
        tabPlatform: this.props.tabPlatform
      })
    }
  }

  render() {
    const {
      classes,
      totalFollowers,
      platform,
      id,
      totalDislikes,
      totalLikes,
      totalViews,
      showTooltip,
      overallPerformanceOneWeek,
      overallPerformanceTwoWeek,
      overallPerformanceOneMonth,
      overallPerformanceThreeMonth,
      tagCloud,
      tabPlatform,
      isWaiting,
      linkedTime
    } = this.props;
    const intl = this.props.intl;
    let tabs = [];

    if (platform === 'facebook') {
      tabs.push(
        <OverallPerformance
          showTooltip={true}
          platform={platform}
          overallPerformanceOneWeek={overallPerformanceOneWeek}
          overallPerformanceTwoWeek={overallPerformanceTwoWeek}
          overallPerformanceOneMonth={overallPerformanceOneMonth}
          overallPerformanceThreeMonth={overallPerformanceThreeMonth}
          tagCloud={tagCloud}
          tabPlatform={tabPlatform}
          isWaiting={isWaiting}
          linkedTime={linkedTime}
        />
      );
    }

    tabs = [
      <RecentActivities
        authorId={id}
        showTooltip={showTooltip}
        platform={platform}
        tabPlatform={tabPlatform}
        totalFollowers={totalFollowers}
        isWaiting={isWaiting}
      />
    ];

    return (
      <React.Fragment>
        <Tabs
          classes={{
            indicator: classes.tabsIndicator,
            root: classes.tabsRoot
          }}
          value={this.state.tab}
          onChange={(e, tab) => this.setState({ tab })}
        >
          {
            platform === 'facebook' &&
            <Tab
              classes={{
                labelContainer: classes.tabLabelContainer,
                selected: classes.selectedTab,
                root: classes.tabRoot
              }}
              label={intl.formatMessage({ defaultMessage: 'Overall Performance'})}
            />
          }
          <Tab
            classes={{
              labelContainer: classes.tabLabelContainer,
              selected: classes.selectedTab,
              root: classes.tabRoot
            }}
            label={intl.formatMessage({ defaultMessage: "Recent activities"})}
          />
        </Tabs>
        {tabs[this.state.tab]}
      </React.Fragment>
    );
  }
}

export default injectIntl (withStyles(styles)(SocialMetrics)) ;
