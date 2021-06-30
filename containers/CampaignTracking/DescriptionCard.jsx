import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// custom components
import ButtonInf from "components/CustomButtons/ButtonInf";
import { injectIntl } from 'react-intl';
// styles
import descriptionCardStyle from "./DescriptionCardStyle";

// constants
import advocacyImg from "assets/img/advocacy_icon_blue.svg";

import { APP_NAME } from "constants/common";

class DescriptionCard extends React.Component {
  render() {
    const { classes, color, name, className, ...props } = this.props;
    const intl = this.props.intl;
    return (
      <Paper classes={{ root: classes.container }}>
        <div className={classes.bottomCircle} />
        <div className={classes.rightCircle} />
        <Grid item container direction="row" className={classes.titleContainer}>
          <p className={classes.titleStyle}>{intl.formatMessage({ defaultMessage: "WHAT IS ADVOCACY SCORE?"})}</p>
        </Grid>
        <Grid item container direction="row" className={classes.imageWrapper}>
          <p className={classes.imageContainer}>
            <img src={advocacyImg} alt="image" className={classes.imageStyle} />
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.descriptionContainer}
        >
          <p className={classes.descriptionStyle}>
          {intl.formatMessage({ defaultMessage: "Advocacy Score is"})} {APP_NAME}{intl.formatMessage({ defaultMessage: "'s exclusive metric that helps measure"})}
          {intl.formatMessage({ defaultMessage: "the real EFFECTIVENESS of Influencer's content."})}  <br /> <br />{" "}
          {intl.formatMessage({ defaultMessage: "Advocacy Score is a"})}  <strong>{intl.formatMessage({ defaultMessage: "combination of"})}</strong>{" "}
            <strong>{intl.formatMessage({ defaultMessage: "REAL ENGAGED AUDIENCE"})}</strong> {intl.formatMessage({ defaultMessage: "(excluding inactive users),"})}{" "}
            <strong>{intl.formatMessage({ defaultMessage: "RELEVANCE"})}</strong> {intl.formatMessage({ defaultMessage: "of comments/replies under the post and"})}{" "}
            <strong>{intl.formatMessage({ defaultMessage: "SENTIMENT"})}</strong> {intl.formatMessage({ defaultMessage: "of those."})}
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.descriptionContainer}
        >
          <p className={classes.descriptionStyle}>
          {intl.formatMessage({ defaultMessage: "For specific tracking demand and customized duration, please Contact"})}
          {intl.formatMessage({ defaultMessage: "Us"})}
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.buttonContainer}
        >
          <ButtonInf
            color="primary"
            href={"https://socialift.asia/#block-request"}
            target="_blank"
            className={classes.contactButton}
          >
           {intl.formatMessage({ defaultMessage: " Contact Us"})}
          </ButtonInf>
        </Grid>
      </Paper>
    );
  }
}

DescriptionCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(descriptionCardStyle)(DescriptionCard));
