import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

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

export const AboutDetail = ({ contents }) => (
  <div>
    <h6>{contents}</h6>
  </div>
);

export default withStyles(styles)(AboutDetail);
