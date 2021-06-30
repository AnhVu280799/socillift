import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles, Collapse, Icon } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from './styles';

class ExpansionPanel extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    display: PropTypes.bool,
    collapseProps: PropTypes.object
  };

  static defaultProps = {
    display: true,
    collapseProps: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.open !== state.isEntered) {
      return {
        isEntered: props.open
      };
    }

    return null;
  }

  state = {
    isEntered: false
  };

  handleEntered = () => {
    this.setState({ isEntered: true });
  };

  handleExited = () => {
    this.setState({ isEntered: false });
  };

  handleClickHeader = () => {
    if (this.props.onClickHeader) this.props.onClickHeader();
  };

  render() {
    const {
      classes,
      className,
      title,
      open,
      children,
      display,
      collapseProps
    } = this.props;
    const intl= this.props.intl;
    const { isEntered } = this.state;

    if (!display) return null;

    return (
      <div className={clsx(classes.root, classes.lineAfter, className)}>
        <div
          className={clsx({
            [classes.titleWrapper]: true,
            [classes.lineAfter]: true,
            [classes.titleWrapperClose]: !open
          })}
          onClick={this.handleClickHeader}
        >
          <span className={classes.title}>{intl.formatMessage({ defaultMessage: "title"})}</span>
          <Icon
            className={clsx({
              [classes.caret]: true,
              [classes.caretActive]: open
            })}
          >
             {intl.formatMessage({ defaultMessage: "keyboard_arrow_up"})}

          </Icon>
        </div>
        <Collapse
          in={open}
          onEntered={this.handleEntered}
          onExiting={this.handleExited}
          classes={{
            container: clsx({ [classes.container]: isEntered })
          }}
          {...collapseProps}
        >
          <div className={classes.childContainer}>{children}</div>
        </Collapse>
      </div>
    );
  }
}

export default injectIntl(withStyles(styles, { name: 'ExpansionPanel' })(ExpansionPanel));
