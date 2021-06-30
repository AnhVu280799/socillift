import React from 'react';
import { IconName } from './IconName';

const setup = () => {
  const props = {
    platform: 'fb',
    classes: {
      socialButtonsIcons: 'socialButtonsIcons',
      marginRight: 'marginRight'
    }
  };
  const enzymeWrapper = shallow(<IconName {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component InfluencerProfile', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });
});