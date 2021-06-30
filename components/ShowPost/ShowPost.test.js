import React from 'react';
import { shallow } from 'enzyme';
import RegularCard from 'components/Cards/RegularCard';
import { ShowPost, stylesBasic } from './ShowPost';

const setup = () => {
  const props = {
    'classes': stylesBasic(),
    'id': '5b632aa7aed9bb6942120758',
    'message': '#U20 #DejaVu',
    'platform': 'facebook',
    'createdTime': 1533223497,
    'totalLikes': 17529,
    'totalShares': 55,
    'totalComments': 191,
    'postId': '100004681360899_1056361031196599',
    'postPhotos': [],
    'authorId': '100004681360899',
    'listCategories': [
      {
        'cat_id': '5b3606af896550002454679d',
        'name': 'Cate8',
        'score': 100
      }
    ],
    'totalEngagements': 17529,
    'listImages': [
      {
        'img': 'https://scontent.xx.fbcdn.net/v/t1.0-0/p480x480/37637309_1043199412512761_7680845888389906432_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=351d9c7a1ca447bb1356d9ea2a1fd839&oe=5BC549B8',
        'title': 'Test Image'
      }
    ],
    'addCategoryFunction': jest.fn(),
    'deleteClick': jest.fn(),
    'onClickIrrelevant': jest.fn()
  };
  const enzymeWrapper = shallow(<ShowPost {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component ShowPost', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call deleteClick - call once', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.find(RegularCard).props().content.props.children[8].props.children[0].props.onDelete();
    expect(props.deleteClick).toHaveBeenCalled();
  });

  it('should call deleteClick - call with param', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.find(RegularCard).props().content.props.children[8].props.children[0].props.onDelete();
    expect(props.deleteClick).toBeCalledWith(props.listCategories[0]);
  });
});