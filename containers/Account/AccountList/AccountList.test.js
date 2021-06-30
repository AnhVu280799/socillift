import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { connect } from "react-redux";
import AccountList from "./AccountList";

const mockStore = configureMockStore();
describe("AccountList Container", () => {
  let wrapper, store;
  const mapStateToProps = () => ({});
  const mapDispatchToProps = {
    retriveInfluencerById: jest.fn(),
    retriveAccountList: jest.fn(),
    changeSelectedAccountList: jest.fn()
  };
  const ComponentAccountList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountList);
  beforeEach(() => {
    const influencer = {};
    const initialState = {};
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <ComponentAccountList store={store} influencer={influencer} />
    );
  });

  it("should match its empty snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
