import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { injectIntl } from 'react-intl';  
import { compose } from "redux";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { dispatchNotification } from "reducers/NotificationReducer";
import {
  parseURLQueryToState,
  fetchAccounts,
  changePageSize,
  changePageIndex,
  changeSorting,
  changeFilters,
  resetFilters,
  convertStateToURL,
  clearAllState,
  deleteAccountById,
  openUserEditForm,
  getDetailData
} from "redux/user";
import { fetchDropdownRoles } from "redux/role";

import { withStyles, Paper, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Breadcrumbs from "components/Breadcrumbs";
import ConfirmationPopup from "components/ConfirmationPopup";

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
  TableFilterList,
  ToolbarSearchBar,
  ToolbarButton
} from "components/DataTable";
import { EditFormDrawer } from "./EditFormDrawer";

import styles from "./styles";

class AccountList extends Component {
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
    fetchAccounts: PropTypes.func.isRequired,
    changePageSize: PropTypes.func.isRequired,
    changePageIndex: PropTypes.func.isRequired,
    changeSorting: PropTypes.func.isRequired,
    changeFilters: PropTypes.func.isRequired,
    fetchDropdownRoles: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    convertStateToURL: PropTypes.func.isRequired,
    clearAllState: PropTypes.func.isRequired,
    deleteAccountById: PropTypes.func.isRequired
  };

  tableColumns = [
    {
      name: "name",
      title: "Display Name",
      getCellValue: row => this.renderColumnNameWithStatus(row)
    },
    { name: "email", title: "Email" },
    { name: "role", title: "Role" },
    { name: "phone", title: "Phone" },
    { name: "company", title: "Company" },
    { name: "position", title: "Position" },
    { name: "source", title: "Source" },
    { name: "lastActiveDate", title: "Last Act" },
    { name: "createdDate", title: "Created Date" },
    { name: "isActive", title: "Status" },
    {
      name: "actions",
      title: "Actions",
      getCellValue: row => this.renderActions(row)
    }
  ];

  tableColumnExtensions = [
    { columnName: "name", wordWrapEnabled: true, width: 240 },
    { columnName: "email", wordWrapEnabled: true, width: 240 },
    { columnName: "role", wordWrapEnabled: true, width: 200 },
    { columnName: "phone", wordWrapEnabled: true, width: 200 },
    { columnName: "company", wordWrapEnabled: true, width: 200 },
    { columnName: "position", wordWrapEnabled: true, width: 200 },
    { columnName: "source", wordWrapEnabled: true, width: 200 },
    { columnName: "lastActiveDate", wordWrapEnabled: true },
    { columnName: "createdDate", wordWrapEnabled: true },
    { columnName: "isActive", togglingEnabled: false },
    {
      columnName: "actions",
      wordWrapEnabled: true,
      width: 128,
      align: "center"
    }
  ];

  tableDefaultHiddenColumns = ["isActive"];

  sortingStateColumnExtensions = [
    { columnName: "actions", sortingEnabled: false }
  ];

  dateTimeColumnsFormat = ["lastActiveDate", "createdDate"];

  get filterOptions() {
    return [
      {
        name: "lastActiveDate",
        type: "dateRange"
      },
      {
        name: "createdDate",
        type: "dateRange"
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
        name: "company",
        type: "text"
      },
      {
        name: "position",
        type: "text"
      },
      {
        name: "isActive",
        type: "select",
        options: [
          { label: "All", value: undefined },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" }
        ]
      }
    ];
  }

  state = {
    textSearch: "",
    deleteItem: null
  };

  componentWillUnmount() {
    this.props.clearAllState().then(() => {
      this.props.closeLoading();
    });
  }

  componentDidMount() {
    this.props.openLoading();
    this.props.fetchDropdownRoles().then(() => {
      this.props.parseURLQueryToState(this.filterOptions).then(() => {
        this.handleFetchData();
      });
    });
  }

  handleFetchData = async () => {
    const {
      openLoading,
      closeLoading,
      fetchAccounts,
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

    const {
      lastActiveDate,
      createdDate,
      role,
      search,
      isActive,
      company,
      position
    } = filters;

    const roles = role ? role.join(",") : undefined;

    let lastActiveDateFrom,
      lastActiveDateTo,
      createdDateFrom,
      createdDateDateTo;

    const dateFormat = "YYYY-MM-DD";

    if (lastActiveDate) {
      lastActiveDateFrom = moment(lastActiveDate.from).format(dateFormat);
      lastActiveDateTo = moment(lastActiveDate.to).format(dateFormat);
    }

    if (createdDate) {
      createdDateFrom = moment(createdDate.from).format(dateFormat);
      createdDateDateTo = moment(createdDate.to).format(dateFormat);
    }

    openLoading();
    await convertStateToURL();
    await fetchAccounts({
      lastActiveDateFrom,
      lastActiveDateTo,
      createdDateFrom,
      createdDateDateTo,
      roles,
      pageSize,
      pageIndex,
      sortField,
      sortType,
      search,
      status: isActive,
      company,
      position
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
    const { search } = this.props.filters;

    this.props.changeFilters({ ...filters, search }).then(() => {
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

    let newFilters = { ...filters };

    switch (columnName) {
      case "role":
        newFilters[columnName] = newFilters[columnName].filter(
          elm => elm !== value
        );
        break;

      case "lastActiveDate":
      case "createdDate":
      case "isActive":
      case "company":
      case "position":
        newFilters[columnName] = undefined;
        break;

      default:
      // do nothing
    }

    this.props.changeFilters(newFilters).then(() => {
      this.handleFetchData();
    });
  };

  handleChangeTextSearch = value => {
    this.setState({ textSearch: value });
  };

  handleResetTextSearch = () => {
    this.setState({ textSearch: "" }, () => {
      const { filters, changeFilters } = this.props;

      filters.search = undefined;

      changeFilters(filters).then(() => {
        this.handleFetchData();
      });
    });
  };

  handleSubmitTextSearch = value => {
    const { filters, changeFilters } = this.props;

    if (value) {
      filters.search = value;
    }

    changeFilters(filters).then(() => {
      this.handleFetchData();
    });
  };

  handleChooseItemToDelete = item => {
    this.setState({ deleteItem: item });
  };

  handleDeleteItem = ({ id, name, email }) => {
    const { deleteAccountById, dispatchNotification } = this.props;

    deleteAccountById(id).then(() => {
      this.handleFetchData().then(() => {
        this.setState({ deleteItem: null }, () => {
          dispatchNotification({
            message: `${intl.formatMessage({ defaultMessage: "Account"})} "${name} <${email}>" ${intl.formatMessage({ defaultMessage: "was deleted."})}`,
            open: true,
            icon: AssignmentTurnedInIcon
          });
        });
      });
    });
  };

  handleCancelDeleteItem = () => {
    this.setState({ deleteItem: null });
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

  renderActions = row => {
    const { classes } = this.props;

    return (
      <ul className={classes.actionsGroup}>
        <li>
          <IconButton
            className={classes.buttonEdit}
            onClick={() => {
              this.props.openLoading();
              this.props.getDetailData(row.id).then(() => {
                this.props.openUserEditForm();
                this.props.closeLoading();
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </li>
        <li>
          <IconButton
            className={classes.buttonDelete}
            onClick={() => {
              this.handleChooseItemToDelete(row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </li>
      </ul>
    );
  };

  renderColumnNameWithStatus = row => {
    const { classes } = this.props;

    return (
      <div className={classes.columnName}>
        {row.isActive ? (
          <CheckCircleIcon className={classes.iconActive} />
        ) : (
          <CancelIcon className={classes.iconInactive} />
        )}
        {row.name}
      </div>
    );
  };

  renderConfirmDeleteDialog = () => {
    const { deleteItem } = this.state;

    return (
      <ConfirmationPopup
        openConfirmationPopup={!!deleteItem}
        onClose={this.handleCancelDeleteItem}
        onCloseClick={this.handleCancelDeleteItem}
        onClickConfirmation={() => this.handleDeleteItem(deleteItem)}
        onClickCancel={this.handleCancelDeleteItem}
        confirmationTitle="Confirmation"
        confirmationBtnText="Yes, Delete It"
        cancelBtnText="Cancel"
        confirmationQuestion="Are You Sure?"
        confirmationStatement={`You want to delete this account "${deleteItem.name} <${deleteItem.email}>" and its related data.`}
      />
    );
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
      filters,
      pageSizes
    } = this.props;
    const intl = this.props.intl;
    const { textSearch, deleteItem } = this.state;

    return (
      <div className={classes.root}>
        {this.renderHeader()}
        <Paper>
          <Grid columns={this.tableColumns} rows={data}>
            <DateTimeTypeProvider for={this.dateTimeColumnsFormat} />
            <DataTypeProvider
              for={["role"]}
              formatterComponent={({ value }) => (value ? value.name : "")}
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
            <TableColumnVisibility
              defaultHiddenColumnNames={this.tableDefaultHiddenColumns}
              columnExtensions={this.tableColumnExtensions}
            />
            <Toolbar />
            <ToolbarTitle title={name} />
            <ToolbarSearchBar
              classes={{ root: classes.searchBarRoot }}
              placeholder="Search by name, email or phone number..."
              value={textSearch}
              onChange={this.handleChangeTextSearch}
              onReset={this.handleResetTextSearch}
              onSubmit={this.handleSubmitTextSearch}
            />
            <ToolbarColumnChooser />
            <ToolbarFilter
              options={this.filterOptions}
              filters={filters}
              onFiltersChange={this.handleFiltersChange}
              onReset={this.handleResetFilter}
            />
            <ToolbarButton
              classes={{ root: classes.buttonAdd }}
              color="primary"
              round
              onClick={() => {
                this.props.openUserEditForm();
              }}
            >
              <AddIcon className={classes.iconButtonAdd} />
              {intl.formatMessage({ defaultMessage: "ADD"})}
            </ToolbarButton>
            <TableFilterList
              columns={this.tableColumns}
              options={this.filterOptions}
              filters={filters}
              onReset={this.handleResetFilter}
              onRemoveFilter={this.handleRemoveFilter}
              search={this.props.filters.search}
              onRemoveSearch={this.handleResetTextSearch}
            />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
        </Paper>
        <EditFormDrawer onFetchData={this.handleFetchData} />
        {!!deleteItem && this.renderConfirmDeleteDialog()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs,
  dropdownRoles: state.role.dropdown.items,
  ...state.user.list
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  parseURLQueryToState,
  fetchAccounts,
  changePageSize,
  changePageIndex,
  changeSorting,
  changeFilters,
  fetchDropdownRoles,
  resetFilters,
  convertStateToURL,
  clearAllState,
  deleteAccountById,
  dispatchNotification,
  openUserEditForm,
  getDetailData
};

export default injectIntl (
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: "AccountList" })
  )(AccountList)
) ;
