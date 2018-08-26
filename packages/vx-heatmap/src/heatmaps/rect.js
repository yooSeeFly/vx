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
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(i)}>
            {bins(d).map((b, j) => {
              const row = yScale(j);
              const countValue = count(b);
              const bin = {
                bin: b,
                row: j,
                column: i,
                datum: d,
                count: countValue,
                color: colorScale(countValue),
                width,
                height,
                x,
                y: yScale(j) + gap,
                opacity: opacityScale(countValue)
              };
              if (children) return children(bin);
              return (
                <rect
                  key={`heatmap-tile-rect-${j}`}
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
            })}
          </Group>
        );
      })}
    </Group>
  );
}
