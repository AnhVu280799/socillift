import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Fade from '@material-ui/core/Fade';
// custom components
import ModalDialog from 'components/ModalDialog';
import ButtonInf from 'components/CustomButtons/ButtonInf.jsx';
import { injectIntl } from 'react-intl';
import { getUserInfo } from 'apis/api';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import { connect } from 'react-redux';
import { openLoading, closeLoading } from 'reducers/ScreenLoadingReducer';

import styles from 'assets/jss/material-dashboard-pro-react/components/subscriptionPlanModalStyle.jsx';

class SubscriptionPlanModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionPlan: {},
      isUpdatedUser: false,
      open: false
    };
  }
  componentDidMount() {
    this.props.openLoading();
    getUserInfo(this.props.userId, result =>
      this.setState(
        {
          subscriptionPlan: result.remaining_pricing_plan
            ? result.remaining_pricing_plan
            : {},
          isUpdatedUser: true
        },
        () => this.props.closeLoading()
      )
    ).catch(({ status }) => {
      this.props.dispatchFetchResult(status);
      this.props.closeLoading();
    });
  }
  componentDidUpdate() {
    if (this.props.open && !this.state.isUpdatedUser) {
      this.props.openLoading();
      getUserInfo(this.props.userId, result =>
        this.setState(
          {
            subscriptionPlan: result.remaining_pricing_plan
              ? result.remaining_pricing_plan
              : {},
            isUpdatedUser: true
          },
          () => this.props.closeLoading()
        )
      ).catch(({ status }) => {
        this.props.dispatchFetchResult(status);
        this.props.closeLoading();
      });
    }
    if (!this.props.open && this.state.isUpdatedUser) {
      this.setState({
        isUpdatedUser: false
      });
    }
  }
  onChangeCollectionName = event => {
    this.props.onChangeCollectionName(event.target.value);
  };
  onChangeCollectionDescription = event => {
    this.props.onChangeCollectionDescription(event.target.value);
  };

  render() {
    const { classes, open, onCloseClick, modalTitle } = this.props;
    const intl = this.props.intl;
    const { subscriptionPlan } = this.state;
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    const fromDate =
      subscriptionPlan.duration && subscriptionPlan.duration !== null
        ? new Date(subscriptionPlan.duration.from).toLocaleDateString(
          intl.formatMessage({ defaultMessage: 'en-US'}),
            options
          )
        : intl.formatMessage({ defaultMessage: 'N/A'});
    const toDate =
      subscriptionPlan.duration && subscriptionPlan.duration !== null
        ? new Date(subscriptionPlan.duration.to).toLocaleDateString(
          intl.formatMessage({ defaultMessage: 'en-US'}),
            options
          )
        : intl.formatMessage({ defaultMessage: 'N/A'});
    return (
      <div>
        <ModalDialog
          keepMounted
          open={open}
          onCloseClick={onCloseClick}
          modalTitle={modalTitle}
          modalContent={
            <Grid container className={classes.contentWrapper} spacing={16}>
              <Grid item container className={classes.topInfo}>
                <Grid item container direction="row" spacing={16}>
                  <Grid
                    item
                    container
                    direction="column"
                    xl={8}
                    lg={8}
                    md={8}
                    sm={8}
                    xs={12}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.accountInfoContainer}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        xs={3}
                        className={classes.titleStyle}
                      >
                       {intl.formatMessage({ defaultMessage: " My plan"})}
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        xs={9}
                        className={classes.infoAccount}
                      >
                        {subscriptionPlan.yourPlan
                          ? subscriptionPlan.yourPlan
                          : intl.formatMessage({ defaultMessage: 'N/A'})}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.accountInfoContainer}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        xs={3}
                        className={classes.titleStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "Duration"})}
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        xs={9}
                        className={classes.infoAccount}
                      >
                        {subscriptionPlan.duration === 'UNLIMITED'
                          ? subscriptionPlan.duration
                          : fromDate + ' - ' + toDate}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xl={4}
                    lg={4}
                    md={4}
                    sm={4}
                    xs={12}
                    alignItems="center"
                    justify="flex-start"
                    className={classes.btnWrapper}
                  >
                    <ButtonInf
                      round
                      color="primary"
                      href="https://socialift.asia/#block-request"
                      target="_blank"
                    >
                      {intl.formatMessage({ defaultMessage: "Change plan"})}
                    </ButtonInf>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  className={classes.descriptionStyle}
                >
                  {subscriptionPlan.description
                    ? subscriptionPlan.description
                    : intl.formatMessage({ defaultMessage: 'N/A'})}
                </Grid>
              </Grid>
              <Grid item container className={classes.belowInfo}>
                <Grid
                  item
                  container
                  direction="row"
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.descriptionBelowInfo}
                >
                  {intl.formatMessage({ defaultMessage: "Below information provides the remaining capacity of your plan"})}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "SEARCH"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: 'For each filtered submission will be counted as one.'})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.search === 'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.search}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.search === 'object' &&
                    typeof subscriptionPlan.search.remaining === 'number' &&
                    typeof subscriptionPlan.search.max === 'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.search.remaining}
                      </span>{' '}
                      /{' '}
                      <span className={classes.greyFont}>
                        {subscriptionPlan.search.max}
                      </span>{' '}
                      {intl.formatMessage({ defaultMessage: "Time(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "DISPLAY RESULT per Search"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: 'The number of displayed result for each search.'})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.displayResultPerSearch ===
                  'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.displayResultPerSearch}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.displayResultPerSearch ===
                    'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.displayResultPerSearch}
                      </span>{' '}
                     {intl.formatMessage({ defaultMessage: " Profile(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "VIEW DETAIL PROFILE"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: "Will be counted as one for each click to profile's detail information."})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.viewProfile === 'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.viewProfile}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.viewProfile === 'object' &&
                    typeof subscriptionPlan.viewProfile.remaining ===
                      'number' &&
                    typeof subscriptionPlan.viewProfile.max === 'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.viewProfile.remaining}
                      </span>{' '}
                      /{' '}
                      <span className={classes.greyFont}>
                        {subscriptionPlan.viewProfile.max}
                      </span>{' '}
                     {intl.formatMessage({ defaultMessage: " Profile(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                      {intl.formatMessage({ defaultMessage: "SAVE TO COLLECTION"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: 'The maximum volume of influencers in one collection.'})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.saveToCollection === 'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.saveToCollection}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.saveToCollection === 'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.saveToCollection}
                      </span>{' '}
                      {intl.formatMessage({ defaultMessage: "Profile(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "FILTER BY CATEGORY"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: 'The ability to choose multiple categories each search.'})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.valueStyle}
                  >
                    <span className={classes.greyFont}>
                      {subscriptionPlan.filterByCategory
                        ? subscriptionPlan.filterByCategory
                        : intl.formatMessage({ defaultMessage: 'N/A'})}
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                       {intl.formatMessage({ defaultMessage: " COLLECTION EXPORT"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: "Including collection's influencers detailed information."})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.exportCollection === 'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.exportCollection}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.exportCollection === 'object' &&
                    typeof subscriptionPlan.exportCollection.remaining ===
                      'number' &&
                    typeof subscriptionPlan.exportCollection.max ===
                      'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.exportCollection.remaining}
                      </span>{' '}
                      /{' '}
                      <span className={classes.greyFont}>
                        {subscriptionPlan.exportCollection.max}
                      </span>{' '}
                      {intl.formatMessage({ defaultMessage: "Collection(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                       {intl.formatMessage({ defaultMessage: " PROFILE EXPORT"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={intl.formatMessage({ defaultMessage: "With influencer's detailed information."})}
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {typeof subscriptionPlan.profileExport === 'string' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>
                        {subscriptionPlan.profileExport}
                      </span>
                    </Grid>
                  ) : typeof subscriptionPlan.profileExport === 'object' &&
                    typeof subscriptionPlan.profileExport.remaining ===
                      'number' &&
                    typeof subscriptionPlan.profileExport.max === 'number' ? (
                    <Grid
                      item
                      container
                      direction="column"
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className={classes.valueStyle}
                    >
                      <span className={classes.blueFont}>
                        {subscriptionPlan.profileExport.remaining}
                      </span>{' '}
                      /{' '}
                      <span className={classes.greyFont}>
                        {subscriptionPlan.profileExport.max}
                      </span>{' '}
                     {intl.formatMessage({ defaultMessage: " Profile(s)"})}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      xs={6}
                      className={classes.valueStyle}
                    >
                      <span className={classes.greyFont}>{intl.formatMessage({ defaultMessage: 'N/A'})}</span>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "CAMPAIGN TRACKING"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={
                            intl.formatMessage({ defaultMessage: 'A quick & general assessment of influencer marketing campaigns in lasted 3-month.'})
                          }
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.valueStyle}
                  >
                    {subscriptionPlan.campaignTracking
                      ? subscriptionPlan.campaignTracking
                      : intl.formatMessage({ defaultMessage: 'N/A'})}
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  spacing={24}
                  className={classes.figureInfoContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.titleBelowContainer}
                  >
                    <Grid item container direction="row">
                      <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        md={11}
                        className={classes.titleBelowStyle}
                      >
                        {intl.formatMessage({ defaultMessage: "API CONNECT"})}
                      </Grid>
                      <Grid item container direction="column" xs={1} md={1}>
                        <Tooltip
                          title={intl.formatMessage({ defaultMessage: 'Our data, your customized system/UI.'})}
                          classes={{
                            tooltip: classes.tooltipTitle,
                            popper: classes.lastTooltip
                          }}
                        >
                          <ErrorOutline className={classes.toolTipIcon} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.valueStyle}
                  >
                    {subscriptionPlan.apiConnect
                      ? subscriptionPlan.apiConnect
                      : intl.formatMessage({ defaultMessage: 'N/A'})}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        />
      </div>
    );
  }
}
SubscriptionPlanModal.propTypes = {};
const mapDispatchToProps = {
  dispatchFetchResult,
  openLoading,
  closeLoading
};
export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(SubscriptionPlanModal))
);
