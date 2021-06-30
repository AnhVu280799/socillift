import React from 'react';
import queryString from 'query-string';

// reactChartist
import ReactChartist from 'react-chartist';
import Chartist from 'chartist';
import { injectIntl } from 'react-intl';
// style
import styles from './CampaignTrackingStyle';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

// custom component
import Breadcrumbs from 'components/Breadcrumbs';

//  Influencer Tracking component
import SearchBanner from './SearchBanner';
import OverallCampaignCard from './OverallCampaignCard';
import ContactUs from './ContactUs';
import AdvocacyChart from './AdvocacyChart';
import PostChart from './PostChart';
import DescriptionCard from './DescriptionCard';
import UniqueAudienceCard from './UniqueAudienceCard';
import ChartCard from './ChartCard';
import GenderChart from './GenderChart';

// tracker GA
import Tracker from 'apis/tracker';
import { connect } from 'react-redux';

// api
import { findHashtagByName } from 'apis/api';

// utils
import { stateToParamsHashtags, normalizeHashtag } from './util.js';
import { paramsToUrl } from 'utils/index.js';

// reducer
import { dispatchNotification } from 'reducers/NotificationReducer';
import {
  updateRouteParams,
  fromDiscoverPage
} from 'reducers/BreadcrumbsReducer';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import { openLoading, closeLoading } from 'reducers/ScreenLoadingReducer';

// constants
import Age2Idx from 'constants/ageRangeToLevels';
import FollowerImage from 'assets/img/Follower.svg';
import PercentImage from 'assets/img/Percent.svg';
import ActiveImage from 'assets/img/Active.svg';
import defaultAvatar from 'assets/img/Avatar Default.png';

import { APP_NAME } from 'constants/common';

const defaultImagePost =
  'https://storage.googleapis.com/yn-influencer/NoImageFound.png';

