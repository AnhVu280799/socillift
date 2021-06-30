import React from "react";
import PropTypes from "prop-types";

// classNames
import classNames from "classnames";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";
import { injectIntl } from 'react-intl';
// @mdi icon
import MdiIcon from "@mdi/react";
import { mdiChessQueen, mdiBriefcase, mdiAccountStar } from "@mdi/js";
import { mdiCrown } from "@mdi/js";
import { mdiShoeHeel } from "@mdi/js";
import { mdiFoodForkDrink } from "@mdi/js";
import { mdiAirplaneTakeoff } from "@mdi/js";
import { mdiTeach } from "@mdi/js";

// custom components
import ButtonInf from "components/CustomButtons/ButtonInf";
import MultiSelect from "components/MultiSelect/MultiSelect";
import CollapseWithHeader from "./CollapseWithHeader";
import SliderWithInput from "components/FilterDrawer/SliderWithInput";
import ConfirmationPopup from 'components/ConfirmationPopup';

// styles
import influencerDemographicStyle from "./InfluencerDemographicStyle";
// api
import { getProfessions } from "apis/api";

// contanst
import megaLogo from "assets/img/Mega.svg";
import macroLogo from "assets/img/Macro.svg";
import microLogo from "assets/img/Micro.svg";
import potentialLogo from "assets/img/Potential.svg";
import INF_SIZE from "constants/influencersize";
import INF_TYPE from "constants/influencertype";
import GENDERS from "constants/genders";
import PROVINCES from "constants/provinces";
import MARITAL_STAT from "constants/maritalstatus";
import AGE_RANGES from "constants/ageRanges";
import YOUTUBECATES from "constants/youtubeCategories";
import PAGECATES from "constants/pageCategories";

