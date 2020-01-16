import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loginModalVisible } from 'store/modules/ui'
import Bio from 'components/bio';
import LoginContainer from 'containers/loginContainer';


const BioContainer = ({
  bioTitle
}) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.ui.get('loginModalVisible'), shallowEqual);

  const showModal = () => {
    dispatch(loginModalVisible(true))
  }

  return (
    <>
      <Bio 
        bioTitle={bioTitle}
        showModal={showModal}/>
      <LoginContainer />
    </>
  );
};

export default BioContainer;