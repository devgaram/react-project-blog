import React from 'react';
import Portfolio from 'components/portfolio';
import { useHistory } from 'react-router-dom';

const PortfolioContainer = ({ match }) => {
  const history = useHistory();
  console.log(match);
  const handleMovePage = event => {
  };

  return (
    <>
      <Portfolio 
        handleMovePage={handleMovePage}/>
    </>
  );
};

export default PortfolioContainer;