import React from 'react';
import Bio from 'components/bio';

const BioContainer = ({
  bioTitle
}) => {
  return (
    <>
      <Bio 
        bioTitle={bioTitle}/>
    </>
  );
};

export default BioContainer;