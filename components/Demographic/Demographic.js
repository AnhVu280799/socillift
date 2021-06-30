import React from 'react';
import PropTypes from 'prop-types';

// Lodash
import _ from 'lodash';

// react plugin for creating charts
import ChartistGraph from 'react-chartist';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline';

// core components
import RegularCard from 'components/Cards/RegularCard.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import Table from 'components/Table/Table.jsx';
import IconCard from 'components/Cards/IconCard.jsx';
import Typography from '@material-ui/core/Typography';
import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress.jsx';

// constants
import GENDER_ICONS from 'constants/genderIcons';
import PIECHART from 'constants/pieChart';
import AGERANGE_TO_LEVELS from 'constants/ageRangeToLevels';
import LEVELS_TO_JOBS from 'constants/levelsToJobs';
import GENDER from 'constants/genders';
import LEVELS_TO_EDUCATION from 'constants/levelsToEducation';
import { injectIntl } from 'react-intl';

// util
import { parseFloatNumber } from 'utils';

const styles = {
  zeroMarginTop: {
    marginTop: '0px'
  },
  statisticsResults: {
    height: '80px'
  }
};

export const stylesBasic = _.merge(styles, PIECHART);

export const Demographic = ({ classes, locations, ages, genders, educations, jobs,intl }) => (
  <RegularCard
    plainCard
    content={(
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={6} md={6} lg={4}>
            <IconCard
              icon={Timeline}
              title={intl.formatMessage({ defaultMessage: "Top followers by locations"})}
              iconColor={intl.formatMessage({ defaultMessage: "green"})}
              content={(
                <GridContainer justify="space-between">
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Table tableData={
                      locations ?
                        Object.keys(locations)
                          .map((locationKey) => ([locationKey, locations[locationKey]]))
                          .sort((first, second) => (second[1] - first[1])).slice(0, 5).map(location => ([
                            <p>{location[0]}</p>,
                            <div>
                              <CustomLinearProgress
                                variant="determinate"
                                color="success"
                                value={parseFloatNumber(location[1], 2)}
                                style={{
                                  width: '100%',
                                  display: 'inline-block',
                                  marginBottom: '0px'
                                }}
                              />
                              <p>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    marginLeft: `${
                                      locations[location] > 80 ? 80 : locations[location] - 5
                                      }%`
                                  }}
                                >
                                  {' '}
                                  {parseFloatNumber(location[1], 2)}
                                  %
                                </span>
                              </p>
                            </div>
                          ])) : []
                    }
                    />
                  </ItemGrid>
                </GridContainer>
              )}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={5}>
            <IconCard
              icon={Timeline}
              iconColor={intl.formatMessage({ defaultMessage: "red"})}
              title={intl.formatMessage({ defaultMessage: "Follower by Age"})}
              content={(
                <ChartistGraph
                  data={
                    ages ?
                      {
                        labels: Object.keys(ages).filter(age => (
                          ages[age] > 5
                        )).map(
                          (age) =>
                            `${parseFloatNumber(ages[age], 2)}%`
                        ),
                        series: Object.keys(ages).filter(age => (
                          ages[age] > 5
                        )).map((age) => ({
                          value: parseFloatNumber(ages[age], 2),
                          className: classes[AGERANGE_TO_LEVELS[age]]
                        }))
                      }
                      : []
                  }
                  type="Pie"
                  options={{
                    height: '230px'
                  }}
                />
              )}
              footer={(
                <div style={{ textAlign: 'center' }}>
                  {ages ? (
                    Object.keys(ages).filter(age => ages[age] > 5)
                      .map((age, idx) => [
                        <i
                          key={idx}
                          className={
                            'fas fa-circle ' +
                            classes[AGERANGE_TO_LEVELS[age]]
                          }
                        />,
                        ' ' + age + ' '
                      ])
                  ) : (
                      <p />
                    )}
                </div>
              )}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <IconCard
              icon={Timeline}
              title={intl.formatMessage({ defaultMessage: "Follower by Gender"})}
              iconColor={intl.formatMessage({ defaultMessage: "green"})}
              content={(
                <GridContainer justify="space-between">
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Table
                      tableData={
                        genders
                          ? Object.keys(genders).map((gender) => [
                            <Typography variant="display3" align="left">
                              <i
                                className={
                                  GENDER_ICONS[gender.toLowerCase()]
                                }
                              />
                            </Typography>,
                            <div>
                              <h4 align="right">{GENDER[gender]}</h4>
                              <h3 align="right">
                                {parseFloatNumber(genders[gender], 2)}
                                %
                              </h3>
                            </div>
                          ])
                          : []
                      }
                    />
                  </ItemGrid>
                </GridContainer>
              )}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={6}>
            <IconCard
              icon={Timeline}
              title={intl.formatMessage({ defaultMessage: "Followers by Education"})}
              iconColor={intl.formatMessage({ defaultMessage: "green"})}
              content={(
                <GridContainer justify="space-between">
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Table
                      tableData={
                        educations
                          ? Object.keys(educations).map(
                            (education) => [
                              <Typography variant="body1">
                                {LEVELS_TO_EDUCATION[education]}
                              </Typography>,
                              <div>
                                <CustomLinearProgress
                                  variant="determinate"
                                  color="success"
                                  value={parseFloatNumber(
                                    educations[education],
                                    2
                                  )}
                                  style={{
                                    width: '100%',
                                    display: 'inline-block',
                                    marginBottom: '0px'
                                  }}
                                />
                                <p>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      marginLeft: `${
                                        educations[education] > 80
                                          ? 80
                                          : educations[education] - 5
                                        }%`
                                    }}
                                  >
                                    {' '}
                                    {parseFloatNumber(
                                      educations[education],
                                      2
                                    )}
                                    %
                                  </span>
                                </p>
                              </div>
                            ]
                          )
                          : []
                      }
                    />
                  </ItemGrid>
                </GridContainer>
              )}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={6}>
            <IconCard
              icon={Timeline}
              iconColor={intl.formatMessage({ defaultMessage: "red"})}
              title={intl.formatMessage({ defaultMessage: "Follower by Jobs Title"})}
              content={(
                <ChartistGraph
                  data={
                    jobs
                      ? {
                        labels: Object.keys(jobs).map(
                          (job) =>
                            `${parseFloatNumber(jobs[job], 2)}%`
                        ),
                        series: Object.keys(jobs).map((job) => ({
                          value: jobs[job],
                          className: classes[job]
                        }))
                      }
                      : []
                  }
                  type="Pie"
                  options={{
                    height: '230px'
                  }}
                />
              )}
              footer={(
                <div style={{ textAlign: 'center' }}>
                  {jobs ? (
                    Object.keys(jobs).map((job, idx) => [
                      <i
                        key={idx}
                        className={`fas fa-circle ${classes[job]}`}
                      />,
                      ` ${LEVELS_TO_JOBS[job]} `
                    ])
                  ) : (
                      <p />
                    )}
                </div>
              )}
            />
          </ItemGrid>
        </GridContainer>
      </div>
    )}
  />
);

Demographic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(stylesBasic)(Demographic));
