import React from 'react';
import styles from './AnalyticsStyle';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Hidden from '@material-ui/core/Hidden';
import SupervisedUserCircleOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import ErrorOutline from '@material-ui/icons/InfoOutlined';
import Flash from '@material-ui/icons/FlashOn';
import Heart from '@material-ui/icons/Favorite';
import Star from '@material-ui/icons/StarRate';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
const Analytics = ({
  classes,
  influenceScore,
  resonanceScore,
  categories: relevanceScore,
  engagementRate,
  reachRate,
  sentimentRate,
  theme,
  showTooltip,
  ...props
}) => {
  const avgInfScore =
    Array.isArray(influenceScore) && influenceScore.length > 0
      ? (
          influenceScore
            .map(({ score }) => score)
            .reduce((prev, curr) => prev + curr, 0) / influenceScore.length
        ).toFixed(0)
      : 'N/A';
  let categories =
    Array.isArray(relevanceScore) && relevanceScore.length > 0
      ? relevanceScore.reduce(
          (prev, { categoryName: name, id, ressonancePoint: relScore }) => {
            prev[id] = { name, relScore };
            return prev;
          },
          {}
        )
      : {};
  if (Array.isArray(influenceScore)) {
    influenceScore.forEach(({ categoryId: id, score: infScore }) => {
      if (categories[id]) {
        categories[id]['infScore'] = infScore;
      }
    });
  }
  if (Array.isArray(resonanceScore)) {
    resonanceScore.forEach(({ categoryId: id, score: resScore }) => {
      if (categories[id]) {
        categories[id]['resScore'] = resScore;
      }
    });
  }
  categories = Object.keys(categories).map(v => categories[v]);
  class BigField extends React.Component {
    state = {
      open: false
    };

    handleTooltipClose = () => {
      this.setState({ open: false });
    };

    handleTooltipOpen = () => {
      this.setState({ open: true });
    };
    render() {
      const {
        Icon,
        color,
        title,
        tooltipContent,
        showTooltip,
        score = 0,
        checkVal = () => false,
        ...props
      } = this.props;
      const intl = this.props.intl;
      return (
        <Grid
          item
          direction="row"
          container
          alignItems="center"
          className={classes.bigField}
          {...props}
        >
          <Grid item xs={3} justify="flex-start" container alignItems="center">
            <Icon
              className={classes.bigFieldIcon}
              style={{ color: `${color}` }}
            />
          </Grid>
          <Grid
            item
            direction="column"
            container
            xs={9}
            alignItems="center"
            justify="flex-start"
          >
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              justify="flex-start"
              className={classes.bigFieldTitle}
            >
              {title}
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              justify="flex-start"
              className={classes.bigFieldValue}
              style={{ color }}
            >
              {score}&nbsp;
              {[1, 2, 3, 4, 5].map(v => (
                <Star
                  key={v}
                  className={cx(classes.star, {
                    [classes.starUnchecked]: !checkVal(v)
                  })}
                />
              ))}
            </Grid>
          </Grid>
          {showTooltip && (
            <Tooltip
              title={<React.Fragment>{intl.formatMessage({ defaultMessage: "tooltipContent"})}</React.Fragment>}
              classes={{
                tooltip: classes.tooltipTitle,
                popper: classes.lastTooltip
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              PopperProps={{
                disablePortal: true
              }}
              onClose={this.handleTooltipClose}
              open={this.state.open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <ErrorOutline
                onClick={this.handleTooltipOpen}
                onMouseLeave={this.handleTooltipClose}
                className={classes.toolTipIcon}
              />
            </Tooltip>
          )}
        </Grid>
      );
    }
  }
  class TableHeader extends React.Component {
    state = {
      open: false
    };

    handleTooltipClose = () => {
      this.setState({ open: false });
    };

    handleTooltipOpen = () => {
      this.setState({ open: true });
    };
    render() {
      const { title, tooltipContent, showTooltip } = this.props;
      const intl = this.props.intl;
      return (
        <Grid
          xl={3}
          lg={3}
          sm={3}
          sm={12}
          xs={12}
          item
          className={classes.tableTitle}
        >
          <div className={classes.tooltipHolder}>
            <div
              style={{
                width: 'auto',
                display: 'inline'
              }}
            >
              {title}
            </div>
            {showTooltip && (
              <Tooltip
                title={<React.Fragment>{intl.formatMessage({ defaultMessage: "tooltipContent"})}</React.Fragment>}
                classes={{ tooltip: classes.tooltipTitle }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                PopperProps={{
                  disablePortal: true
                }}
                onClose={this.handleTooltipClose}
                open={this.state.open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <ErrorOutline
                  onClick={this.handleTooltipOpen}
                  onMouseLeave={this.handleTooltipClose}
                  className={classes.toolTipIconTableHeader}
                />
              </Tooltip>
            )}
          </div>
        </Grid>
      );
    }
  }
  const ScoreBar = ({ score }) => (
    <div
      className={classes.scoreBar}
      style={{ width: Math.round(score ? (score * 80) / 100 : 0) + '%' }}
    >
      <span className={classes.score}>{intl.formatMessage({ defaultMessage: "score"})}</span>
    </div>
  );
  const Category = ({ name, infScore = 0, relScore = 0, resScore = 0 }) => (
    <Grid
      item
      container
      direction="row"
      xs={12}
      className={classes.categoryRow}
    >
      <Grid
        item
        container
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        justify="flex-start"
        alignItems="center"
        className={classes.catName}
      >
        {name}
      </Grid>
      <Hidden mdUp>
        <TableHeader
          title={intl.formatMessage({ defaultMessage: 'Influence score'})}
          tooltipContent={
            <div>
              {intl.formatMessage({ defaultMessage: "Scoring by the combination of categoty's relevant, resonance and"})}
              {intl.formatMessage({ defaultMessage: "sentiment in each influencer's post."})} <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100."})}
            </div>
          }
          showTooltip={showTooltip}
        />
      </Hidden>
      <Grid
        item
        container
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        justify="flex-start"
        alignItems="center"
        className={classes.catInfScore}
      >
        <ScoreBar score={infScore} />
      </Grid>
      <Hidden mdUp>
        <TableHeader
          title={intl.formatMessage({ defaultMessage: 'Relevance score'})}
          tooltipContent={
            <div>
             {intl.formatMessage({ defaultMessage: " Scoring by category's relevant content / profession of"})}
             {intl.formatMessage({ defaultMessage: "influencers."})}  <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100."})}
            </div>
          }
          showTooltip={showTooltip}
        />
      </Hidden>
      <Grid
        item
        container
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        justify="flex-start"
        alignItems="center"
        className={classes.catOtherScore}
      >
        <ScoreBar score={relScore} />
      </Grid>
      <Hidden mdUp>
        <TableHeader
          title={intl.formatMessage({ defaultMessage: 'Resonance score'})}
          tooltipContent={
            <div>
              {intl.formatMessage({ defaultMessage: "Scoring by how much audience engage with category-related content"})}
              {intl.formatMessage({ defaultMessage: "of influencer."})} <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100."})}
            </div>
          }
          showTooltip={showTooltip}
        />
      </Hidden>
      <Grid
        item
        container
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        justify="flex-start"
        alignItems="center"
        className={classes.catOtherScore}
      >
        <ScoreBar score={resScore} />
      </Grid>
    </Grid>
  );
  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Grid container direction="column">
        <Grid
          xs={12}
          item
          container
          direction="row"
          className={classes.bigFieldContainer}
        >
          <Grid
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            item
            container
            alignItems="center"
            className={classes.avgInfScore}
          >
            <Grid item xs={7} className={classes.avgInfScoreTitle}>
             {intl.formatMessage({ defaultMessage: " Avg. Influence score"})}
            </Grid>
            <Grid item xs={5} className={classes.avgInfScoreValue}>
              {avgInfScore}
            </Grid>
          </Grid>
          <BigField
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            Icon={SupervisedUserCircleOutlined}
            title="Reach score"
            tooltipContent={
              <div>
                {intl.formatMessage({ defaultMessage: "Measured by the size of the audience."})}  <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100"})}
                {intl.formatMessage({ defaultMessage: "(2M followers)."})}
              </div>
            }
            checkVal={v => Math.ceil(reachRate / 20) >= v}
            showTooltip={showTooltip}
            score={reachRate}
            color={theme.colors.info(1.0)}
          />
          <BigField
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            Icon={Flash}
            title={intl.formatMessage({ defaultMessage: "Engagement score"})}
            tooltipContent={
              <div>
                {intl.formatMessage({ defaultMessage: "How much the influencer's content got engaged by their"})}
                {intl.formatMessage({ defaultMessage: "followers."})} <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100 (AVG engagement = 4,000)."})}
              </div>
            }
            checkVal={v => Math.ceil(engagementRate / 20) >= v}
            showTooltip={showTooltip}
            score={engagementRate}
            color={theme.colors.warning(1.0)}
          />
          <BigField
            xl={3}
            lg={3}
            md={6}
            sm={12}
            xs={12}
            Icon={Heart}
            title={intl.formatMessage({ defaultMessage: "Sentiment score"})}
            tooltipContent={
              <div>
                {intl.formatMessage({ defaultMessage: "The higher score, the more positive of followers attitude"})}
                {intl.formatMessage({ defaultMessage: "towards influencer's content."})} <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100."})}
              </div>
            }
            checkVal={v =>
              sentimentRate > 0
                ? Math.ceil(sentimentRate / 50) >= v - 3
                : Math.floor(sentimentRate / 50) >= v - 3
            }
            showTooltip={showTooltip}
            score={sentimentRate}
            color="#e91e63"
          />
        </Grid>
        <Grid xs={12} item className={classes.title}>
          {intl.formatMessage({ defaultMessage: "Influence Score By Category"})}
        </Grid>
        <Hidden smDown>
          <Grid xs={12} item container direction="row">
            <Grid xs={3} item className={classes.tableTitle}>
              {intl.formatMessage({ defaultMessage: "Category"})}
            </Grid>
            <TableHeader
              title={intl.formatMessage({ defaultMessage: 'Influence score'})}
              tooltipContent={
                <div>
                  {intl.formatMessage({ defaultMessage: "Scoring by the combination of categoty's relevant, resonance"})}
                  {intl.formatMessage({ defaultMessage: "and sentiment in each influencer's post."})} <br />{intl.formatMessage({ defaultMessage: "Highest score:"})}
                  {intl.formatMessage({ defaultMessage: "100."})}
                </div>
              }
              showTooltip={showTooltip}
            />
            <TableHeader
              title={'Relevance score'}
              tooltipContent={
                <div>
                  Scoring by category's relevant content / profession of
                  influencers. <br /> Highest score: 100.
                </div>
              }
              showTooltip={showTooltip}
            />
            <TableHeader
              title={intl.formatMessage({ defaultMessage: 'Resonance score'})}
              tooltipContent={
                <div>
                  {intl.formatMessage({ defaultMessage: "Scoring by how much audience engage with category-related"})}
                  {intl.formatMessage({ defaultMessage: "content of influencer."})} <br /> {intl.formatMessage({ defaultMessage: "Highest score: 100."})}
                </div>
              }
              showTooltip={showTooltip}
            />
          </Grid>
        </Hidden>
        {categories.map((v, key) => (
          <Category key={key} {...v} />
        ))}
      </Grid>
    </Paper>
  );
};

export default injectIntl (withTheme()(withStyles(styles)(Analytics))) ;
