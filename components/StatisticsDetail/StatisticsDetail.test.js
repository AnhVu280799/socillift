import React from 'react';
import { StatisticsDetail, stylesBasic }  from './StatisticsDetail';

const setup = () => {
  const props = {
    'classes': stylesBasic({
      spacing: {
        spacing: {
          unit: 1
        }
      }
    }),
    'totalFollower': '2,778,793',
    'AvgEngagement': '2,778,793',
    'followerGrowth': '2,778,793',
    'LogoClassName': '2,778,793',
    'sentimentScore': '2,778,793',
    'Platform': 'fb',
    'Id': '123'
  };
  const enzymeWrapper = shallow(<StatisticsDetail {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component StatisticsDetail', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });
});