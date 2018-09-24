import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

HeatmapRect.propTypes = {
  data: PropTypes.array,
  binWidth: PropTypes.number,
  binHeight: PropTypes.number,
  x: PropTypes.number,
  gap: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  children: PropTypes.func
};

export default function HeatmapRect({
  className,
  data,
  binWidth,
  binHeight,
  x = 0,
  gap = 1,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  bins = d => d.bins,
  count = d => d.count,
  children,
  ...restProps
}) {
  const width = binWidth - gap;
  const height = binHeight - gap;

  const heatmap = data.map((d, i) => {
    return bins(d).map((b, j) => {
      const countValue = count(b);
      return {
        bin: b,
        row: j,
        column: i,
        datum: d,
        width,
        height,
        count: countValue,
        x: x + xScale(i),
        y: yScale(j) + gap,
        opacity: opacityScale(countValue),
        color: colorScale(countValue)
      };
    });
  });
  if (children) return children(heatmap);
  return (
    <Group>
      {heatmap.map((bins, i) => {
        return bins.map((bin, j) => {
          return (
            <rect
              key={`heatmap-tile-rect-${bin.row}-${bin.column}`}
              className={cx('vx-heatmap-rect', className)}
              fill={bin.color}
              width={bin.width}
              height={bin.height}
              x={bin.x}
              y={bin.y}
              fillOpacity={bin.opacity}
              {...restProps}
            />
          );
        });
      })}
    </Group>
  );
}
