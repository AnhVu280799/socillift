import React from 'react';
import { Statistic, stylesBasic } from './Statistic';

const setup = () => {
  const props = {
    name: 'name testing',
    number: 'title testing',
    classes: stylesBasic
  };
  const enzymeWrapper = shallow(<Statistic {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component Statistic', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
