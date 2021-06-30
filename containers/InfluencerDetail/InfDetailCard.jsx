import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import styles from './InfDetailCardStyle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import MdiIcon from '@mdi/react';
import Chip from '@material-ui/core/Chip';
import { injectIntl } from 'react-intl';
import Hidden from '@material-ui/core/Hidden';
import InfoTooltips from 'components/InfoTooltips';
import {
  mdiFacebookBox,
  mdiFlagVariantOutline,
  mdiYoutube,
  mdiInstagram,
  mdiAccountEdit,
  mdiExport,
  mdiCheck,
  mdiBlockHelper
} from '@mdi/js';
import INF_STATES from 'constants/influencerstates';
import INF_KINDS from '../../constants/influencerkinds';
import { parseTime } from 'utils';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import CollectionDropdown from 'components/CollectionDropdown/CollectionDropdown.jsx';
import cx from 'classnames';
const CanEditInfluencerBasicInfo = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canEditInfluencerBasicInfo,
  wrapperDisplayName: 'CanEditInfluencerBasicInfo',
  FailureComponent: () => null
})(({ children }) => children);
const CanResubmitForApproval = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canResubmitForApproval,
  wrapperDisplayName: 'CanResubmitForApproval',
  FailureComponent: () => null
})(({ children }) => children);
const CanExportInfluencer = (FailureComponent = () => null) =>
  connectedAuthWrapper({
    authenticatedSelector: state =>
      state.userInfo.globalPermissions !== null &&
      state.userInfo.globalPermissions.canExportInfluencer,
    wrapperDisplayName: 'CanExportInfluencer',
    FailureComponent
  })(({ children }) => children);
