import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import infoStyle from "assets/jss/material-dashboard-pro-react/components/infoStyle";

function InfoArea({ ...props }) {
  const { classes, title, description, iconColor } = props; const intl = props.intl;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + " " + classes[iconColor]}>
        <props.icon className={classes.icon} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{intl.formatMessage({ defaultMessage: "title"})}</h4>
        <p className={classes.description}>{intl.formatMessage({ defaultMessage: "description"})}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};

export default injectIntl (withStyles(infoStyle)(InfoArea)) ;
