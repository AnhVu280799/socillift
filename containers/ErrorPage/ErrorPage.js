import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { dispatchFetchResult } from "reducers/FetchResultReducer";
import { injectIntl } from 'react-intl';
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import Button from "components/CustomButtons/Button.jsx";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

export class ErrorPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    pageTitle: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    buttonLocation: PropTypes.string,
    toSignin: PropTypes.func
  };

  static defaultProps = {
    buttonLocation: "/sign-in"
  };

  get userId() {
    return window.localStorage ? window.localStorage.getItem("user_id") : null;
  }

  handleButtonClick = () => {
    const { history, toSignin, buttonLocation } = this.props;

    if (!toSignin) {
      history.replace(buttonLocation);
    } else {
      toSignin();
    }
  };

  componentDidMount() {
    this.props.dispatchFetchResult(200);
  }

  render() {
    const {
      classes,
      number,
      pageTitle,
      pageDescription,
      buttonName
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={12} sm={6} md={6}>
              <h1>{intl.formatMessage({ defaultMessage: "number"})}</h1>
              <h4>{intl.formatMessage({ defaultMessage: "pageTitle"})}</h4>
              <p>{intl.formatMessage({ defaultMessage: "pageDescription"})}</p>
              <Button
                name="goto"
                onClick={this.handleButtonClick}
                color="facebook"
              >
                {buttonName}
              </Button>
            </ItemGrid>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export const mapDispatchToProps = {
  dispatchFetchResult
};

export default injectIntl (
  compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, { name: "ErrorPage" })
  )(ErrorPage)
) ;
