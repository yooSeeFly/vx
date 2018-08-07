import { GradientTealBlue } from '@vx/gradient';
import { Group } from '@vx/group';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { Bar } from '@vx/shape';
import { max } from 'd3-array';
import React from 'react';

const data = letterFrequency.slice(5);

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// accessors
const x = d => d.letter;
const y = d => +d.frequency * 100;

export default ({ width, height, events = false }) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)]
  });

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect x={0} y={0} width={width} height={height} fill={`url(#teal)`} rx={14} />
      <Group top={40}>
        {data.map((d, i) => {
          const datum = { x: x(d), y: y(d) };
          const barHeight = yMax - yScale(datum.y);
          return (
            <Group key={`bar-${datum.x}`}>
              <Bar
                width={xScale.bandwidth()}
                height={barHeight}
                x={xScale(datum.x)}
                y={yMax - barHeight}
                fill="rgba(23, 233, 217, .5)"
                data={datum}
                onClick={event => {
                  if (!events) return;
                  alert(`clicked: ${JSON.stringify(datum)}`);
                }}
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
};
