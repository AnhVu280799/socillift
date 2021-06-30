import React from "react";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import FloatingMenuStyle from "./FloatingMenuStyle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import cx from "classnames";

class FloatingMenu extends React.Component {
  render() {
    const {
      items,
      classes: { item, itemText, itemLink, list, itemHover, itemActive, paper },
      anchorElement,
      open,
      anchorReference,
      anchorOrigin,
      transformOrigin,
      ...rest
    } = this.props;
    return (
      <Popover
        anchorEl={anchorElement}
        open={open}
        anchorReference={anchorReference}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        classes={{ paper: paper }}
        {...rest}
      >
        <List className={list}>
          {items.map(({ name, path, active }, key) => {
            return (
              <ListItem key={key} className={item}>
                <NavLink
                  to={path}
                  className={cx(itemLink, itemHover, {
                    [itemActive]: active
                  })}
                >
                  <ListItemText
                    primary={name}
                    disableTypography={true}
                    className={itemText}
                  />
                </NavLink>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    );
  }
}
FloatingMenu.defaultProps = {
  anchorReference: "anchorEl",
  items: []
};
FloatingMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorElement: PropTypes.object,
  anchorReference: PropTypes.oneOf(["anchorEl", "anchorPosition"]),
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(FloatingMenuStyle)(FloatingMenu);
