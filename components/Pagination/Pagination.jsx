import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { injectIntl } from 'react-intl';
import paginationStyle from "assets/jss/material-dashboard-pro-react/components/paginationStyle.jsx";

function Pagination({ ...props }) {
  const { classes, pages, color } = props;
  const intl = props.intl;

  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = cx({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.onClick !== undefined ? (
              <Button
                onClick={prop.onClick}
                className={paginationLink}
                disabled={prop.disabled}
              >
                {prop.text}
              </Button>
            ) : (
              <Button
                onClick={() => console.log(intl.formatMessage({ defaultMessage: "you've clicked "}) + prop.text)}
                className={paginationLink}
              >
                {prop.text}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "influencer"
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["PREV", "NEXT", "..."])
      ]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "influencer"
  ])
};

export default injectIntl(withStyles(paginationStyle)(Pagination)) ;
