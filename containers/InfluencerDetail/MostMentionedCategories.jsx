import React from "react";
import style from "./MostMentionedCategoriesStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import withTheme from "@material-ui/core/styles/withTheme";
import { Grid, Paper } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { parseKMB } from "utils";
// constants
import { injectIntl } from 'react-intl';
import errorImages from "constants/errorImages";

class MostMentionedCategories extends React.Component {
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
        >
          <Grid item container direction="row" className={classes.titleStyle}>
            {title}
          </Grid>
          <Grid
            item
            container
            direction="row"
            spacing={8}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.listCatesStyle}
          >
            {data && data.length > 0 ? (
              data.map((category, index) => (
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="flex-start"
                  justify="flex-start"
                  className={classes.categoryContentWrapper}
                  key={index}
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="flex-start"
                    justify="flex-start"
                    className={classes.categoryContent}
                  >
                    <Grid
                      item
                      container
                      direction="column"
                      xs={4}
                      alignItems="flex-end"
                      justify="flex-end"
                      className={classes.imgContainer}
                    >
                      <img
                        src={
                          category.categoryUid
                            ? category.categoryUid
                            : errorImages.frontPageDefault
                        }
                        className={classes.categoryImage}
                        alt={intl.formatMessage({ defaultMessage: "category"})}
                        onError={event =>
                          (event.target.src = errorImages.frontPageDefault)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={8}
                      alignItems="flex-start"
                      justify="flex-start"
                      className={classes.textContainer}
                    >
                      <Grid
                        item
                        container
                        direction="row"
                        className={classes.categoryName}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        {category.categoryName ? category.categoryName : intl.formatMessage({ defaultMessage: "N/A"})}
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        className={classes.figuresStyle}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        {category.categoryCount.toLocaleString("en")}
                        <div className={classes.unitStyle}>{intl.formatMessage({ defaultMessage: " posts"})}</div>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        className={classes.figuresStyle}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        {typeof category.totalEngagement === "number" ? (
                          category.totalEngagement > 1000000 ? (
                            <Tooltip
                              title={category.totalEngagement.toLocaleString(
                                "en"
                              )}
                              classes={{ tooltip: classes.tooltipTitle }}
                            >
                              <div>{parseKMB(category.totalEngagement)}</div>
                            </Tooltip>
                          ) : (
                            category.totalEngagement.toLocaleString("en")
                          )
                        ) : (
                          intl.formatMessage({ defaultMessage: "N/A"})
                        )}
                        <div className={classes.unitStyle}>
                          {intl.formatMessage({ defaultMessage: " engagement"})}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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

export default injectIntl (withTheme()(withStyles(style)(MostMentionedCategories))) ;
