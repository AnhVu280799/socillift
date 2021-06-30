import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu, bindPopover } from 'material-ui-popup-state'
import React from "react";
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import { injectIntl } from 'react-intl';
import customPopupStateStyle from "assets/jss/material-dashboard-pro-react/components/customPopupStateStyle.jsx";

class CustomPopupState extends React.Component {
    render() {
        const {
            classes,
            className,
            options
        } = this.props;
        const intl = this.props.intl;
        return (
            <PopupState variant="popper" popupId="popup-menu">
                {popupState => (
                    <React.Fragment>
                        <IconButton variant="contained" {...bindTrigger(popupState)}
                            classes={{
                                root: classNames(classes.buttonStyle, className)
                            }}>
                            <Icon
                                classes={{
                                    root: classes.iconButtonStyle
                                }}
                            >
                                {intl.formatMessage({ defaultMessage: "more_vert"})}
                            </Icon>
                        </IconButton>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            classes={{
                                paper: classes.menuDesign
                            }}
                        >
                            {
                                options && options.map((option, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            option.onClick()
                                            popupState.close()
                                        }}
                                        classes={{
                                            root: classes.menuItemDesign
                                        }}>
                                        <ListItemIcon classes={{ root: classes.optionIconDesign }}>
                                            <Icon>{intl.formatMessage({ defaultMessage: "option.icon"})}</Icon>
                                        </ListItemIcon>
                                        <ListItemText classes={{
                                            root: classes.optionNameRoot,
                                            primary: classes.optionNameDesign 
                                        }} primary={option.name} />
                                    </MenuItem>
                                ))
                            }
                        </Popover>
                    </React.Fragment>
                )}
            </PopupState>
        );
    }
}

export default injectIntl(withStyles(customPopupStateStyle)(CustomPopupState));
