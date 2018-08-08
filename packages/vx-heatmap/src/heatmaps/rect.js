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
  step: PropTypes.number,
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

export default function HeatmapRect({
  className,
  data,
  binWidth,
  binHeight,
  x = 0,
  gap = 1,
  step = 0,
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
  const width = binWidth - gap;
  const height = binHeight - gap;
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
                width,
                height,
                x,
                y: yScale(yBin(b, j) + step) + gap,
                xbin: bin(d, i),
                ybin: yBin(d, j)
              };
              if (children) return children(_bin);
              return (
                <rect
                  key={`heatmap-tile-rect-${j}`}
                  className={cx('vx-heatmap-rect', className)}
                  fill={_bin.color}
                  width={_bin.width}
                  height={_bin.height}
                  x={_bin.x}
                  y={_bin.y}
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
