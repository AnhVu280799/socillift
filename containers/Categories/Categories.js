import React, { Component } from "react";
import "./Categories.css";
import IconCard from "components/Cards/IconCard.jsx";
import Receipt from "@material-ui/icons/Receipt";
import GridContainer from "components/Grid/GridContainer.jsx";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.jsx";
import ConfirmationPopup from "components/ConfirmationPopup";
import buttonsStyle from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx";
import DotDotDot from "react-dotdotdot";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import Delete from "@material-ui/icons/Delete";
import ModeEdit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Sort from "@material-ui/icons/Sort";
import { injectIntl } from 'react-intl';
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import {
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory
} from "apis/api";
import { getRoles } from "apis/role";
import AddAlert from "@material-ui/icons/AddAlert";
import {
  dispatchNotification,
  closeNotification
} from "reducers/NotificationReducer";
import { connect } from "react-redux";
import {
  PagingState,
  CustomPaging,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import { validateLinkUrl } from "utils/index.js";
import PLATFORMS from "constants/platforms";
import Tooltip from "@material-ui/core/Tooltip";

const styles = {
  paddingDiv: {
    padding: "0px 32px"
  },
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIconSearch: {
    color: "#555"
  },
  inputAdornmentSearch: {
    position: "relative"
  },
  iconSearchBtn: {
    padding: "4px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    top: "3px",
    position: "relative"
  },
  ...extendedFormsStyle,
  ...buttonsStyle,
  ...notificationsStyle
};
const tableStyle = {
  tableColumn: {
    textAlign: "center",
    "& th:nth-child(1)": {
      width: "20%"
    },
    "& th:nth-child(2)": {
      width: "15%",
      textAlign: "left"
    },
    "& th:nth-child(3)": {
      width: "25%",
      textAlign: "left"
    },
    "& th:nth-child(4)": {
      width: "25%",
      textAlign: "left"
    },
    "& th:last-child": {
      width: "15%",
      textAlign: "right"
    }
  },
  tableRow: {
    "& td:nth-child(2)": {
      textAlign: "left"
    },
    "& td:nth-child(3)": {
      textAlign: "left"
    },
    "& td:last-child": {
      textAlign: "left"
    }
  }
};
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const CategoryTable = withStyles(tableStyle)(({ classes, ...rest }) => (
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

class CategoryDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      name: props.name,
      categoryUid: props.categoryUid,
      categoryCode: props.categoryCode,
      description: props.description,
      isOpen: false,
      editCategory: props.editCategory,
      selectedPlatform: props.selectedPlatform || [],
      selectedRoles: props.selectedRoles || [],
      roles: props.roles
    };
  }

  static defaultProps = {
    // parent: 'null',
    name: "",
    description: "",
    categoryUid: "",
    categoryCode: "",
    editCategory: false,
    selectedPlatform: [],
    selectedRoles: []
  };

  componentWillReceiveProps({
    name,
    description,
    parent,
    categoryUid,
    categoryCode,
    isOpen,
    editCategory,
    roles,
    selectedPlatform,
    selectedRoles
  }) {
    if (isOpen && !this.state.isOpen)
      this.setState({
        name,
        description,
        parent,
        categoryUid,
        categoryCode,
        isOpen,
        editCategory,
        roles,
        selectedPlatform,
        selectedRoles
      });
    else if (!isOpen) {
      this.setState({ isOpen: false });
    }
  }
  render() {
    const {
      classes,
      onClose,
      confirmBtnText,
      title,
      onConfirm,
      roles
    } = this.props;
    const intl = this.props.intl;
    return (
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.state.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        style={{ textAlign: "left" }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          style={{ textAlign: "center" }}
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>{title}</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={<span>{intl.formatMessage({ defaultMessage: "Category Name *"})}</span>}
                id="category-name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.name,
                  onChange: e => this.setState({ name: e.target.value })
                }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={<span>{intl.formatMessage({ defaultMessage: "Category Image URL (optional)"})}</span>}
                id="category-uid"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.categoryUid,
                  onChange: e => this.setState({ categoryUid: e.target.value })
                }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={
                  this.state.editCategory ? (
                    <span>{intl.formatMessage({ defaultMessage: "Category Code (Cannot Update)"})}</span>
                  ) : (
                    <span>{intl.formatMessage({ defaultMessage: "Category Code *"})}</span>
                  )
                }
                id="category-code"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.categoryCode,
                  onChange: e => this.setState({ categoryCode: e.target.value })
                }}
                disabled={this.state.editCategory}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={<span>{intl.formatMessage({ defaultMessage: "Description (optional)"})}</span>}
                id="description"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.description,
                  onChange: e => this.setState({ description: e.target.value })
                }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                 {intl.formatMessage({ defaultMessage: "Choose Platform *"})} 
                </InputLabel>
                <Select
                  multiple
                  value={this.state.selectedPlatform}
                  onChange={({ target: { value } }) => {
                    this.setState({ selectedPlatform: value });
                  }}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                  inputProps={{
                    name: "multipleSelect",
                    id: "multiple-select"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: "Choose Platform"})}
                  </MenuItem>
                  {Object.keys(PLATFORMS).map(key => {
                    return (
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={key}
                        key={key}
                      >
                        {PLATFORMS[key]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                 {intl.formatMessage({ defaultMessage: "Choose Role *"})} 
                </InputLabel>
                <Select
                  multiple
                  value={this.state.selectedRoles}
                  onChange={({ target: { value } }) => {
                    this.setState({ selectedRoles: value });
                  }}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                  inputProps={{
                    name: "multipleSelect",
                    id: "multiple-select"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                   {intl.formatMessage({ defaultMessage: "Choose Role"})} 
                  </MenuItem>
                  {roles.map(({ _id, name }, idx) => {
                    return (
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={_id}
                        key={idx}
                      >
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </ItemGrid>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            color="info"
            onClick={() => {
              onConfirm(
                this.state.name,
                this.state.description,
                this.state.parent,
                this.state.categoryUid,
                this.state.categoryCode,
                this.state.selectedPlatform,
                this.state.selectedRoles
              );
            }}
          >
            {confirmBtnText}
          </Button>
          <Button onClick={onClose} color="info">
          {intl.formatMessage({ defaultMessage: "Cancel"})} 
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class NoteTooltips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { stringTitle, showText } = this.props;
    return (
      <Tooltip
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        title={stringTitle}
        placement="bottom"
      >
        <span>{showText}{intl.formatMessage({ defaultMessage: ",..."})}</span>
      </Tooltip>
    );
  }
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      showModal: false,
      searchValue: "",
      columns: [
        { name: "name", title: "Category Name" },
        { name: "platform", title: "Platform" },
        { name: "role", title: "Role" },
        { name: "description", title: "Description" },
        { name: "actions", title: "Action" }
      ],
      data: [],
      rows: [],
      modalState: {
        title: "Add new category",
        onConfirm: this.addCategory,
        confirmBtnText: "Create",
        selectedPlatform: [],
        selectedRoles: [],
        roles: []
      },
      categoryDeteled: null,
      roles: [],
      openPopup: false,
      params: {
        platform: "allPlatforms",
        role_ids: "allRoleIds",
        page_size: 10,
        page_index: 0,
      }
    };
  }
  componentDidMount() {
    this.fetchRoles();
    this.parseParams(this.fetchCategoriesWithParams);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchRoles();
      this.parseParams(this.fetchCategoriesWithParams);
    }
  }
  parseParams = callback => {
    if (this.props.location.search === "") {
      this.setState(
        {
          params: {
            platform: "allPlatforms",
            role_ids: "allRoleIds",
            page_size: 10,
            page_index: 0
          },
          searchValue: ""
        },
        callback
      );
      return;
    }
    const params = this.props.location.search
      .slice(1)
      .split("&")
      .reduce((prev, curr) => {
        const l = curr.split("=");
        prev[l[0]] = decodeURIComponent(l[1]);
        return prev;
      }, {});
    this.setState(
      { params, searchValue: params["category_name"] || "" },
      callback
    );
  };
  fetchRoles = () => {
    this.props.openLoading();
    getRoles({}, results => {
      this.setState({ 
        roles: results ? results : [],
      }, () => this.props.closeLoading());
    }).catch(({ status }) => {
      this.props.dispatchFetchResult(status);
      this.props.closeLoading();
    });
  };
  fetchCategoriesWithParams = () => {
    this.props.openLoading();
    if (this.state.params["role_ids"] === "allRoleIds") {
      delete this.state.params["role_ids"];
    }
    if (this.state.params["platform"] === "allPlatforms") {
      delete this.state.params["platform"];
    }
    return getCategory(
      { ...this.state.params },
      ({ results, totalResults }) => {
        this.setState(
          {
            data: results ? results : [],
            total: totalResults,
            rows: results
              ? results.map(cat => ({
                  name: cat["categoryName"],
                  description: (
                    <div className="white-space-normal">
                      <DotDotDot clamp={2}>{cat["description"]}</DotDotDot>
                    </div>
                  ),
                  platform:
                    cat["platform"].length > 1 ? (
                      <NoteTooltips
                        stringTitle={cat["platform"]
                          .map((element) => PLATFORMS[element])
                          .join(", ")}
                        showText={cat["platform"]
                          .filter((element, idx) => idx < 2)
                          .map((element) => PLATFORMS[element])
                          .join(", ")}
                      />
                    ) : (
                      cat["platform"]
                        .map((element) => PLATFORMS[element])
                        .join(", ")
                    ),
                  role:
                    cat["roles"].length > 2 ? (
                      <NoteTooltips
                        stringTitle={cat["roles"]
                          .map(({ name }) => name)
                          .join(", ")}
                        showText={cat["roles"]
                          .filter((cat, idx) => idx < 3)
                          .map(({ name }) => name)
                          .join(", ")}
                      />
                    ) : (
                      cat["roles"].map(({ name }) => name).join(", ")
                    ),
                  actions: [
                    <IconButton
                      key="edit"
                      onClick={() =>
                        this.showEditModal(
                          cat["id"],
                          cat["categoryName"],
                          cat["description"],
                          cat["parent"],
                          cat["categoryUid"],
                          cat["categoryCode"],
                          cat["platform"],
                          cat["roleIds"]
                        )
                      }
                    >
                      <ModeEdit />
                    </IconButton>,
                    <IconButton
                      key="delete"
                      onClick={() => this.openConfirmationPopup(cat)}
                    >
                      <Delete />
                    </IconButton>
                  ]
                }))
              : []
          },
          () => this.props.closeLoading()
        );
      }
    ).catch(({ status }) => {
      this.props.dispatchFetchResult(status);
      this.props.closeLoading();
    });
  };
  editCategory = id => (
    name,
    description,
    parent,
    categoryUid,
    categoryCode,
    platform,
    roleIds
  ) => {
    if (name.trim() === "") {
      this.props.dispatchNotification({
        message: "Please enter category's name",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (categoryCode.trim() === "") {
      this.props.dispatchNotification({
        message: "Please enter category's code",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (platform.length === 0) {
      this.props.dispatchNotification({
        message: "Please choose platforms for category",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (roleIds.length === 0) {
      this.props.dispatchNotification({
        message: "Please choose roles for category",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (
      typeof categoryUid !== "undefined" &&
      categoryUid !== "" &&
      !validateLinkUrl(categoryUid)
    ) {
      this.props.dispatchNotification({
        message: "Invalid URL",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    this.props.openLoading();
    patchCategory(
      id,
      name.trim(),
      description.trim(),
      parent,
      categoryUid.trim(),
      categoryCode.trim(),
      platform,
      roleIds,
      () => {
        this.setState(
          {
            showModal: false
          },
          () => {
            this.props.dispatchNotification({
              message: `Category ${name} is edited.`,
              open: true,
              icon: AddAlert
            });
            this.fetchCategoriesWithParams();
          }
        );
      }
    ).catch(err => {
      this.setState(
        {
          showModal: true
        },
        () => {
          err.json().then(data => {
            this.props.dispatchFetchResult(err.status);
            this.props.dispatchNotification({
              message: data["message"],
              open: true,
              icon: AddAlert,
              color: "danger"
            });
            this.fetchCategoriesWithParams();
          });
        }
      );
    });
  };
  handleModal = name => {
    this.setState({ [name]: !this.state[name] });
  };
  addCategory = (
    name,
    description,
    parent,
    categoryUid,
    categoryCode,
    platform,
    roleIds
  ) => {
    if (name.trim() === "") {
      this.props.dispatchNotification({
        message: "Please enter category's name",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (categoryCode.trim() === "") {
      this.props.dispatchNotification({
        message: "Please enter category's code",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (platform.length === 0) {
      this.props.dispatchNotification({
        message: "Please choose platforms for category",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (roleIds.length === 0) {
      this.props.dispatchNotification({
        message: "Please choose roles for category",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (
      typeof categoryUid !== "undefined" &&
      categoryUid !== "" &&
      !validateLinkUrl(categoryUid)
    ) {
      this.props.dispatchNotification({
        message: "Invalid URL",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    this.props.openLoading();
    postCategory(
      name.trim(),
      description.trim(),
      parent,
      categoryUid.trim(),
      categoryCode.trim(),
      platform,
      roleIds,
      () => {
        this.setState(
          {
            showModal: false
          },
          () =>
            this.props.dispatchNotification({
              message: `Category ${name} is added.`,
              open: true,
              icon: AddAlert
            })
        );
        this.fetchCategoriesWithParams();
      }
    )
    .catch(err => {
      this.setState(
        {
          showModal: true
        },
        () => {
          err.json().then(data => {
            this.props.dispatchFetchResult(err.status);
            this.props.dispatchNotification({
              message: data["message"],
              open: true,
              icon: AddAlert,
              color: "danger"
            });
            this.fetchCategoriesWithParams();
          });
        }
      );
    });
  };
  removeCategory = cat => {
    if (cat) {
      this.props.openLoading();
      deleteCategory(cat["id"], () => {
        this.setState(
          {
            showModal: false,
            openPopup: false
          },
          () => {
            this.props.dispatchNotification({
              message: `Category ${cat["categoryName"]} is deleted.`,
              open: true,
              icon: AddAlert
            });
            this.onPageChange(0);
          }
        );
      }).catch(({ status }) => {
        this.props.dispatchFetchResult(status);
        this.props.closeLoading();
      });
    }
  };
  showAddModal = () => {
    this.setState({
      modalState: {
        title: "Add new category",
        onConfirm: this.addCategory,
        confirmBtnText: "Create",
        description: "",
        selectedPlatform: [],
        selectedRoles: [],
        roles: this.state.roles
      },
      showModal: true
    });
  };
  showEditModal = (
    id,
    name,
    description,
    parent,
    categoryUid,
    categoryCode,
    platform,
    roleIds
  ) => {
    this.setState({
      modalState: {
        title: "Edit category",
        onConfirm: this.editCategory(id),
        confirmBtnText: "Edit",
        parent,
        description,
        name,
        categoryUid,
        categoryCode,
        editCategory: true,
        selectedPlatform: platform || [],
        selectedRoles: roleIds || [],
        roles: this.state.roles
      },
      showModal: true
    });
  };
  pushParams = params => {
    this.props.history.push(
      `/categories?${Object.keys(params)
        .map(v => `${encodeURIComponent(v)}=${encodeURIComponent(params[v])}`)
        .join("&")}`
    );
  };
  changePageSize = pageSize => {
    const params = { ...this.state.params };
    params["page_size"] = pageSize;
    params["page_index"] = 0;
    this.pushParams(params);
  };
  onPageChange = index => {
    const params = { ...this.state.params };
    params["page_index"] = encodeURIComponent(index);
    if (!params["page_size"]) params["page_size"] = 10;
    this.pushParams(params);
  };
  changePlatform = platform => {
    const params = { ...this.state.params };
    params["platform"] = platform;
    params["page_index"] = 0;
    this.pushParams(params);
  };
  changeRole = roleIds => {
    const params = { ...this.state.params };
    params["role_ids"] = roleIds;
    params["page_index"] = 0;
    this.pushParams(params);
  };
  searchCategory = searchValue => {
    const params = { ...this.state.params };
    if (searchValue) params["category_name"] = searchValue.trim();
    else delete params["category_name"];
    params["page_index"] = 0;
    this.pushParams(params);
  };
  sortCategory = sortField => {
    const params = { ...this.state.params };
    switch (sortField) {
      case "nameAsc":
        params["sort_field"] = "name";
        params["sort_type"] = 1;
        break;
      case "nameDes":
        params["sort_field"] = "name";
        params["sort_type"] = -1;
        break;
      default:
        params["sort_field"] = "last_updated_date";
        params["sort_type"] = -1;
        break;
    }
    this.pushParams(params);
  };
  openConfirmationPopup = cat => {
    this.setState({
      openPopup: true,
      categoryDeteled: cat
    });
  };
  closeConfirmationPopup = () => {
    this.setState({
      openPopup: false,
      categoryDeteled: null
    });
  };
  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    const {
      columns,
      rows,
      total,
      openPopup,
      categoryDeteled,
      params,
      searchValue,
      roles,
    } = this.state;
    return (
      <div className={classes.paddingDiv}>
        <IconCard
          icon={intl.formatMessage({ defaultMessage: "Receipt"})}
          iconColor="blue"
          title={intl.formatMessage({ defaultMessage: "Category List"})}
          content={
            <GridContainer>
              <ItemGrid xs={12} sm={12} md={3} lg={3}>
                <CustomInput
                  labelText={<span>{intl.formatMessage({ defaultMessage: "Enter Category name"})}</span>}
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: searchValue,
                    onChange: ({ target: { value } }) =>
                      this.setState({ searchValue: value }),
                    onKeyDownCapture: e => {
                      if (e.keyCode === 13) {
                        this.searchCategory(searchValue);
                      }
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornmentSearch}
                      >
                        <IconButton
                          color="default"
                          key="edit"
                          onClick={() => this.searchCategory(searchValue)}
                          className={classes.iconSearchBtn}
                        >
                          <SearchIcon
                            className={classes.inputAdornmentIconSearch}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </ItemGrid>
              <ItemGrid xs={8} sm={8} md={2} lg={2}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    {intl.formatMessage({ defaultMessage: "Showing"})}
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={parseInt(params["page_size"], 10) || 10}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
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
                     {intl.formatMessage({ defaultMessage: "10 per page"})} 
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={20}
                    >
                      {intl.formatMessage({ defaultMessage: "20 per page"})}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={30}
                    >
                      {intl.formatMessage({ defaultMessage: "30 per page"})}
                    </MenuItem>
                  </Select>
                </FormControl>
              </ItemGrid>
              <ItemGrid xs={8} sm={8} md={2} lg={2}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    {intl.formatMessage({ defaultMessage: "Platform"})}
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={params["platform"] || "allPlatforms"}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                    onChange={({ target: { value } }) =>
                      this.changePlatform(value)
                    }
                  >
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"allPlatforms"}
                      key={"all"}
                    >
                      {intl.formatMessage({ defaultMessage: "All Platform"})}
                    </MenuItem>
                    {Object.keys(PLATFORMS).map(key => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={key}
                          key={key}
                        >
                          {PLATFORMS[key]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </ItemGrid>
              <ItemGrid xs={8} sm={8} md={2} lg={2}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    {intl.formatMessage({ defaultMessage: "Role"})}
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={params["role_ids"] || "allRoleIds"}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                    onChange={({ target: { value } }) =>
                      this.changeRole(value)
                    }
                  >
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"allRoleIds"}
                      key={"all"}
                    >
                     {intl.formatMessage({ defaultMessage: "All Role"})} 
                    </MenuItem>
                    {roles.map(role => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={role._id}
                          key={role._id}
                        >
                          {role.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </ItemGrid>
              <ItemGrid xs={8} sm={8} md={3} lg={3}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    {intl.formatMessage({ defaultMessage: "Sort"})}
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={
                      params["sort_field"]
                        ? params["sort_field"] === "last_updated_date"
                          ? "last_updated_date"
                          : params["sort_field"] === "name" &&
                            params["sort_type"] === "1"
                          ? "nameAsc"
                          : params["sort_field"] === "name" &&
                            params["sort_type"] === "-1"
                          ? "nameDes"
                          : "nameAsc"
                        : "last_updated_date"
                    }
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
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
                      this.sortCategory(value);
                    }}
                  >
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"last_updated_date"}
                    >
                     {intl.formatMessage({ defaultMessage: "Latest Modified"})} 
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"nameAsc"}
                    >
                      {intl.formatMessage({ defaultMessage: "A -"})}&gt; {intl.formatMessage({ defaultMessage: "Z"})}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"nameDes"}
                    >
                      {intl.formatMessage({ defaultMessage: "Z -"})}&gt;{intl.formatMessage({ defaultMessage: "A"})} 
                    </MenuItem>
                  </Select>
                </FormControl>
              </ItemGrid>
              <ItemGrid xs={4} sm={4} md={2} lg={2}>
                <Button
                  color="info"
                  customclass={classes.marginRight}
                  fullWidth
                  onClick={this.showAddModal}
                >
                  {intl.formatMessage({ defaultMessage: "ADD"})}
                </Button>
                <CategoryDialog
                  classes={classes}
                  roles={roles}
                  onClose={() => this.handleModal("showModal")}
                  isOpen={this.state.showModal}
                  {...this.state.modalState}
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12} lg={12}>
                <Grid rows={rows} columns={columns}>
                  <PagingState
                    currentPage={parseInt(params["page_index"], 10) || 0}
                    pageSize={parseInt(params["page_size"], 10) || 10}
                    onCurrentPageChange={this.onPageChange}
                  />
                  <CustomPaging totalCount={total} />
                  <CategoryTable />
                  <TableHeaderRow />
                  <PagingPanel />
                </Grid>
              </ItemGrid>
            </GridContainer>
          }
        />
        <ConfirmationPopup
          id="confirm-delete-category"
          keepMounted
          openConfirmationPopup={openPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClose={this.closeConfirmationPopup}
          onClickConfirmation={() => this.removeCategory(categoryDeteled)}
          onClickCancel={this.closeConfirmationPopup}
          confirmationTitle={intl.formatMessage({ defaultMessage: "Confirmation"})}
          confirmationBtnText={intl.formatMessage({ defaultMessage: "Yes, Delete It"})}
          cancelBtnText={intl.formatMessage({ defaultMessage: "Cancel"})}
          confirmationQuestion={intl.formatMessage({ defaultMessage: "Are You Sure?"})}
          confirmationStatement={
            intl.formatMessage({ defaultMessage: "You want to delete this item and its related data."})
          }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userInfo }, ownProps) => {
  return {
    userInfo,
    ownProps
  };
};
export default injectIntl (connect(mapStateToProps, {
  dispatchNotification,
  closeNotification,
  dispatchFetchResult,
  openLoading,
  closeLoading
})(withRouter(withStyles(styles)(Categories)))) ;
