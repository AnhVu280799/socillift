import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Button from 'components/CustomButtons/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  },
  typo: {
    position: 'relative'
  },
  note: {
    fontFamily: 'Nunito',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px'
  }
});

export const InfluencingArea = ({ classes, categories, intl }) => (
  <div>
    <h5>{intl.formatMessage({ defaultMessage: "Categories"})}</h5>
    <div className={classes.root}>
      {categories ? (
        categories.map((category, idx) => (
          <Button
            key={idx}
            color="github"
            size="xs"
            style={{ pointerEvents: 'none' }}
          >
            {intl.formatMessage({ defaultMessage: "category"})}
          </Button>
        ))
      ) : (
        <div />
      )}
    </div>
  </div>
);

InfluencingArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(styles)(InfluencingArea)) ;
