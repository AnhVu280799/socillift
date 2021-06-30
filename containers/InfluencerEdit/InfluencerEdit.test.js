import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { connect } from 'react-redux';
import InfluencerEdit from './InfluencerEdit';

const mockStore = configureMockStore();
describe('InfluencerEdit Container', () => {
  let wrapper, store;
  const mapStateToProps = () => ({});
  const mapDispatchToProps = {
    retriveInfluencerById: jest.fn(),
    retriveCollection: jest.fn(),
    changeSelectedCollection: jest.fn()
  };
  const ComponentInfluencerEdit = connect(mapStateToProps, mapDispatchToProps)(
    InfluencerEdit
  );
  beforeEach(() => {
    const influencer = {};
    const initialState = {};
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <ComponentInfluencerEdit store={store} influencer={influencer} />
    );
  });

  it('should match its empty snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
