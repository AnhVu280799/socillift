import React from "react";
import style from "./TagsCloudCardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import withTheme from "@material-ui/core/styles/withTheme";
import { Grid, Paper } from "@material-ui/core";
import cx from "classnames";
import { injectIntl } from 'react-intl';
class TagsCloudCard extends React.Component {
  render() {
    const { classes, title, data } = this.props;
    const intl = this.props.intl;
    return (
      <Paper className={classes.paperSize}>
        <Grid
          item
          container
          direction="column"
          className={classes.cardContainer}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item container direction="row" className={classes.titleStyle}>
            {intl.formatMessage({ defaultMessage: "title"})}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
            className={classes.tagsContainer}
          >
            {data && data.length > 0 ? (
              data.map((element, index) => (
                <p
                  key={index}
                  className={cx(classes.fontTags, {
                    [classes.fontTags12]: element.percent === 1,
                    [classes.fontTags14]: element.percent === 2,
                    [classes.fontTags16]: element.percent === 3,
                    [classes.fontTags18]: element.percent === 4,
                    [classes.fontTags20]: element.percent === 5,
                    [classes.fontTags22]: element.percent === 6,
                    [classes.fontTags24]: element.percent === 7,
                    [classes.fontTags26]: element.percent === 8,
                    [classes.fontTags28]: element.percent === 9,
                    [classes.fontTags30]: element.percent === 10
                  })}
                  key={index}
                >
                  {element.tag}
                </p>
              ))
            ) : (
              <div className="no-result">{intl.formatMessage({ defaultMessage: "Not enough data to analyze"})}</div>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (withTheme()(withStyles(style)(TagsCloudCard))) ;
