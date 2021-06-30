import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

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

export const PostsTable = ({ classes, ...rest }) => (
  <Table
    {...rest}
    headComponent={props => (
      <Table.TableHead {...props} className={classes.tableColumn} />
    )}
    rowComponent={props => (
      <Table.Row {...props} className={classes.tableRow} />
    )}
  />
);

export default withStyles(styles)(PostsTable);
