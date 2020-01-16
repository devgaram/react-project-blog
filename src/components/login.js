import React from 'react';
import { Modal, Form, Button, Input, Icon } from 'antd';
import PropTypes from 'prop-types';

const Login = ({
  visible,
  handleLogin,
  onCancel,
  form,
  userId,
  password,
  handleChangeUserId,
  handleChangePassword
}) => {
  const { isFieldTouched, getFieldError, getFieldDecorator } = form;
  const useridError = isFieldTouched('userid') && getFieldError('userid');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  return (
    
    <>
      <Modal
        title="Sign in"
        visible={visible}
        onOk={handleLogin}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>Close</Button>,
          <Button key="submit" type="primary" onClick={handleLogin}>Log in</Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item 
            label="ID"
            validateStatus={useridError ? 'error' : ''}
            help={useridError || ''}>
            {getFieldDecorator('userid', {
              rules: [{ required: true, message: '아이디를 입력하세요!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="UserId"
                setfieldsvalue={userId}
                onChange={handleChangeUserId}
                />
            )}
          </Form.Item>
          <Form.Item 
            label="Password"
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '비밀번호를 입력하세요!'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="Password"
                type="password"
                setfieldsvalue={password}
                onChange={handleChangePassword}
                />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

Login.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  userId: PropTypes.string,
  password: PropTypes.string,
  handleChangeUserId: PropTypes.func,
  handleChangePassword: PropTypes.func
}

export default Form.create({ name: 'form_login'})(Login);