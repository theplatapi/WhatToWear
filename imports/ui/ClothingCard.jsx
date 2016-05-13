import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import './ClothingCard.less';

const ClothingCard = () => (
  <div className="clothing-card">
    <h1>Hello World!</h1>
  </div>
);

ClothingCard.propTypes = {
};


export default ClothingCardContainer = createContainer(() => {
  return {

  };
}, ClothingCard);