import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { injectIntl } from 'react-intl';
// core components
import Button from 'components/CustomButtons/Button.jsx';
import buttonsStyle from 'assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx';

const SocialProfile = ({ classes, name, icon, url, intl }) => (
  <Button color="facebookNoBackground" href={url} target="_blank" fullWidth>
    <i
      className={
        `${classes.socialButtonsIcons} ${classes.marginRight} ${icon}`
      }
    />
    {' '}
    {intl.formatMessage({ defaultMessage: " Go to"})}
    {' '}
    {intl.formatMessage({ defaultMessage: "name"})}
  </Button>
);

SocialProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(buttonsStyle)(SocialProfile)) ;
