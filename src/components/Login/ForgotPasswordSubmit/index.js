import React, { useState } from "react";
import { connect } from "react-redux";

import Routes from "../../../utility/constants/Routes";
import { userActions } from "../../../Redux/actionCreators";
import AlertBox from "../../common/AlertBox";

const ForgotPasswordSubmit = ({ history, error, username, forgotPasswordSubmit }) => {
  const [code, setCode] = useState();
  const [password, setPassword] = useState();

  const handleCode = event => {
    setCode(event.currentTarget.value);
  };

  const handlePassword = event => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const route = `/${Routes.AI_MARKETPLACE}`;
    forgotPasswordSubmit({ username, code, password, history, error, route });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="code">Enter Code to Reset Password</label>
          <input id="code" type="password" value={code} onChange={handleCode} />
        </div>
        <div>
          <label htmlFor="password">Enter the New Password</label>
          <input id="password" type="password" value={password} onChange={handlePassword} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Validate
          </button>
        </div>
        <p>fghjk{error}</p>
        <AlertBox error={error} />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  error: state.errorReducer.forgotPasswordSubmit,
});

const mapDispatchToProps = dispatch => ({
  forgotPasswordSubmit: args => dispatch(userActions.forgotPasswordSubmit({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordSubmit);
