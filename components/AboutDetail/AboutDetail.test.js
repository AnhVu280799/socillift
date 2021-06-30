import React from 'react';
import { shallow } from 'enzyme';
import AboutDetail from './AboutDetail';

const setup = () => {
  const props = { contents: 'testing content'};
  const enzymeWrapper = shallow(<AboutDetail {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component AboutDetail', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect (enzymeWrapper).toMatchSnapshot();
  });
  
  it('should render content h6 an error', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.render().text()).toBe(props.contents);
  });
  
  it('should render content h6 throwing an error', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.prop('contents')).toEqual(props.contents);
  });
});



