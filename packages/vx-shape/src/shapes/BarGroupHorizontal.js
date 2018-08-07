import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function BarGroupHorizontal({
  data,
  className,
  top,
  left,
  x = 0,
  y0,
  y0Scale,
  y1Scale,
  xScale,
  zScale,
  keys,
  width,
  children,
  ...restProps
}) {
  const format = y0Scale.tickFormat ? y0Scale.tickFormat() : d => d;
  return (
    <Group className={cx('vx-bar-group-horizontal', className)} top={top} left={left}>
      {data &&
        data.map((d, i) => {
          return (
            <Group key={`bar-group-${i}-${y0(d)}`} top={y0Scale(y0(d))}>
              {keys &&
                keys.map((key, ii) => {
                  const value = d[key];
                  const bar = {
                    key,
                    value,
                    format,
                    index: i,
                    keyIndex: ii,
                    barGroupData: d,
                    x,
                    y: y1Scale(key),
                    y0: y0(d),
                    barWidth: width - xScale(value),
                    barHeight: y1Scale.bandwidth(),
                    barColor: zScale(key)
                  };
                  if (children) return children(bar);
                  return (
                    <rect
                      key={`bar-group-bar-${bar.index}-${bar.keyIndex}`}
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

BarGroupHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y0: PropTypes.func.isRequired,
  y0Scale: PropTypes.func.isRequired,
  y1Scale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  x: PropTypes.number,
  children: PropTypes.func
};
