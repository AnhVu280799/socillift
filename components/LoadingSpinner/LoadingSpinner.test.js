import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

test('Should render without throwing an error', () => {
  const wrapper = shallow(<LoadingSpinner />);
  expect(wrapper).toHaveLength(1);
});
