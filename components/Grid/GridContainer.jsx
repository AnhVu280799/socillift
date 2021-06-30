import React from "react";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { injectIntl } from 'react-intl';
const style = {
  grid: {
    margin: "0 -15px",
    width: "calc(100% + 30px)"
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both', 
    // }
  }
};

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props; const intl = props.intl;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {intl.formatMessage({ defaultMessage: "children"})}
    </Grid>
  );
}

export default injectIntl (withStyles(style)(GridContainer)) ;
