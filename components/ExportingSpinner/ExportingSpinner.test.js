import React from 'react';
import { shallow } from 'enzyme';
import ExportingSpinner from './ExportingSpinner';

test('Should render without throwing an error', () => {
  const wrapper = shallow(<ExportingSpinner />);
  expect(wrapper).toHaveLength(1);
});
