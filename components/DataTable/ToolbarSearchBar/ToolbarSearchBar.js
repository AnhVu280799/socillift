import * as React from "react";
import PropTypes from "prop-types";

import {
  Plugin,
  Template,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

import {
  withStyles,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./styles";

const pluginDependencies = [{ name: "Toolbar" }];

class ToolbarSearchBar extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: "",
    placeholder: "Search..."
  };

  handleInputChange = e => {
    this.props.onChange(e.target.value);
  };

  handleInputKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.handleSubmit(this.props.value);
        break;

      case 27:
        this.handleReset();
        break;

      default:
      // nothing
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.props.value);
  };

  handleReset = () => {
    this.props.onReset();
  };

  render() {
    const { classes, value, placeholder } = this.props;

    return (
      <Plugin name="ToolbarSearchBar" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <div className={classes.root}>
            <TextField
              fullWidth
              value={value}
              onChange={this.handleInputChange}
              placeholder={placeholder}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!!value && (
                      <div
                        className={classes.buttonReset}
                        onClick={this.handleReset}
                      >
                        <CloseIcon fontSize="small" />
                      </div>
                    )}
                    <IconButton
                      className={classes.buttonSearch}
                      onClick={this.handleSubmit}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onKeyDown={this.handleInputKeyDown}
            />
          </div>
        </Template>
      </Plugin>
    );
  }
}

export default withStyles(styles, { name: "ToolbarSearchBar" })(
  ToolbarSearchBar
);
