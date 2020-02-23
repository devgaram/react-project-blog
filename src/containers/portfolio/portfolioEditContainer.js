import React from 'react';
import PortfolioEdit from 'components/portfolio/portfolioEdit';
import { useHistory } from 'react-router-dom';
import marked from 'marked';

const PortfolioContainer = ({ match }) => {
  const history = useHistory();
  const handleMovePage = event => {
  };
  const handleGoBack = () => {
    history.goBack();
  }
  let convertedElement;
  const handleKeyUp = event => {
    if (!convertedElement) {
      convertedElement = document.getElementsByClassName("convert-preview")[0];
    }
    convertedElement.contentDocument.body.innerHTML = marked(event.target.value);
  }

  return (
    <>
      <PortfolioEdit 
        handleMovePage={handleMovePage}
        handleGoBack={handleGoBack}
        handleKeyUp={handleKeyUp}/>
    </>
  );
};

export default PortfolioContainer;