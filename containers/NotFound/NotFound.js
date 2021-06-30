import React from "react";
import ErrorPage from "containers/ErrorPage";

export default () => (
  <ErrorPage
    number={404}
    pageTitle="Page not found"
    pageDescription="Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app."
    buttonName="Go to Home"
  />
);
