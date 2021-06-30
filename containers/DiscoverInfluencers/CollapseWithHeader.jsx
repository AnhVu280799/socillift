import React from "react";
import Collapse from "@material-ui/core/Collapse";
import withStyles from "@material-ui/core/styles/withStyles";
import style from "./CollapseWithHeaderStyle";
import Icon from "@material-ui/core/Icon";
import cx from "classnames";
import { injectIntl } from 'react-intl';
class CollapseWithHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEntered: props.open
    };
  }
  onEntered = () => this.setState({ isEntered: true });
  onExited = () => this.setState({ isEntered: false });
  render() {
    const {
      classes,
      title,
      onClickHeader,
      child,
      open,
      containerClassName,
      ...rest
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.lineAfter}>
        <div
          className={cx(classes.titleWrapper, classes.lineAfter, {
            [classes.titleWrapperClose]: !open
          })}
          onClick={onClickHeader}
        >
          <span className={classes.title}>{title}</span>
          <Icon
            className={cx(classes.caret, {
              [classes.caretActive]: open
            })}
          >
            {intl.formatMessage({ defaultMessage: "keyboard_arrow_up"})}
          </Icon>
        </div>
        <Collapse
          in={open}
          {...rest}
          onEntered={this.onEntered}
          onExiting={this.onExited}
          classes={{
            container: cx({ [classes.container]: this.state.isEntered })
          }}
        >
          <div className={classes.childContainer}>{intl.formatMessage({ defaultMessage: "child"})}</div>
        </Collapse>
      </div>
    );
  }
}
export default injectIntl (withStyles(style)(CollapseWithHeader)) ;
