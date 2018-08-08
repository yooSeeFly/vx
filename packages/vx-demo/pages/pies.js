import React from 'react';
import Show from '../components/show';
import Pie from '../components/tiles/pie';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80
      }}
      component={Pie}
      title="Pies"
    >
      {`import { GradientPinkBlue } from '@vx/gradient';
import { Group } from '@vx/group';
import { browserUsage, letterFrequency } from '@vx/mock-data';
import { Pie } from '@vx/shape';
import React from 'react';

const letters = letterFrequency.slice(0, 4);
const browsers = Object.keys(browserUsage[0])
  .filter(k => k !== 'date')
  .map(k => ({ label: k, usage: browserUsage[0][k] }));

const usage = d => d.usage;
const frequency = d => d.frequency;

function Label({ x, y, children }) {
  return (
    <text fill="white" textAnchor="middle" x={x} y={y} dy=".33em" fontSize={9}>
      {children}
    </text>
  );
}

export default ({
  width,
  height,
  margin = {
    top: 30,
    left: 20,
    right: 20,
    bottom: 110
  }
}) => {
  const radius = Math.min(width, height) / 2;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="gradients" />
      <rect x={0} y={0} rx={14} width={width} height={height} fill="url('#gradients')" />
      <Group top={height / 2 - margin.top} left={width / 2}>
        <Pie
          data={browsers}
          pieValue={usage}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          cornerRadius={3}
          padAngle={0}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const [x, y] = pie.path.centroid(arc);
              const { startAngle, endAngle } = arc;
              return (
                <g key={\`pie1-arc-\${i}\`}>
                  <path d={pie.path(arc)} fill={'#FFFFFF'} fillOpacity={1 / (i + 2)} />
                  {endAngle - startAngle >= 0.1 && (
                    <Label x={x} y={y}>
                      {arc.data.label}
                    </Label>
                  )}
                </g>
              );
            });
          }}
        </Pie>
        <Pie
          data={letters}
          pieValue={frequency}
          outerRadius={radius - 135}
          fill="black"
          fillOpacity={0.4}
          stroke={'white'}
          strokeWidth={2}
          strokeOpacity={0.1}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            return (
              <Label x={x} y={y}>
                {arc.data.letter}
              </Label>
            );
          }}
        />
      </Group>
    </svg>
  );
};`}
    </Show>
  );
};
