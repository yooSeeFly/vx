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
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(i)}>
            {bins(d).map((b, j) => {
              const countValue = count(b);
              const bin = {
                bin: b,
                row: j,
                column: i,
                datum: d,
                cx: radius,
                cy: yScale(j) + gap + radius,
                opacity: opacityScale(countValue),
                color: colorScale(countValue),
                r,
                radius,
                gap
              };
              if (children) return children(bin);
              return (
                <circle
                  key={`heatmap-tile-circle-${j}`}
                  className={cx('vx-heatmap-circle', className)}
                  fill={bin.color}
                  r={bin.r}
                  cx={bin.cx}
                  cy={bin.cy}
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
