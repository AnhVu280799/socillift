import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import classNames from "classnames";
import { injectIntl } from 'react-intl';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import menuSelectionStyle from "assets/jss/material-dashboard-pro-react/components/menuSelectionStyle.jsx";

class MenuSelection extends React.Component {
  render() {
    const {
      menuItems,
      selectValue,
      onChange,
      iconName,
      iconText,
      className,
      classes
    } = this.props;  const intl = this.props.intl;
    const iconTextClass = cx(classes.inputAdornmentText, {
      [classes.inputAdornmentTextNoIcon]: iconName === undefined
    });
    return (
      <FormControl
        fullWidth
        className={classNames(classes.selectFormControl, className)}
      >
        <Select
          classes={{
            selectMenu: classes.selection
          }}
          value={selectValue}
          startAdornment={
            <InputAdornment position="start" className={classes.inputAdornment}>
              {iconName && (
                <Icon className={classes.inputAdornmentIcon}>{intl.formatMessage({ defaultMessage: "iconName"})}</Icon>
              )}
              <p className={iconTextClass}>{intl.formatMessage({ defaultMessage: "iconText"})}</p>
            </InputAdornment>
          }
          onChange={onChange}
        >
          {menuItems.map(({ itemValue, itemName }) => (
            <MenuItem
              key={itemName}
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={itemValue}
            >
              {intl.formatMessage({ defaultMessage: "itemName"})}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

MenuSelection.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(menuSelectionStyle)(MenuSelection);
