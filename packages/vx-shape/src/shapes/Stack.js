import { Group } from '@vx/group';
import cx from 'classnames';
import { area, stack as d3stack } from 'd3-shape';
import React from 'react';
import stackOffset from '../util/stackOffset';
import stackOrder from '../util/stackOrder';

export default function Stack({
  className,
  top = 0,
  left = 0,
  keys,
  data,
  curve,
  defined,
  x,
  x0,
  x1,
  y0,
  y1,
  value,
  order,
  offset,
  render,
  reverse = false,
  ...restProps
}) {
  const stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) stack.value(value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (curve) path.curve(curve);
  if (defined) path.defined(defined);

  const seriesData = stack(data);
  if (reverse) seriesData.reverse();

  if (render)
    return (
      <Group top={top} left={left}>
        {render({ seriesData, path })}
      </Group>
    );

  return (
    <Group top={top} left={left}>
      {seriesData.map((series, i) => {
        return (
          <path
            className={cx('vx-stack', className)}
            key={`stack-${i}-${series.key || ''}`}
            d={path(series)}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
