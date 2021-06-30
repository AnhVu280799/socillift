import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import {
  Plugin,
  Template,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

import { withStyles, Typography } from "@material-ui/core";

import styles from "./styles";

const pluginDependencies = [{ name: "Toolbar" }];

class ToolbarTitle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { classes, title } = this.props;
    const intl = this.props.intl;
    return (
      <Plugin name="ToolbarTitle" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <Typography variant="title" className={classes.root}>
            {intl.formatMessage({ defaultMessage: "title"})}
          </Typography>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}

export default withStyles(styles, { name: "ToolbarTitle" })(ToolbarTitle);
