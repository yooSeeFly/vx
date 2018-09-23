import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  polygon: PropTypes.arrayOf(PropTypes.array)
};

export default function VoronoiPolygon({ polygon, className, children, ...restProps }) {
  if (!polygon) return null;
  const path = `M${polygon.join('L')}Z`;
  if (children) return children({ path });
  return <path className={cx('vx-voronoi-polygon', className)} d={path} {...restProps} />;
}

VoronoiPolygon.propTypes = propTypes;
