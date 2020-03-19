import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  loginModalVisible,
  requestLoginCheck,
  requestLogout
} from "store/modules/auth";
import Bio from "components/bio";
import LoginContainer from "containers/loginContainer";

const BioContainer = ({ bioTitle }) => {
  const dispatch = useDispatch();
  const logged = useSelector(state => state.auth.get("logged"), shallowEqual);

  useEffect(() => {
    dispatch(requestLoginCheck());
  }, [dispatch]);

  const showModal = () => {
    if (!logged) dispatch(loginModalVisible(true));
    // 로그아웃 처리
    else {
      dispatch(requestLogout());
    }
  };

  return (
    <>
      <Bio bioTitle={bioTitle} showModal={showModal} logged={logged} />
      <LoginContainer />
    </>
  );
};

export default BioContainer;
