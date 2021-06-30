import React from "react";
import { connect } from "react-redux";

import { signOut } from "reducers/UserReducer";

class SignOutPage extends React.Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <div>Signing out</div>;
  }
}

const mapStateToProps = undefined;

const mapDispatchToProps = {
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage);
