import { Group } from '@vx/group';
import cx from 'classnames';
import { stack as d3stack } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';

export default function BarStack({
  data,
  className,
  top,
  left,
  x,
  xScale,
  yScale,
  zScale,
  keys,
  height,
  children,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = xScale.tickFormat ? xScale.tickFormat() : d => d;
  const barWidth = xScale.bandwidth();
  const step = xScale.step();
  const paddingInner = xScale.paddingInner();
  const paddingOuter = xScale.paddingOuter();

  return (
    <Group className={cx('vx-bar-stack', className)} top={top} left={left}>
      {series &&
        series.map((s, i) => {
          return (
            <Group key={`vx-bar-stack-${i}`}>
              {s.map((d, ii) => {
                const barHeight = yScale(d[0]) - yScale(d[1]);
                const bar = {
                  key: s.key,
                  value: d.data[s.key],
                  values: [d[0], d[1]],
                  index: i,
                  seriesIndex: ii,
                  x: xScale(x(d.data)),
                  y: yScale(d[1]),
                  x0: x(d.data),
                  barColor: zScale(s.key),
                  barHeight,
                  barWidth,
                  step,
                  paddingInner,
                  paddingOuter,
                  format
                };
                if (children) return children(bar);
                return (
                  <rect
                    key={`bar-group-bar-${bar.index}-${bar.seriesIndex}`}
                    width={bar.barWidth}
                    height={bar.barHeight}
                    x={bar.x}
                    y={bar.y}
                    fill={bar.barColor}
                    {...restProps}
                  />
                );
              })}
            </Group>
          );
        })}
    </Group>
  );
}

BarStack.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func
};
