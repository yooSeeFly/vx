import { Group } from '@vx/group';
import classnames from 'classnames';
import React from 'react';

function verticalToHorizontal({ x1, x2, y1, y2 }) {
  return {
    x1: y1,
    x2: y2,
    y1: x1,
    y2: x2
  };
}

export default function BoxPlot({
  left = 0,
  top = 0,
  className,
  data,
  max,
  min,
  firstQuartile,
  thirdQuartile,
  median,
  boxWidth,
  fill,
  fillOpacity,
  stroke,
  strokeWidth,
  rx = 2,
  ry = 2,
  valueScale,
  outliers = [],
  horizontal,
  medianProps = {},
  maxProps = {},
  minProps = {},
  boxProps = {},
  outlierProps = {},
  container = false,
  containerProps = {},
  children
}) {
  const offset = horizontal ? top : left;
  const center = offset + boxWidth / 2;
  const valueRange = valueScale.range();

  const boxplot = {
    valueRange,
    center,
    offset,
    boxWidth,
    max: {
      x1: center - boxWidth / 4,
      x2: center + boxWidth / 4,
      y1: valueScale(max),
      y2: valueScale(max)
    },
    maxToThird: {
      x1: center,
      x2: center,
      y1: valueScale(max),
      y2: valueScale(thirdQuartile)
    },
    median: {
      x1: offset,
      x2: offset + boxWidth,
      y1: valueScale(median),
      y2: valueScale(median)
    },
    minToFirst: {
      x1: center,
      x2: center,
      y1: valueScale(firstQuartile),
      y2: valueScale(min)
    },
    min: {
      x1: center - boxWidth / 4,
      x2: center + boxWidth / 4,
      y1: valueScale(min),
      y2: valueScale(min)
    },
    box: {
      x1: offset,
      x2: boxWidth,
      y1: valueScale(thirdQuartile),
      y2: Math.abs(valueScale(thirdQuartile) - valueScale(firstQuartile))
    },
    container: {
      x1: offset,
      x2: boxWidth,
      y1: Math.min(...valueRange),
      y2: Math.abs(valueRange[0] - valueRange[1])
    }
  };

  if (horizontal) {
    boxplot.max = verticalToHorizontal(boxplot.max);
    boxplot.maxToThird = verticalToHorizontal(boxplot.maxToThird);
    boxplot.box = verticalToHorizontal(boxplot.box);
    boxplot.box.y1 = valueScale(firstQuartile);
    boxplot.median = verticalToHorizontal(boxplot.median);
    boxplot.minToFirst = verticalToHorizontal(boxplot.minToFirst);
    boxplot.min = verticalToHorizontal(boxplot.min);
    boxplot.container = verticalToHorizontal(boxplot.container);
    boxplot.container.y1 = Math.min(...valueRange);
  }

  if (children) return children(boxplot);

  return (
    <Group className={classnames('vx-boxplot', className)}>
      {outliers.map((d, i) => {
        const cx = horizontal ? valueScale(d) : center;
        const cy = horizontal ? center : valueScale(d);
        return (
          <circle
            key={i}
            className="vx-boxplot-outlier"
            cx={cx}
            cy={cy}
            stroke={stroke}
            strokeWidth={1}
            fill={fill}
            fillOpacity={fillOpacity}
            r="4"
            {...outlierProps}
          />
        );
      })}
      <line
        className="vx-boxplot-max"
        x1={boxplot.max.x1}
        y1={boxplot.max.y1}
        x2={boxplot.max.x2}
        y2={boxplot.max.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...maxProps}
      />
      <line
        className="vx-boxplot-max-to-third"
        x1={boxplot.maxToThird.x1}
        y1={boxplot.maxToThird.y1}
        x2={boxplot.maxToThird.x2}
        y2={boxplot.maxToThird.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <rect
        className="vx-boxplot-box"
        x={boxplot.box.x1}
        y={boxplot.box.y1}
        width={boxplot.box.x2}
        height={boxplot.box.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        fillOpacity={fillOpacity}
        rx={rx}
        ry={ry}
        {...boxProps}
      />
      <line
        className="vx-boxplot-median"
        x1={boxplot.median.x1}
        y1={boxplot.median.y1}
        x2={boxplot.median.x2}
        y2={boxplot.median.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...medianProps}
      />
      <line
        className="vx-boxplot-min-to-first"
        x1={boxplot.minToFirst.x1}
        y1={boxplot.minToFirst.y1}
        x2={boxplot.minToFirst.x2}
        y2={boxplot.minToFirst.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        className="vx-boxplot-min"
        x1={boxplot.min.x1}
        y1={boxplot.min.y1}
        x2={boxplot.min.x2}
        y2={boxplot.min.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...minProps}
      />
      {container && (
        <rect
          x={boxplot.container.x1}
          y={boxplot.container.y1}
          width={boxplot.container.x2}
          height={boxplot.container.y2}
          fillOpacity="0"
          {...containerProps}
        />
      )}
    </Group>
  );
}
