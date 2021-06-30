import React from "react";
import style from "./BigStatisticValueCardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import withTheme from "@material-ui/core/styles/withTheme";
import { Grid, Paper } from "@material-ui/core";
import { injectIntl } from 'react-intl';
class BigStatisticValueCard extends React.Component {
  render() {
    const {
      classes,
      title,
      value,
      image,
      content,
      percentage
    } = this.props;
    const intl = this.props.int
    return (
      <Paper className={classes.paperSize}>
        <Grid
          item
          container
          direction="column"
          xs={12}
          className={classes.cardContainer}
        >
          <Grid
            item
            container
            direction="row"
            className={classes.firstRow}
            spacing={8}
          >
            <Grid
              item
              container
              direction="column"
              className={classes.firstRow}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.titleStyle}
              >
                {title}
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.valueStyle}
              >
                {typeof value === "number" ? (
                  value.toFixed(0) + (percentage ? "%" : "")
                ) : (
                  <div className="no-result">{intl.formatMessage({ defaultMessage: "--Updating--"})}</div>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.imageContainer}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <img src={image} alt="..." className={classes.cardImage} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="center"
            className={classes.contentStyle}
          >
            {content}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (withTheme()(withStyles(style)(BigStatisticValueCard))) ;
