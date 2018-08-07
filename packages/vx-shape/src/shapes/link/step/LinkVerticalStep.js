import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import PropTypes from 'prop-types';
import React from 'react';

export function pathVerticalStep({ source, target, x, y, percent }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(sx, sy + (ty - sy) * percent);
    path.lineTo(tx, sy + (ty - sy) * percent);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

LinkVerticalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkVerticalStep({
  className,
  innerRef,
  data,
  path,
  percent = 0.5,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  path = path || pathVerticalStep({ source, target, x, y, percent });
  return <path ref={innerRef} className={cx('vx-link', className)} d={path(data)} {...restProps} />;
}
