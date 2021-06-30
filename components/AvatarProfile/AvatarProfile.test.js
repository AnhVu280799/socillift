import React from 'react';
import { AvatarProfile } from './AvatarProfile';

const setup = () => {
  const props = { 
    classes: {
      avatar: 'test avatar',
      bigAvatar: 'test test'
    }, 
    photoUrl: 'testing photoUrl'
  };
  const enzymeWrapper = shallow(<AvatarProfile {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component AvatarProfile', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render one Avatar', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('Avatar').at(0)).toHaveLength(1);
  });

  it('should render true Avatar src', () => {
    const { enzymeWrapper, props } = setup();
    
    expect(enzymeWrapper.render()[0].children[0].attribs.src).toBe(props.photoUrl);
  });

  it('should render true Avatar src', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.html()).toContain(props.photoUrl);
  });


  it('should call onError', () => {
    const { enzymeWrapper } = setup();

    const event = {
      target: {
        src: '123'
      }
    };

    const expectedEvent = {
      target: {
        src: 'https://storage.googleapis.com/yn-influencer/Avatar%20Default.png'
      }
    };

    enzymeWrapper.props().onError(event);

    expect(event).toEqual(expectedEvent);
  });
});