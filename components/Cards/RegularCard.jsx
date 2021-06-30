import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import regularCardStyle from 'assets/jss/material-dashboard-pro-react/components/regularCardStyle';

function RegularCard({ ...props }) {
  const {
    classes,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    titleAlign,
    customCardClasses,
    contentAlign,
    subtitleAlign,
    customCardTitleClasses
  } = props;
  const intl = props.intl;
  const cardClasses =
    classes.card +
    cx({
      [' ' + classes.cardPlain]: plainCard,
      [' ' + customCardClasses]: customCardClasses !== undefined
    });
  return (
    <Card className={cardClasses}>
      {cardTitle !== undefined || cardSubtitle !== undefined ? (
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title:
              classes.cardTitle +
              ' ' +
              classes[titleAlign] +
              ' ' +
              customCardTitleClasses,
            subheader: classes.cardSubtitle + ' ' + classes[subtitleAlign]
          }}
          title={intl.formatMessage({ defaultMessage: "cardTitle"})}
          subheader={cardSubtitle}
        />
      ) : null}
      <CardContent
        className={classes.cardContent + ' ' + classes[contentAlign]}
      >
        {intl.formatMessage({ defaultMessage: "content"})}
      </CardContent>
    </Card>
  );
}

RegularCard.propTypes = {
  classes: PropTypes.object.isRequired,
  customCardClasses: PropTypes.string,
  customCardTitleClasses: PropTypes.string,
  plainCard: PropTypes.bool,
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  titleAlign: PropTypes.oneOf(['right', 'left', 'center']),
  contentAlign: PropTypes.oneOf(['right', 'left', 'center']),
  subtitleAlign: PropTypes.oneOf(['right', 'left', 'center'])
};

export default injectIntl (withStyles(regularCardStyle)(RegularCard)) ;
