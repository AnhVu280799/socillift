import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import { compose } from "redux";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { dispatchNotification } from "reducers/NotificationReducer";
import {
  resetState,
  fetchRoles,
  changeSorting,
  changePageSize,
  changePageIndex,
  changeFilters,
  changeDeleteItem,
  deleteRoleById,
  changeTextSearch,
  parseURLQueryToState,
  convertStateToURL
} from "redux/role/list/actions";
import {
  openDrawer as openEditFormDrawer,
  closeDrawer as closeEditFormDrawer
} from "redux/role/edit-form/actions";

import { withStyles, Paper, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AddIcon from "@material-ui/icons/Add";

import Breadcrumbs from "components/Breadcrumbs";
import ConfirmationPopup from "components/ConfirmationPopup";
import {
  ToolbarTitle,
  ToolbarColumnChooser,
  TableFilterList,
  ToolbarButton,
  ToolbarSearchBar
} from "components/DataTable";

import {
  SortingState,
  PagingState,
  CustomPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  TableColumnVisibility,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import Drawer from "components/Drawer";
import RoleEditForm from "../RoleEditForm";

import styles from "./styles";

class RoleList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  tableColumns = [
    { name: "name", title: "Role Name" },
    {
      name: "description",
      title: "Description"
    },
    { name: "totalUsers", title: "Total Users" },
    {
      name: "actions",
      title: "Actions",
      getCellValue: row => this.renderActions(row)
    }
  ];

  sortingStateColumnExtensions = [
    { columnName: "totalUsers", sortingEnabled: false },
    { columnName: "actions", sortingEnabled: false }
  ];

  tableColumnExtensions = [
    { columnName: "name", wordWrapEnabled: true, width: 300 },
    { columnName: "description", wordWrapEnabled: true },
    {
      columnName: "totalUsers",
      align: "right"
    },
    {
      columnName: "actions",
      align: "center"
    }
  ];

  filterOptions = [];

  async handleFetchData() {
    const {
      sorting,
      filters,
      pageSize,
      pageIndex,
      fetchRoles,
      convertStateToURL
    } = this.props;
    const intl = this.props.intl;
    let sortField, sortType;

    const [sort] = sorting;

    if (sort && sort.columnName) {
      sortField = sort.columnName;
      sortType = sort.direction || "asc";
    }

    const { search } = filters;

    await convertStateToURL();
    await fetchRoles({
      countTotalUsers: 1,
      sortField,
      sortType,
      pageSize,
      pageIndex,
      search
    });
  }

  componentWillMount() {
    this.props.resetState();
  }

  componentDidMount() {
    this.props.parseURLQueryToState(this.filterOptions).then(() => {
      this.handleFetchData();
    });
  }

  componentDidUpdate(prevProps) {
    const {
      loading,
      openLoading,
      closeLoading,
      error,
      dispatchFetchResult
    } = this.props;

    if (prevProps.loading !== loading) {
      if (loading) {
        openLoading();
      } else {
        closeLoading();
      }
    }

    if (prevProps.error !== error) {
      if (error) {
        dispatchFetchResult(error.code || 500);
      }
    }
  }

  handleSortChange = sorting => {
    this.props.changeSorting(sorting).then(() => {
      this.handleFetchData();
    });
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

  handleChooseItemToDelete = item => () => {
    this.props.changeDeleteItem(item);
  };

  handleCancelDeleteItem = () => {
    this.props.changeDeleteItem(null);
  };

  handleDeleteItem = ({ id, name }) => {
    const { deleteRoleById, dispatchNotification } = this.props;

    deleteRoleById(id).then(() => {
      const { error } = this.props;
      const intl = this.props.intl;
      this.props.changeDeleteItem(null).then(() => {
        if (error) {
          dispatchNotification({
            message: `Role "${name}" delete failed with error.`,
            open: true,
            icon: AssignmentTurnedInIcon,
            color: "danger"
          });
        } else {
          this.handleFetchData().then(() => {
            dispatchNotification({
              message: `Role "${name}" was deleted.`,
              open: true,
              icon: AssignmentTurnedInIcon
            });
          });
        }
      });
    });
  };

  handleAddNewItem = () => {
    this.props.openEditFormDrawer();
  };

  handleCloseDrawer = () => {
    this.props.closeEditFormDrawer();
  };

  handleChangeTextSearch = text => {
    this.props.changeTextSearch(text);
  };

  handleResetTextSearch = text => {
    this.props.changeTextSearch("").then(() => {
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

  handleUpdateItem = item => () => {
    this.props.openEditFormDrawer(item.id);
  };

  renderHeader = () => {
    const { name, bcRoutes, isFromDiscoverPage } = this.props;

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
            onClick={this.handleUpdateItem(row)}
          >
            <EditIcon />
          </IconButton>
        </li>
        <li>
          <IconButton
            className={classes.buttonDelete}
            onClick={this.handleChooseItemToDelete(row)}
          >
            <DeleteIcon />
          </IconButton>
        </li>
      </ul>
    );
  };

  renderConfirmDeleteDialog = () => {
    const { deleteItem } = this.props;
    const intl = this.props.intl;

    return (
      <ConfirmationPopup
        openConfirmationPopup={!!deleteItem}
        onClose={this.handleCancelDeleteItem}
        onCloseClick={this.handleCancelDeleteItem}
        onClickConfirmation={() => this.handleDeleteItem(deleteItem)}
        onClickCancel={this.handleCancelDeleteItem}
        confirmationTitle={intl.formatMessage({ defaultMessage: "Confirmation"})}
        confirmationBtnText={intl.formatMessage({ defaultMessage: "Yes, Delete It"})}
        cancelBtnText={intl.formatMessage({ defaultMessage: "Cancel"})}
        confirmationQuestion={intl.formatMessage({ defaultMessage: "Are You Sure?"})}
        confirmationStatement={`You want to delete this role "${deleteItem.name}" and it's related data.`}
      />
    );
  };

  render() {
    const {
      classes,
      name,
      items,
      total,
      sorting,
      filters,
      pageSizes,
      pageSize,
      pageIndex,
      deleteItem,
      openEditForm,
      editFormTitle,
      textSearch
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.root}>
        {this.renderHeader()}
        <Paper classes={{ root: classes.content }}>
          <Grid columns={this.tableColumns} rows={items}>
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
            <ToolbarSearchBar
              classes={{ root: classes.searchBarRoot }}
              placeholder="Search by role name..."
              value={textSearch}
              onChange={this.handleChangeTextSearch}
              onReset={this.handleResetTextSearch}
              onSubmit={this.handleSubmitTextSearch}
            />
            <ToolbarColumnChooser />
            <ToolbarButton
              classes={{ root: classes.buttonAdd }}
              color="primary"
              round
              onClick={this.handleAddNewItem}
            >
              <AddIcon className={classes.iconButtonAdd} />
              {intl.formatMessage({ defaultMessage: "ADD"})}
            </ToolbarButton>
            <TableFilterList
              columns={this.tableColumns}
              options={this.filterOptions}
              filters={filters}
              onReset={this.handleResetTextSearch}
              onRemoveFilter={() => {}}
              search={filters.search}
              onRemoveSearch={this.handleResetTextSearch}
            />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
        </Paper>
        <Drawer
          open={openEditForm}
          title={editFormTitle}
          onClose={this.handleCloseDrawer}
          showCloseButton={false}
        >
          <RoleEditForm
            onClose={this.handleCloseDrawer}
            onFetchData={() => {
              return this.handleFetchData();
            }}
          />
        </Drawer>
        {!!deleteItem && this.renderConfirmDeleteDialog()}
      </div>
    );
  }
}

const mapStateToProps = ({
  breadcrumbs: { bcRoutes, isFromDiscoverPage },
  role: {
    list,
    editForm: { drawer }
  }
}) => ({
  bcRoutes,
  isFromDiscoverPage,
  ...list,
  openEditForm: drawer.open,
  editFormTitle: drawer.title
});

const mapDispatchToProps = {
  openLoading,
  closeLoading,
  resetState,
  fetchRoles,
  dispatchFetchResult,
  dispatchNotification,
  changeSorting,
  changeFilters,
  changePageSize,
  changePageIndex,
  changeDeleteItem,
  deleteRoleById,
  openEditFormDrawer,
  closeEditFormDrawer,
  changeTextSearch,
  parseURLQueryToState,
  convertStateToURL
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: "RoleList" })
)(RoleList)) ;
