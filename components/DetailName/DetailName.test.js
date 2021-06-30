import React from 'react';
import { shallow } from 'enzyme';
import DetailName from './DetailName';

const setup = () => {
  const props = {
    name: 'testing name',
    platformDetail: {
      fb: {
        id: '1'
      },
      insta: {
        id: '2'
      }
    }, 
    editButton: 'testing editButton'
  };
  const enzymeWrapper = shallow(<DetailName {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component Detail', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render one h4', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('h4').at(0)).toHaveLength(1);
  });

  // it('should render two IconName', () => {
  //   const { enzymeWrapper } = setup();

  //   expect(enzymeWrapper.find('IconName').at(0).length).toBe(2);
  // })

  // it('should render true prop name', () => {
  //   const { enzymeWrapper, props } = setup();

  //   expect(enzymeWrapper).toBe(props.name);
  // })

  // it('should render true prop platformDetail', () => {
  //   const { enzymeWrapper, props } = setup();

  //   expect(enzymeWrapper.prop('platformDetail')).toBe(props.platformDetail);
  // })

  // it('should render true prop editButton', () => {
  //   const { enzymeWrapper, props } = setup();

  //   expect(enzymeWrapper.prop('editButton')).toBe(props.editButton);
  // })

  // it('should render name an error', () => {
  //   const { enzymeWrapper, props } = setup();
  //   expect(enzymeWrapper.render().text()).toContain(props.name);
  // });
});