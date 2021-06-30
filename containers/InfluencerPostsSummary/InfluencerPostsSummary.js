import React, { Component } from 'react';
import RegularCard from 'components/Cards/RegularCard';

// Redux
import { connect } from 'react-redux';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { injectIntl } from 'react-intl';
// @material-ui/icons
import Check from '@material-ui/icons/Check';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleDialog from 'components/SimpleDialog/SimpleDialog';

// styles
import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx';
import extendedTablesStyle from 'assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx';
import buttonsStyle from 'assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx';

// constants
import LoadingSpinner from 'components/LoadingSpinner';
import {
  PagingState,
  CustomPaging,
  SortingState,
  IntegratedFiltering,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import Sort from '@material-ui/icons/Sort';

import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import {
  dispatchNotification,
  closeNotification
} from 'reducers/NotificationReducer';

import {
  getPostSummaryById,
  getInfluencerById,
  patchInfluencer
} from 'apis/api';

import AddAlert from '@material-ui/icons/AddAlert';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Close from '@material-ui/icons/Close';

import { parseEditInfluencer } from 'utils';
import Tooltip from '@material-ui/core/Tooltip';

const style = theme => ({
  noPaddBottom: {
    paddingBottom: '0px'
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  chip: {
    margin: theme.spacing.unit
  },
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    top: '3px',
    position: 'relative'
  },
  ...extendedFormsStyle,
  ...extendedTablesStyle,
  ...buttonsStyle
});
const tableStyle = {};
const PostsTable = withStyles({ tableStyle })(({ classes, ...rest }) => (
  <Table
    {...rest}
    headComponent={props => (
      <Table.TableHead {...props} className={classes.tableColumn} />
    )}
    rowComponent={props => (
      <Table.Row {...props} className={classes.tableRow} />
    )}
  />
));

class NoteTooltips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
  };

  render() {
    return (
      <Tooltip
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        title="This category assigned for the influencer. You can click on 'Pick' button to update Relevance Score"
        placement="bottom"
      >
        <Check />
      </Tooltip>
    );
  }
}

class InfluencerPostsSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      influencer: null,
      id: '',
      message: '',
      total: 0,
      notification: false,
      showModal: false,
      filterBy: 'all',
      sort: 'desc',
      columns: [
        { name: 'category', title: 'Category' },
        { name: 'totalPosts', title: 'Total Posts' },
        { name: 'relevantPoints', title: 'Relevance Score' },
        { name: 'isInfluenced', title: 'Recommend' },
        { name: 'exists', title: 'Assigned' },
        { name: 'actions', title: 'Actions' }
      ],
      data: [],
      rows: [],
      params: { page_index: 0, page_size: 10, sort_type: -1 },
      expandedRowIds: [],
      sortingStateColumnExtensions: [
        { columnName: 'category', sortingEnabled: false },
        { columnName: 'totalPosts', sortingEnabled: false },
        { columnName: 'isInfluenced', sortingEnabled: false },
        { columnName: 'action', sortingEnabled: false }
      ],
      isLoading: true,
      pageSize: 10,
      openConfirmDialog: false,
      tooltipOpen: false,
      totalPosts: 0
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.parseParams(this.fetchPostsSummaryWithParams);
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    getInfluencerById(id, ({ results }) => {
      this.setState({
        influencer: results
      });
      this.parseParams(this.fetchPostsSummaryWithParams);
    });
  }
  parseParams(callback) {
    let params = this.props.location.search
      .slice(1)
      .split('&')
      .reduce((prev, curr) => {
        const l = curr.split('=');
        prev[l[0]] = decodeURIComponent(l[1]);
        return prev;
      }, {});

    if (!params.hasOwnProperty('page_size')) params['page_size'] = 10;
    if (!params.hasOwnProperty('page_index')) params['page_index'] = 0;
    if (!params.hasOwnProperty('sort_type')) params['sort_type'] = -1;

    this.setState({ params }, callback);
  };
  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };
  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };
  fetchPostsSummaryWithParams = () => {
    const { id } = this.props.match.params;
    const { classes } = this.props;

    getInfluencerById(id, ({ results }) => {
      this.setState({
        influencer: results
      });

      return getPostSummaryById(
        id,
        { ...this.state.params },
        ({ result, code, totalCats, totalPosts }) => {
          code && this.props.dispatchFetchResult(code);
          this.setState({
            id: id,
            isLoading: false,
            data: result ? result : [],
            total: totalCats,
            totalPosts: totalPosts,
            rows: result
              ? result.map(
                (
                  {
                    cat_id,
                    exists,
                    name,
                    total,
                    relevancePoint,
                    isInfluenced
                  },
                  idx
                ) => ({
                  cat_id: cat_id,
                  category: name,
                  totalPosts: total,
                  relevantPoints: Number(relevancePoint.toFixed(2)),
                  isInfluenced: isInfluenced ? <ThumbUp /> : '',
                  actions: (
                    <GridContainer>
                      <ItemGrid>
                        <Button
                          color="facebook"
                          onClick={() => {
                            const { influencer } = this.state;
                            let { categories } = influencer;
                            if (typeof categories === 'undefined') {
                              categories = [];
                            }

                            if (exists) {
                              this.setState({
                                openConfirmDialog: true,
                                onConfirm: () => {
                                  if (
                                    categories.some(function (obj) {
                                      // check element existed
                                      return obj.id === cat_id;
                                    })
                                  ) {
                                    // Update existed category
                                    const categoriesUpdated = categories.map(
                                      category => {
                                        if (category.id === cat_id) {
                                          return {
                                            id: cat_id,
                                            categoryName: name,
                                            ressonancePoint: Number(
                                              relevancePoint.toFixed(2)
                                            ),
                                            postsSummary: true
                                          };
                                        }

                                        return category;
                                      }
                                    );

                                    const influencerNew = {
                                      ...influencer,
                                      categories: categoriesUpdated
                                    };

                                    patchInfluencer(
                                      influencer.id,
                                      parseEditInfluencer(influencerNew),
                                      this.fetchPostsSummaryWithParams
                                    ).then(() => {
                                      this.setState(
                                        {
                                          showModal: false,
                                          openConfirmDialog: false
                                        },
                                        () =>
                                          this.props.dispatchNotification({
                                            message: `Influencer Updated.`,
                                            open: true,
                                            icon: AddAlert
                                          })
                                      );
                                    });
                                  } else {
                                    const categoriesNew = [
                                      ...categories,
                                      {
                                        id: cat_id,
                                        categoryName: name,
                                        ressonancePoint: Number(
                                          relevancePoint.toFixed(2)
                                        ),
                                        postsSummary: true
                                      }
                                    ];
                                    const influencerNew = {
                                      ...influencer,
                                      categories: categoriesNew
                                    };

                                    patchInfluencer(
                                      influencer.id,
                                      parseEditInfluencer(influencerNew),
                                      this.fetchPostsSummaryWithParams
                                    ).then(() => {
                                      this.setState(
                                        {
                                          showModal: false,
                                          openConfirmDialog: false
                                        },
                                        () =>
                                          this.props.dispatchNotification({
                                            message: `Influencer Updated.`,
                                            open: true,
                                            icon: AddAlert
                                          })
                                      );
                                    });
                                  }
                                },
                                message: `Are you sure to update relevance score?`
                              });
                            } else {
                              if (
                                categories &&
                                categories.some(function (obj) {
                                  // check element existed
                                  return obj.id === cat_id;
                                })
                              ) {
                                // Update existed category
                                const categoriesUpdated = categories.map(
                                  category => {
                                    if (category.id === cat_id) {
                                      return {
                                        id: cat_id,
                                        categoryName: name,
                                        ressonancePoint: Number(
                                          relevancePoint.toFixed(2)
                                        ),
                                        postsSummary: true
                                      };
                                    }

                                    return category;
                                  }
                                );

                                const influencerNew = {
                                  ...influencer,
                                  categories: categoriesUpdated
                                };

                                patchInfluencer(
                                  influencer.id,
                                  parseEditInfluencer(influencerNew),
                                  this.fetchPostsSummaryWithParams
                                ).then(() => {
                                  this.setState(
                                    {
                                      showModal: false,
                                      openConfirmDialog: false
                                    },
                                    () =>
                                      this.props.dispatchNotification({
                                        message: `Influencer Updated.`,
                                        open: true,
                                        icon: AddAlert
                                      })
                                  );
                                });
                              } else {
                                const categoriesNew = [
                                  ...categories,
                                  {
                                    id: cat_id,
                                    categoryName: name,
                                    ressonancePoint: Number(
                                      relevancePoint.toFixed(2)
                                    ),
                                    postsSummary: true
                                  }
                                ];
                                const influencerNew = {
                                  ...influencer,
                                  categories: categoriesNew
                                };

                                patchInfluencer(
                                  influencer.id,
                                  parseEditInfluencer(influencerNew),
                                  this.fetchPostsSummaryWithParams
                                ).then(() => {
                                  this.setState(
                                    {
                                      showModal: false
                                    },
                                    () =>
                                      this.props.dispatchNotification({
                                        message: `Influencer Updated.`,
                                        open: true,
                                        icon: AddAlert
                                      })
                                  );
                                });
                              }
                            }
                          }}
                          key={cat_id}
                          size="sm"
                        >
                          PICK
                          </Button>
                        {exists && (
                          <Button
                            onClick={() => {
                              const { influencer } = this.state;
                              const { categories } = influencer;
                              if (
                                categories.some(function (obj) {
                                  // check element existed
                                  return obj.id === cat_id;
                                })
                              ) {
                                // Update existed category
                                const categoriesUpdated = categories.filter(
                                  category => {
                                    return category.id !== cat_id;
                                  }
                                );

                                const influencerNew = {
                                  ...influencer,
                                  categories: categoriesUpdated
                                };

                                this.setState({
                                  openConfirmDialog: true,
                                  onConfirm: () =>
                                    patchInfluencer(
                                      influencer.id,
                                      parseEditInfluencer(influencerNew),
                                      this.fetchPostsSummaryWithParams
                                    ).then(() => {
                                      this.setState(
                                        {
                                          showModal: false,
                                          openConfirmDialog: false
                                        },
                                        () =>
                                          this.props.dispatchNotification({
                                            message: `Influencer Updated.`,
                                            open: true,
                                            icon: AddAlert
                                          })
                                      );
                                    }),
                                  message: `Are you sure to remove this category from the influencer profile?`
                                });
                              }
                            }}
                            key={idx}
                            disabled={!exists}
                            size="sm"
                            color="dangerNoBackground"
                          >
                            <Close className={classes.icon} />
                          </Button>
                        )}
                      </ItemGrid>
                    </GridContainer>
                  ),
                  exists: exists ? <NoteTooltips /> : ''
                })
              )
              : []
          });
        }
      );
    });
  };
  pushParams = params => {
    const { id } = this.state;
    this.props.history.push(
      `/postsSummary/${id}?${Object.keys(params)
        .filter(v => v)
        .map(v => `${encodeURIComponent(v)}=${encodeURIComponent(params[v])}`)
        .join('&')}`
    );
  };
  onPageChange = index => {
    const params = { ...this.state.params };
    params['page_index'] = encodeURIComponent(index);
    if (!params['page_size']) params['page_size'] = 10;
    if (!params['sort_type']) params['sort_type'] = -1;
    this.pushParams(params);
  };
  changePageSize = pageSize => {
    const params = { ...this.state.params };
    params['page_size'] = pageSize;
    params['page_index'] = 0;
    this.pushParams(params);
  };
  changeSort = sortType => {
    const params = { ...this.state.params };
    params['sort_type'] = sortType;
    this.pushParams(params);
  };
  render() {
    const _this = this;
    const { classes } = _this.props;
    const {
      id,
      columns,
      rows,
      sortingStateColumnExtensions,
      params,
      total,
      totalPosts,
      isLoading,
      message,
      openConfirmDialog,
      onConfirm
    } = this.state;

    return isLoading ? (
      <LoadingSpinner />
    ) : (
        <RegularCard
          content={
            <GridContainer>
              <SimpleDialog
                title="Confirmation"
                message={message}
                isOpen={openConfirmDialog}
                onClose={() =>
                  this.setState({
                    openConfirmDialog: false,
                    message: ''
                  })
                }
                confirmText="OK"
                showClose
                onConfirm={onConfirm}
              />
              <ItemGrid xs={12} sm={12} md={12} lg={12}>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={12} lg={4}>
                    <h3>Total Browsed Posts: {totalPosts}</h3>
                  </ItemGrid>
                  <ItemGrid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    style={{ textAlign: 'right' }}
                  >
                    <Button
                      color="github"
                      customClass={classes.marginRight}
                      onClick={e => this.props.history.push(`/influencer/${id}`)}
                      style={{ marginRight: '20px' }}
                    >
                      Back to edit posts
                  </Button>
                    <Button
                      color="github"
                      customClass={classes.marginRight}
                      onClick={e => this.props.history.push(`/influencers/${id}`)}
                      style={{ marginRight: '20px' }}
                    >
                      Done, Go to basic info
                  </Button>
                  </ItemGrid>
                </GridContainer>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12} lg={12}>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={12} lg={3}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Showing
                    </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={parseInt(params['page_size'], 10) || 10}
                        inputProps={{
                          name: 'simpleSelect',
                          id: 'simple-select'
                        }}
                        onChange={({ target: { value } }) =>
                          this.changePageSize(value)
                        }
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={10}
                        >
                          10 per page
                      </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={20}
                        >
                          20 per page
                      </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={30}
                        >
                          30 per page
                      </MenuItem>
                      </Select>
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={12} lg={3}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Sort Relevance Score
                    </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={parseInt(params['sort_type'], 10) || -1}
                        inputProps={{
                          name: 'simpleSelect',
                          id: 'simple-select'
                        }}
                        startAdornment={
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Sort className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        }
                        onChange={({ target: { value } }) => {
                          // this.setState({ sort: value });
                          this.changeSort(value);
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={1}
                        >
                          Ascending
                      </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={-1}
                        >
                          Descending
                      </MenuItem>
                      </Select>
                    </FormControl>
                  </ItemGrid>
                </GridContainer>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12} lg={12}>
                <Grid rows={rows} columns={columns}>
                  <PagingState
                    currentPage={parseInt(params['page_index'], 10) || 0}
                    pageSize={parseInt(params['page_size'], 10) || 10}
                    onCurrentPageChange={this.onPageChange}
                  />
                  <SortingState
                    key={1}
                    sorting={
                      [
                        // { columnName: 'relevantPoints', direction: sort }
                      ]
                    }
                    columnExtensions={sortingStateColumnExtensions}
                  />
                  <IntegratedSorting key={2} />
                  <IntegratedFiltering />
                  <CustomPaging totalCount={total} />
                  <PostsTable />
                  <TableHeaderRow />
                  <PagingPanel />
                </Grid>
              </ItemGrid>
            </GridContainer>
          }
        />
      );
  }
}
const mapStateToProps = ownProps => {
  return {
    ownProps
  };
};
const mapDispatchToProps = {
  dispatchFetchResult,
  dispatchNotification,
  closeNotification
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(style)(InfluencerPostsSummary)
);
