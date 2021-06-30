import * as React from "react";
import clsx from "clsx";
import { injectIntl } from 'react-intl';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector
} from "@devexpress/dx-react-core";
import { columnChooserItems } from "@devexpress/dx-grid-core";

import {
  withStyles,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography
} from "@material-ui/core";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./styles";

class ToolbarColumnChooser extends React.PureComponent {
  state = {
    visible: false
  };

  pluginDependencies = [{ name: "TableColumnVisibility" }, { name: "Toolbar" }];

  handleOpenDrawer = () => {
    this.setState({ visible: true });
  };

  handleCloseDrawer = () => {
    this.setState({ visible: false });
  };

  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    const { visible } = this.state;

    return (
      <Plugin
        name="ToolbarColumnChooser"
        dependencies={this.pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {(
              { columns, hiddenColumnNames, isColumnTogglingEnabled },
              { toggleColumnVisibility }
            ) => (
              <React.Fragment>
                <IconButton onClick={this.handleOpenDrawer}>
                  <ViewColumnIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={visible}
                  onClose={this.handleCloseDrawer}
                  PaperProps={{
                    classes: {
                      root: classes.root
                    }
                  }}
                >
                  <div className={classes.header}>
                    <Typography
                      variant="title"
                      align="center"
                      className={classes.title}
                    >
                     {intl.formatMessage({ defaultMessage: "Toogle Columns:"})}
                    </Typography>
                    <IconButton
                      className={classes.buttonClose}
                      onClick={this.handleCloseDrawer}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <List dense className={classes.list}>
                    {columnChooserItems(columns, hiddenColumnNames).map(
                      item => {
                        const { name: columnName } = item.column;
                        const togglingEnabled = isColumnTogglingEnabled(
                          columnName
                        );

                        return (
                          <ListItem
                            dense
                            className={clsx({
                              [classes.listItem]: true,
                              [classes.hidden]: !togglingEnabled
                            })}
                            key={item.column.name}
                            button={togglingEnabled}
                            component="li"
                            disabled={!togglingEnabled}
                            onClick={
                              togglingEnabled
                                ? () => toggleColumnVisibility(columnName)
                                : null
                            }
                          >
                            <Checkbox
                              color="primary"
                              checked={!item.hidden}
                              tabIndex={-1}
                              disableRipple
                              disabled={!togglingEnabled}
                              className={classes.checkbox}
                            />
                            <ListItemText
                              className={classes.itemText}
                              primary={item.column.title || item.column.name}
                            />
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                </Drawer>
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export default injectIntl(
  withStyles(styles, { name: "ToolbarColumnChooser" })(
  ToolbarColumnChooser
));
