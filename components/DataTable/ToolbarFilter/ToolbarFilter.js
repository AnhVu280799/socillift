import * as React from "react";
import PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector
} from "@devexpress/dx-react-core";

import { withStyles, IconButton, Drawer, Typography } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";

import FilterForm from "./FilterForm";

import styles from "./styles";

const pluginDependencies = [{ name: "Toolbar" }];

class ToolbarFilter extends React.PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired
  };

  state = {
    visible: false
  };

  handleToggle = () => {
    const { visible } = this.state;

    this.setState({ visible: !visible });
  };

  handleHide = () => {
    this.setState({ visible: false });
  };

  handleApplyButtonClick = filters => {
    this.props.onFiltersChange(filters);
  };

  handleResetButtonClick = () => {
    this.props.onReset();
  };

  render() {
    const { classes, options, filters } = this.props;
    const intl = this.props.intl;
    const { visible } = this.state;

    return (
      <Plugin name="ToolbarFilter" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ columns }) => (
              <>
                <IconButton onClick={this.handleToggle}>
                  <FilterListIcon />
                </IconButton>
                <Drawer
                  PaperProps={{
                    classes: {
                      root: classes.root
                    }
                  }}
                  anchor="right"
                  open={visible}
                  onClose={this.handleHide}
                >
                  <div className={classes.header}>
                    <Typography
                      variant="title"
                      align="center"
                      className={classes.title}
                    >
                      {intl.formatMessage({ defaultMessage: "Filters:"})}
                    </Typography>
                    <IconButton
                      className={classes.buttonClose}
                      onClick={this.handleHide}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <FilterForm
                    columns={columns}
                    filterOptions={options}
                    filters={filters}
                    onApply={this.handleApplyButtonClick}
                    onReset={this.handleResetButtonClick}
                  />
                </Drawer>
              </>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "ToolbarFilter" })(ToolbarFilter));
