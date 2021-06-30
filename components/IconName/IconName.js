import React from 'react';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import SOCIAL_ICONS from 'constants/socialIcons';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap'
  }
});

export const IconName = ({ platform = 'fb', classes }) => (
  <span>
    <i
      className={
        `${classes.socialButtonsIcons 
        } ${ 
          classes.marginRight 
        } ${ 
          SOCIAL_ICONS[platform]}`
      }
    />
    <span />
  </span>
);

IconName.propTypes = {
  platform: PropTypes.string.isRequired
};
export default withStyles(styles)(IconName);
