import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import {
  Plugin,
  Template,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

import { withStyles } from "@material-ui/core";
import Button from "components/CustomButtons/ButtonInf";

import styles from "./styles";

const pluginDependencies = [{ name: "Toolbar" }];

class ToolbarButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const { classes, children, ...restProps } = this.props;
    const intl= this.props.intl;

    return (
      <Plugin name="ToolbarButton" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <Button className={classes.root} {...restProps}>
            {intl.formatMessage({ defaultMessage: "children"})}
          </Button>
        </Template>
      </Plugin>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "ToolbarButton" })(ToolbarButton));
