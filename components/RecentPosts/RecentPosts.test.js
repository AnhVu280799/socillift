import React from 'react';
import IconCard from 'components/Cards/IconCard.jsx';
import {
  RecentPosts,
  stylesBasic,
  IconPost,
  RecentPostsTablePure,
  tableStyle
} from './RecentPosts';

const setup = () => {
  const props = {
    recentPosts: [
      {
        'id': '5b7f82d650e87ab87bc437d7',
        'message': 'Thanh Xuân Rực Rỡ 🇻🇳⚽️',
        'platform': 'facebook',
        'createdTime': 1535079965,
        'totalLikes': 17034,
        'postId': '100004681360899_1082221688610533',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p480x480/40023989_1082221691943866_5433522487189045248_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=01f20d01c8bdbf34ca40277ef2da5a3e&oe=5C06D694'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 17034
      },
      {
        'id': '5b7d3ae350e87ab87bc52e44',
        'message': 'Hung Dữ 😡💪🏻',
        'platform': 'facebook',
        'createdTime': 1534817754,
        'totalLikes': 46814,
        'totalShares': 423,
        'totalComments': 1037,
        'postId': '100004681360899_1078745418958160',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/39589396_1078745425624826_2559710455836704768_o.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=4814f280d91671245ba7a8350a8f0438&oe=5BF86AC8'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 46814
      },
      {
        'id': '5b7d3ae350e87ab87bc52e3e',
        'message': 'Mọi người có ai cũng đang theo dõi Á Vận Hội cổ vũ cho đội tuyển U23 không ạaa 😎😎 cổ động tinh thần cho anh em tôi bằng cách tham gia thử thách #vietnamcolen trên TikTok ngay để có cơ hội nhận được quả bóng có chữ ký của mình nhé hehe \n#asiangames2018 \n#vietnamcolen\n#tiktok\n#tiktokvietnam',
        'platform': 'facebook',
        'createdTime': 1534598098,
        'totalLikes': 22699,
        'totalShares': 524,
        'totalComments': 536,
        'postId': '100004681360899_1075812482584787',
        'postPhotos': [

        ],
        'authorId': '100004681360899',
        'totalEngagements': 22699
      },
      {
        'id': '5b7d3ae350e87ab87bc52de6',
        'message': 'Cả nhà cùng xem số phát sóng chương trình Tôi yêu Việt Nam trên VTV3 chiều tối nay nhé😀😀😀',
        'platform': 'facebook',
        'createdTime': 1534577797,
        'totalLikes': 9288,
        'totalShares': 55,
        'totalComments': 168,
        'postId': '100004681360899_1075421159290586',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-9/p720x720/39304925_1763873593661026_3881332731027652608_o.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=55959f42c74f2d6cdec47a6d20d9f44c&oe=5C0A3089'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 9288
      },
      {
        'id': '5b7d3ae350e87ab87bc52e57',
        'message': 'Lúc nào đi thi đấu xa cũng chỉ thèm đồ Việt Nam,ai đấy ship hộ phở áp chảo bò 37a Văn Miếu qua đây cho mình với 😋😋😋\nĐã thế từ 19h tới 23h mua 2 đồ uống được tặng 1 đồ uống nữa chứ,trà đào cam sả đỉnh cao luôn nhé 🍑🍑🍑',
        'platform': 'facebook',
        'createdTime': 1534559297,
        'totalLikes': 24880,
        'totalShares': 87,
        'totalComments': 256,
        'postId': '100004681360899_1075202895979079',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p180x540/38869750_963736240489363_429592610449915904_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=5f35bf3c8a07e2d04982930b30b2e353&oe=5BF4CA10',
          'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/38901033_963736253822695_2387390724334157824_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=4f97de5dca5c3dbf97466a20dcad02b5&oe=5BED8E44'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 24880
      },
      {
        'id': '5b73b39850e87ab87b1e1b50',
        'message': 'Ai chơi với Dũng từ bé đều biết Dũng mê nhất trên đời là kem. Cộng thêm thưở nhỏ ở quê chưa bao giờ được thử qua dưa lưới, thế nên với Dũng, kem dưa lưới Hokkaido – Nhật Bản của nhà Celano quả là một sản phẩm trên cả tuyệt vời 👍👍.\n\nPhải nói là "siêu phẩm" đấy cả nhà, mấy hôm nay tập luyện liên tục, không có ông bạn thơm lừng mát lạnh này chắc Dũng mệt ngất mất 😂. \n\nĐã qua Indo rồi, tự dặn lòng cố gắng hết mình và bung nóc nhé ✌.\n\n#TiếnđếnASIAD #KIDOGroup #Celano #ĐạiSứThươngHiệu',
        'platform': 'facebook',
        'createdTime': 1533993484,
        'totalLikes': 32201,
        'totalShares': 271,
        'totalComments': 820,
        'postId': '100004681360899_1067192326780136',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p480x480/38717308_1067192303446805_3697065796372004864_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=01f86f7dde1af7f9e929719377cf1025&oe=5C08C903'
        ],
        'authorId': '100004681360899',
        'catInfo': [
          {
            'cat_id': '5b6160fa8f32900024415df2',
            'name': 'Irrelevance',
            'score': 100
          }
        ],
        'totalEngagements': 32201
      },
      {
        'id': '5b73b39850e87ab87b1e1b5a',
        'message': 'Vị trí của tôi không thể lùi sâu hơn được nữa,nhưng tôi chẳng bận tâm đến việc tìm đường lùi vì mục tiêu của tôi không ở sau lưng tôi,tôi và toàn đội đã sẵn sàng tiến lên 🇻🇳💪🏻💪🏻',
        'platform': 'facebook',
        'createdTime': 1533953783,
        'totalLikes': 56409,
        'totalShares': 559,
        'totalComments': 1664,
        'postId': '100004681360899_1066668620165840',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p480x480/38926238_1066668626832506_2845017183325519872_o.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=23a0f0a7deb2e43cae2d09f723e50f81&oe=5C0453A5'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 56409
      },
      {
        'id': '5b73b39850e87ab87b1e1b5b',
        'message': 'Xúc động quá. Cảm ơn #ClearMen ạ 😍😍😍',
        'platform': 'facebook',
        'createdTime': 1533790128,
        'totalLikes': 34013,
        'totalShares': 304,
        'totalComments': 546,
        'postId': '100004681360899_1064267100405992',
        'postPhotos': [

        ],
        'authorId': '100004681360899',
        'totalEngagements': 34013
      },
      {
        'id': '5b73b39750e87ab87b1e1ad6',
        'message': 'Vẫn khỏe và ăn ngon đều đều ☺️☺️.\n\nĐương nhiên với tôi ăn kem vẫn là tuyệt nhất các ông ạ. Kem Merino nhà tôi phải nói đỉnh của đỉnh nhé 😎.\n\nAi đã thử qua qua kem mè đen chưa? Mới ăn lần đầu mà đã lỡ "phải lòng" hương vị bùi bùi mát lạnh của em ấy. Một lần nữa cảm ơn các anh chị nhà KIDO nhiều lắm, tài trợ cho Dũng gần chục que kem thế này thì bảo sao em Dũng ý không mê cơ chứ 😂. \n\n#KIDOGroup #Merino #ĐạiSứThươngHiệu',
        'platform': 'facebook',
        'createdTime': 1533733571,
        'totalLikes': 28948,
        'totalShares': 308,
        'totalComments': 749,
        'postId': '100004681360899_1063475843818451',
        'postPhotos': [

        ],
        'authorId': '100004681360899',
        'totalEngagements': 28948
      },
      {
        'id': '5b671f2350e87ab87b336d2b',
        'message': 'Đoàn Kết ❤️🇻🇳',
        'platform': 'facebook',
        'createdTime': 1533484714,
        'totalLikes': 70173,
        'totalShares': 751,
        'totalComments': 1516,
        'postId': '100004681360899_1059975487501820',
        'postPhotos': [
          'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/38647467_1059975464168489_2767438610692046848_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=320df8eec4059ed769f04ba434c0bab2&oe=5BC8724C'
        ],
        'authorId': '100004681360899',
        'totalEngagements': 70173
      }
    ],
    classes: stylesBasic
  };

  const enzymeWrapper = shallow(<RecentPosts {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component RecentPosts', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call IconPost', () => {
    const { enzymeWrapper } = setup();
    expect(
      enzymeWrapper.find(IconCard).props().icon()
    ).toEqual(IconPost(enzymeWrapper.state('rows').length));
  });

  it('should change pageSize', () => {
    const { enzymeWrapper } = setup();
    const eventCustom = {
      target: {
        value: 20
      }
    };

    // Default value pageSize = 10
    expect(enzymeWrapper.state('pageSize')).toEqual(10);
    enzymeWrapper.find(IconCard).props().content.props.children[0].props.children.props.children[1].props.onChange(eventCustom);
    expect(enzymeWrapper.state('pageSize')).toEqual(eventCustom.target.value);
  });

  it('should match snapshot RecentPostsTable', () => {
    const { props } = setup();

    const postsTableProps = { ...props, classes: tableStyle};
    const wrapper = <RecentPostsTablePure {...postsTableProps} />;
    
    expect(wrapper).toMatchSnapshot();
  });
});