import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

// custom components

// styles
import uniqueAudienceCardStyle from "./UniqueAudienceCardStyle";

// constants

// utils
import { parseKMB } from "utils";

class UniqueAudienceCard extends React.Component {
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
      percent,
      color,
      background,
      srcImage,
      ...props
    } = this.props;
    const { openTooltip } = this.state;
    return (
      <Paper className={classes.container}>
        <Grid container direction="row">
          <Grid
            item
            container
            direction="column"
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={8}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.titleStyle}
          >
            {title}
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={4}
            alignItems="center"
            justify="center"
            className={classes.imageContainer}
          >
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              direction="row"
              style={{
                background: `${background}`,
                borderRadius: '50%',
                width: '72px',
                height: '72px',
                position: 'relative',
              }}
            >
              <img
                src={srcImage}
                alt="image"
                className={classes.imageStyle}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.valueStyle}
        >
          {!percent ? (
            typeof value === "number" ? (
              value > 1000000 ? (
                <Tooltip
                  title={value.toLocaleString("en")}
                  classes={{ tooltip: classes.tooltipTitle }}
                  onClose={this.handleTooltipClose}
                  open={openTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <div
                    onClick={this.handleTooltipOpen}
                    onMouseOver={this.handleTooltipOpen}
                    onMouseLeave={this.handleTooltipClose}
                  >{parseKMB(value)}</div>
                </Tooltip>
              ) : (
                value.toLocaleString("en")
              )
            ) : (
              value
            )
          ) : (
            value.toString() + "%"
          )}
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.descriptionStyle}
        >
          {description}
        </Grid>
      </Paper>
    );
  }
}

UniqueAudienceCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(uniqueAudienceCardStyle)(UniqueAudienceCard);
