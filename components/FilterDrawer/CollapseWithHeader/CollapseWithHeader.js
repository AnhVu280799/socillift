import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import { withStyles, Collapse, Icon } from '@material-ui/core';

import styles from './styles';

class CollapseWithHeader extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
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
    const { classes, title, child, open, onClickHeader, ...rest } = this.props;
    const intl = this.props.intl;
    const { isEntered } = this.state;

    return (
      <div className={classes.lineAfter}>
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
          {...rest}
        >
          <div className={classes.childContainer}>{intl.formatMessage({ defaultMessage: "child"})}</div>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'CollapseWithHeader' })(
  CollapseWithHeader
);