const CanApproveAnApprovalRequest = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canApproveAnApprovalRequest,
  wrapperDisplayName: 'CanApproveAnApprovalRequest',
  FailureComponent: () => null
})(({ children }) => children);
const CanCreateCollection = connectedAuthWrapper({
  authenticatedSelector: state =>
    state.userInfo.globalPermissions !== null &&
    state.userInfo.globalPermissions.canCreateCollection,
  wrapperDisplayName: 'CanCreateCollection',
  FailureComponent: () => null
})(({ children }) => children);
class InfDetailCard extends React.Component {
  state = {
    anchorEl: null
  };
  componentDidMount() {
    this.setState({ anchorEl: document.getElementById('footer') });
  }
  render() {
    const {
      classes,
      onExport,
      onEdit,
      onApprove,
      onReject,
      onUpdate,
      photoUrl,
      name,
      kind,
      size,
      location,
      career,
      categories,
      state,
      latestSubmittedDate,
      latestApprovedDate,
      latestSubmittedUser,
      latestApprovedUser,
      facebookId,
      pageId,
      youtubeId,
      // instagramId,
      instaUserName,
      collections,
      onCollectionSelect,
      addCollection,
      platform,
      platformCategories,
      isDemoAccount,
      ...props
    } = this.props;
    const intl = this.props.intl;
    const CanExportInfluencerNull = CanExportInfluencer();
    const CanExportInfluencerNotNull = CanExportInfluencer(() => (
      <span className={classes.export}>Export to get contact info</span>
    ));
    return (
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid className={classes.paperInfo} item container direction="row">
            <Hidden mdDown>
              <Grid
                item
                container
                lg={1}
                xl={1}
                direction="column"
                className={classes.socialContainer}
                alignItems="stretch"
                justify="center"
              >
                {!isDemoAccount && (
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="stretch"
                    justify="center"
                  >
                    <a
                      target="_blank"
                      href={`https://fb.com/${facebookId}`}
                      className={cx(classes.linkNormal, {
                        [classes.linkDisable]: !facebookId
                      })}
                    >
                      <Button className={classes.socialNetworkBtn}>
                        <MdiIcon
                          path={mdiFacebookBox}
                          size="32px"
                          className={cx(classes.socialNetworkIcon, {
                            [classes.socialNetworkIconDisable]: !facebookId
                          })}
                          color={!facebookId ? '' : 'blue'}
                        />
                      </Button>
                    </a>
                  </Grid>
                )}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="center"
                >
                  <a
                    target="_blank"
                    href={`https://fb.com/${pageId}`}
                    className={cx(classes.linkNormal, {
                      [classes.linkDisable]: !pageId
                    })}
                  >
                    <Button className={classes.socialNetworkBtn}>
                      <MdiIcon
                        path={mdiFlagVariantOutline}
                        size="32px"
                        className={cx(classes.socialNetworkIcon, {
                          [classes.socialNetworkIconDisable]: !pageId
                        })}
                      />
                    </Button>
                  </a>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="center"
                >
                  <a
                    target="_blank"
                    href={`https://instagram.com/${instaUserName}`}
                    className={cx(classes.linkNormal, {
                      [classes.linkDisable]: !instaUserName
                    })}
                  >
                    <Button className={classes.socialNetworkBtn}>
                      <MdiIcon
                        path={mdiInstagram}
                        size="32px"
                        className={cx(classes.socialNetworkIcon, {
                          [classes.socialNetworkIconDisable]: !instaUserName
                        })}
                      />
                    </Button>
                  </a>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="center"
                >
                  <a
                    target="_blank"
                    href={`https://youtube.com/channel/${youtubeId}`}
                    className={cx(classes.linkNormal, {
                      [classes.linkDisable]: !youtubeId
                    })}
                  >
                    <Button className={classes.socialNetworkBtn}>
                      <MdiIcon
                        path={mdiYoutube}
                        size="32px"
                        className={cx(classes.socialNetworkIcon, {
                          [classes.socialNetworkIconDisable]: !youtubeId
                        })}
                        color={!youtubeId ? '' : 'red'}
                      />
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </Hidden>
            <Grid
              item
              container
              direction="column"
              lg={3}
              xl={3}
              md={12}
              sm={12}
              xs={12}
              className={classes.imgContainer}
              alignItems="center"
              justify="center"
            >
              <img
                className={classes.img}
                src={photoUrl}
                onError={e =>
                  (e.target.src =
                    'https://storage.googleapis.com/yn-influencer/Avatar%20Default.png')
                }
              />
            </Grid>
            <Hidden lgUp>
              <Grid
                item
                container
                md={12}
                sm={12}
                xs={12}
                direction="column"
                className={classes.socialContainer}
                alignItems="stretch"
                justify="center"
              >
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="center"
                >
                  <Grid
                    item
                    container
                    md={3}
                    sm={3}
                    xs={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <a
                      target="_blank"
                      href={`https://fb.com/${facebookId}`}
                      className={cx(classes.linkNormal, {
                        [classes.linkDisable]: !facebookId
                      })}
                    >
                      <Button className={classes.socialNetworkBtn}>
                        <MdiIcon
                          path={mdiFacebookBox}
                          size="32px"
                          className={cx(classes.socialNetworkIcon, {
                            [classes.socialNetworkIconDisable]: !facebookId
                          })}
                          color={!facebookId ? '' : 'blue'}
                        />
                      </Button>
                    </a>
                  </Grid>
                  <Grid
                    item
                    container
                    md={3}
                    sm={3}
                    xs={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <a
                      target="_blank"
                      href={`https://fb.com/${pageId}`}
                      className={cx(classes.linkNormal, {
                        [classes.linkDisable]: !pageId
                      })}
                    >
                      <Button className={classes.socialNetworkBtn}>
                        <MdiIcon
                          path={mdiFlagVariantOutline}
                          size="32px"
                          className={cx(classes.socialNetworkIcon, {
                            [classes.socialNetworkIconDisable]: !pageId
                          })}
                        />
                      </Button>
                    </a>
                  </Grid>
                  <Grid
                    item
                    container
                    md={3}
                    sm={3}
                    xs={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <a
                      target="_blank"
                      href={`https://instagram.com/${instaUserName}`}
                      className={cx(classes.linkNormal, {
                        [classes.linkDisable]: !instaUserName
                      })}
                    >
                      <Button className={classes.socialNetworkBtn}>
                        <MdiIcon
                          path={mdiInstagram}
                          size="32px"
                          className={cx(classes.socialNetworkIcon, {
                            [classes.socialNetworkIconDisable]: !instaUserName
                          })}
                        />
                      </Button>
                    </a>
                  </Grid>
                  <Grid
                    item
                    container
                    md={3}
                    sm={3}
                    xs={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <a
                      target="_blank"
                      href={`https://youtube.com/channel/${youtubeId}`}
                      className={cx(classes.linkNormal, {
                        [classes.linkDisable]: !youtubeId
                      })}
                    >
                      <Button className={classes.socialNetworkBtn}>
                        <MdiIcon
                          path={mdiYoutube}
                          size="32px"
                          className={cx(classes.socialNetworkIcon, {
                            [classes.socialNetworkIconDisable]: !youtubeId
                          })}
                          color={!youtubeId ? '' : 'red'}
                        />
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            <Grid
              item
              container
              direction="column"
              lg={8}
              xl={8}
              md={12}
              sm={12}
              xs={12}
              className={classes.bioContainer}
            >
              <Grid
                item
                container
                alignItems="center"
                className={classes.header}
              >
                <Grid
                  item
                  lg={8}
                  xl={8}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.nameWrapper}
                >
                  <span className={classes.name}>{intl.formatMessage({ defaultMessage: "name"})}</span>
                </Grid>
                <Grid
                  lg={4}
                  xl={4}
                  md={12}
                  sm={12}
                  xs={12}
                  item
                  container
                  justify="flex-end"
                  className={classes.dropDownWrapper}
                >
                  <CanCreateCollection
                    children={
                      <CollectionDropdown
                        isShow
                        dropdownList={collections}
                        anchorX="right"
                        onChangeCheckboxMenuItem={onCollectionSelect}
                        onCollectionAdd={addCollection}
                        dropdownText={intl.formatMessage({ defaultMessage: 'Add to Collection'})}
                        dropdownIcon={intl.formatMessage({ defaultMessage: "bookmark_border"})}
                        pannelTitle={intl.formatMessage({ defaultMessage: "ADD NEW COLLECTION"})}
                        cancelText={intl.formatMessage({ defaultMessage: "CANCEL"})}
                        addText={intl.formatMessage({ defaultMessage: "ADD"})}
                      />
                    }
                  />
                </Grid>
                {/* <Grid xs={4} item container justify='flex-end'>
                  <Button  className={classes.sidebarButton}>
                    <Icon className={classes.sidebarMiniIcon}>{props.miniActive ? 'view_list' : 'more_vert'}</Icon>
                  </Button>
                </Grid> */}
              </Grid>
              <Grid item container direction="row" className={classes.bioBody}>
                <Grid
                  item
                  container
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  direction="column"
                  className={classes.flexNone}
                >
                  <Grid item className={classes.field}>
                    <span className={classes.fieldTitle}>{intl.formatMessage({ defaultMessage: "Inf. size:"})}&nbsp;</span>
                    {typeof size === 'string' && (
                      <Chip
                        label={size.replace('_', ' ')}
                        className={`${classes.size} ${
                          classes[size.toLowerCase()]
                        }`}
                      />
                    )}
                  </Grid>
                  <Grid item className={classes.field}>
                    <span className={classes.fieldTitle}>{intl.formatMessage({ defaultMessage: "Inf. type:"})}&nbsp;</span>
                    <span className={classes.fieldValue}>
                      {INF_KINDS[kind]}
                    </span>
                  </Grid>
                  <Grid item className={classes.field}>
                    <span className={classes.fieldTitle}>Location:&nbsp;</span>
                    <span className={classes.fieldValue}>
                      {location ? location : intl.formatMessage({ defaultMessage: 'Viet Nam'})}
                    </span>
                  </Grid>
                  <Grid item className={classes.field}>
                    <CanExportInfluencerNotNull
                      children={
                        <span
                          onClick={onExport}
                          className={classes.export + ' ' + classes.pointer}
                        >
                          {intl.formatMessage({ defaultMessage: "Export to get contact info"})}
                        </span>
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={4}
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                  direction="column"
                  className={classes.flexNone}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    className={classes.groupTitle}
                  >
                    <Icon className={classes.groupIcon}>work</Icon>
                    <span className={classes.groupName}>
                      {platform === 'fb' || platform === 'insta'
                        ? intl.formatMessage({ defaultMessage: 'PROFESSIONS'})
                        : platform === 'page'
                        ? intl.formatMessage({ defaultMessage: 'FACEBOOK PAGE CATEGORY'})
                        : platform === 'youtube'
                        ? intl.formatMessage({ defaultMessage: 'YOUTUBE CATEGORIES'})
                        : ''}
                    </span>
                  </Grid>
                  <Grid item container className={classes.professions}>
                    {(platform === 'fb' || platform === 'insta') &&
                    career &&
                    career.length > 0
                      ? career.map(({ name }, idx) => (
                          <Chip
                            label={name}
                            key={idx}
                            className={classes.profession}
                          />
                        ))
                      : (platform === 'page' || platform === 'youtube') &&
                        platformCategories &&
                        platformCategories.length > 0
                      ? platformCategories.map(({ name }, idx) => (
                          <Chip
                            label={name}
                            key={idx}
                            className={classes.profession}
                          />
                        ))
                      : 'updating'}
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={4}
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                  direction="column"
                  className={classes.flexOne}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    className={classes.groupTitle}
                  >
                    <Icon className={classes.groupIcon}>{intl.formatMessage({ defaultMessage: "folder_shared"})}</Icon>
                    <span className={classes.groupName}>{intl.formatMessage({ defaultMessage: "CATEGORIES"})}</span>
                  </Grid>
                  <Grid item container className={classes.categories}>
                    {categories && categories.length > 0
                      ? categories
                          .map(({ categoryName }) => categoryName)
                          .join(' . ')
                      : 'updating'}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="footer"
            item
            container
            className={classes.footer}
            direction="row"
            alignItems="center"
          >
            <Grid
              item
              container
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              alignItems="center"
              className={classes.statusWrapper}
            >
              <Grid item>
                <span className={classes.statusTitle}>{intl.formatMessage({ defaultMessage: "STATUS"})}:</span>
              </Grid>
              <Grid item>
                <span className={classes.status}>{INF_STATES[state]}</span>
              </Grid>
              <InfoTooltips
                classes={{ popper: classes.popper }}
                placement="bottom-start"
                anchorEl={this.state.anchorEl}
                children={
                  <Grid item container>
                    <Grid
                      item
                      container
                      direction="column"
                      className={classes.infoField}
                    >
                      <Grid item className={classes.tooltipField}>
                        {intl.formatMessage({ defaultMessage: "Latest Submitted Date:"})}
                      </Grid>
                      <Grid item className={classes.tooltipField}>
                       {intl.formatMessage({ defaultMessage: " Latest Approval Date:"})}
                      </Grid>
                      <Grid item className={classes.tooltipField}>
                       {intl.formatMessage({ defaultMessage: " Latest Submitted By:"})}
                      </Grid>
                      <Grid item className={classes.tooltipField}>
                        {intl.formatMessage({ defaultMessage: "Latest Approval By:"})}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      className={classes.infoValue}
                    >
                      <Grid
                        item
                        className={`${classes.tooltipField} ${classes.tooltipValue}`}
                      >
                        {latestSubmittedDate
                          ? parseTime(latestSubmittedDate)
                          : intl.formatMessage({ defaultMessage: 'N/A'})}
                      </Grid>
                      <Grid
                        item
                        className={`${classes.tooltipField} ${classes.tooltipValue}`}
                      >
                        {latestApprovedDate
                          ? parseTime(latestApprovedDate)
                          : intl.formatMessage({ defaultMessage: 'N/A'})}
                      </Grid>
                      <Grid
                        item
                        className={`${classes.tooltipField} ${classes.tooltipValue}`}
                      >
                        {typeof latestSubmittedUser === 'string'
                          ? latestSubmittedUser
                          : intl.formatMessage({ defaultMessage: 'N/A'})}
                      </Grid>
                      <Grid
                        item
                        className={`${classes.tooltipField} ${classes.tooltipValue}`}
                      >
                        {typeof latestApprovedUser === 'string'
                          ? latestApprovedUser
                          : intl.formatMessage({ defaultMessage: 'N/A'})}
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
            <Grid
              item
              container
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              justify="flex-end"
              className={classes.actionWrapper}
            >
              <Grid item>
                <CanExportInfluencerNull
                  children={
                    <Button
                      onClick={onExport}
                      className={`${classes.button} ${classes.btnPrimary}`}
                    >
                      <Hidden smDown>
                        <MdiIcon
                          path={mdiExport}
                          size="18px"
                          className={`${classes.btnIcon} ${classes.btnIconPrimary}`}
                        />
                      </Hidden>
                      {intl.formatMessage({ defaultMessage: "Export"})}
                    </Button>
                  }
                />
                <CanEditInfluencerBasicInfo
                  children={
                    <Button
                      onClick={onEdit}
                      className={`${classes.button} ${classes.btnPrimary}`}
                    >
                      <Hidden smDown>
                        <MdiIcon
                          path={mdiAccountEdit}
                          size="18px"
                          className={`${classes.btnIcon} ${classes.btnIconPrimary}`}
                        />
                      </Hidden>
                      {intl.formatMessage({ defaultMessage: "Edit"})}
                    </Button>
                  }
                />
                {['PendingForApproval', 'Approved', 'Rejected'].includes(
                  state
                ) && (
                  <CanResubmitForApproval
                    children={
                      <Button
                        onClick={onUpdate}
                        className={`${classes.button} ${classes.btnPrimary}`}
                      >
                        <Hidden smDown>
                          <MdiIcon
                            path={mdiCheck}
                            size="18px"
                            className={`${classes.btnIcon} ${classes.btnIconPrimary}`}
                          />
                        </Hidden>
                        {intl.formatMessage({ defaultMessage: "Need To Update"})}
                      </Button>
                    }
                  />
                )}
                {['PendingForApproval', 'Rejected'].includes(state) && (
                  <CanApproveAnApprovalRequest
                    children={
                      <Button
                        onClick={onApprove}
                        className={`${classes.button} ${classes.btnPrimary}`}
                      >
                        <Hidden smDown>
                          <MdiIcon
                            path={mdiCheck}
                            size="18px"
                            className={`${classes.btnIcon} ${classes.btnIconPrimary}`}
                          />
                        </Hidden>
                        {intl.formatMessage({ defaultMessage: "Approve"})}
                      </Button>
                    }
                  />
                )}
                {['PendingForApproval', 'Approved'].includes(state) && (
                  <CanApproveAnApprovalRequest
                    children={
                      <Button onClick={onReject} className={classes.button}>
                        <Hidden smDown>
                          <MdiIcon
                            path={mdiBlockHelper}
                            size="18px"
                            className={classes.btnIcon}
                          />
                        </Hidden>
                        {intl.formatMessage({ defaultMessage: "Reject"})}
                      </Button>
                    }
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (withStyles(styles)(InfDetailCard)) ;
