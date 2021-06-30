import React from 'react';
import { BasicDetail, stylesBasic } from './BasicDetail';


const setup = () => {
  const props = {
    id: 'testing id',
    name: 'testing name',
    maritalStatus: 'testing maritalStatus',
    platformDetail: {
      fb: {
        id: 1
      },
      insta: {
        id: 2
      }
    },
    basicInfo: 'testing basicInfo',
    phoneNumber: 'testing phoneNumber',
    jobs: 'testing jobs',
    email: 'testing email',
    photoUrl: 'testing photoUrl',
    categories: ['category 1', 'category 2'],
    editButton: {},
    addCollectionButton: 'testing addCollectionButton'
  };
  const enzymeWrapper = shallow(<BasicDetail {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component BasicDetail', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('renders without check style', () => {
    const theme = {
      spacing: {
        unit: 1
      }
    };
    const returnSome = stylesBasic(theme);
    expect(returnSome.chip.margin).toBe(1);
  });
});
