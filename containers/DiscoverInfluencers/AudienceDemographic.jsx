import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";

// custom components
import ButtonInf from "components/CustomButtons/ButtonInf";
import TypingSelect from "components/TypingSelect/TypingSelect";
import ConfirmationPopup from "components/ConfirmationPopup";
import { injectIntl } from 'react-intl';
// styles
import audienceDemographic from "./AudienceDemographicStyle";

// utils
import { isNull } from "util";

// contanst
import GENDERS from "constants/genders";
import PROVINCES from "constants/provinces";
import AGE_RANGES from "constants/ageRanges";

const provinces = PROVINCES.map(v => ({ value: v, label: v }));
const AgeRanges = AGE_RANGES.map(v => ({ value: v, label: v }));
const Genders = Object.keys(GENDERS).map(v => ({
  value: v,
  label: GENDERS[v]
}));
Genders.unshift({ value: null, label: "- ANY -" });
const initState = props => ({
  audLoc: props.audLoc || [{ val: null, percent: 0 }],
  audAge: props.audAge || [{ val: null, percent: 0 }],
  audGender: props.audGender || [{ val: null, percent: 0 }],
  audAgeSimple: props.audAgeSimple !== undefined ? props.audAgeSimple : true,
  audLocSimple: props.audLocSimple !== undefined ? props.audLocSimple : true,
  audGenderSimple:
    props.audGenderSimple !== undefined ? props.audGenderSimple : true
});
class AudienceDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: props.platform,
      audienceDemo: false,
      stateChange: false,
      toolTipAgeRange: false,
      toolTipInfGender: false,
      toolTipInfLocation: false,
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

  componentDidMount() {}

  changeList = (list, idx, val) => {
    const newList = this.state[list].slice();
    newList[idx] = isNull(val.val.value) ? { val: null, percent: 0 } : val;
    this.setState({ stateChange: true, [list]: newList });
  };

  deleteList = (list, idx) => {
    const newList = this.state[list].slice();
    newList.splice(idx, 1);
    this.setState({ stateChange: true, [list]: newList });
  };

  addList = (list, val) => {
    const newList = this.state[list].slice();
    newList.push(val);
    this.setState({ stateChange: true, [list]: newList });
  };

  handleTooltipAgeRangeClose = () => {
    this.setState({ toolTipAgeRange: false });
  };

  handleTooltipAgeRangeOpen = () => {
    this.setState({ toolTipAgeRange: true });
  };

  handleTooltipGenderClose = () => {
    this.setState({ toolTipInfGender: false });
  };

  handleTooltipGenderOpen = () => {
    this.setState({ toolTipInfGender: true });
  };

  handleTooltipLocationClose = () => {
    this.setState({ toolTipInfLocation: false });
  };

  handleTooltipLocationOpen = () => {
    this.setState({ toolTipInfLocation: true });
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
    const {
      classes,
      onBack
    } = this.props;
    const intl = this.props.intl;
    const {
      platform,
      toolTipAgeRange,
      toolTipInfGender,
      toolTipInfLocation,
      openPopup
    } = this.state;

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
             {intl.formatMessage({ defaultMessage: "You want to back to condition filter."})} 
              <br />
              {intl.formatMessage({ defaultMessage: "All selected options in this page will be removed."})} 
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
          <p className={classes.titleText}>{intl.formatMessage({ defaultMessage: "Audience Demographic"})}</p>
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
           {intl.formatMessage({ defaultMessage: "Select Age Range"})} 
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Select Age Range"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipAgeRangeClose}
              open={toolTipAgeRange}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipAgeRangeOpen}
                onMouseLeave={this.handleTooltipAgeRangeClose}
                className={classes.toolTipIconAgeRange}
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
            {this.state.audAge.map((item, idx) => (
              <div key={idx} className={classes.oneLineItem}>
                <Icon
                  className={classes.cancelIcon}
                  onClick={() => this.deleteList("audAge", idx)}
                >
                  {intl.formatMessage({ defaultMessage: "cancel"})}
                </Icon>
                <TypingSelect
                  classes={{
                    container: classes.selectionSimple
                  }}
                  options={AgeRanges.filter(
                    ar =>
                      !this.state.audAge
                        .map(i => i.val && i.val.value)
                        .includes(ar.value)
                  )}
                  value={item.val}
                  onChange={newVal =>
                    this.changeList("audAge", idx, { ...item, val: newVal })
                  }
                  placeholder="- ANY -"
                  isSearchable={false}
                />
              </div>
            ))}
            <div className={classes.oneLineItem}>
              <Button
                variant="outlined"
                disabled={this.state.audAge.length >= 4}
                className={classes.addMoreBtn}
                onClick={() =>
                  this.addList("audAge", { val: null, percent: 0 })
                }
                fullWidth
              >
                <span style={{ fontSize: 18 }}>+&nbsp;</span>{intl.formatMessage({ defaultMessage: "ADD MORE"})}
              </Button>
            </div>
          </Grid>
          <div className={classes.horizontalLine} />
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
            {intl.formatMessage({ defaultMessage: "Select Gender"})}
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Select Gender"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipGenderOpen}
              open={toolTipInfGender}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipGenderOpen}
                onMouseLeave={this.handleTooltipGenderClose}
                className={classes.toolTipIconGender}
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
            {this.state.audGender.map((item, idx) => (
              <div key={idx} className={classes.oneLineItem}>
                <TypingSelect
                  options={Genders.filter(
                    ar =>
                      !this.state.audGender
                        .map(i => i.val && i.val.value)
                        .includes(ar.value)
                  )}
                  classes={{
                    container: classes.selectionSimpleGender
                  }}
                  value={item.val}
                  onChange={newVal =>
                    this.changeList("audGender", idx, { ...item, val: newVal })
                  }
                  onDelete={() => this.deleteList("audGender", idx)}
                  placeholder="- ANY -"
                  isSearchable={false}
                />
              </div>
            ))}
          </Grid>
          <div className={classes.horizontalLine} />
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
           {intl.formatMessage({ defaultMessage: "Select Location"})} 
            <Tooltip
              title={intl.formatMessage({ defaultMessage: "Select Location"})}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipLocationClose}
              open={toolTipInfLocation}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipLocationOpen}
                onMouseLeave={this.handleTooltipLocationClose}
                className={classes.toolTipIconLocation}
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
            {this.state.audLoc.map((item, idx) => (
              <div key={idx} className={classes.oneLineItem}>
                <Icon
                  className={classes.cancelIcon}
                  onClick={() => this.deleteList("audLoc", idx)}
                >
                  {intl.formatMessage({ defaultMessage: "cancel"})}
                </Icon>
                <TypingSelect
                  classes={{
                    container: classes.selectionSimple
                  }}
                  options={provinces.filter(
                    ar =>
                      !this.state.audLoc
                        .map(i => i.val && i.val.value)
                        .includes(ar.value)
                  )}
                  value={item.val}
                  onChange={newVal =>
                    this.changeList("audLoc", idx, { ...item, val: newVal })
                  }
                  onDelete={() => this.deleteList("audLoc", idx)}
                  placeholder="- ANY -"
                  isSearchable
                />
              </div>
            ))}
            <div className={classes.oneLineItem}>
              <Button
                variant="outlined"
                disabled={this.state.audLoc.length >= 4}
                className={classes.addMoreBtn}
                onClick={() =>
                  this.addList("audLoc", { val: null, percent: 0 })
                }
                fullWidth
              >
                <span style={{ fontSize: 18 }}>+&nbsp;</span>{intl.formatMessage({ defaultMessage: "ADD MORE"})}
              </Button>
            </div>
          </Grid>
          <div className={classes.horizontalLine} />
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
                  const {
                    platform,
                    audLoc,
                    audAge,
                    audGender,
                    audAgeSimple,
                    audGenderSimple,
                    audLocSimple
                  } = this.state;
                  this.props.onApply({
                    platform,
                    audLoc,
                    audAge,
                    audGender,
                    audAgeSimple,
                    audGenderSimple,
                    audLocSimple
                  });
                }}
              >
               {intl.formatMessage({ defaultMessage: " Apply Filter"})}
              </ButtonInf>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AudienceDemographic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(audienceDemographic)(AudienceDemographic)) ;
