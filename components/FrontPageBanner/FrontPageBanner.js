import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { withStyles, Typography } from "@material-ui/core";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { injectIntl } from 'react-intl';
import { DISCOVER_BANNER_URL, NO_IMAGE_URL } from "constants/common";

import styles from "./styles";

const FrontPageBanner = ({ classes, className, onClick, intl }) => (
  <Card className={clsx(classes.root, className)}>
    <div className={classes.content}>
      <Typography variant="h3" className={classes.title} align="center">
      {intl.formatMessage({ defaultMessage: "Search influencers to find your ideal target audience"})}
      </Typography>
      <Button
        muiClasses={{
          root: classes.button
        }}
        onClick={onClick}
      >
        {intl.formatMessage({ defaultMessage: "Discover all Influencers"})}
      </Button>
    </div>
    <div className={classes.overlay}></div>
  </Card>
);

FrontPageBanner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(styles, { name: "FrontPageBanner" })(FrontPageBanner));
