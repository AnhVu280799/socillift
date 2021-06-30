import React from 'react';
import { shallow } from 'enzyme';
import Contact from './Contact';


const setup = () => {
  const props = { icon: 'testing icon', name: 'testing name', content: 'testing content' };
  const enzymeWrapper = shallow(<Contact {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component Contact', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect (enzymeWrapper).toMatchSnapshot();
  });

  it('should render one p', () => {
    const { enzymeWrapper } = setup();

    expect (enzymeWrapper.find('p').at(0)).toHaveLength(1);
  });

  it('should render one Icon', () => {
    const { enzymeWrapper } = setup();

    expect (enzymeWrapper.find('Icon').at(0)).toHaveLength(1);
  });

  it('should render true prop name', () => {
    const { enzymeWrapper, props } = setup();

    expect (enzymeWrapper.prop('name')).toBe(props.name);
  });

  it('should render true prop icon', () => {
    const { enzymeWrapper, props } = setup();

    expect (enzymeWrapper.prop('icon')).toBe(props.icon);
  });

  it('should render content an error', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.render().text()).toContain(props.content);
  });

  it('should render name an error', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.render().text()).toContain(props.name);
  });
});
