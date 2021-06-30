import React from 'react';
import { Content } from './Content';

const setup = () => {
  const props = {
    verticals: ['a', 'b', 'c'], 
    avg_engagement: '123.12', 
    total_follower: '12'
  };
  const enzymeWrapper = shallow(<Content {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component Content', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });
});