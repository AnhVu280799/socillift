import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Fade from "@material-ui/core/Fade";
import { injectIntl } from 'react-intl';
// custom components

// styles
import overallCampaignCardStyle from "./OverallCampaignCardStyle";

// constants
import reactionIcon from "assets/img/Reactions.svg";
import commentIcon from "assets/img/Comments.svg";
import shareIcon from "assets/img/Shares.svg";

class OverallCampaignCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTooltip: false
    };
  }

  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  };

  render() {
    const {
      classes,
      className,
      title,
      value,
      description,
      photo,
      reactions,
      comments,
      shares,
      photoList,
      tooltip,
      imageDefault
    } = this.props;
    const intl = this.props.intl;
    const { openTooltip } = this.state;
    return (
      <Paper className={classes.container}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.titleStyle}
        >
          {intl.formatMessage({ defaultMessage: "title"})}
          <Tooltip
            title={intl.formatMessage({ defaultMessage: "tooltip"})}
            classes={{
              tooltip: classes.tooltipTitle,
              popper: classes.lastTooltip
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            PopperProps={{
              disablePortal: true
            }}
            onClose={this.handleTooltipClose}
            open={openTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <ErrorOutline
              onClick={this.handleTooltipOpen}
              onMouseLeave={this.handleTooltipClose}
              className={classes.toolTipIcon}
            />
          </Tooltip>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.contentContainer}
        >
          {photo && photoList.length > 0 ? (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <div className={classes.valueStyle}>
                {typeof value === "number" ? value.toLocaleString("en") : value}
              </div>
              <div className={classes.descriptionStyle}>{intl.formatMessage({ defaultMessage: "description"})}</div>
            </Grid>
          ) : (
            <Grid
              item
              container
              direction="column"
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={photo ? classes.fullContainerWithoutBorder : classes.fullContainer}
            >
              <div className={classes.valueStyle}>
                {typeof value === "number" ? value.toLocaleString("en") : value}
              </div>
              <div className={classes.descriptionStyle}>{intl.formatMessage({ defaultMessage: "description"})}</div>
            </Grid>
          )}
          {photo && photoList.length > 0 && (
            <Grid
              item
              container
              direction="column"
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <Grid item container direction="row">
                {photoList[0] && (
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    alignItems="flex-end"
                    justify="flex-end"
                    className={classes.imageOneContainer}
                  >
                    <img
                      src={photoList[0] ? photoList[0] : imageDefault}
                      className={classes.imageOne}
                      alt="Can not load resource"
                      onError={event => (event.target.src = imageDefault)}
                    />
                  </Grid>
                )}
                {photoList[1] && (
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
                    className={classes.imageTwoContainer}
                  >
                    <img
                      src={photoList[1] ? photoList[1] : imageDefault}
                      className={classes.imageTwo}
                      alt="Can not load resource"
                      onError={event => (event.target.src = imageDefault)}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item container direction="row">
                {photoList[2] && (
                  <Grid
                    item
                    container
                    direction="column"
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    alignItems="flex-end"
                    justify="flex-end"
                    className={classes.imageThreeContainer}
                  >
                    <img
                      src={photoList[2] ? photoList[2] : imageDefault}
                      className={classes.imageThree}
                      alt="Can not load resource"
                      onError={event => (event.target.src = imageDefault)}
                    />
                  </Grid>
                )}
                {photoList[3] && (
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
                    className={classes.imageFourContainer}
                  >
                    <img
                      src={photoList[3] ? photoList[3] : imageDefault}
                      className={classes.imageFour}
                      alt="Can not load resource"
                      onError={event => (event.target.src = imageDefault)}
                    />
                    {photoList.length > 4 && (
                      <Grid
                        container
                        alignItems="center"
                        alignContent="center"
                        justify="center"
                        className={classes.overlayExtImage}
                      >
                        <div className={classes.extNumberStyle}>
                          {"+" + (photoList.length - 4).toString()}
                        </div>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
        {typeof reactions !== "undefined" &&
          typeof comments !== "undefined" &&
          typeof shares !== "undefined" && (
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              className={classes.engagementDetailContainer}
            >
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className={classes.engagementContainer}
              >
                <Grid
                  container
                  direction="row"
                  className={classes.nameEngagementContainer}
                >
                  <img
                    src={reactionIcon}
                    alt="resource"
                    className={classes.imageStyle}
                  />
                  <div className={classes.nameEngagement}>{intl.formatMessage({ defaultMessage: "Reactions"})}</div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.engagementStyle}
                >
                  {typeof reactions === "number"
                    ? reactions.toLocaleString("en")
                    : reactions}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className={classes.engagementContainer}
              >
                <Grid
                  container
                  direction="row"
                  className={classes.nameEngagementContainer}
                >
                  <img
                    src={commentIcon}
                    alt="resource"
                    className={classes.imageStyle}
                  />
                  <div className={classes.nameEngagement}>{intl.formatMessage({ defaultMessage: "Comments"})}</div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.engagementStyle}
                >
                  {typeof comments === "number"
                    ? comments.toLocaleString("en")
                    : comments}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                className={classes.engagementContainer}
              >
                <Grid
                  container
                  direction="row"
                  className={classes.nameEngagementContainer}
                >
                  <img
                    src={shareIcon}
                    alt="resource"
                    className={classes.imageStyle}
                  />
                  <div className={classes.nameEngagement}>{intl.formatMessage({ defaultMessage: "Shares"})}</div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.engagementStyle}
                >
                  {typeof shares === "number"
                    ? shares.toLocaleString("en")
                    : shares}
                </Grid>
              </Grid>
            </Grid>
          )}
      </Paper>
    );
  }
}

OverallCampaignCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl ( withStyles(overallCampaignCardStyle)(OverallCampaignCard));
