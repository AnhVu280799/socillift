import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

// custom components;
import Statistic from 'components/Statistic/Statistic';

// core components
import RegularCard from 'components/Cards/RegularCard.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import Button from 'components/CustomButtons/Button.jsx';

// Constants
import SOCIAL_URL from 'constants/socialURL';

export const stylesBasic = theme => ({
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
  },
  logoRight: {
    float: 'right'
  }
});

export const StatisticsDetail = ({
  classes,
  totalFollower,
  AvgEngagement,
  followerGrowth,
  LogoClassName,
  sentimentScore,
  Platform,
  Id
}) => (
  <div>
    <RegularCard
      content={(
        <div>
          <GridContainer>
            <ItemGrid xs={12} sm={6} md={6} lg={2}>
              <Statistic number={totalFollower} name="Total Followers" />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={3}>
              <Statistic
                number={followerGrowth}
                name="Follower Growth (Last 4w)"
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={2}>
              <Statistic number={AvgEngagement} name="Avg. Engagement" />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={4}>
              <Statistic number={sentimentScore} name="Sentiment Score" />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={1}>
              <Button
                color="facebookNoBackground"
                style={{
                  height: 'fit-content',
                  width: '50px',
                  marginTop: '22px',
                  marginRight: '5px'
                }}
                href={`${SOCIAL_URL[Platform]}\\${Id}`}
                target="_blank"
              >
                <Typography
                  variant="display3"
                  className={classes.logoRight}
                >
                  <i className={LogoClassName} />
                </Typography>
                <i
                  className="fa fa-share-square"
                  style={{
                    marginLeft: '5px',
                    marginTop: '22px',
                    height: 'fit-content',
                    width: '50px'
                  }}
                />
              </Button>
            </ItemGrid>
          </GridContainer>
        </div>
      )}
    />
  </div>
);

StatisticsDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(stylesBasic)(StatisticsDetail);
