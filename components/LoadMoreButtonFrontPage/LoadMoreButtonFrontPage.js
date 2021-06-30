import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { injectIntl } from 'react-intl';
import Button from "components/CustomButtons/Button.jsx";

import styles from "./styles";

const LoadMoreButtonFrontPage = ({ className, classes, onClick, intl }) => {
  return (
    <div className={clsx(classes.root, className)}>
      <Button
        muiClasses={{
          root: classes.button
        }}
        onClick={onClick}
      >
        {intl.formatMessage({ defaultMessage: "Load more"})}
      </Button>
    </div>
  );
};

LoadMoreButtonFrontPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles, { name: "LoadMoreButtonFrontPage" })(
  LoadMoreButtonFrontPage) 
);
