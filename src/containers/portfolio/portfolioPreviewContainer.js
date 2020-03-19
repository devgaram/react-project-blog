import React from "react";
import Portfolio from "components/portfolio";

const PortfolioContainer = ({ match }) => {
  console.log(match);
  const handleMovePage = event => {};

  return (
    <>
      <Portfolio handleMovePage={handleMovePage} />
    </>
  );
};

export default PortfolioContainer;
