import cx from 'classnames';
import { area as d3Area } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';

Area.propTypes = {
  x: PropTypes.func,
  x0: PropTypes.func,
  x1: PropTypes.func,
  y: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.array,
  defined: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array
  ]),
  innerRef: PropTypes.func,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  curve: PropTypes.func
};

export default function Area({
  children,
  x,
  x0,
  x1,
  y,
  y0,
  y1,
  xScale,
  yScale,
  data = [],
  defined = () => true,
  className,
  strokeDasharray,
  strokeWidth = 2,
  stroke = 'black',
  fill = 'rgba(0,0,0,0.3)',
  curve,
  innerRef,
  ...restProps
}) {
  const area = d3Area();
  if (x) area.x((...args) => xScale(x(...args)));
  if (x0) area.x0((...args) => xScale(x0(...args)));
  if (x1) area.x1((...args) => xScale(x1(...args)));
  if (y) area.y((...args) => yScale(y(...args)));
  if (y0) area.y0((...args) => yScale(y0(...args)));
  if (y1) area.y1((...args) => yScale(y1(...args)));
  if (defined) area.defined(defined);
  if (curve) area.curve(curve);

  const path = area(data);
  if (children) return children({ path });

  return (
    <path
      ref={innerRef}
      className={cx('vx-area', className)}
      d={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill={fill}
      {...restProps}
    />
  );
}
