import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  toggleDialog,
  removeSocialAccount,
  fetchSocialAccounts
} from 'redux/social-accounts';
import { dispatchNotification } from 'reducers/NotificationReducer';

import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { FacebookIcon, FanpageIcon, YoutubeIcon, InstagramIcon } from './icons';

import styles from './styles';

class LinkedOthersAccountCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleOpenLinkAccountDialog = () => {
    this.props.toggleDialog(true);
  };

  handleRemoveLinkedAccount = platform => () => {
    this.props.removeSocialAccount(platform).then(() => {
      const { error } = this.props;
      const intl = this.props.intl;
      this.props.fetchSocialAccounts();

      let message = !error
        ? intl.formatMessage({ defaultMessage: 'Remove connection successful!'})
        : intl.formatMessage({ defaultMessage: 'Remove connection failed. Please try again.'});
      let color = !error ? intl.formatMessage({ defaultMessage: 'success'}) : intl.formatMessage({ defaultMessage: 'danger'});

      this.props.dispatchNotification(
        { open: true, icon: InfoIcon, message, color },
        2000
      );
    });
  };

  getIconByPlatform = platform => {
    switch (platform) {
      case intl.formatMessage({ defaultMessage: 'fb'}):
        return FacebookIcon;

      case intl.formatMessage({ defaultMessage: 'page'}):
        return FanpageIcon;

      case intl.formatMessage({ defaultMessage: 'youtube'}):
        return YoutubeIcon;

      case intl.formatMessage({ defaultMessage: 'insta'}):
        return InstagramIcon;

      default:
        return null;
    }
  };

  renderListItem = ({ platform, id, name, username, avatar }) => {
    const { classes } = this.props;
    const intl = this.props.intl;
    const PlatformIcon = this.getIconByPlatform(platform);

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} alt={intl.formatMessage({ defaultMessage:  `Avatar of {name}.`} ,{name : name})} />
        </ListItemAvatar>
        <ListItemIcon className={classes.platformIcon}>
          <PlatformIcon />
        </ListItemIcon>
        <ListItemText
          primary={<span className={classes.platformName}>{name}</span>}
          secondary={username}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleRemoveLinkedAccount(platform)}>
            <CloseIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  render() {
    const { classes, accounts } = this.props;
    const intl = this.props.intl;
    const items = Object.keys(accounts).map(platform => {
      return {
        platform,
        ...accounts[platform]
      };
    });

    return (
      <React.Fragment>
        <Card className={classes.root}>
          <CardHeader
            title={`${items.length} Connected Profiles`}
            action={
              <Button
                color="primary"
                onClick={this.handleOpenLinkAccountDialog}
              >
               {intl.formatMessage({ defaultMessage: " + Connect a new profile"})}
              </Button>
            }
          />
          <CardContent className={classes.cardContent}>
            <List>
              <Divider />
              {items &&
                items.map((item, index) => (
                  <React.Fragment key={index}>
                    {this.renderListItem(item)}
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ socialAccounts: { accounts, error } }) => ({
  accounts,
  error
});

const mapDispatchToProps = {
  toggleDialog,
  removeSocialAccount,
  fetchSocialAccounts,
  dispatchNotification
};

export default injectIntl (compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { name: 'LinkedOthersAccountCard' })
)(LinkedOthersAccountCard)) ;
