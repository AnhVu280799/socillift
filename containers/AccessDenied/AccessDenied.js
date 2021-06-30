import React from "react";
import ErrorPage from "containers/ErrorPage";

export default () => (
  <ErrorPage
    number={403}
    pageTitle="Access denied"
    pageDescription="Sorry, but  you don't have permission to access this page."
    buttonName="Go to Home"
  />
);
