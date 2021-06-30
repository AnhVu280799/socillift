import React from "react";
import ErrorPage from "containers/ErrorPage";

export default () => (
  <ErrorPage
    number={500}
    pageTitle="Internal Server Error"
    pageDescription="The server encountered something unexpected that didn't allow it to complete the request. We apologize."
    buttonName="Go to Home"
  />
);
