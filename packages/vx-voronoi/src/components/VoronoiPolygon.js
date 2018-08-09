import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  polygon: PropTypes.arrayOf(PropTypes.array)
};

export default function VoronoiPolygon({ polygon, className, ...restProps }) {
  if (!polygon) return null;
  const data = polygon.data;
  return (
    <path
      className={cx('vx-voronoi-polygon', className)}
      d={`M${polygon.join('L')}Z`}
      {...restProps}
    />
  );
}

VoronoiPolygon.propTypes = propTypes;
