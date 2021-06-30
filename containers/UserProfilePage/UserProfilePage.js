import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

import { resetState, fetchUserData } from "redux/user/profile/actions";
import { openLoading, closeLoading } from "reducers/ScreenLoadingReducer";

import { withStyles, Grid } from "@material-ui/core";

import Breadcrumbs from "components/Breadcrumbs";

import PersonalInformationCard from "./PersonalInformationCard";
import ChangePasswordCard from "./ChangePasswordCard";
import LinkedOthersAccountCard from "./LinkedOthersAccountCard";

import styles from "./styles";

class UserProfilePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchUserData();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      if (this.props.isLoading) {
        this.props.openLoading();
      } else {
        this.props.closeLoading();
      }
    }
  }

  renderHeader = () => {
    const {
      pageName,
      breadcrumbs: { bcRoutes, isFromDiscoverPage }
    } = this.props;

    return this.props.drawHeader({
      name: (
        <Breadcrumbs
          name={pageName}
          bcRoutes={bcRoutes}
          isFromDiscoverPage={isFromDiscoverPage}
        />
      ),
      hide: true
    });
  };

  render() {
    const { classes, isInfluencer } = this.props;

    return (
      <div className={classes.root}>
        {this.renderHeader()}
        <Grid container className={classes.contentWrapper}>
          <Grid item md xs />
          <Grid item md={10} xs={12} container spacing={16}>
            <Grid item lg={12} md={12} xs={12}>
              <PersonalInformationCard />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <ChangePasswordCard />
            </Grid>
            {isInfluencer && (
              <Grid item lg={12} md={12} xs={12}>
                <LinkedOthersAccountCard />
              </Grid>
            )}
          </Grid>
          <Grid item md xs />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pageName: ownProps.name,
  breadcrumbs: state.breadcrumbs,
  isLoading: state.user.profile.isLoading,
  isInfluencer: (state.userInfo.globalPermissions || {}).isInfluencerAccount
});

const mapDispatchToProps = {
  resetState,
  fetchUserData,
  openLoading,
  closeLoading
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {
    name: "UserProfilePage"
  })
)(UserProfilePage);
