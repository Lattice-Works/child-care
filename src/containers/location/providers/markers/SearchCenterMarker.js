// @flow
import React from 'react';

import { Map } from 'immutable';
import { Marker } from 'react-mapbox-gl';

import searchCenterIcon from '../../../../assets/svg/searchcenterpinicon.svg';

type Props = {
  provider :Map;
};

const SearchCenterMarker = ({ coordinates } :Props) => {
  console.log(coordinates)
  if (!coordinates[0] || !coordinates[1]) return null;

  return (
    <Marker
        anchor="bottom"
        coordinates={coordinates}
        style={{ zIndex: 0 }}>
      <img src={searchCenterIcon} alt="" />
    </Marker>
  );
};

export default SearchCenterMarker;
