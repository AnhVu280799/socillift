import React from 'react';
import { shallow } from 'enzyme';
import InfluencingArea from './InfluencingArea';

const setup = () => {
  const props = {
    categories: ['cat1', 'cat2']
  };
  const enzymeWrapper = shallow(<InfluencingArea {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component InfluencingArea', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render one h5', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('h5').at(0)).toHaveLength(1);
  });

  it('should render two Button', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('Button').at(0)).toHaveLength(1);
  });

  it('should render true prop categories', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('categories')).toBe(props.categories);
  });

  it('should render Categories an error', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.render().text()).toContain('Categories');
  });
});