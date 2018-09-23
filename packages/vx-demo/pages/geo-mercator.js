import React from 'react';
import Show from '../components/show';
import GeoMercator from '../components/tiles/geo-mercator';

export default () => {
  return (
    <Show events component={GeoMercator} title="Geo Mercator">
      {`import React from 'react';
import { Mercator } from '@vx/geo';
import { LinearGradient } from '@vx/gradient';
import { scaleQuantize } from '@vx/scale';
import * as topojson from 'topojson-client';
import topology from '../../static/vx-geo/world-topo.json';

export default ({ width, height }) => {
  const world = topojson.feature(topology, topology.objects.units);

  const color = scaleQuantize({
    domain: [
      Math.min(...world.features.map(f => f.geometry.coordinates.length)),
      Math.max(...world.features.map(f => f.geometry.coordinates.length))
    ],
    range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48']
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id="geo_mercator_radial" from="#dc22af" to="#fd7e0f" r={'80%'} />
      <rect x={0} y={0} width={width} height={height} fill="#f9f7e8" rx={14} />
      <Mercator
        data={world.features}
        scale={(width / 630) * 100}
        translate={[width / 2, height / 2 + 50]}
        graticule={{
          stroke: 'rgba(33,33,33,0.05)'
        }}
      >
        {map => {
          return map.features.map(f => {
            return (
              <path
                key={\`feature-\${f.index}\`}
                d={f.d}
                fill={color(f.feature.geometry.coordinates.length)}
                stroke={'#f9f7e8'}
                strokeWidth={0.5}
                onClick={event => {
                  alert(\`clicked: \${f.feature.properties.name} (\${f.feature.id})\`);
                }}
              />
            );
          });
        }}
      </Mercator>
    </svg>
  );
};
`}
    </Show>
  );
};
