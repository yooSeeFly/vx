import { Group } from '@vx/group';
import { HeatmapCircle, HeatmapRect } from '@vx/heatmap';
import { genBins } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { extent, max, min } from 'd3-array';
import React from 'react';

const data = genBins(16, 16);

// accessors
const x = d => d.bin;
const y = d => d.bins;
const z = d => d.count;

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 110
  }
}) => {
  if (width < 10) return null;

  // bounds
  const size = width > margin.left + margin.right ? width - margin.left - margin.right : width;
  const xMax = size / 2;
  const yMax = height - margin.bottom;
  const dMin = min(data, d => min(y(d), x));
  const dMax = max(data, d => max(y(d), x));
  const dStep = dMax / data[0].bins.length;
  const bWidth = xMax / data.length;
  const bHeight = yMax / data[0].bins.length;
  const colorMax = max(data, d => max(y(d), z));

  // scales
  const xScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [dMin, dMax]
  });
  const colorScale = scaleLinear({
    range: ['#77312f', '#f33d15'],
    domain: [0, colorMax]
  });
  const colorScale2 = scaleLinear({
    range: ['#122549', '#b4fbde'],
    domain: [0, colorMax]
  });
  const opacityScale = scaleLinear({
    range: [0.1, 1],
    domain: [0, colorMax]
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill="#28272c" />
      <Group top={margin.top} left={5}>
        <HeatmapCircle
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          opacityScale={opacityScale}
          radius={(bWidth + 4) / 2}
          step={dStep}
          gap={4}
        >
          {bin => {
            return (
              <circle
                className={`vx-heatmap-circle`}
                key={`heatmap-circle-${bin.index}-${bin.binIndex}`}
                r={bin.r}
                cx={bin.cx}
                cy={bin.cy}
                fill={bin.color}
                fillOpacity={bin.opacity}
                onClick={event => {
                  if (!events) return;
                  alert(`clicked: ${JSON.stringify(bin, null, 4)}`);
                }}
              />
            );
          }}
        </HeatmapCircle>
      </Group>
      <Group top={margin.top} left={xMax + margin.left}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale2}
          opacityScale={opacityScale}
          binWidth={bWidth}
          binHeight={bWidth}
          step={dStep}
          gap={0}
        >
          {bin => {
            return (
              <rect
                className={'vx-heatmap-rect'}
                key={`heatmap-rect-${bin.index}-${bin.binIndex}`}
                width={bin.width}
                height={bin.height}
                x={bin.x}
                y={bin.y}
                fill={bin.color}
                fillOpacity={bin.opacity}
                onClick={event => {
                  if (!events) return;
                  alert(`clicked: ${JSON.stringify(bin, null, 4)}`);
                }}
              />
            );
          }}
        </HeatmapRect>
      </Group>
    </svg>
  );
};
