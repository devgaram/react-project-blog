import React from 'react';
import PortfolioContainer from 'containers/portfolio/portfolioContainer';
import PortfolioListContainer from 'containers/portfolio/portfolioListContainer';
import PortfolioEditContainer from 'containers/portfolio/portfolioEditContainer';
import PortfolioPreviewContainer from 'containers/portfolio/portfolioPreviewContainer';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

const AboutContainer = () => {
  const path = useRouteMatch().path;
  return (
    <>
      <Switch>
        <Route path={`${path}/portfolios/:id/edit`} component={PortfolioEditContainer} />
        <Route path={`${path}/portfolios/:id/preview`} component={PortfolioPreviewContainer} />
        <Route path={`${path}/portfolios/new`} component={PortfolioEditContainer} />
        <Route path={`${path}/portfolios`} component={PortfolioListContainer} />
        <Route path={path} component={PortfolioContainer} />
      </Switch>
    </>
  );
};

export default AboutContainer;