class CampaignTracking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultHashtag: '',
      defaultSuggestionHashtag: [],
      hashtag: '',
      processedParam: '',
      suggestionHashtag: [],
      findType: '0',
      params: {},
      totalInfluencer: '_',
      totalQualifiedInfluencer: '_',
      totalPostGenerated: '_',
      totalEngagementGenerated: '_',
      totalReactionsGenerated: '_',
      totalCommentsGenerated: '_',
      totalSharesGenerated: '_',
      activeAgeDemographic: {},
      activeLocationDemographic: {},
      activeGenderDemographic: {},
      totalUniqueFollower: '_',
      totalUniqueActiveFollower: '_',
      totalUniqueActiveFollowerRate: '_',
      avatarList: [],
      photoPostList: [],
      top5Influencer: [],
      top5Post: [],
      noData: false,
      forceUpdate: false,
      updateTextSearch: false,
      lastUpdatedDateTime: '',
      startAvailableDate: '',
      endAvailableDate: ''
    };

    this.props.minimizeSidebar(true);
  }

  getUrlParams = () => {
    let fullPath = this.props.location.search.slice(1);
    const result = fullPath ? queryString.parse(fullPath) : {};

    return result;
  };

  updateHashtag = (hashtag, cb) => {
    const pathParams = {
      hashtag: hashtag
    };

    this.setState(
      {
        hashtag,
        processedParam:
          this.props.location.pathname + '?' + queryString.stringify(pathParams)
      },
      cb
    );
  };

  fetchDefaultHashtags = async () => {
    const url =
      'https://spreadsheets.google.com/feeds/cells/1BKLTZwDCLdBm2GXIqIMPjL-0th1Iy-_ppqFrzkV2AIM/1/public/full?alt=json';

    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();
    const { entry } = data.feed;

    const table = entry.reduce((obj, elm) => {
      const { gs$cell: cell } = elm;
      const col = Number.parseInt(cell.col, 10);
      const row = Number.parseInt(cell.row, 10);
      const val = cell.inputValue;

      if (row == 1) return obj;

      if (!obj[col]) obj[col] = {};
      obj[col][row] = val;

      return obj;
    }, {});

    const cleanHashtag = hashtag =>
      normalizeHashtag(hashtag.replace('\n', '').replace('\t', ''));

    let [defaultHashtag] = Object.values(table[1]);
    defaultHashtag = cleanHashtag(defaultHashtag);

    const defaultSuggestionHashtags = Object.values(table[2]).map(hashtag =>
      cleanHashtag(hashtag)
    );

    this.setState({
      defaultHashtag,
      defaultSuggestionHashtag: defaultSuggestionHashtags,
      suggestionHashtag: defaultSuggestionHashtags
    });
  };

  fetchData = async params => {
    return findHashtagByName(queryString.stringify(params));
  };

  fetchUpdatedDate = async () => {
    const { total, result } = await this.fetchData({
      hashtag: this.state.defaultHashtag,
      find_type: 0
    });

    if (total > 0) {
      this.setState({
        lastUpdatedDateTime: result.lastUpdatedDateTime,
        startAvailableDate: result.startAvailableDate,
        endAvailableDate: result.endAvailableDate
      });
    }
  };

  fetchSuggestionHashtags = async () => {
    const { total, result } = await this.fetchData({
      hashtag: this.state.hashtag,
      find_type: 1
    });

    let suggestionHashtags = this.state.defaultSuggestionHashtag;

    if (total > 0) {
      suggestionHashtags = result.map(({ hashtag }) => hashtag);
    }

    this.setState({
      suggestionHashtag: suggestionHashtags
    });
  };

  fetchHashtag = async () => {
    const { total, result } = await this.fetchData({
      hashtag: this.state.hashtag,
      find_type: 0
    });

    // case find exactly not found
    if (total < 1) {
      if (!this.state.lastUpdatedDateTime) {
        await this.fetchUpdatedDate();
      }

      await this.fetchSuggestionHashtags();

      this.setState({ noData: true });

      return;
    }

    // case found
    let photoList = [];

    result.top5Post.forEach(element => {
      photoList = photoList.concat(element.postPhotos);
    });

    this.setState({
      noData: false,
      totalInfluencer: result.totalInfluencer || '_',
      totalQualifiedInfluencer: result.totalQualifiedInfluencer || '_',
      totalPostGenerated: result.totalPostGenerated || '_',
      totalEngagementGenerated: result.totalEngagementGenerated || '_',
      totalReactionsGenerated: result.totalReactionsGenerated || '_',
      totalCommentsGenerated: result.totalCommentsGenerated || '_',
      totalSharesGenerated: result.totalSharesGenerated || '_',
      activeAgeDemographic: result.activeAgeDemographic || {},
      activeLocationDemographic: result.activeLocationDemographic || {},
      activeGenderDemographic: result.activeGenderDemographic || {},
      totalUniqueFollower: result.totalUniqueFollower || '_',
      totalUniqueActiveFollower: result.totalUniqueActiveFollower || '_',
      totalUniqueActiveFollowerRate:
        result.totalUniqueActiveFollowerRate || '_',
      avatarList: result.top5Influencer
        ? result.top5Influencer
            .map(element => element.avatar)
            .filter(element => typeof element === 'string')
        : [],
      photoPostList: photoList,
      top5Influencer: result.top5Influencer || [],
      top5Post: result.top5Post || [],
      maxEngagementPost: result.maxEngagementPost,
      lastUpdatedDateTime: result.lastUpdatedDateTime,
      startAvailableDate: result.startAvailableDate,
      endAvailableDate: result.endAvailableDate,
      suggestionHashtag: this.state.defaultSuggestionHashtag
    });
  };

  componentDidMount() {
    Tracker.pageview();

    // this.props.updateRouteParams(this.props.name, this.props.location);
    this.props.openLoading();

    // parse url params to hashtag
    const urlParams = this.getUrlParams();
    if (urlParams && urlParams.hashtag) {
      this.updateHashtag(normalizeHashtag(urlParams.hashtag));
    }

    // get default hashtag and suggestion hashtags
    this.fetchDefaultHashtags().then(() => {
      if (!this.state.hashtag) {
        this.updateHashtag(this.state.defaultHashtag);
      }

      // replace path params
      this.props.history.replace(this.state.processedParam);

      // fetch data
      return this.fetchHashtag(this.state.hashtag)
        .then(() => {
          this.props.closeLoading();
        })
        .catch(({ status }) => {
          this.props.dispatchFetchResult(status);
        });
    });
  }

  changeHashtagName = hashtag => {
    if (!hashtag) {
      hashtag = normalizeHashtag(this.state.defaultHashtag);
    }

    hashtag = normalizeHashtag(hashtag);

    const params = stateToParamsHashtags({ hashtag });
    const url = `/influencer-tracking?${paramsToUrl(params)}`;
    this.props.history.push(url);

    this.props.openLoading();

    this.updateHashtag(hashtag, () => {
      // fetch data
      return this.fetchHashtag()
        .then(() => {
          this.props.closeLoading();
        })
        .catch(({ status }) => {
          this.props.dispatchFetchResult(status);
        });
    });
  };

  render() {
    const { classes, name, bcRoutes, sideBarState } = this.props;
    const intl = this.props.intl;

    const {
      hashtag,
      totalInfluencer,
      totalQualifiedInfluencer,
      totalPostGenerated,
      totalEngagementGenerated,
      totalReactionsGenerated,
      totalCommentsGenerated,
      totalSharesGenerated,
      activeAgeDemographic,
      activeLocationDemographic,
      activeGenderDemographic,
      totalUniqueFollower,
      totalUniqueActiveFollower,
      totalUniqueActiveFollowerRate,
      avatarList,
      photoPostList,
      top5Influencer,
      top5Post,
      maxEngagementPost,
      suggestionHashtag,
      noData,
      updateTextSearch,
      lastUpdatedDateTime,
      startAvailableDate,
      endAvailableDate
    } = this.state;

    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const shortDateOption = {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit'
    };

    const activeLocationTop5 =
      typeof activeLocationDemographic === 'object'
        ? Object.keys(activeLocationDemographic)
            .map(v => ({ loc: v, val: activeLocationDemographic[v] }))
            .sort((b, a) => a.val - b.val)
            .slice(0, 5)
        : null;

    const activeAgeTop7 =
      typeof activeAgeDemographic === 'object'
        ? Object.keys(activeAgeDemographic)
            .map(v => ({ age: v, val: activeAgeDemographic[v] }))
            .sort((a, b) => (Age2Idx[a.age] > Age2Idx[b.age] ? 1 : -1))
            .slice(0, 7)
        : null;

    const onBarDraw = data => {
      if (data.type === 'bar') {
        const barHorizontalCenter = data.x1 + data.element.width() + 8;
        const barVerticalCenter = data.y1 + 4.5;
        const value = data.element.attr('ct:value');
        const label = new Chartist.Svg('text');
        label.text(parseFloat(value).toFixed(2) + '%');
        label.addClass(classes.barValue);
        label.attr({
          x: barHorizontalCenter,
          y: barVerticalCenter
        });
        return data.group.append(label);
      }
    };

    return (
      <Grid container direction="column" className={classes.mainDiv}>
        {this.props.drawHeader({
          name: <Breadcrumbs name={name} bcRoutes={bcRoutes} />
        })}
        <SearchBanner
          className={classes.banner}
          hashtag={hashtag}
          suggestionTagList={suggestionHashtag}
          onSearch={this.changeHashtagName}
          onChangeHashtag={this.updateHashtag}
        />
        <ContactUs
          content={
            <span>
              {APP_NAME} {intl.formatMessage({ defaultMessage: "only tracks and analyses campaigns on"})}{' '}
              <strong>  {intl.formatMessage({ defaultMessage: "Facebook (including profiles &amp; fanpage)"})}</strong>{' '}
              {intl.formatMessage({ defaultMessage: "with-in"})}  <strong>{intl.formatMessage({ defaultMessage: "3-month"})}</strong>{intl.formatMessage({ defaultMessage: ", for specific tracking demand and"})}
              {intl.formatMessage({ defaultMessage: "customized duration, please contact us."})}
            </span>
          }
          showButton={true}
        />
        <Grid
          item
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.dateTimeTooltip}
        >
          <div className={classes.availableDuration}>
            {
              <span>
                {intl.formatMessage({ defaultMessage: 'Available Duration for Tracking From '})}
                {
                  <strong>
                    {new Date(startAvailableDate).toLocaleDateString(
                      'en-GB',
                      shortDateOption
                    )}
                  </strong>
                }
                {intl.formatMessage({ defaultMessage: ' To '})}
                {
                  <strong>
                    {new Date(endAvailableDate).toLocaleDateString(
                      'en-GB',
                      shortDateOption
                    )}
                  </strong>
                }
              </span>
            }
          </div>
          <div className={classes.lastUpdatedDateTime}>
            {
              <span>
               {intl.formatMessage({ defaultMessage: "New data update"})}  <strong>{intl.formatMessage({ defaultMessage: "weekly"})}</strong> {intl.formatMessage({ defaultMessage: "on Sunday."})}
              </span>
            }
          </div>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.headerOneStyle}
        >
          {noData ? intl.formatMessage({ defaultMessage: 'NO RESULT - Try another hashtag'}) : intl.formatMessage({ defaultMessage: 'OVERALL PERFORMANCE'})}
        </Grid>
        {noData && (
          <Grid
            item
            container
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
            className={classes.descriptionNoData}
          >
            {intl.formatMessage({ defaultMessage: 'Please be informed that our data is only available From '}) +
              new Date(startAvailableDate).toLocaleDateString(
                'en-GB',
                shortDateOption
              ) +
              ' To ' +
              new Date(endAvailableDate).toLocaleDateString(
                'en-GB',
                shortDateOption
              )}
          </Grid>
        )}
        {!noData && (
          <div className={classes.dataWrapper}>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.descriptionStyle}
            >
              <span>
              {intl.formatMessage({ defaultMessage: "This section shows summary perspective about the campaign based"})}
              {intl.formatMessage({ defaultMessage: "on the inputed hashtag, include: Total Number of"})}{' '}
                <strong>{intl.formatMessage({ defaultMessage: "Particapated Influencers,"})}</strong>{' '}
                <strong>{intl.formatMessage({ defaultMessage: "Total Generated Posts"})}</strong>{intl.formatMessage({ defaultMessage: "and"})} {' '}
                <strong>{intl.formatMessage({ defaultMessage: "Total Generated Engagement"})}</strong>.<br />
              </span>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              spacing={24}
              className={classes.audienceWrapper}
            >
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <OverallCampaignCard
                  title={'Total Volume of Participated Influencers'}
                  value={
                    <span>
                      <span className={classes.specialValue}>
                        {intl.formatMessage({ defaultMessage: "totalQualifiedInfluencer"})}
                      </span>
                      /{intl.formatMessage({ defaultMessage: "totalInfluencer"})}
                    </span>
                  }
                  photo={true}
                  description={
                    <span>
                     {intl.formatMessage({ defaultMessage: " Qualified/Total Influencers"})}
                      <br />
                      <br />
                     {intl.formatMessage({ defaultMessage: " Qualified Influencer (Following"})}
                      <a
                        href="https://socialift.asia/he-thong-5-tieu-chi-cua-socialift-giup-do-luong-va-danh-gia-dung-influencer/"
                        target="_blank"
                      >
                        {`${APP_NAME}'s Standard`}
                      </a>
                      ) {intl.formatMessage({ defaultMessage: "is having"})} &gt; 70%
                      {
                        <Tooltip
                          title={
                            <span>
                              <strong>{intl.formatMessage({ defaultMessage: "Active Users/ Followers: "})}</strong>
                              {
                                intl.formatMessage({ defaultMessage: ' users that have any activity on Facebook in last 3-months.'})
                              }
                            </span>
                          }
                          classes={{ tooltip: classes.tooltipTitle }}
                        >
                          <div className={classes.descriptionStyleBlue}>
                            {intl.formatMessage({ defaultMessage: ' Active Users/Followers'})}
                          </div>
                        </Tooltip>
                      }
                    </span>
                  }
                  photoList={avatarList}
                  tooltip={
                    intl.formatMessage({ defaultMessage: 'Total number of influencers that post status contains the inputted hashtag.'})
                  }
                  imageDefault={defaultAvatar}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <OverallCampaignCard
                  title={intl.formatMessage({ defaultMessage: 'Total Generated Posts'})}
                  value={intl.formatMessage({ defaultMessage: "totalPostGenerated"})}
                  photo={true}
                  description={
                    intl.formatMessage({ defaultMessage: 'Including unqualified and qualified influencer’s posts'})
                  }
                  photoList={photoPostList}
                  tooltip={
                    <span>
                     {intl.formatMessage({ defaultMessage: "Total posts that contain the inputted hashtag ("})} 
                      <strong>
                      {intl.formatMessage({ defaultMessage: "including Influencer profiles"})} &amp; {intl.formatMessage({ defaultMessage: "fanpage"})}
                      </strong>
                      {intl.formatMessage({ defaultMessage: " ) in the last 3 months"})}
                    </span>
                  }
                  imageDefault={defaultImagePost}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <OverallCampaignCard
                  title={intl.formatMessage({ defaultMessage: 'Total Generated Engagement'})}
                  value={intl.formatMessage({ defaultMessage: "totalEngagementGenerated"})}
                  description={
                    intl.formatMessage({ defaultMessage: 'Including unqualified and qualified influencer’s posts'})
                  }
                  reactions={intl.formatMessage({ defaultMessage: "totalReactionsGenerated"})}
                  comments={tintl.formatMessage({ defaultMessage: "otalCommentsGenerated"})}
                  shares={intl.formatMessage({ defaultMessage: "totalSharesGenerated"})}
                  tooltip={
                    intl.formatMessage({ defaultMessage: 'Total engagement (total reaction + comments + shares) of generated posts in the last 3 months'})
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.headerTwoStyle}
            >
              {intl.formatMessage({ defaultMessage: "TOP 5 MOST EFFECTIVE INFLUENCERS - by Advocacy Score"})}
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.descriptionStyle}
            >
              {intl.formatMessage({ defaultMessage: "This section shows who are effectiveness influencers can advocate"})}
              {intl.formatMessage({ defaultMessage: "posts throughout Advocacy Score."})}
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              spacing={16}
              className={classes.contentWrapper}
            >
              <Grid
                item
                container
                direction="column"
                xl={9}
                lg={9}
                md={9}
                sm={12}
                xs={12}
                className={classes.advocacyChartWrapper}
              >
                <AdvocacyChart data={top5Influencer} />
                {top5Influencer.length === 0 && (
                  <div className={classes.noResult}>
                    {intl.formatMessage({ defaultMessage: "It looks like there is no qualified influencers found"})}
                    <br />
                    {intl.formatMessage({ defaultMessage: "Not enough data to generate chart"})} 
                  </div>
                )}
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={3}
                lg={3}
                md={3}
                sm={12}
                xs={12}
              >
                <DescriptionCard />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.headerOneStyle}
            >
              {intl.formatMessage({ defaultMessage: "AUDIENCE ANALYSIS"})}
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.descriptionStyle}
            >
              {
                <span>
                  {intl.formatMessage({ defaultMessage: "This section shows:"})} <br />
                  {intl.formatMessage({ defaultMessage: "1) Total unique followers of all tracked influencers"})}
                  {intl.formatMessage({ defaultMessage: "(including inactive &amp; active users)."})}
                  <br />
                  {intl.formatMessage({ defaultMessage: "2) Unique followers allocated by location, gender and ages."})}
                </span>
              }
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              spacing={24}
              className={classes.audienceWrapper}
            >
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <UniqueAudienceCard
                  title={intl.formatMessage({ defaultMessage: 'Total Unique Followers'})}
                  srcImage={intl.formatMessage({ defaultMessage: "FollowerImage"})}
                  background={'rgba(1, 187, 211, 0.1)'}
                  value={intl.formatMessage({ defaultMessage: "totalUniqueFollower"})}
                  description={
                    <span>
                     {intl.formatMessage({ defaultMessage: "All influencer's followers, including active"})}  &amp;
                     {intl.formatMessage({ defaultMessage: "inactive users,"})} {' '}
                      <strong>{intl.formatMessage({ defaultMessage: "excluding duplicated followers."})}</strong>
                      <br />
                      {intl.formatMessage({ defaultMessage: "This number also is"})}{' '}
                      <strong>{intl.formatMessage({ defaultMessage: "maximum potential users"})}</strong> {intl.formatMessage({ defaultMessage: "if the campaign"})}
                      {intl.formatMessage({ defaultMessage: "reach is equal 100%."})}
                    </span>
                  }
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <UniqueAudienceCard
                  title={intl.formatMessage({ defaultMessage: 'Unique Active Followers'})}
                  srcImage={intl.formatMessage({ defaultMessage: "ActiveImage"})}
                  background={'rgba(255, 153, 0, 0.1)'}
                  value={intl.formatMessage({ defaultMessage: "totalUniqueActiveFollower"})}
                  description={
                    <span>
                      {intl.formatMessage({ defaultMessage: "This number also is maximum potential"})}{' '}
                      <strong>{intl.formatMessage({ defaultMessage: "Active Users/ Followers"})}</strong> {intl.formatMessage({ defaultMessage: "if the campaign"})}
                      {intl.formatMessage({ defaultMessage: "reach is equal 100%."})}
                      <br />
                      <strong>{intl.formatMessage({ defaultMessage: "Active Users/ Followers:"})}</strong> {intl.formatMessage({ defaultMessage: "users that have"})}
                      {intl.formatMessage({ defaultMessage: "any activity on Facebook in last 3-months."})} 
                    </span>
                  }
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <UniqueAudienceCard
                  title={intl.formatMessage({ defaultMessage: 'AVG. Active Followers'})}
                  srcImage={intl.formatMessage({ defaultMessage: "PercentImage"})}
                  background={'rgba(0, 176, 75, 0.1)'}
                  value={intl.formatMessage({ defaultMessage: "totalUniqueActiveFollowerRate"})}
                  percent={true}
                  description={
                    <span>
                      <strong>{intl.formatMessage({ defaultMessage: "Active Users/ Followers:"})}</strong> {intl.formatMessage({ defaultMessage: " users that have"})}
                      {intl.formatMessage({ defaultMessage: "any activity on Facebook in last 3-months."})}
                    </span>
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              spacing={24}
              className={classes.audienceWrapper}
            >
              <Grid
                item
                container
                direction="column"
                xl={8}
                lg={8}
                md={8}
                sm={12}
                xs={12}
              >
                <div className={classes.locationChartContainer}>
                  <ChartCard
                    Title={intl.formatMessage({ defaultMessage: "Unique Followers Allocated by Location"})}
                    Chart={
                      Array.isArray(activeLocationTop5) && (
                        <ReactChartist
                          className={classes.barChart}
                          type={intl.formatMessage({ defaultMessage: "Bar"})}
                          data={{
                            labels: activeLocationTop5.map(({ loc }) => loc),
                            series: [activeLocationTop5.map(({ val }) => val)]
                          }}
                          listener={{
                            draw: onBarDraw
                          }}
                          options={{
                            horizontalBars: true,
                            reverseData: true,
                            axisY: {
                              offset: 80
                            },
                            axisX: {
                              low: 0,
                              high: 110,
                              showLabel: false,
                              type: Chartist.AutoScaleAxis,
                              scaleMinSpace: 1,
                              onlyInteger: true,
                              labelInterpolationFnc: value => {
                                return value % 10 === 0 && value <= 100
                                  ? value
                                  : null;
                              }
                            },
                            height: 250,
                            chartPadding: {
                              top: 0,
                              right: 12,
                              bottom: 0,
                              left: 0
                            },
                            fullWidth: true,
                            classNames: {
                              label: 'ct-label ' + classes.barChartLabel,
                              bar: `${classes.barChartBar} ${classes.barChartBlue}`,
                              horizontal: classes.barValueLabel
                            }
                          }}
                        />
                      )
                    }
                  />
                </div>
                <div className={classes.ageChartContainer}>
                  <ChartCard
                    Title={intl.formatMessage({ defaultMessage: "Unique Followers Allocated by Age"})}
                    Chart={
                      Array.isArray(activeAgeTop7) && (
                        <ReactChartist
                          className={classes.barChart}
                          type={intl.formatMessage({ defaultMessage: "Bar"})}
                          data={{
                            labels: activeAgeTop7.map(({ age }) => age),
                            series: [activeAgeTop7.map(({ val }) => val)]
                          }}
                          listener={{
                            draw: onBarDraw
                          }}
                          options={{
                            horizontalBars: true,
                            reverseData: true,
                            axisY: {
                              offset: 80
                            },
                            axisX: {
                              low: 0,
                              high: 110,
                              showLabel: false,
                              type: Chartist.AutoScaleAxis,
                              scaleMinSpace: 1,
                              onlyInteger: true,
                              labelInterpolationFnc: value => {
                                return value % 10 === 0 && value <= 100
                                  ? value
                                  : null;
                              }
                            },
                            height: 250,
                            chartPadding: {
                              top: 0,
                              right: 12,
                              bottom: 0,
                              left: 0
                            },
                            fullWidth: true,
                            classNames: {
                              label: 'ct-label ' + classes.barChartLabel,
                              bar: `${classes.barChartBar} ${classes.barChartGreen}`,
                              horizontal: classes.barValueLabel
                            }
                          }}
                        />
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <GenderChart data={activeGenderDemographic} />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.headerTwoStyle}
            >
             {intl.formatMessage({ defaultMessage: "APPENDIX - TOP ENGAGED POSTS WITH REAL AUDIENCE"})} 
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.descriptionStyle}
            >
              {
                <span>
                  {intl.formatMessage({ defaultMessage: "This section shows the other measurement perspective of the"})}
                  {intl.formatMessage({ defaultMessage: "campaign based on total engagement (total reactions + comments"})}
                    {intl.formatMessage({ defaultMessage: "+ shares ) of each post."})}
                  <br />
                  {intl.formatMessage({ defaultMessage: "And each post must have Active users/ followers"})}  &gt; {intl.formatMessage({ defaultMessage: "70%."})}
                  <br />
                  {intl.formatMessage({ defaultMessage: "Active users/ followers: user has any activity on Facebook in"})}
                  {intl.formatMessage({ defaultMessage: "the last 3 months."})}
                </span>
              }
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.contentWrapper}
            >
              <PostChart
                data={top5Post}
                maxEngagementPost={maxEngagementPost}
              />
            </Grid>
          </div>
        )}
        <ContactUs
          content={
            <span>
              {intl.formatMessage({ defaultMessage:  `{APP_NAME} - a product of YouNet Group - is the largest pool of qualified influencers in Vietnam. The platform provides exclusive metric system to help brands have more accurate and data-driven decision.`} ,{ APP_NAME: APP_NAME})}
              <br />
              {intl.formatMessage({ defaultMessage: 'Please '})}
              {
                <strong>
                  <a href={'/sign-in'}>{intl.formatMessage({ defaultMessage: "SIGN-IN"})}</a>
                </strong>
              }
              {intl.formatMessage({ defaultMessage: ' or '})}
              {
                <strong>
                  <a href={'/sign-up'}>{intl.formatMessage({ defaultMessage: "SIGN-UP"})}</a>
                </strong>
              }
              {intl.formatMessage({ defaultMessage: ' to discover a list of qualified influencers by yourself, or '})}
              {
                <strong>
                  <a
                    href={'https://socialift.asia/#block-request'}
                    target="_blank"
                  >
                   {intl.formatMessage({ defaultMessage: " CONTACT-US"})}
                  </a>
                </strong>
              }{' '}
              {intl.formatMessage({ defaultMessage: ' to have your customized request.'})}
            </span>
          }
          showButton={false}
          containerClassName={classes.containerBottomContact}
        />
      </Grid>
    );
  }
}

export default injectIntl (
  connect(({ breadcrumbs }) => ({ ...breadcrumbs }), {
    dispatchNotification,
    updateRouteParams,
    fromDiscoverPage,
    openLoading,
    closeLoading,
    dispatchFetchResult
  })(withStyles(styles)(CampaignTracking))
) ;
