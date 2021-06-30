import React from "react";
import PropTypes from "prop-types";

// @mdi icon
import MdiIcon from "@mdi/react";
import { mdiCarMultiple } from "@mdi/js";
import { mdiPotMix } from "@mdi/js";
import { mdiDoctor } from "@mdi/js";
import { mdiHomeHeart } from "@mdi/js";
import { mdiShoeHeel } from "@mdi/js";
import { mdiFoodForkDrink } from "@mdi/js";
import { mdiSofa } from "@mdi/js";
import { mdiVideoVintage } from "@mdi/js";
import { mdiSunglasses } from "@mdi/js";
import { mdiAirplaneTakeoff } from "@mdi/js";
import { injectIntl } from 'react-intl';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";

// custom components
import ButtonInf from "components/CustomButtons/ButtonInf";
import MultiSelect from "components/MultiSelect/MultiSelect";
import ConfirmationPopup from 'components/ConfirmationPopup';

// styles
import influencedCategory from "./InfluencedCategoryStyle";

// api
import { getCategory } from "apis/api";

// contanst
const exampleCategory = [
  {
    name: "Automotive",
    icon: mdiCarMultiple
  },
  {
    name: "Cooking",
    icon: mdiPotMix
  },
  {
    name: "Entertainment",
    icon: mdiVideoVintage
  },
  {
    name: "Family & Homecare",
    icon: mdiHomeHeart
  },
  {
    name: "Fashion",
    icon: mdiShoeHeel
  },
  {
    name: "Food & Drink",
    icon: mdiFoodForkDrink
  },
  {
    name: "HeathCare",
    icon: mdiDoctor
  },
  {
    name: "Interior Design",
    icon: mdiSofa
  },
  {
    name: "Lifestyle",
    icon: mdiSunglasses
  },
  {
    name: "Travel",
    icon: mdiAirplaneTakeoff
  }
];
const initState = props => ({
  infCate: props.infCate || []
});
class InfluencedCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: props.platform,
      category: true,
      stateChange: false,
      categoryList: [],
      toolTipCate: false,
      openPopup: false,
      roleId: props.roleId
    };
  }

  platformText = platform => {
    switch (platform) {
      case "fb":
        return "Facebook Profile";
      case "page":
        return "Facebook Fanpage";
      case "youtube":
        return "Youtube";
      case "insta":
        return "Instagram";
      default:
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (state.stateChange) return { ...state };
    return {
      ...state,
      ...initState(props)
    };
  }

  componentDidMount() {
    getCategory({
        sort_type: 1,
        sort_field: "name",
        platform: this.state.platform,
        role_ids: this.state.roleId
      }, ({ results }) => {
      const categoryList = results.map(({ categoryName }) => ({
        value: categoryName,
        label: categoryName
      }));
      this.setState({ stateChange: true, categoryList });
    });
  }

  handleTooltipCateClose = () => {
    this.setState({ toolTipCate: false });
  };

  handleTooltipCateOpen = () => {
    this.setState({ toolTipCate: true });
  };

  openConfirmationPopup = () => {
    this.setState({
      openPopup: true
    });
  };
  closeConfirmationPopup = () => {
    this.setState({
      openPopup: false
    });
  };

  render() {
    const { classes, color, name, className, onBack, onApply } = this.props;
    const intl = this.props.intl;
    const { platform, toolTipCate, openPopup } = this.state;
    const categoryMenu = (
      <div className={classes.itemContainerCategory}>
        <MultiSelect
          options={this.state.categoryList}
          value={this.state.infCate}
          onChange={infCate => this.setState({ stateChange: true, infCate })}
          closeMenuOnSelect={false}
          isSearchable
          isClearable
          isMulti
          placeholder="- ANY -"
        />
      </div>
    );
    return (
      <Grid container className={classes.root} direction="row">
        <ConfirmationPopup
          id="confirm-back"
          keepMounted
          openConfirmationPopup={intl.formatMessage({ defaultMessage: "openPopup"})}
          onClose={this.closeConfirmationPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClickConfirmation={() => onBack()}
          onClickCancel={this.closeConfirmationPopup}
          confirmationTitle={intl.formatMessage({ defaultMessage: "Confirmation"})}
          confirmationBtnText={intl.formatMessage({ defaultMessage: "Yes, do it"})}
          cancelBtnText={intl.formatMessage({ defaultMessage: "Cancel"})}
          confirmationQuestion={intl.formatMessage({ defaultMessage: "Are You Sure?"})}
          confirmationStatement={
            <p>
             {intl.formatMessage({ defaultMessage: "You want to back to condition filter."})} <br/>{intl.formatMessage({ defaultMessage: "All selected options in this page will be removed."})}
            </p>
          }
        />
        <Grid
          item
          container
          direction="row"
          className={classes.headerContainer}
          alignItems="center"
          justify="center"
        >
          <p className={classes.titleText}>{intl.formatMessage({ defaultMessage: "Influenced Category"})}</p>
          <p className={classes.descriptionStyle}>
          {intl.formatMessage({ defaultMessage: "Please select filter condition below to find the right influencers"})}
          {intl.formatMessage({ defaultMessage: "on"})} 
            <span className={classes.platformStyle}>
              {this.platformText(platform)}
            </span>
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.sectionContainer}
        >
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.sectionTitle}
          >
            {intl.formatMessage({ defaultMessage: "Select Category"})}
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Select Category"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipCateClose}
              open={toolTipCate}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipCateOpen}
                onMouseLeave={this.handleTooltipCateClose}
                className={classes.toolTipIconCate}
              />
            </Tooltip>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={12}
            xs={12}
            alignItems="flex-end"
            justify="flex-end"
            className={classes.sectionAction}
          >
            {intl.formatMessage({ defaultMessage: "categoryMenu"})}
          </Grid>
          <div className={classes.horizontalLine} />
        </Grid>
        <Grid item container direction="row" className={classes.exampleTitle}>
        {intl.formatMessage({ defaultMessage: "Suggested Categories (show 10 categories of demo account)"})} 
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.sectionContainer}
        >
          {exampleCategory.map(profession => (
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              key={profession.name}
              className={classes.exCategoryContainer}
            >
              <div className={classes.exCategoryBorder}>
                <div>
                  <MdiIcon
                    path={profession.icon}
                    size="24px"
                    className={classes.exCategoryIcon}
                    color="#3A7A92"
                  />
                </div>
                <div className={classes.exCategoryName}>{profession.name}</div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.sectionButtonContainer}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
          >
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Back To Condition Filter"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionProps={{ timeout: 300 }}
            >
              <ButtonInf
                className={classes.btnBack}
                onClick={() => this.openConfirmationPopup()}
              >
                Back
              </ButtonInf>
            </Tooltip>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-end"
            justify="flex-end"
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
          >
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Apply Filter"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionProps={{ timeout: 300 }}
            >
              <ButtonInf
                color="primary" className={classes.btnApply}
                onClick={() => {
                  const {
                    platform, infCate
                  } = this.state;
                  this.props.onApply({
                    platform, infCate
                  })
                }}
              >
                {intl.formatMessage({ defaultMessage: "Apply Filter"})}
              </ButtonInf>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

InfluencedCategory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (
  withStyles(influencedCategory)(InfluencedCategory)
);

