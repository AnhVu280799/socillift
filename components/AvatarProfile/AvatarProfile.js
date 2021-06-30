import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";

// constants
import errorImages from "constants/errorImages";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 15
  },
  bigAvatar: {
    width: 210,
    height: 210
  }
};

export class AvatarProfile extends Component {
  onError = (event) => {
    event.target.src = 'https://storage.googleapis.com/yn-influencer/Avatar%20Default.png';
  }

  render() {
    const { classes, photoUrl } = this.props;
    return (
      <Avatar
        src={photoUrl}
        className={classNames(classes.avatar, classes.bigAvatar)}
        onError={this.onError}
      />
    )
  }
}

AvatarProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  photoUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(AvatarProfile);
