import React from "react";
import Loadable from "react-loadable";
import LoadingScreen from "components/LoadingScreen";

export default Loadable({
  loader: () => import("./Dashboard"),
  loading: LoadingScreen
});
