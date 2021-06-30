import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import { injectIntl } from 'react-intl';
const style = {
  grid: {
    padding: '0 15px !important'
  }
};

function ItemGrid({ ...props }) {
  const { classes, children, className, ...rest } = props; const intl = props.intl;
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </Grid>
  );
}

export default injectIntl (withStyles(style)(ItemGrid)) ;
