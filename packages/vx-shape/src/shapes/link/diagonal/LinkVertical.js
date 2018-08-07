import cx from 'classnames';
import { linkVertical } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';

export function pathVerticalDiagonal({ source, target, x, y }) {
  return data => {
    const link = linkVertical();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkVertical.propTypes = {
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkVertical({
  className,
  innerRef,
  data,
  path,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  path = path || pathVerticalDiagonal({ source, target, x, y });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link-vertical', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
