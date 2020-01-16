import React, { useState  } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Login from 'components/login';
import { loginModalVisible } from 'store/modules/ui'

const LoginContainer = ({
}) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.ui.get('loginModalVisible'), shallowEqual);
  const [ userId, setUserId ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = e => {
    alert(userId + "," + password);
  }

  const handleCancel = e => {
    dispatch(loginModalVisible(false));
  }

  const handleChangeUserId = e => {
    setUserId(e.target.value);
  }

  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  return (
    <>
      <Login 
        visible={visible}
        handleLogin={handleLogin}
        onCancel={handleCancel}
        userId={userId}
        password={password}
        handleChangeUserId={handleChangeUserId}
        handleChangePassword={handleChangePassword}/>
    </>
  );
};

export default LoginContainer;