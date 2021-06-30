import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import routeConstants from "constants/routeConstants";
import styles from "assets/jss/material-dashboard-pro-react/components/breadcrumbsStyle.jsx";

export const Breadcrumbs = ({
  classes,
  name,
  influencerName,
  routeCollectionName,
  bcRoutes,
  isFromDiscoverPage
}) => {
  const currentRoute = routeConstants(isFromDiscoverPage)[name];

  const returnRoutes = currentRoute.map((routeName, idx) => {
    const { name, pathname, search, path, views } = bcRoutes[routeName];

    const linkClassName = classNames({
      [classes.link]: true,
      [classes.activeLink]: idx + 1 === currentRoute.length
    });

    const slashClassName = classNames({
      [classes.slash]: true,
      [classes.lastSlash]: idx + 1 === currentRoute.length
    });

    if (views && Array.isArray(views)) {
      return (
        <span key={name}>
          <span style={{ display: "inline-block", verticalAlign: "middle" }}>
            {name}
          </span>
          <span className={slashClassName}>/</span>
        </span>
      );
    }

    return (
      <span key={name}>
        <Link
          key={idx}
          to={pathname && search ? `${pathname}${search}` : path}
          className={linkClassName}
          title={
            name === "Collection Detail" && routeCollectionName
              ? routeCollectionName
              : name
          }
        >
          {name === "Collection Detail" && routeCollectionName
            ? routeCollectionName
            : name === "Influencer Detail" && influencerName
            ? influencerName
            : name}
        </Link>
        <span className={slashClassName}>/</span>
      </span>
    );
  });

  return <p className={classes.parent}>{returnRoutes}</p>;
};

Breadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Breadcrumbs);