const provinces = PROVINCES.map(v => ({ value: v, label: v }));
const infSizeIcon = {
  mega: megaLogo,
  macro: macroLogo,
  micro: microLogo,
  potential: potentialLogo
};
const infSizeScript1 = {
  "fb": {
    mega: "Total Follower > 200K",
    macro: "50K < Total Follower < 200K",
    micro: "5K < Total Follower < 50K",
    potential: "Total Follower > 5K"
  },
  "page": {
    mega: "Total Follower >= 3M",
    macro: "Total Follower >= 1M",
    micro: "Total Follower >= 100K",
    potential: "Total Follower >= 50K"
  },
  "youtube": {
    mega: "Subscriber >= 1M",
    macro: "Subscriber >= 500K",
    micro: "Subscriber >= 50K",
    potential: "Subscriber >= 20K",
  },
  "insta": {
    mega: "Total Follower >= 500K",
    macro: "Total Follower >= 50K",
    micro: "Total Follower >= 5K",
    potential: "Total Follower >= 3K"
  },
};
const infSizeScript2 = {
  "fb": {
    mega: "Avg. Engagement > 2K",
    macro: "Avg. Engagement > 500",
    micro: "200 < Avg. Engagement < 500",
    potential: "100 < Avg. Engagement < 200"
  },
  "youtube": {
    mega: "Total Views > 500M",
    macro: "Total Views > 100M",
    micro: "Total Views > 50M",
    potential: "Total Views > 5M"
  }
};
const infTypeIcon = {
  celebrity: mdiChessQueen,
  professional: mdiBriefcase,
  citizen: mdiAccountStar
};
const infTypeScript1 = {
  celebrity: "",
  professional: "",
  citizen: ""
};
const infTypeScript2 = {
  celebrity: "",
  professional: "",
  citizen: ""
};
const exampleProfessions = [
  {
    name: "Celebrity",
    icon: mdiCrown
  },
  {
    name: "Fashionista",
    icon: mdiShoeHeel
  },
  {
    name: "Food Blogger",
    icon: mdiFoodForkDrink
  },
  {
    name: "Travel Blogger",
    icon: mdiAirplaneTakeoff
  },
  {
    name: "Business Owner",
    icon: mdiTeach
  }
];
const initState = props => ({
  infSize:
    props.infSize ||
    Object.keys(INF_SIZE).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infType:
    props.infType ||
    Object.keys(INF_TYPE).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infGender:
    props.infGender ||
    Object.keys(GENDERS).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infLoc: props.infLoc || [],
  infMarital:
    props.infMarital ||
    Object.keys(MARITAL_STAT).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {}),
  infAgeRange: props.infAgeRange || {
    ignoreMax: true,
    ignoreMin: true,
    range: [0, 100]
  },
  infProf: props.infProf || [],
  infYoutubeCate: props.infYoutubeCate || [],
  infPageCate: props.infPageCate || []
});
class InfluencerDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: props.platform,
      influencerSize: true,
      influencerType: true,
      influencerDemo: false,
      profession: false,
      youtubeCates: false,
      pageCates: false,
      professionList: [],
      stateChange: false,
      errors: {},
      toolTipInfSize: false,
      toolTipInfType: false,
      toolTipInfCate: false,
      openPopup: false
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
    }
  };

  professionText = platform => {
    switch (platform) {
      case "fb":
        return "Influencer Profession";
      case "page":
        return "Facebook Page Category";
      case "youtube":
        return "Youtube Category";
      case "insta":
        return "Influencer Profession";
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
    getProfessions(
      { platform: this.state.platform, sort_field: "name", sort_type: 1 },
      ({ data: { data } }) => {
        const professionList = data.map(({ name }) => ({
          value: name,
          label: name
        }));
        this.setState({ stateChange: true, professionList });
      }
    );
  }

  changeObject = (obj, field, val) => {
    const newObj = Object.assign({}, this.state[obj]);
    newObj[field] = val;
    this.setState({ stateChange: true, [obj]: newObj });
  };

  handleTooltipInfSizeClose = () => {
    this.setState({ toolTipInfSize: false });
  };

  handleTooltipInfSizeOpen = () => {
    this.setState({ toolTipInfSize: true });
  };

  handleTooltipInfTypeClose = () => {
    this.setState({ toolTipInfType: false });
  };

  handleTooltipInfTypeOpen = () => {
    this.setState({ toolTipInfType: true });
  };

  handleTooltipInfCateClose = () => {
    this.setState({ toolTipInfCate: false });
  };

  handleTooltipInfCateOpen = () => {
    this.setState({ toolTipInfCate: true });
  };

  checkError = (
    field,
    { ignoreMin, ignoreMax, range: [min, max] },
    maxVal = 1e10,
    maxMessage = "10 billion"
  ) => {
    let message = null;
    if (!ignoreMax && !ignoreMin && min > max) {
      message = "Min value should be smaller than Max value";
    } else if (
      (!ignoreMax && (max < 0 || max > maxVal)) ||
      (!ignoreMin && (min < 0 || min > 1e10))
    ) {
      message =
        "The value should be larger than 0 and smaller than " + maxMessage;
    }
    this.setState({
      stateChange: true,
      errors: { ...this.state.errors, [field]: message }
    });
    return true;
  };

  canApply = () => {
    return Object.keys(this.state.errors).filter(v => this.state.errors[v] !== null)
      .length <= 0;
  }

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
    const { classes, color, name, className, onBack, onApply, ...props } = this.props;
    const intl = this.props.intl;

    const {
      platform,
      toolTipInfSize,
      toolTipInfType,
      toolTipInfCate,
      errors,
      openPopup
    } = this.state;
    const checkboxBlank = <div className={classes.checkboxBlank} />;
    const checkboxChecked = (
      <div className={classes.checkboxChecked}>
        <Icon className={classes.checkIcon}>{intl.formatMessage({ defaultMessage: "check"})}</Icon>
      </div>
    );
    const checkField = (
      title,
      icon,
      descriptionOne,
      descriptionTwo,
      onChange,
      checked
    ) => (
      <div className={classes.checkFieldContainer}>
        <div className={classes.itemCheckField} key={title}>
          <Checkbox
            className={classes.checkbox}
            icon={checkboxBlank}
            checkedIcon={checkboxChecked}
            checked={checked}
            onChange={onChange}
          />
          <span className={classes.checkFieldTitle}>{intl.formatMessage({ defaultMessage: "title"})}</span>
          {intl.formatMessage({ defaultMessage: "icon"})}
        </div>
        <div className={classes.descritionCheckFieldContainer}>
          <span className={classes.checkFieldDescription}>
            {intl.formatMessage({ defaultMessage: "descriptionOne"})}
          </span>
          <span className={classes.checkFieldDescription}>
            {intl.formatMessage({ defaultMessage: "descriptionTwo"})}
          </span>
        </div>
      </div>
    );
    const influencerSize = (
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        className={classes.checkFieldSizeWrapper}
      >
        {Object.keys(INF_SIZE)
          .filter(key => key !== "under_potential")
          .map(key => (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={12}
              alignItems="flex-start"
              justify="flex-start"
              className={classes.checkFieldSizeContainer}
              key={key}
            >
              {checkField(
                INF_SIZE[key],
                <img
                  src={infSizeIcon[key]}
                  alt="Icon"
                  className={classes.iconInfSize}
                />,
                infSizeScript1[this.state.platform] ? infSizeScript1[this.state.platform][key] : "",
                infSizeScript2[this.state.platform] ? infSizeScript2[this.state.platform][key] : "",
                (e, checked) => this.changeObject("infSize", key, checked),
                this.state.infSize[key]
              )}
            </Grid>
          ))}
      </Grid>
    );
    const influencerType = (
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        className={classes.checkFieldSizeWrapper}
      >
        {Object.keys(INF_TYPE)
          .filter(key => key !== "potential")
          .map(key => (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={12}
              alignItems="flex-start"
              justify="flex-start"
              className={classes.checkFieldSizeContainer}
              key={key}
            >
              {checkField(
                INF_TYPE[key],
                <MdiIcon
                  path={infTypeIcon[key]}
                  size="26px"
                  className={classes.iconInfType}
                  color="#FFAD33"
                />,
                infTypeScript1[key],
                infTypeScript2[key],
                (e, checked) => this.changeObject("infType", key, checked),
                this.state.infType[key]
              )}
            </Grid>
          ))}
      </Grid>
    );
    const influencerGender = (
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        className={classes.checkFieldSizeWrapper}
      >
        {Object.keys(GENDERS)
          .filter(key => key !== "potential")
          .map(key => (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              alignItems="flex-start"
              justify="flex-start"
              className={classes.checkFieldSizeContainer}
              key={key}
            >
              {checkField(
                GENDERS[key],
                null,
                null,
                null,
                (e, checked) => this.changeObject("infGender", key, checked),
                this.state.infGender[key]
              )}
            </Grid>
          ))}
      </Grid>
    );
    const influencerMaritalStatus = (
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        className={classes.checkFieldSizeWrapper}
      >
        {Object.keys(MARITAL_STAT)
          .filter(key => key !== "potential")
          .map(key => (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              alignItems="flex-start"
              justify="flex-start"
              className={classes.checkFieldSizeContainer}
              key={key}
            >
              {checkField(
                MARITAL_STAT[key],
                null,
                null,
                null,
                (e, checked) => this.changeObject("infMarital", key, checked),
                this.state.infMarital[key]
              )}
            </Grid>
          ))}
      </Grid>
    );
    const professionMenu = (
      <div className={classes.itemContainerProfession}>
        <MultiSelect
          options={this.state.professionList}
          value={this.state.infProf}
          onChange={infProf => this.setState({ stateChange: true, infProf })}
          closeMenuOnSelect={false}
          isSearchable
          isClearable
          isMulti
          placeholder="- ANY -"
        />
      </div>
    );
    const youtubeCatesMenu = (
      <div className={classes.itemContainerProfession}>
        <MultiSelect
          options={Object.keys(YOUTUBECATES).map(key => ({
            value: key,
            label: YOUTUBECATES[key]
          }))}
          value={this.state.infYoutubeCate}
          onChange={infYoutubeCate =>
            this.setState({ stateChange: true, infYoutubeCate })
          }
          closeMenuOnSelect={false}
          isSearchable
          isClearable
          isMulti
          placeholder="- ANY -"
        />
      </div>
    );
    const pageCatesMenu = (
      <div className={classes.itemContainerProfession}>
        <MultiSelect
          options={Object.keys(PAGECATES).map(key => ({
            value: key,
            label: PAGECATES[key]
          }))}
          value={this.state.infPageCate}
          onChange={infPageCate =>
            this.setState({ stateChange: true, infPageCate })
          }
          closeMenuOnSelect={false}
          isSearchable
          isClearable
          isMulti
          placeholder="- ANY -"
        />
      </div>
    );
    const influencerDemo = (
      <div className={classes.itemContainer}>
        <Grid item container direction="row" className={classes.itemGroup}>
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.sectionTitle}
            // className={`${classes.oneLineItem} ${classes.itemText}`}
          >
           {intl.formatMessage({ defaultMessage: " Age Range"})}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
            className={classes.oneLineItem}
          >
            <SliderWithInput
              range={{ min: 0, max: 100 }}
              start={this.state.infAgeRange}
              step={1}
              connect={[false, true, false]}
              onChange={infAgeRange =>
                this.checkError("infAgeRange", infAgeRange, 100, "100") &&
                this.setState({ stateChange: true, infAgeRange })
              }
              noMinPlaceholder="No Min"
              noMaxPlaceholder="No Max"
            />
            {errors.infAgeRange && (
              <div className={classes.oneLineItem + " " + classes.error}>
                {errors.infAgeRange}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item container direction="row" className={classes.itemGroup}>
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.sectionTitle}
            // className={`${classes.oneLineItem} ${classes.itemText}`}
          >
           {intl.formatMessage({ defaultMessage: " Select Location"})}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
            className={classes.oneLineItem}
          >
            <MultiSelect
              options={provinces}
              value={this.state.infLoc}
              onChange={infLoc => this.setState({ stateChange: true, infLoc })}
              isSearchable
              closeMenuOnSelect={false}
              isClearable
              isMulti
              placeholder="- ANY -"
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" className={classes.itemGroup}>
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.sectionTitle}
            // className={`${classes.oneLineItem} ${classes.itemText}`}
          >
            {intl.formatMessage({ defaultMessage: "Select Gender"})}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
            className={classes.checkboxGroup}
          >
            {influencerGender}
            {/* {Object.keys(GENDERS).map(key =>
              checkField(
                GENDERS[key],
                (e, checked) => this.changeObject("infGender", key, checked),
                this.state.infGender[key]
              )
            )} */}
          </Grid>
        </Grid>
        <Grid item container direction="row" className={classes.itemGroup}>
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.sectionTitle}
            // className={`${classes.oneLineItem} ${classes.itemText}`}
          >
            {intl.formatMessage({ defaultMessage: "Marital Status"})}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
            className={classes.checkboxGroup}
          >
            {influencerMaritalStatus}
            {/* {Object.keys(MARITAL_STAT).map(key =>
              checkField(
                MARITAL_STAT[key],
                (e, checked) => this.changeObject("infMarital", key, checked),
                this.state.infMarital[key]
              )
            )} */}
          </Grid>
        </Grid>
      </div>
    );
    return (
      <Grid container className={classes.root} direction="row">
        <ConfirmationPopup
          id="confirm-back"
          keepMounted
          openConfirmationPopup={openPopup}
          onClose={this.closeConfirmationPopup}
          onCloseClick={this.closeConfirmationPopup}
          onClickConfirmation={() => onBack()}
          onClickCancel={this.closeConfirmationPopup}
          confirmationTitle={"Confirmation"}
          confirmationBtnText={"Yes, do it"}
          cancelBtnText={"Cancel"}
          confirmationQuestion={"Are You Sure?"}
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
          <p className={classes.titleText}>{intl.formatMessage({ defaultMessage: "Influencer Demographic"})}</p>
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
            {intl.formatMessage({ defaultMessage: "Influencer Size"})}
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Social media influencers are split up into four different tiers: mega- macro-micro and potential-influencers, in order of largest to smallest following."})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipInfSizeClose}
              open={toolTipInfSize}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipInfSizeOpen}
                onMouseLeave={this.handleTooltipInfSizeClose}
                className={classes.toolTipIconSize}
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
            {influencerSize}
          </Grid>
          <div className={classes.horizontalLine} />
        </Grid>
        {platform !== "youtube" && (
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
              {intl.formatMessage({ defaultMessage: "Influencer Type"})}
              <Tooltip
                title={"Influencer Type"}
                classes={{
                  tooltip: classes.tooltipTitle,
                  popper: classes.lastTooltip
                }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                PopperProps={{
                  disablePortal: true
                }}
                onClose={this.handleTooltipInfTypeClose}
                open={toolTipInfType}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <ErrorOutline
                  onClick={this.handleTooltipInfTypeOpen}
                  onMouseLeave={this.handleTooltipInfTypeClose}
                  className={classes.toolTipIconType}
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
              {influencerType}
            </Grid>
            <div className={classes.horizontalLine} />
          </Grid>
        )}
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
            {this.professionText(platform)}
            <Tooltip
              title={this.professionText(platform)}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipInfCateClose}
              open={toolTipInfCate}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipInfCateOpen}
                onMouseLeave={this.handleTooltipInfCateClose}
                className={classNames(classes.toolTipIconProfession, {
                  [classes.toolTipIconProfessionYoutube]:
                    platform === "youtube",
                  [classes.toolTipIconProfessionPage]: platform === "page"
                })}
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
            {platform === "fb" || platform === "insta"
              ? professionMenu
              : platform === "youtube"
              ? youtubeCatesMenu
              : pageCatesMenu}
          </Grid>
        </Grid>
        <Grid item container direction="row" className={classes.exampleTitle}>
         {intl.formatMessage({ defaultMessage: " Example Professions"})}
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.sectionContainer}
        >
          {exampleProfessions.map(profession => (
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              key={profession.name}
              className={classes.exProfessionContainer}
            >
              <div className={classes.exProfessionBorder}>
                <div>
                  <MdiIcon
                    path={profession.icon}
                    size="24px"
                    className={classes.exProfessionIcon}
                    color="#3A7A92"
                  />
                </div>
                <div className={classes.exProfessionName}>
                  {profession.name}
                </div>
              </div>
            </Grid>
          ))}
          <div className={classes.horizontalLine} />
        </Grid>
        {platform !== "youtube" && (
          <Grid
            item
            container
            direction="row"
            className={classes.sectionContainer}
          >
            <CollapseWithHeader
              key="Influencer Demographic"
              title={intl.formatMessage({ defaultMessage: "More Filters of Influencer Demographic"})}
              open={this.state.influencerDemo}
              // open={true}
              onClickHeader={() =>
                this.setState({
                  stateChange: true,
                  influencerDemo: !this.state.influencerDemo
                })
              }
              child={influencerDemo}
            />
          </Grid>
        )}
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
              <ButtonInf className={classes.btnBack} onClick={() => this.openConfirmationPopup()}>
                {intl.formatMessage({ defaultMessage: "Back"})}
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
                color="primary"
                className={classes.btnApply}
                onClick={() => {
                  if (!this.canApply()) {
                    return;
                  }
                  const {
                    platform,
                    infSize,
                    infType,
                    infGender,
                    infMarital,
                    infState,
                    infAgeRange,
                    infFollowers,
                    infAvgEng,
                    infProf,
                    infYoutubeCate,
                    infPageCate,
                    infLoc
                  } = this.state;
                  this.props.onApply({
                    platform,
                    infSize,
                    infType,
                    infGender,
                    infMarital,
                    infState,
                    infAgeRange,
                    infFollowers,
                    infAvgEng,
                    infProf,
                    infYoutubeCate,
                    infPageCate,
                    infLoc
                  });
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

InfluencerDemographic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (
  withStyles(influencerDemographicStyle)(InfluencerDemographic)
) ;
