import React from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { injectIntl } from 'react-intl';
import { compose } from "redux";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import {
  parseURLQueryToState,
  fetchActivityLogs,
  changePageSize,
  changePageIndex,
  changeSorting,
  changeFilters,
  resetFilters,
  convertStateToURL,
  clearAllState
} from "redux/activity-log";
import { defaultDateFrom, defaultDateTo } from "redux/activity-log/list/utils";
import { fetchDropdownAccounts } from "redux/user";
import { fetchDropdownRoles } from "redux/role";

import { withStyles, Paper } from "@material-ui/core";
import Breadcrumbs from "components/Breadcrumbs";

import {
  SortingState,
  PagingState,
  CustomPaging,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-material-ui";
import {
  DateTimeTypeProvider,
  ToolbarTitle,
  ToolbarColumnChooser,
  ToolbarFilter,
  TableFilterList
} from "components/DataTable";

import { actions } from "../constant";

import styles from "./styles";

class ActivityLogList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    sorting: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    openLoading: PropTypes.func.isRequired,
    closeLoading: PropTypes.func.isRequired,
    parseURLQueryToState: PropTypes.func.isRequired,
    fetchActivityLogs: PropTypes.func.isRequired,
    changePageSize: PropTypes.func.isRequired,
    changePageIndex: PropTypes.func.isRequired,
    changeSorting: PropTypes.func.isRequired,
    fetchDropdownAccounts: PropTypes.func.isRequired,
    changeFilters: PropTypes.func.isRequired,
    fetchDropdownRoles: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    convertStateToURL: PropTypes.func.isRequired,
    clearAllState: PropTypes.func.isRequired
  };

  tableColumns = [
    { name: "createdTime", title: "Date Time" },
    { name: "user", title: "User" },
    { name: "role", title: "Role" },
    { name: "activity", title: "Action" },
    { name: "description", title: "Description" }
  ];

  tableColumnExtensions = [
    { columnName: "createdTime", wordWrapEnabled: true, width: 170 },
    { columnName: "user", wordWrapEnabled: true, width: 150 },
    { columnName: "role", wordWrapEnabled: true, width: 150 },
    { columnName: "activity", wordWrapEnabled: true, width: 200 },
    { columnName: "description", wordWrapEnabled: true }
  ];

  pageSizes = [12, 24, 36, 100, 200];

  sortingStateColumnExtensions = [
    { columnName: "description", sortingEnabled: false }
  ];

  dateTimeColumnsFormat = ["createdTime"];

  get filterOptions() {
    return [
      {
        name: "createdTime",
        type: "dateRange"
      },
      {
        name: "user",
        type: "multiselect",
        options: this.props.dropdownUsers.map(({ id, name, email }) => ({
          label: `${name} <${email}>`,
          value: id
        }))
      },
      {
        name: "role",
        type: "multiselect",
        options: this.props.dropdownRoles.map(({ id, name }) => ({
          label: name,
          value: id
        }))
      },
      {
        name: "activity",
        type: "multiselect",
        options: Object.keys(actions).map(key => ({
          label: actions[key],
          value: key
        }))
      }
    ];
  }

  componentWillUnmount() {
    this.props.clearAllState().then(() => {
      this.props.closeLoading();
    });
  }

  componentDidMount() {
    this.props.openLoading();
    this.props.fetchDropdownAccounts().then(() => {
      this.props.fetchDropdownRoles().then(() => {
        this.props.parseURLQueryToState(this.filterOptions).then(() => {
          this.handleFetchData();
        });
      });
    });
  }

  handleFetchData = async () => {
    const {
      openLoading,
      closeLoading,
      fetchActivityLogs,
      pageSize,
      pageIndex,
      sorting,
      filters,
      convertStateToURL
    } = this.props;
    const intl = this.props.intl;
    let sortField, sortType;

    const [sort] = sorting;

    if (sort && sort.columnName) {
      sortField = sort.columnName;
      sortType = sort.direction || intl.formatMessage({ defaultMessage: "asc"});
    }

    const { createdTime, user, role, activity } = filters;

    const users = user ? user.join(",") : undefined;
    const roles = role ? role.join(",") : undefined;
    const activities = activity ? activity.join(",") : undefined;

    let createdDateFrom, createdDateTo;

    if (createdTime) {
      const dateFormat = intl.formatMessage({ defaultMessage: "YYYY-MM-DD"});
      createdDateFrom = moment(createdTime.from).format(dateFormat);
      createdDateTo = moment(createdTime.to).format(dateFormat);
    }

    openLoading();
    await convertStateToURL();
    await fetchActivityLogs({
      createdDateFrom,
      createdDateTo,
      users,
      roles,
      activities,
      pageSize,
      pageIndex,
      sortField,
      sortType
    });
    closeLoading();
  };

  handlePageSizeChange = pageSize => {
    this.props.changePageSize(pageSize).then(() => {
      this.handleFetchData();
    });
  };

  handlePageIndexChange = pageIndex => {
    this.props.changePageIndex(pageIndex).then(() => {
      this.handleFetchData();
    });
  };

  handleSortChange = sorting => {
    this.props.changeSorting(sorting).then(() => {
      this.handleFetchData();
    });
  };

  handleFiltersChange = filters => {
    if (
      filters.createdTime &&
      !filters.createdTime.from &&
      !filters.createdTime.to
    ) {
      filters.createdTime = { from: defaultDateFrom, to: defaultDateTo };
    }

    this.props.changeFilters(filters).then(() => {
      this.handleFetchData();
    });
  };

  handleResetFilter = () => {
    this.props.resetFilters().then(() => {
      this.handleFetchData();
    });
  };

  handleRemoveFilter = (columnName, type, value) => {
    const { filters } = this.props;
    const intl = this.props.intl;
    let newFilters = { ...filters };

    switch (columnName) {
      case intl.formatMessage({ defaultMessage: "user"}):
      case intl.formatMessage({ defaultMessage: "role"}):
      case intl.formatMessage({ defaultMessage: "activity"}):
        newFilters[columnName] = newFilters[columnName].filter(
          elm => elm !== value
        );
        break;

      case intl.formatMessage({ defaultMessage: "createdTime"}):
        newFilters[columnName] = { from: defaultDateFrom, to: defaultDateTo };
        break;

      default:
      // do nothing
    }

    this.props.changeFilters(newFilters).then(() => {
      this.handleFetchData();
    });
  };

  renderHeader = () => {
    const {
      name,
      breadcrumbs: { bcRoutes, isFromDiscoverPage }
    } = this.props;

    return this.props.drawHeader({
      name: (
        <Breadcrumbs
          name={name}
          bcRoutes={bcRoutes}
          isFromDiscoverPage={isFromDiscoverPage}
        />
      )
    });
  };

  render() {
    const {
      classes,
      name,
      data,
      total,
      pageSize,
      pageIndex,
      sorting,
      filters
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.root}>
        {this.renderHeader()}
        <Paper>
          <Grid columns={this.tableColumns} rows={data}>
            <DateTimeTypeProvider for={this.dateTimeColumnsFormat} />
            <DataTypeProvider
              for={["description"]}
              formatterComponent={({ value }) => (
                <div className={classes.preWrapper}>{intl.formatMessage({ defaultMessage: "value"})}</div>
              )}
            />
            <SortingState
              sorting={sorting}
              onSortingChange={this.handleSortChange}
              columnExtensions={this.sortingStateColumnExtensions}
            />
            <PagingState
              currentPage={pageIndex}
              pageSize={pageSize}
              onCurrentPageChange={this.handlePageIndexChange}
              onPageSizeChange={this.handlePageSizeChange}
            />
            <CustomPaging totalCount={total} />
            <Table columnExtensions={this.tableColumnExtensions} />
            <TableHeaderRow showSortingControls />
            <TableColumnVisibility />
            <Toolbar />
            <ToolbarTitle title={name} />
            <ToolbarColumnChooser />
            <ToolbarFilter
              options={this.filterOptions}
              filters={filters}
              onFiltersChange={this.handleFiltersChange}
              onReset={this.handleResetFilter}
            />
            <TableFilterList
              columns={this.tableColumns}
              options={this.filterOptions}
              filters={filters}
              onReset={this.handleResetFilter}
              onRemoveFilter={this.handleRemoveFilter}
            />
            <PagingPanel pageSizes={this.pageSizes} />
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs,
  ...state.activityLog.list,
  dropdownUsers: [
    ...state.user.dropdown.items,
    { id: null, name: "Guest", email: null }
  ],
  dropdownRoles: [
    ...state.role.dropdown.items,
    { id: null, name: "Anonymous User" }
  ]
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  parseURLQueryToState,
  fetchActivityLogs,
  changePageSize,
  changePageIndex,
  changeSorting,
  fetchDropdownAccounts,
  changeFilters,
  fetchDropdownRoles,
  resetFilters,
  convertStateToURL,
  clearAllState
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "ActivityLogList" })
)(ActivityLogList)) ;
