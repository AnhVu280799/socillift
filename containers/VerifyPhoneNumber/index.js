import Loadable from "react-loadable";
import LoadingScreen from "components/LoadingScreen";

export default Loadable({
  loader: () => import("./VerifyPhoneNumber"),
  loading: LoadingScreen
});
