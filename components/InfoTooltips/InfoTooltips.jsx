import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import cx from "classnames";
import styles from './InfoTooltipsStyle';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { injectIntl } from 'react-intl';
class InfoTooltips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
    }
    render() {
        const { classes, onClick, children, anchorEl, placement } = this.props;
        const intl = this.props.intl;
        const iconClasses = cx(classes.infoIcon, classes.customInfoIcon)
        return (
            <React.Fragment>
                <Icon className={iconClasses} onClick={
                    (e) => {
                        this.setState({ isClicked: true })
                        if (typeof (onClick) === 'function') onClick(e);
                    }
                }
                onMouseLeave={() => this.setState({ isClicked: false })}
                >
                    {this.state.isClicked ? intl.formatMessage({ defaultMessage: 'info'}) : intl.formatMessage({ defaultMessage: 'info_outlined'})}
                </Icon>
                <Popper className={classes.popper} placement={placement} anchorEl={anchorEl} open={this.state.isClicked} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                {children}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </React.Fragment>
        )
    }
}
export default  injectIntl (withStyles(styles)(InfoTooltips));
