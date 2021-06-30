import React from "react";
import ErrorPage from "containers/ErrorPage";

export default () => (
  <ErrorPage
    number={401}
    pageTitle="Authentication Expired"
    pageDescription="Invalid request, authentication expired."
    buttonName="Go to Login"
    buttonLocation="/sign-in"
  />
);
