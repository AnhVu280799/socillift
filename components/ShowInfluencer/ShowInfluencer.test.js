import React from 'react';
import { shallow } from 'enzyme';
import { ShowInfluencer } from './ShowInfluencer';

const setup = () => {
  const props = {
    influencerList: [
      {
        'id': '5b150fac5be4d6b11c291393',
        'name': 'Dũng Bùi Tiến',
        'photoUrl': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/30623918_963637253802311_1496497681517413538_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=488d6bfe7abbe5bc36efb243d8fd5503&oe=5BB0F818',
        'categories': [
          {
            'id': '5b3302477a23c50024422dca',
            'categoryName': 'hoa lá cành',
            'parent': null,
            'createdDate': '2018-06-27T03:19:35.172Z',
            'lastUpdatedDate': '2018-06-27T03:19:35.172Z'
          },
          {
            'id': '5b3606af896550002454679d',
            'categoryName': 'Cate8',
            'parent': null,
            'createdDate': '2018-06-29T10:15:11.703Z',
            'lastUpdatedDate': '2018-06-29T10:15:11.703Z'
          }
        ],
        'platformDetail': {
          'fb': {
            'id': '100004681360899',
            'totalFollowers': 2778793,
            'avgEngagement': 106014.64
          }
        }
      }, {
        'id': '5ac724dad05b20da709bc353',
        'name': 'My Khởi Trần',
        'photoUrl': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/29594485_1773100332753793_3732901363003469915_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=a24e66764558789ec0a1803c999e1a48&oe=5B54DB7E',
        'categories': [
          {
            'id': '5b5ed72fa5962c0024525672',
            'categoryName': 'Irrelevance',
            'description': 'Irrelevance Category',
            'parent': null,
            'lastUpdatedDate': '2018-07-30T09:15:27.772Z',
            'createdDate': '2018-07-30T09:15:27.772Z'
          },
          {
            'id': '5b360695266b5d0024e796a3',
            'categoryName': 'Cate5',
            'parent': null,
            'createdDate': '2018-06-29T10:14:45.097Z',
            'lastUpdatedDate': '2018-06-29T10:14:45.097Z'
          },
          {
            'id': '5b2c5faaea7b8b001b546930',
            'categoryName': 'FASHION 1',
            'parent': null,
            'createdDate': '2018-06-22T02:32:10.007Z',
            'lastUpdatedDate': '2018-07-31T10:20:03.839Z',
            'description': ''
          },
          {
            'id': '5b3051b39a0a30001b9e46ad',
            'categoryName': 'hoa mười giờ',
            'parent': null,
            'createdDate': '2018-06-25T02:21:39.443Z',
            'lastUpdatedDate': '2018-06-25T02:21:39.443Z'
          }
        ],
        'platformDetail': {
          'fb': {
            'id': '100001615293544',
            'totalFollowers': 1813910,
            'avgEngagement': 21204.143
          }
        }
      }],
    selectedInfluencers: [{
      'id': '5ac724dad05b20da709bc353',
      'name': 'My Khởi Trần',
      'photoUrl': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/29594485_1773100332753793_3732901363003469915_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=a24e66764558789ec0a1803c999e1a48&oe=5B54DB7E',
      'categories': [
        {
          'id': '5b5ed72fa5962c0024525672',
          'categoryName': 'Irrelevance',
          'description': 'Irrelevance Category',
          'parent': null,
          'lastUpdatedDate': '2018-07-30T09:15:27.772Z',
          'createdDate': '2018-07-30T09:15:27.772Z'
        },
        {
          'id': '5b360695266b5d0024e796a3',
          'categoryName': 'Cate5',
          'parent': null,
          'createdDate': '2018-06-29T10:14:45.097Z',
          'lastUpdatedDate': '2018-06-29T10:14:45.097Z'
        },
        {
          'id': '5b2c5faaea7b8b001b546930',
          'categoryName': 'FASHION 1',
          'parent': null,
          'createdDate': '2018-06-22T02:32:10.007Z',
          'lastUpdatedDate': '2018-07-31T10:20:03.839Z',
          'description': ''
        },
        {
          'id': '5b3051b39a0a30001b9e46ad',
          'categoryName': 'hoa mười giờ',
          'parent': null,
          'createdDate': '2018-06-25T02:21:39.443Z',
          'lastUpdatedDate': '2018-06-25T02:21:39.443Z'
        }
      ],
      'platformDetail': {
        'fb': {
          'id': '100001615293544',
          'totalFollowers': 1813910,
          'avgEngagement': 21204.143
        }
      }
    }],
    pages: '',
    showOverlay: '',
    onSelect: jest.fn(),
    goToUrl: 'gotoUrl testing',
    mode: 1,
  };
  const enzymeWrapper = shallow(<ShowInfluencer {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component ShowInfluencer', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render one GridContainer', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('GridContainer').at(0)).toHaveLength(1);
  });

  it('should render mode 1', () => {
    const { props } = setup();

    const wrapper = shallow(<ShowInfluencer {...props} mode={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render mode 2', () => {
    const { props } = setup();

    const wrapper = shallow(<ShowInfluencer {...props} mode={2} />);

    expect(wrapper).toMatchSnapshot();
  });  

  it('should render mode 2', () => {
    const { enzymeWrapper, props } = setup();
    const event = {
      target: {
        checked: 1
      }
    };
    enzymeWrapper.find('InfluencerProfile').at(0).prop('onSelect')(event);

    expect(props.onSelect).toHaveBeenCalled();
  });   
}); 