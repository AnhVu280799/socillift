import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import fullHeaderCardStyle from 'assets/jss/material-dashboard-pro-react/components/fullHeaderCardStyle.jsx';

function FullHeaderCard({ ...props }) {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer
  } = props; const intl = props.intl;
  const plainCardClasses = cx({
    [' ' + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cx({
    [' ' + classes.cardPlainHeader]: plainCard
  });
  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            ' ' +
            classes[headerColor + 'CardHeader'] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent className={classes.cardContent}>{intl.formatMessage({ defaultMessage: "content"})}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{intl.formatMessage({ defaultMessage: "footer"})}</CardActions>
      ) : null}
    </Card>
  );
}

FullHeaderCard.defaultProps = {
  headerColor: 'purple'
};

FullHeaderCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    'orange',
    'green',
    'red',
    'blue',
    'purple',
    'rose'
  ]),
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node
};

export default injectIntl (withStyles(fullHeaderCardStyle)(FullHeaderCard)) ;
