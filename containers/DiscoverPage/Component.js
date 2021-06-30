import React from "react";
import DiscoverPage from "./DiscoverPage";
import FrontPage from "./FrontPage";

export default props =>
  props.location.search.slice(1) === "" ? (
    <FrontPage {...props} />
  ) : (
    <DiscoverPage {...props} />
  );
