import { Group } from '@vx/group';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function BarGroup({
  data,
  className,
  top,
  left,
  x0,
  x0Scale,
  x1Scale,
  yScale,
  zScale,
  keys,
  height,
  children,
  ...restProps
}) {
  const format = x0Scale.tickFormat ? x0Scale.tickFormat() : d => d;
  return (
    <Group className={cx('vx-bar-group', className)} top={top} left={left}>
      {data &&
        data.map((d, i) => {
          return (
            <Group key={`bar-group-${i}-${x0(d)}`} left={x0Scale(x0(d))}>
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
                    x: x1Scale(key),
                    y: yScale(value),
                    x0: x0(d),
                    barWidth: x1Scale.bandwidth(),
                    barHeight: height - yScale(value),
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

BarGroup.propTypes = {
  children: PropTypes.func,
  data: PropTypes.array.isRequired,
  x0: PropTypes.func.isRequired,
  x0Scale: PropTypes.func.isRequired,
  x1Scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};
