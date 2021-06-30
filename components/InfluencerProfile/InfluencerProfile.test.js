import React from 'react';
import { InfluencerProfile } from './InfluencerProfile';

const setup = () => {
  const props = {
    avatar: 'avatar testing',
    title: 'title testing',
    onClick: 'onClick testing',
    goToUrl: 'goToUrl testing',
    showOverlay: 'showOverlay testing',
    onSelect: 'onSelect testing',
    checked: 'checked testing'
  };
  const enzymeWrapper = shallow(<InfluencerProfile {...props} />);

  return { enzymeWrapper, props };
};

describe('testing component InfluencerProfile', () => {
  it('should match snapshot', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render one ProfileCard', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('ProfileCard').at(0)).toHaveLength(1);
  });

  it('should render true prop avatar', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('avatar')).toBe(props.avatar);
  });

  it('should render true prop title', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('title')).toBe(props.title);
  });

  it('should render true prop goToUrl', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('goToUrl')).toBe(props.goToUrl);
  });

  it('should render true prop showOverlay', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('showOverlay')).toBe(props.showOverlay);
  });

  it('should render true prop onSelect', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('onSelect')).toBe(props.onSelect);
  });

  it('should render true prop checked', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.prop('checked')).toBe(props.checked);
  });
});