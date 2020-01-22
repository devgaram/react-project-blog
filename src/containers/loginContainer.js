import React, { useCallback , useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Login from 'components/login';
import { changeInput, requestLogin, loginModalVisible } from 'store/modules/auth'
import { Map } from 'immutable';
import { message, Form } from 'antd';
import Cookies from 'js-cookie';

const LoginContainer = ({
  form
}) => { 

  const dispatch = useDispatch();  
  const { isFieldTouched, getFieldError, getFieldDecorator } = form;
  const useridError = isFieldTouched('userid') && getFieldError('userid');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const { visible, userid, password, isFetching, resMessage, logged, showMessage, token } = useSelector(state => ({
    visible: state.auth.get('loginModalVisible'),
    userid: state.auth.get('userid'),
    password: state.auth.get('password'),
    isFetching: state.auth.get('isFetching'),
    resMessage: state.auth.get('resMessage'),
    logged: state.auth.get('logged'),
    showMessage: state.auth.get('showMessage'),
    token: state.auth.get('token')
  }), shallowEqual);

  const handleLogin = e => {
    dispatch(requestLogin({
      userid,
      password
    }));
  }

  const handleCancel = useCallback(
    e => dispatch(loginModalVisible(false)),
    []
  );

  const handleChangeUserId = useCallback(
    e => dispatch(changeInput({ userid: e.target.value })),
    []
  );

  const handleChangePassword = useCallback(
    e => dispatch(changeInput({ password: e.target.value })),
    []
  );

  useEffect(
    () => {
      if (visible && showMessage && !logged) message.warning(resMessage)
      else if(showMessage && logged) {
        message.success(resMessage)
        handleCancel();
      }
  }, [visible, resMessage, showMessage, logged, handleCancel]);  

  return (
    <>
      <Login 
        visible={visible}
        handleLogin={handleLogin}
        onCancel={handleCancel}
        userId={userid}
        password={password}
        isFetching={isFetching}
        handleChangeUserId={handleChangeUserId}
        handleChangePassword={handleChangePassword}
        getFieldDecorator={getFieldDecorator}
        useridError={useridError}
        passwordError={passwordError}
      />
    </>
  );
};

export default Form.create({ name: 'form_login'})(LoginContainer);;