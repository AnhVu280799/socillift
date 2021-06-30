import React, { Component } from "react";
import "./Professions.css";
import { withRouter } from "react-router-dom";
import Receipt from "@material-ui/icons/Receipt";
import IconCard from "components/Cards/IconCard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.jsx";
import buttonsStyle from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx";
import DotDotDot from "react-dotdotdot";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import Delete from "@material-ui/icons/Delete";
import ModeEdit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Sort from "@material-ui/icons/Sort";
import Tooltip from "@material-ui/core/Tooltip";
import Transition from "components/SimpleDialog/Transition";
import ConfirmationPopup from "components/ConfirmationPopup";
import { injectIntl } from 'react-intl';
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import {
  dispatchNotification,
  closeNotification
} from "reducers/NotificationReducer";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";
import {
  getProfessions,
  postProfession,
  getCategory,
  patchProfessionId,
  deleteProfessionById
} from "apis/api";
import AddAlert from "@material-ui/icons/AddAlert";
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
import StatusCodeToError from "constants/statusCodeToError";
import InfluencerType from "constants/influencertype";
import PLATFORMS from "constants/platforms";

const style = {
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
      width: "25%",
      textAlign: "left"
    },
    "& th:nth-child(3)": {
      width: "10%",
      textAlign: "left"
    },
    "& th:nth-child(4)": {
      width: "30%",
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

const ProfessionsTable = withStyles(tableStyle)(({ classes, ...rest }) => (
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

class ProfessionsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      categories: props.categories,
      isOpen: false,
      selectedCategories: props.selectedCategories,
      influencerType: props.influencerType,
      platform: props.platform,
    };
  }
  componentWillReceiveProps({
    name,
    description,
    categories,
    isOpen,
    selectedCategories,
    influencerType,
    platform,
  }) {
    if (isOpen && !this.state.isOpen)
      this.setState({
        name,
        description,
        categories,
        isOpen,
        selectedCategories,
        influencerType,
        platform
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
      categories
    } = this.props;
    const intl = this.props.intl;
    const {
      name,
      selectedCategories,
      description,
      influencerType,
      platform,
    } = this.state;
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
                labelText={<span>{intl.formatMessage({ defaultMessage: "Profession Name"})} *</span>}
                id="category-name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: name,
                  onChange: ({ target: { value } }) =>
                    this.setState({ name: value })
                }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={<span>{intl.formatMessage({ defaultMessage: "Platform *"})}</span>}
                id="category-code"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: PLATFORMS[this.state.platform],
                }}
                disabled={true}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                 {intl.formatMessage({ defaultMessage: " Choose Categories"})}
                </InputLabel>
                <Select
                  multiple
                  value={this.state.selectedCategories}
                  onChange={({ target: { value } }) => {
                    this.setState({ selectedCategories: value });
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
                   {intl.formatMessage({ defaultMessage: " Choose Categories"})}
                  </MenuItem>
                  {categories.map(({ categoryName, categoryCode }, idx) => {
                    return (
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={categoryCode}
                        key={idx}
                      >
                        {intl.formatMessage({ defaultMessage: "categoryName"})}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                 {intl.formatMessage({ defaultMessage: " Related Influencer Type (Optional)"})}
                </InputLabel>
                <Select
                  simple="true"
                  value={this.state.influencerType}
                  onChange={({ target: { value } }) => {
                    this.setState({ influencerType: value });
                  }}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                  inputProps={{
                    name: "simpleSelect",
                    id: "simple-select"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                   {intl.formatMessage({ defaultMessage: " Related Influencer Type"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value=""
                  >
                    <em>{intl.formatMessage({ defaultMessage: "None"})}</em>
                  </MenuItem>
                  {Object.keys(InfluencerType).map((type, idx) => {
                    return (
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={type}
                        key={idx}
                      >
                        {InfluencerType[type]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText={<span>D{intl.formatMessage({ defaultMessage: "escription (Optional)"})}</span>}
                id="category-name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: description,
                  onChange: ({ target: { value } }) =>
                    this.setState({ description: value })
                }}
              />
            </ItemGrid>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            color="info"
            onClick={() => {
              onConfirm(
                name,
                categories
                  .filter(({ categoryCode }) =>
                    selectedCategories.includes(categoryCode)
                  )
                  .map(({ categoryCode }) => categoryCode),
                description,
                influencerType,
                platform
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
    const { stringTitle, listCategories } = this.props;
    const intl = this.props.intl;
    return (
      <Tooltip
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        title={intl.formatMessage({ defaultMessage: "stringTitle"})}
        placement="bottom"
      >
        <span>{listCategories}{intl.formatMessage({ defaultMessage: ",..."})}</span>
      </Tooltip>
    );
  }
}

class Professions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      showModal: false,
      searchValue: "",
      columns: [
        { name: "name", title: "Profession Name" },
        { name: "categories", title: "Related Categories" },
        { name: "influencerType", title: "Influencer Type" },
        { name: "description", title: "Description" },
        { name: "actions", title: "Action" }
      ],
      data: [],
      rows: [],
      params: {
        platform: "fb"
      },
      modalState: {
        title: "Add new profession",
        onConfirm: this.addProfession,
        description: "",
        categories: [],
        confirmBtnText: "Create",
        selectedCategories: [],
        name: "",
        influencerType: "",
        platform: "fb",
      },
      categories: [],
      openPopup: false,
      idProfessionDeleted: null,
      nameProfessionDeleted: null
    };
  }
  componentDidMount() {
    this.parseParams(this.fetchProfessionsWithParams);
    this.fetchCategories();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.parseParams(this.fetchProfessionsWithParams);
      this.fetchCategories();
    }
  }
  parseParams = callback => {
    if (this.props.location.search === "") {
      this.setState(
        {
          params: {
            platform: "fb",
            page_size: 10
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
    this.setState({ params, searchValue: params["name"] || "" }, callback);
  };
  fetchCategories = () => {
    this.props.openLoading();
    getCategory({ sort_type: 1, sort_field: "name" }, ({ results }) => {
      this.setState(
        {
          categories: results
        },
        () => this.props.closeLoading()
      );
    }).catch(({ status }) => {
      this.props.dispatchFetchResult(status);
      this.props.closeLoading();
    });
  };
  fetchProfessionsWithParams = () => {
    this.props.openLoading();
    return getProfessions(
      { ...this.state.params },
      ({ data: { data }, total }) => {
        this.setState(
          {
            data: data ? data : [],
            total: total,
            rows: data
              ? data.map(
                  ({
                    id,
                    lastUpdatedDate,
                    name,
                    description,
                    categories,
                    influencerType,
                    platform
                  }) => ({
                    name,
                    description: (
                      <div className="white-space-normal">
                        <DotDotDot clamp={2}>{description}</DotDotDot>
                      </div>
                    ),
                    categories:
                      categories.length > 4 ? (
                        <NoteTooltips
                          stringTitle={categories
                            .map(({ name }) => name)
                            .join(", ")}
                          listCategories={categories
                            .filter((cat, idx) => idx < 3)
                            .map(({ name }) => name)
                            .join(", ")}
                        />
                      ) : (
                        categories.map(({ name }) => name).join(", ")
                      ),
                    last_edited: lastUpdatedDate,
                    influencerType: influencerType
                      ? InfluencerType[influencerType.toLowerCase()]
                      : "",
                    actions: [
                      <IconButton
                        color="default"
                        key="edit"
                        onClick={() =>
                          this.showEditModal(
                            id,
                            name,
                            categories,
                            description,
                            influencerType,
                            platform
                          )
                        }
                      >
                        <ModeEdit />
                      </IconButton>,
                      <IconButton
                        color="default"
                        key="delete"
                        onClick={() => this.openConfirmationPopup(id, name)}
                      >
                        <Delete />
                      </IconButton>
                    ]
                  })
                )
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
  deleteProfession = (id, name) => {
    if (id) {
      this.props.openLoading();
      deleteProfessionById(id, () => {
        const params = { ...this.state.params };
        params["page_index"] = 0;
        this.setState(
          {
            openPopup: false,
            params: params
          },
          () => {
            this.props.dispatchNotification({
              message: `Profession ${name} is deleted.`,
              open: true,
              icon: AddAlert
            });
            this.fetchProfessionsWithParams();
          }
        );
      }).catch(({ status }) => {
        this.props.dispatchFetchResult(status);
        this.setState(
          {
            openPopup: false
          },
          () => {
            this.props.dispatchNotification({
              message: `Profession ${name} ${StatusCodeToError[status]}`,
              open: true,
              icon: AddAlert,
              color: "danger"
            });
            this.fetchProfessionsWithParams();
          }
        );
      });
    }
  };
  editProfession = id => (
    name,
    categories,
    description,
    influencerType,
    platform
  ) => {
    if (name.trim() === "" || name.trim().length > 200) {
      this.props.dispatchNotification({
        message:
          "Please enter valid profession's name (can't be empty or > 200 characters)",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (description.trim().length > 200) {
      this.props.dispatchNotification({
        message: "Invalid description (> 200 characters)",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (!['fb', 'insta'].includes(platform.trim())){
      this.props.dispatchNotification({
        message: "Invalid platform",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    this.props.openLoading();
    patchProfessionId(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        categories: categories,
        influencer_type: influencerType,
        platform: platform.trim()
      },
      () => {
        this.setState(
          {
            showModal: false
          },
          () => {
            this.props.dispatchNotification({
              message: `Profession ${name} is edited.`,
              open: true,
              icon: AddAlert
            });
            this.fetchProfessionsWithParams();
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
            console.log(err);
            this.props.dispatchFetchResult(err.status);
            if (err.status === 404) {
              this.setState(
                {
                  showModal: false
                },
                () => {
                  this.props.dispatchNotification({
                    message: `Profession ${name} ${
                      StatusCodeToError[err.status]
                    }`,
                    open: true,
                    icon: AddAlert,
                    color: "danger"
                  });
                  this.fetchProfessionsWithParams();
                }
              );
            } else {
              this.props.dispatchNotification({
                message: data["message"],
                open: true,
                icon: AddAlert,
                color: "danger"
              });
            }
            this.props.closeLoading();
          });
        }
      );
    });
  };
  handleModal = name => {
    this.setState({ [name]: !this.state[name] });
  };
  addProfession = (name, categories, description, influencerType, platform) => {
    if (name.trim() === "" || name.trim().length > 200) {
      this.props.dispatchNotification({
        message:
          "Please enter valid profession's name (can't be empty or > 200 characters)",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (description.trim().length > 200) {
      this.props.dispatchNotification({
        message: "Invalid description",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    if (!['fb', 'insta'].includes(platform.trim())){
      this.props.dispatchNotification({
        message: "Invalid platform",
        open: true,
        icon: AddAlert,
        color: "danger"
      });
      return;
    }
    this.props.openLoading();
    postProfession(
      {
        name: name.trim(),
        description: description.trim(),
        categories: categories,
        influencer_type: influencerType,
        platform: platform
      },
      () => {
        this.setState(
          {
            showModal: false
          },
          () => {
            this.props.dispatchNotification({
              message: `Profession ${name} is added.`,
              open: true,
              icon: AddAlert
            });
            this.fetchProfessionsWithParams();
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
            this.fetchProfessionsWithParams();
          });
        }
      );
    });
  };
  showAddModal = () => {
    this.setState({
      modalState: {
        title: "Add new profession",
        onConfirm: this.addProfession,
        description: "",
        categories: this.state.categories,
        confirmBtnText: "Create",
        selectedCategories: [],
        name: "",
        influencerType: "",
        platform: this.state.params["platform"]
      },
      showModal: true
    });
  };
  showEditModal = (
    id,
    name,
    selectedCategories,
    description,
    influencerType,
    platform
  ) => {
    this.setState({
      modalState: {
        title: "Edit Profession",
        onConfirm: this.editProfession(id),
        confirmBtnText: "Edit",
        description,
        selectedCategories: selectedCategories.map(({ code }) => code),
        name,
        influencerType,
        categories: this.state.categories,
        platform: this.state.params["platform"]
      },
      showModal: true
    });
  };
  pushParams = params => {
    this.props.history.push(
      `/professions?${Object.keys(params)
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
  searchProfession = searchValue => {
    const params = { ...this.state.params };
    if (searchValue) params["name"] = searchValue.trim();
    else delete params["name"];
    params["page_index"] = 0;
    this.pushParams(params);
  };
  sortProfession = sortField => {
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
  openConfirmationPopup = (id, name) => {
    this.setState({
      openPopup: true,
      idProfessionDeleted: id,
      nameProfessionDeleted: name
    });
  };
  closeConfirmationPopup = () => {
    this.setState({
      openPopup: false,
      idProfessionDeleted: null,
      nameProfessionDeleted: null
    });
  };
  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    const {
      columns,
      rows,
      searchValue,
      params,
      total,
      categories,
      openPopup
    } = this.state;
    return (
      <div className={classes.paddingDiv}>
        <IconCard
          icon={Receipt}
          iconColor="blue"
          title={intl.formatMessage({ defaultMessage: "Profession List"})}
          content={
            <GridContainer>
              <ItemGrid xs={12} sm={12} md={3} lg={3}>
                <CustomInput
                  labelText={<span>{intl.formatMessage({ defaultMessage: "Enter Profession name"})}</span>}
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
                        this.searchProfession(searchValue);
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
                          onClick={() => this.searchProfession(searchValue)}
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
              <ItemGrid xs={12} sm={12} md={2} lg={2}>
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
                     {intl.formatMessage({ defaultMessage: " 10 per page"})}
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
              <ItemGrid xs={12} sm={12} md={2} lg={2}>
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
                    value={params["platform"] || "fb"}
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
                      value={"fb"}
                    >
                    {intl.formatMessage({ defaultMessage: "Facebook Profile"})}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"insta"}
                    >
                      {intl.formatMessage({ defaultMessage: "Instagram"})}
                    </MenuItem>
                  </Select>
                </FormControl>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={3} lg={3}>
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
                      this.sortProfession(value);
                    }}
                  >
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"last_updated_date"}
                    >
                     {intl.formatMessage({ defaultMessage: " Latest Modified"})}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"nameAsc"}
                    >
                      A -&gt; Z
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={"nameDes"}
                    >
                      Z -&gt; A
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
                <ProfessionsDialog
                  classes={classes}
                  categories={categories}
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
                  <ProfessionsTable />
                  <TableHeaderRow />
                  <PagingPanel />
                </Grid>
              </ItemGrid>
            </GridContainer>
          }
        />
        <ConfirmationPopup
          id="confirm-delete-profession"
          keepMounted
          openConfirmationPopup={openPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClose={this.closeConfirmationPopup}
          onClickConfirmation={() =>
            this.deleteProfession(
              this.state.idProfessionDeleted,
              this.state.nameProfessionDeleted
            )
          }
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
export default injectIntl ( connect(mapStateToProps, {
  dispatchNotification,
  closeNotification,
  dispatchFetchResult,
  openLoading,
  closeLoading
})(withRouter(withStyles(style)(Professions)))) ;
