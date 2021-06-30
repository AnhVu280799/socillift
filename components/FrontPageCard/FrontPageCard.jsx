import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DotDotDot from 'react-dotdotdot';
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { injectIntl } from 'react-intl';
// styles
import frontPageCardStyle from "assets/jss/material-dashboard-pro-react/components/frontPageCardStyle.jsx";

// constants
import errorImages from "constants/errorImages";

function FrontPageCard({ ...props }) {
  const {
    classes,
    imageUrl,
    onClickUrl,
    cardTitle,
    numberRecords,
    displayRecords
  } = props;
  const intl = props.intl;

  const cardTitleClasses = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleNoDisplayRecords]: !displayRecords
  });
  return (
    <Card className={classes.card}>
      <div className={classes.divImg}>
        <Link to={onClickUrl}>
          <img
            className={classes.cardImgTop}
            src={imageUrl ? imageUrl : errorImages.frontPageDefault}
            data-holder-rendered="true"
            onError={(error) => {
              error.target.src = errorImages.frontPageDefault;
            }}
          />
        </Link>
      </div>
      <CardBody className={classes.cardBody}>
        <Tooltip title={cardTitle} classes={{ tooltip: classes.tooltipTitle}}>
          <Link to={onClickUrl} className={classes.linkNoDecorate}>
            <DotDotDot clamp={2} className={cardTitleClasses}>{intl.formatMessage({ defaultMessage: "cardTitle"})}</DotDotDot>
          </Link>
        </Tooltip>
        {displayRecords && <p className={classes.cardNumberRecords}>{intl.formatMessage({ defaultMessage: "numberRecords"})} {intl.formatMessage({ defaultMessage: "records"})}</p>}
      </CardBody>
    </Card>
  );
}

FrontPageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(frontPageCardStyle)(FrontPageCard)) ;
