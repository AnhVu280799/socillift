import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import profileCardStyle from 'assets/jss/material-dashboard-pro-react/components/profileCardStyle';
const style = {
  ...profileCardStyle,
  overlayProfile: {
    position: 'relative',
    marginTop: '-130px',
    height: '130px',
    background: 'rgb(0,0,0,0.5)'
  },
  show: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hidden: {
    display: 'none'
  }
};
class Image extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      if (this.props.fallbackSrc) {
        this.setState({ failed: true });
      }
    };
  }

  render() {
    const { fallbackSrc, src, ...rest } = this.props; const intl = this.props.intl;
    if (this.state.failed) {
      return <img src={intl.formatMessage({ defaultMessage: "fallbackSrc"})} alt={intl.formatMessage({ defaultMessage: "profile"})} {...rest} />;
    } else {
      return <img src={intl.formatMessage({ defaultMessage: "src"})} alt={intl.formatMessage({ defaultMessage: "profile"})} onError={this.fallback} {...rest} />;
    }
  }
}
function ProfileCard({
  classes,
  subtitle,
  title,
  description,
  avatar,
  content,
  footer,
  customCardClass,
  customCardAvatarClass,
  customCardFooterClass,
  showOverlay,
  goToUrl,
  onSelect,
  checked
}) {
  const cardClasses =
    classes.card +
    ' ' +
    cx({
      [customCardClass]: customCardClass !== undefined
    });
  const cardAvatarClass =
    classes.cardAvatar +
    ' ' +
    cx({
      [customCardAvatarClass]: customCardAvatarClass !== undefined
    });
  const cardFooterClass =
    classes.cardFooter +
    ' ' +
    cx({
      [customCardFooterClass]: customCardFooterClass !== undefined
    });
  return (
    <Card className={cardClasses} classes={{ root: classes.cardRoot }}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          avatar: cardAvatarClass
        }}
        avatar={[
          <Link to={goToUrl}>
            <Image
              key={`Img-${goToUrl}`}
              src={avatar}
              alt="..."
              className={classes.img}
              style={{ cursor: 'pointer' }}
              fallbackSrc="https://storage.googleapis.com/yn-influencer/Avatar%20Default.png"
            />
          </Link>,
          <div
            key={`div-${goToUrl}`}
            className={
              classes.img +
              ' ' +
              classes.overlayProfile +
              ' ' +
              (showOverlay ? classes.show : classes.hidden)
            }
          >
            <Checkbox onChange={onSelect} checked={checked} />
          </div>
        ]}
      />
      <CardContent className={classes.textAlign + ' ' + classes.cardContent}>
        {subtitle !== undefined ? (
          <Typography component="h6" className={classes.cardSubtitle}>
            {subtitle}
          </Typography>
        ) : null}
        {title !== undefined ? (
          <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        ) : null}
        {description !== undefined ? (
          <Typography component="p" className={classes.cardDescription}>
            {description}
          </Typography>
        ) : null}
        {content !== undefined ? content : null}
      </CardContent>
      {footer !== undefined ? (
        <div className={cardFooterClass}>{footer}</div>
      ) : null}
    </Card>
  );
}
ProfileCard.defaultProps = {
  showOverlay: false
};
ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string,
  customCardClass: PropTypes.string,
  customCardAvatarClass: PropTypes.string
};

export default injectIntl (withStyles(style)(ProfileCard)) ;
