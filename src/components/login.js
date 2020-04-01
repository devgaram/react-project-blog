import React from "react";
import { Modal, Form, Button, Input, Icon } from "antd";
import PropTypes from "prop-types";

const Login = ({
  isVisible,
  hideModal,
  getFieldDecorator,
  useridError,
  passwordError,
  handleChangeUserId,
  handleChangePassword,
  userid,
  password,
  handleLogin,
  isFetching
}) => {
  return (
    <>
      <Modal
        title="Sign in"
        visible={isVisible}
        onOk={handleLogin}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal}>
            Close
          </Button>,
          <Button
            loading={isFetching}
            key="submit"
            type="primary"
            onClick={handleLogin}
            disabled={null}
          >
            Log in
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="ID"
            validateStatus={useridError ? "error" : ""}
            help={useridError || ""}
          >
            {getFieldDecorator("userid", {
              rules: [{ required: true, message: "아이디를 입력하세요!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />
                }
                placeholder="UserId"
                setfieldsvalue={userid}
                onChange={handleChangeUserId}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
          >
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "비밀번호를 입력하세요!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />
                }
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
};

Login.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  userId: PropTypes.string,
  password: PropTypes.string,
  isFetching: PropTypes.bool,
  handleChangeUserId: PropTypes.func,
  handleChangePassword: PropTypes.func,
  getFieldDecorator: PropTypes.func,
  useridError: PropTypes.array,
  passwordError: PropTypes.array
};

export default Login;
