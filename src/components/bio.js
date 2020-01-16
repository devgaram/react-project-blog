import React from 'react';
import { PageHeader, Typography, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bio = ({
  bioTitle,
  showModal
}) => {
  return (
    <>
      <PageHeader>
        <div 
          className={`text-primary is-2 title`}
          >{bioTitle}</div>
        <div
          className={`text-grey is-1 subtitle`}
        >It's a piece of cake 외칠 때까지...</div>   
        <div>
          <LinkButton><a href="https://github.com/devgaram" target="_blank">Github</a></LinkButton>
          <LinkButton><a href="mailto:joingaram@gmail.com" target="_blank">Gmail</a></LinkButton>
          <LinkButton onClick={showModal}>Login</LinkButton>
        </div>               
      </PageHeader>   
    </>
  );
}

Bio.propTypes = {
  bioTitle: PropTypes.string,
  showModal: PropTypes.func
}

const LinkButton = styled(Button)`
  margin-right: 0.25rem;
  height: 38px;
`;
export default Bio;