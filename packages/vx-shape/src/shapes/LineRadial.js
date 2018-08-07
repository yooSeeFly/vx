import cx from 'classnames';
import { radialLine } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';

LineRadial.propTypes = {
  innerRef: PropTypes.func
};

export default function LineRadial({
  className = '',
  angle,
  radius,
  defined,
  curve,
  data,
  innerRef,
  ...restProps
}) {
  const path = radialLine();
  if (angle) path.angle(angle);
  if (radius) path.radius(radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return (
    <g>
      <path
        ref={innerRef}
        className={cx('vx-line-radial', className)}
        d={path(data)}
        {...restProps}
      />
    </g>
  );
}
