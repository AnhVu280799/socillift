import React from 'react';
import PropTypes from 'prop-types';

import Tracker from 'apis/tracker';
import FbTracker from 'apis/fbtracker';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  retrieveCategories,
  retrieveCategoriesSimulate,
  resetStates,
  onClickAll
} from 'reducers/FrontPageReducer';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';

import { withStyles, Typography } from '@material-ui/core';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import FrontPageBanner from 'components/FrontPageBanner';
import FrontPageCard from 'components/FrontPageCard/FrontPageCard.jsx';
import LoadingSpinnerFrontPage from 'components/LoadingSpinnerFrontPage/LoadingSpinnerFrontPage.jsx';
import LoadMoreButtonFrontPage from 'components/LoadMoreButtonFrontPage';

import { paramsToUrl } from 'utils';

import styles from './styles';

class FrontPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    Tracker.pageview();
    FbTracker.pageview();

    this.props.minimizeSidebar(true);

    const { sortField, sortType, pageSize, pageIndex } = this.props;
    
    const roleId = this.props.userInfo.roleId;

    this.props
      .retrieveCategories({
        sortField,
        sortType,
        pageSize,
        pageIndex,
        roleId
      })
      .catch(({ status }) => this.props.dispatchFetchResult(status));
  }

  componentWillUnmount() {
    this.props.resetStates();
  }

  render() {
    const {
      classes,
      categoriesDisplay,
      isLoading,
      loadMoreDisplay,
      name
    } = this.props;
    const intl = this.props.intl;

    return (
      <div className={classes.root}>
        <div className={classes.header}>{this.props.drawHeader({ name })}</div>
        <div className={classes.content}>
          <FrontPageBanner
            className={classes.topBanner}
            onClick={() =>
              this.props.onClickAll(
                this.props.userInfo.globalPermissions.isDemoAccount
                  ? intl.formatMessage({ defaultMessage: `/advanced-search?page_size=12&page_index=0&platform=page`})
                  : intl.formatMessage({ defaultMessage: `/advanced-search?page_size=12&page_index=0&platform=fb`})
              )
            }
          />
          <Typography
            className={classes.description}
            variant="inherit"
            align="center"
          >
           {intl.formatMessage({ defaultMessage: "Or choose an influence category that you are looking for"})} 
          </Typography>
          <GridContainer className={classes.listWrapper}>
            {categoriesDisplay &&
              categoriesDisplay.map(({ categoryName, categoryUid }, idx) => (
                <GridItem
                  key={`GridItem-${idx}`}
                  className={classes.item}
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <FrontPageCard
                    key={`FrontPageCard-${idx}`}
                    onClickUrl={`/advanced-search?${paramsToUrl({
                      page_size: 12,
                      page_index: 0,
                      platform: this.props.userInfo.globalPermissions
                        .isDemoAccount
                        ? intl.formatMessage({ defaultMessage: 'page'})
                        :intl.formatMessage({ defaultMessage:  'page'}),
                      categories: categoryName,
                      sort_type: -1,
                      sort_field: intl.formatMessage({ defaultMessage: 'avg_influencer_score'})
                    })}`}
                    imageUrl={categoryUid}
                    cardTitle={categoryName}
                    numberRecords={59}
                  />
                </GridItem>
              ))}
          </GridContainer>
          {isLoading ? (
            <LoadingSpinnerFrontPage className={classes.loading} />
          ) : (
            loadMoreDisplay && (
              <LoadMoreButtonFrontPage
                className={classes.buttonLoadMore}
                onClick={() => {
                  const { pageSize, pageIndex } = this.props;
                  this.props.retrieveCategoriesSimulate({
                    pageSize,
                    pageIndex
                  });
                }}
              />
            )
          )}
          {!loadMoreDisplay && (
            <Typography
              variant="inherit"
              className={classes.endOfList}
              align="center"
            >
              {intl.formatMessage({ defaultMessage: "You reached the end of category list!"})}
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ frontPage, userInfo }) => ({
  ...frontPage,
  userInfo
});

const mapDispatchToProps = {
  retrieveCategories,
  retrieveCategoriesSimulate,
  onClickAll,
  resetStates,
  dispatchFetchResult
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: 'FrontPage' })
  )(FrontPage)
) ;
