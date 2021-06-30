import React from 'react';
import { shallow } from 'enzyme';
import { Demographic, stylesBasic } from './Demographic';


const setup = () => {
  const props = {
    locations: {
      'Ninh Bình Province': 0.675371454299865,
      'Cao Bằng Province': 0.29203561959077495,
      'Bình Định Province': 0.976787232978138,
      'Bình Phước Province': 0.8154484966731702,
      'Bà Rịa–Vũng Tàu Province': 1.4264095252388813,
      'Điện Biên Province': 0.22199709840412227,
      'Kiên Giang Province': 1.027440092050628,
      'Đắk Lắk Province': 1.5983791085096801,
      'Bạc Liêu Province': 0.5640602331282205,
      'Khánh Hòa Province': 1.21691930561809,
      'Bình Dương Province': 2.007979388663765,
      'Hà Tĩnh Province': 1.321977087398069,
      'Bình Thuận Province': 0.8379608784831658,
      'Phú Yên Province': 0.587823302816549,
      'Kon Tum Province': 0.2857821801991095,
      'Nghệ An Province': 2.1843263795087298,
      'Bắc Ninh Province': 1.6215168342588424,
      'Đồng Tháp Province': 0.915503526939817,
      'Thái Bình Province': 1.4357896843263795,
      'Quảng Ninh Province': 1.6152633948671768,
      'Bắc Kạn Province': 0.2132422832557907,
      'Đồng Nai Province': 3.0347941367752265,
      'Lào Cai Province': 0.5402971634398919,
      'Tiền Giang Province': 1.1906548601730953,
      'Quảng Ngãi Province': 0.7110160588323579,
      'Hưng Yên Province': 1.0480764420431237,
      'Cần Thơ City': 1.7709740357196457,
      'Bắc Giang Province': 1.488318575216369,
      'Nam Định Province': 1.017434589023963,
      'Phú Thọ Province': 1.0918505177847817,
      'Lâm Đồng Province': 0.7379058482165191,
      'Đắk Nông Province': 0.21386762719495722,
      'Thanh Hóa Province': 4.48246535594577,
      'Hồ Chí Minh City': 17.612812046625645,
      'Ninh Thuận Province': 0.36269948471659413,
      'Hòa Bình Province': 0.7041372755015258,
      'Gia Lai Province': 0.8498424133273299,
      'Tuyên Quang Province': 0.601580869478213,
      'An Giang Province': 1.264445444994747,
      'Hà Giang Province': 0.33205763169743363,
      'Tây Ninh Province': 0.9261343739056481,
      'Hậu Giang Province': 0.2013607484116264,
      'Lạng Sơn Province': 0.6691180149081994,
      'Quảng Bình Province': 0.7066386512581919,
      'Vĩnh Phúc Province': 0.5359197558657262,
      'Sơn La Province': 0.47276001800990547,
      'Lai Châu Province': 0.18510180599329631,
      'Vĩnh Long Province': 0.7604182300265147,
      'Cà Mau Province': 0.7522887588173496,
      'Hải Dương Province': 1.7153184251338236,
      'Yên Bái Province': 0.5371704437440592,
      'Thái Nguyên Province': 1.4758116964330381,
      'Sóc Trăng Province': 0.6647406073340337,
      'Hà Nội City': 17.971759467707237,
      'Quảng Trị Province': 0.4045975286407524,
      'Bến Tre Province': 0.8923658011906548,
      'Trà Vinh Province': 0.646605633098204,
      'Hải Phòng City': 2.662714492971134,
      'Long An Province': 1.0524538496172895,
      'Hà Nam Province': 0.6622392315773675,
      'Thừa Thiên–Huế Province': 1.6058832357796788,
      'Quảng Nam Province': 1.268822852568913,
      'Đà Nẵng City': 2.3325328930912
    }, 
    ages: {
      '35-44': 0.3640467838845673,
      '55-64': 0.007745676252863134,
      '25-34': 21.829528730926274,
      '18-24': 77.67862082701691,
      '45-54': 0.03596206831686455,
      '75+': 0.038175118674825446,
      '< 18': 0.038728381264315666,
      '65-74': 0.0071924136633729095
    }, 
    genders: {
      'male': 29.955654194149012,
      'female': 70.04434580585098
    }, 
    educations: {
      '1': 42.03134296239098,
      '3': 56.81861336506449,
      '5': 1.150043672544527
    }, 
    jobs: {
      '1': 42.03134296239098,
      '3': 56.81861336506449,
      '5': 1.150043672544527
    },
    classes: stylesBasic
  };
  const enzymeWrapper = shallow(<Demographic {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component Demographic', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();
    expect (enzymeWrapper).toMatchSnapshot();
  });
});
