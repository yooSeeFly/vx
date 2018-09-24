import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

HeatmapCircle.propTypes = {
  data: PropTypes.array,
  gap: PropTypes.number,
  radius: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  children: PropTypes.func
};

export default function HeatmapCircle({
  className,
  data,
  gap = 1,
  radius = 6,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  bins = d => d.bins,
  count = d => d.count,
  children,
  ...restProps
}) {
  const r = radius - gap;
  const heatmap = data.map((d, i) => {
    return bins(d).map((b, j) => {
      const countValue = count(b);
      return {
        bin: b,
        row: j,
        column: i,
        datum: d,
        cx: radius + xScale(i),
        cy: yScale(j) + gap + radius,
        opacity: opacityScale(countValue),
        color: colorScale(countValue),
        r,
        radius,
        gap
      };
    });
  });
  if (children) return children(heatmap);
  return (
    <Group>
      {heatmap.map((bins, i) => {
        return bins.map((bin, j) => {
          return (
            <circle
              key={`heatmap-tile-circle-${bin.row}-${bin.column}`}
              className={cx('vx-heatmap-circle', className)}
              fill={bin.color}
              r={bin.r}
              cx={bin.cx}
              cy={bin.cy}
              fillOpacity={bin.opacity}
              {...restProps}
            />
          );
        });
      })}
    </Group>
  );
}
