import React from 'react';
import Portfolio from 'components/portfolio';
import { useHistory } from 'react-router-dom';

const PortfolioContainer = ({ match }) => {
  const history = useHistory();
  const handleMovePage = () => {
    history.push(`${match.path}/portfolios`);
  };

  return (
    <>
      <Portfolio 
        handleMovePage={handleMovePage}/>
    </>
  );
};

export default PortfolioContainer;