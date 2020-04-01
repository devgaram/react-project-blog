import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Form, message } from "antd";
import Bio from "components/bio";
import Login from "components/login";
import { changeInput, requestSignIn } from "store/actions/auth";

const BioContainer = ({ form, bioTitle }) => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const { isFieldTouched, getFieldError, getFieldDecorator } = form;
  const useridError = isFieldTouched("userid") && getFieldError("userid");
  const passwordError = isFieldTouched("password") && getFieldError("password");
  const { userid, password, isFetching, isFinishing, logged } = useSelector(
    state => ({
      userid: state.auth.get("userid"),
      password: state.auth.get("password"),
      isFetching: state.auth.get("isFetching"),
      isFinishing: state.auth.get("isFinishing"),
      logged: state.auth.get("logged")
    }),
    shallowEqual
  );

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleChangeUserId = useCallback(
    e => dispatch(changeInput({ userid: e.target.value })),
    []
  );

  const handleChangePassword = useCallback(
    e => dispatch(changeInput({ password: e.target.value })),
    []
  );

  const handleLogin = e => {
    dispatch(requestSignIn({ userid, password }));
  };

  useEffect(() => {
    if (isFinishing && !logged) message.warning("로그인에 실패했습니다.");
    else if (isFinishing && logged) {
      message.success("로그인에 성공 했습니다.");
      hideModal();
    }
  }, [isFinishing]);

  return (
    <>
      <Bio bioTitle={bioTitle} showModal={showModal} logged={logged} />
      <Login
        isVisible={isVisible}
        hideModal={hideModal}
        getFieldDecorator={getFieldDecorator}
        useridError={useridError}
        passwordError={passwordError}
        handleChangeUserId={handleChangeUserId}
        handleChangePassword={handleChangePassword}
        userid={userid}
        password={password}
        handleLogin={handleLogin}
        isFetching={isFetching}
      />
    </>
  );
};

export default Form.create({ name: "form_login" })(BioContainer);
