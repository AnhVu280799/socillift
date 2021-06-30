import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { injectIntl } from 'react-intl';
import iconCardStyle from 'assets/jss/material-dashboard-pro-react/components/iconCardStyle.jsx';

function IconCard({ ...props }) {
  const {
    classes,
    title,
    content,
    iconColor,
    category,
    footer,
    plain,
    customCardClass,
    customCardContentClass,
    customCardTitleClass
  } = props;  
  const intl=props.intl;
  const cardClasses =
    classes.card +
    ' ' +
    cx({
      [classes.cardPlain]: plain
    }) +
    ' ' +
    cx({
      [customCardClass]: customCardClass !== undefined
    })
  const cardContentClasses = classes.cardContent +
    ' ' +
    cx({
      [customCardContentClass]: customCardContentClass !== undefined
    });

  const cardTitleClasses = classes.cardTitle +
    ' ' +
    cx({
      [customCardTitleClass]: customCardTitleClass !== undefined
    });

  return (
    <Card className={cardClasses} classes={{ root: classes.cardRoot }}>
      {props.icon && (
        <CardHeader
          classes={{
            root: classes.cardHeader + ' ' + classes[iconColor + 'CardHeader'],
            avatar: classes.cardAvatar
          }}
          avatar={<props.icon className={classes.cardIcon} />}
        />
      )}
      <CardContent className={cardContentClasses}>
        <h4 className={cardTitleClasses}>
          {intl.formatMessage({ defaultMessage: "title"})}
          {category !== undefined ? (
            <small className={classes.cardCategory}>{intl.formatMessage({ defaultMessage: "category"})}</small>
          ) : null}
        </h4>
        {intl.formatMessage({ defaultMessage: "content"})}
      </CardContent>
      {footer !== undefined ? (
        <div className={classes.cardFooter}>{intl.formatMessage({ defaultMessage: "footer"})}</div>
      ) : null}
    </Card>
  );
}

IconCard.defaultProps = {
  iconColor: 'purple'
};

IconCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func,
  iconColor: PropTypes.oneOf([
    'orange',
    'green',
    'red',
    'blue',
    'purple',
    'rose'
  ]),
  title: PropTypes.node,
  category: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  plain: PropTypes.bool,
  customCardContentClass: PropTypes.string
};

export default injectIntl(withStyles(iconCardStyle)(IconCard));
