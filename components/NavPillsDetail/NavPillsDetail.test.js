import React from 'react';
import RegularCard from 'components/Cards/RegularCard.jsx';
import {
  NavPillsDetail,
  ReachScoreCardIcon,
  PostsCardIcon,
  EngagementsCardIcon
} from './NavPillsDetail';

const setup = () => {
  const props = {
    fbId: '100004681360899',
    resonances: {
      'dieu hau 9': 100,
      'Cate8': 42.86,
      'hoa lá cành': 28.59
    },
    influenceScore: {
      'dieu hau 9': 100,
      'Cate8': 42.86,
      'hoa lá cành': 28.59
    },
    trueResonance: {
      'dieu hau 9': 100,
      'Cate8': 42.86,
      'hoa lá cành': 28.59
    },
    platformDetails: {
      'fb': {
        'id': '100004681360899',
        'totalFollowers': 2789651,
        'avgEngagement': 105409.586,
        'totalReactions': 13058476,
        'totalComments': 653450,
        'totalShares': 412958,
        'totalPosts': 134,
        'demographicsLocation': {
          'Đắk Nông Province': 0.21386762719495722,
          'Hà Tĩnh Province': 1.321977087398069,
          'Bình Định Province': 0.976787232978138,
          'Cà Mau Province': 0.7522887588173496,
          'Bà Rịa–Vũng Tàu Province': 1.4264095252388813,
          'Thanh Hóa Province': 4.483716043824104,
          'Đồng Nai Province': 3.0347941367752265,
          'Quảng Ninh Province': 1.6146380509280103,
          'Hậu Giang Province': 0.2013607484116264,
          'Thái Bình Province': 1.4357896843263795,
          'Ninh Bình Province': 0.675371454299865,
          'Bình Phước Province': 0.8160738406123368,
          'Hà Nội City': 17.971759467707237,
          'Bắc Kạn Province': 0.2132422832557907,
          'Bến Tre Province': 0.8929911451298215,
          'An Giang Province': 1.264445444994747,
          'Hà Giang Province': 0.33205763169743363,
          'Đồng Tháp Province': 0.915503526939817,
          'Quảng Bình Province': 0.7066386512581919,
          'Phú Yên Province': 0.587823302816549,
          'Bình Dương Province': 2.007979388663765,
          'Hồ Chí Minh City': 17.612812046625645,
          'Gia Lai Province': 0.8498424133273299,
          'Đắk Lắk Province': 1.5983791085096801,
          'Điện Biên Province': 0.22199709840412227,
          'Quảng Ngãi Province': 0.7110160588323579,
          'Hải Dương Province': 1.7153184251338236,
          'Yên Bái Province': 0.5371704437440592,
          'Khánh Hòa Province': 1.21691930561809,
          'Bình Thuận Province': 0.8379608784831658,
          'Bạc Liêu Province': 0.5640602331282205,
          'Nghệ An Province': 2.184951723447896,
          'Lạng Sơn Province': 0.6691180149081994,
          'Tiền Giang Province': 1.1900295162339285,
          'Lai Châu Province': 0.18510180599329631,
          'Lâm Đồng Province': 0.7372805042773526,
          'Kon Tum Province': 0.2857821801991095,
          'Cần Thơ City': 1.7709740357196457,
          'Đà Nẵng City': 2.331907549152034,
          'Trà Vinh Province': 0.646605633098204,
          'Phú Thọ Province': 1.0918505177847817,
          'Quảng Trị Province': 0.4045975286407524,
          'Quảng Nam Province': 1.268822852568913,
          'Thừa Thiên–Huế Province': 1.6058832357796788,
          'Hòa Bình Province': 0.7041372755015258,
          'Hải Phòng City': 2.663965180849467,
          'Ninh Thuận Province': 0.36269948471659413,
          'Bắc Giang Province': 1.488318575216369,
          'Tây Ninh Province': 0.9261343739056481,
          'Hưng Yên Province': 1.0480764420431237,
          'Long An Province': 1.0524538496172895,
          'Vĩnh Long Province': 0.7604182300265147,
          'Cao Bằng Province': 0.29203561959077495,
          'Thái Nguyên Province': 1.4758116964330381,
          'Lào Cai Province': 0.5402971634398919,
          'Bắc Ninh Province': 1.6215168342588424,
          'Sơn La Province': 0.47276001800990547,
          'Tuyên Quang Province': 0.601580869478213,
          'Sóc Trăng Province': 0.6647406073340337,
          'Vĩnh Phúc Province': 0.5359197558657262,
          'Kiên Giang Province': 1.027440092050628,
          'Nam Định Province': 1.0168092450847968,
          'Hà Nam Province': 0.6609885436990345
        },
        'demographicsAge': {
          '< 18': 0.038728381264315666,
          '25-34': 21.829528730926274,
          '18-24': 77.67862082701691,
          '55-64': 0.007745676252863134,
          '65-74': 0.0071924136633729095,
          '35-44': 0.3640467838845673,
          '75+': 0.038175118674825446,
          '45-54': 0.03596206831686455
        },
        'demographicsEducation': {
          '1': 42.03134296239098,
          '3': 56.81861336506449,
          '5': 1.150043672544527
        },
        'demographicsJob': {
          '1': 42.03134296239098,
          '3': 56.81861336506449,
          '5': 1.150043672544527
        },
        'demographicsGender': {
          'female': 70.04434580585098,
          'male': 29.955654194149012
        },
        'totalFollowers4w': 2777047,
        'sentimentRate': 55,
        'engagementRate': 14,
        'reachRate': 100,
        'followerGrowth': 12604,
        'followerGrowthByPercentage': 0.004538634023838991
      }
    },
    recentPosts: [
      {
        'id': '5b632aa7aed9bb6942120758',
        'message': '#U20 #DejaVu',
        'platform': 'facebook',
        'createdTime': 1533223497,
        'totalLikes': 17529,
        'totalShares': 55,
        'totalComments': 191,
        'postId': '100004681360899_1056361031196599',
        'postPhotos': [

        ],
        'authorId': '100004681360899',
        'catInfo': [
          {
            'cat_id': '5b5ed72fa5962c0024525672',
            'name': 'Irrelevance',
            'score': 100
          }
        ],
        'totalEngagements': 17529
      },
      {
        'id': '5b61e172aed9bb6942f524ab',
        'message': 'Chinh Đen ơi xong chưa ☺️☺️ Hà Đức Chinh',
        'platform': 'facebook',
        'createdTime': 1533043500,
        'totalLikes': 47939,
        'totalShares': 2812,
        'totalComments': 1665,
        'postId': '100004681360899_1053992918100077',
        'postPhotos': [

        ],
        'authorId': '100004681360899',
        'catInfo': [

        ],
        'totalEngagements': 47939
      }
    ],
    callBackActiveFunction: jest.fn(),
    engagementIconFunction: jest.fn(),
    metricIconFunction: jest.fn()
  };

  const enzymeWrapper = shallow(<NavPillsDetail {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component NavPillsDetail', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  // it('should call metricReachScore', () => {
  //   const { enzymeWrapper, props } = setup();

  //   expect(
  //     enzymeWrapper.find(RegularCard)
  //       .at(0).prop('content')
  //       .props.tabs[1]
  //       .tabContent.props
  //       .children.props
  //       .children.props
  //       .content.props
  //       .children[0].props
  //       .children[0].props.icon()
  //   ).toEqual(ReachScoreCardIcon(
  //     props.platformDetails.fb.reachRate
  //       ? props.platformDetails.fb.reachRate
  //       : 'N/A'
  //   ));
  // });

  // it('should call EngagementsCardIcon', () => {
  //   const { enzymeWrapper, props } = setup();

  //   expect(
  //     enzymeWrapper.find(RegularCard)
  //       .at(0).prop('content')
  //       .props.tabs[1]
  //       .tabContent.props
  //       .children.props
  //       .children.props
  //       .content.props
  //       .children[1].props
  //       .children.props.icon()
  //   ).toEqual(EngagementsCardIcon(
  //     props.platformDetails.fb.engagementRate
  //       ? props.platformDetails.fb.engagementRate
  //       : 'N/A'
  //   ));
  // });

  it('should call callback', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.find(RegularCard).at(0).prop('content').props.callBackActive('RECENT POSTS');
    expect(props.callBackActiveFunction).toHaveBeenCalled();
  });

  it('should match snapshot ReachScoreCardIcon', () => {
    expect(ReachScoreCardIcon(123).props.children[0]).toEqual('Reach Score');
  });

  it('should match snapshot PostsCardIcon', () => {
    expect(PostsCardIcon(123).props.children[0]).toEqual('P');
  });

  it('should match snapshot EngagementsCardIcon', () => {
    expect(EngagementsCardIcon(123).props.children[0]).toEqual('Engagements Score');
  });
});