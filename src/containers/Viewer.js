import React from 'react';
import View from '../components/View';
import PropTypes from 'prop-types';


export default function Viewer({ objects, assets }) {
  return (
    <div className="row no-gutters">
      <div id="scene" className="col-12">
        <View objects={objects} assets={assets} />
      </div>
    </div>
  );
};

// This makes sure we are getting what we think we should
Viewer.propTypes = {
  objects: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
};
