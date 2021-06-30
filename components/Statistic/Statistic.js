import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

export const stylesBasic = () => ({
  numberStyle: {
    marginTop: '0px',
    marginBottom: '0px'
  }
});

export const Statistic = ({ classes: { numberStyle }, number, name }) => (
  <div>
    <h3 className={numberStyle}>{number}</h3>
    <h5 className={numberStyle}>{name}</h5>
  </div>
);

export default withStyles(stylesBasic)(Statistic);
