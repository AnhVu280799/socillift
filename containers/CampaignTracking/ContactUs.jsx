import React from "react";
import PropTypes from "prop-types";

// className
import classNames from "classnames";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { injectIntl } from 'react-intl';
// custom components
import ButtonInf from "components/CustomButtons/ButtonInf";

// styles
import contactUsStyle from "./ContactUsStyle";

class ContactUs extends React.Component {
  render() {
    const {
      classes,
      color,
      name,
      className,
      content,
      showButton,
      containerClassName /* , ...props */
    } = this.props;
    const intl = this.props.intl;
    return (
      <Grid
        item
        container
        direction="row"
        className={classNames(classes.contactContainer, containerClassName)}
      >
        <Grid
          item
          container
          direction="column"
          xl={showButton ? 10 : 12}
          lg={showButton ? 10 : 12}
          md={showButton ? 10 : 12}
          sm={12}
          xs={12}
          alignContent="flex-start"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.contactText}
        >
          {content}
        </Grid>
        {showButton && (
          <Grid
            item
            container
            direction="column"
            xl={2}
            lg={2}
            md={2}
            sm={12}
            xs={12}
            alignContent="center"
            alignItems="center"
            justify="center"
            className={classes.contactBtnContainer}
          >
            <ButtonInf
              color="success"
              href={"https://socialift.asia/#block-request"}
              target="_blank"
              className={classes.contactButton}
            >
              {intl.formatMessage({ defaultMessage: "Contact Us"})}
            </ButtonInf>
          </Grid>
        )}
        {!showButton && <div className={classes.topCircle} />}
        {!showButton && <div className={classes.rightCircle} />}
      </Grid>
    );
  }
}

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(contactUsStyle)(ContactUs)) ;
