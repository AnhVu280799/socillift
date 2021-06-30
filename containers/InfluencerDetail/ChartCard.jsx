import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import styles from './ChartCardStyle';

const ChartCard = ({ classes, Title, Chart, ...props }) => {
    return (
        <Paper classes={{ root: classes.paperRoot }}>
            <div className={classes.title}>{Title}</div>
            <div className={classes.chart}>{Chart}</div>
        </Paper>
    )
}

export default withStyles(styles)(ChartCard);