import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

HeatmapCircle.propTypes = {
  data: PropTypes.array,
  gap: PropTypes.number,
  step: PropTypes.number,
  radius: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,
  opacityScale: PropTypes.func,
  yBin: PropTypes.func,
  bin: PropTypes.func,
  bins: PropTypes.func,
  count: PropTypes.func,
  children: PropTypes.func
};

export default function HeatmapCircle({
  className,
  data,
  gap = 1,
  step = 0,
  radius = 6,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  yBin,
  bin = (d, i) => d.bin,
  bins = (d, i) => d.bins,
  count = d => d.count,
  children,
  ...restProps
}) {
  yBin = yBin || bin;
  const r = radius - gap;
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(bin(d, i))}>
            {bins(d, i).map((b, j) => {
              const binCount = count(b);
              const _bin = {
                index: j,
                binIndex: i,
                count: binCount,
                color: colorScale(binCount),
                opacity: opacityScale(binCount),
                r: radius - gap,
                cx: radius,
                cy: yScale(yBin(b, j) + step) + radius,
                xbin: bin(d, i),
                ybin: yBin(b, j)
              };
              if (children) return children(_bin);
              return (
                <circle
                  key={`heatmap-tile-circle-${j}`}
                  className={cx('vx-heatmap-circle', className)}
                  fill={_bin.color}
                  r={_bin.r}
                  cx={_bin.cx}
                  cy={_bin.cy}
                  fillOpacity={_bin.opacity}
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
