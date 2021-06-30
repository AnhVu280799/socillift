import React from "react";
import { shallow } from "enzyme";
import { replace } from "connected-react-router";
import { ErrorPage, mapDispatchToProps } from "./ErrorPage";

describe("Error Page Container", () => {
  let wrapper, classes, toSignin, dispatchFetchResult, retrieveUserInfo;
  global.localStorage = {
    i2x_token: "someToken",
    getItem(a = "user_id") {
      return "someToken";
    },
    setItem() {
      return "someToken";
    }
  };
  it("should match mapDispatchToProps dispatchFetchResult", () => {
    const testingCode = 200;
    const expectedObject = {
      code: testingCode,
      type: "FetchResultReducer/DISPATCH_NOTIFICATION"
    };
    expect(mapDispatchToProps.dispatchFetchResult(testingCode)).toEqual(
      expectedObject
    );
  });

  it("should match snapshot change number ErrorPage correctly", () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content",
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        number={100}
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should return mapDispatchToProps correctly toSignin", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot change pageTitle ErrorPage correctly", () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content",
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        pageTitle="testing pageTitle"
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot change pageDescription ErrorPage correctly", () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content",
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        pageDescription="testing pageDescription"
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot change buttonName ErrorPage correctly", () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content",
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        buttonName="testing buttonName"
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should not break if provide classes {"content"}', () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        buttonName="testing buttonName"
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should not break if provide classes {"container"}', () => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        buttonName="testing buttonName"
        dispatchFetchResult={dispatchFetchResult}
        retrieveUserInfo={retrieveUserInfo}
        classes={classes}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  beforeEach(() => {
    toSignin = jest.fn();
    dispatchFetchResult = jest.fn();
    retrieveUserInfo = jest.fn();
    classes = {
      content: "test content",
      container: "test container"
    };
    wrapper = shallow(
      <ErrorPage
        toSignin={toSignin}
        dispatchFetchResult={dispatchFetchResult}
        classes={classes}
        retrieveUserInfo={retrieveUserInfo}
      />
    );
  });

  it("should match snapshot ErrorPage correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle "Go to Sign In" button', () => {
    wrapper.find({ name: "goto" }).simulate("click");
    expect(toSignin).toHaveBeenCalled();
  });

  it('should not call "Go to Sign In" button when first load', () => {
    expect(toSignin).toHaveBeenCalledTimes(0);
  });

  it('should call "dispatchFetchResult" with param 200', () => {
    expect(dispatchFetchResult).toHaveBeenLastCalledWith(200);
  });
});
