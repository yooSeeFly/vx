import { Group } from '@vx/group';
import cx from 'classnames';
import { stack as d3stack } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';

export default function BarStackHorizontal({
  data,
  className,
  top,
  left,
  y,
  xScale,
  yScale,
  zScale,
  keys,
  height,
  children,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = yScale.tickFormat ? yScale.tickFormat() : d => d;
  const barHeight = yScale.bandwidth();
  const step = yScale.step();
  const paddingInner = yScale.paddingInner();
  const paddingOuter = yScale.paddingOuter();

  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
      {series &&
        series.map((s, i) => {
          return (
            <Group key={`vx-bar-stack-horizontal-${i}`}>
              {s.map((d, ii) => {
                const barWidth = xScale(d[1]) - xScale(d[0]);
                const bar = {
                  key: s.key,
                  value: d.data[s.key],
                  values: [d[0], d[1]],
                  index: i,
                  seriesIndex: ii,
                  x: xScale(d[0]),
                  y: yScale(y(d.data)),
                  y0: y(d.data),
                  barColor: zScale(s.key),
                  barWidth,
                  barHeight,
                  step,
                  paddingInner,
                  paddingOuter,
                  format,
                  seriesData: d.data
                };
                if (children) return children(bar);
                return (
                  <rect
                    key={`bar-group-bar-horizontal-${bar.index}-${bar.seriesIndex}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.barWidth}
                    height={bar.barHeight}
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

BarStackHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.func
};
