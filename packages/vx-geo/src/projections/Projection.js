import { Group } from '@vx/group';
import cx from 'classnames';
import { geoAlbers, geoMercator, geoNaturalEarth1, geoOrthographic, geoPath } from 'd3-geo';
import PropTypes from 'prop-types';
import React from 'react';
import Graticule from '../graticule/Graticule';

// TODO: Implement all projections of d3-geo
const projectionMapping = {
  orthographic: () => geoOrthographic(),
  albers: () => geoAlbers(),
  mercator: () => geoMercator(),
  naturalEarth: () => geoNaturalEarth1()
};

/**
 * Component for all projections.
 */
export default function Projection({
  data,
  projection = 'mercator',
  projectionFunc,
  clipAngle,
  clipExtent,
  scale,
  translate,
  center,
  rotate,
  precision,
  fitExtent,
  fitSize,
  centroid,
  graticule,
  graticuleLines,
  graticuleOutline,
  className,
  innerRef,
  pointRadius,
  children,
  ...restProps
}) {
  const currProjection = projectionMapping[projection]();

  if (clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent) currProjection.clipExtent(clipExtent);
  if (scale) currProjection.scale(scale);
  if (translate) currProjection.translate(translate);
  if (center) currProjection.center(center);
  if (rotate) currProjection.rotate(rotate);
  if (precision) currProjection.rotate(precision);
  if (fitExtent) currProjection.fitExtent(...fitExtent);
  if (fitSize) currProjection.fitSize(...fitSize);

  const path = geoPath().projection(currProjection);

  if (pointRadius) path.pointRadius(pointRadius);

  return (
    <Group className={`vx-geo`}>
      {graticule && !graticule.foreground && <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines &&
        !graticuleLines.foreground && <Graticule lines={g => path(g)} {...graticuleLines} />}
      {graticuleOutline &&
        !graticuleOutline.foreground && <Graticule outline={g => path(g)} {...graticuleOutline} />}

      {data.map((feature, i) => {
        let c;
        if (centroid) c = path.centroid(feature);
        const mapFeature = {
          path,
          feature,
          projection: currProjection,
          index: i,
          centroid: path.centroid(feature),
          d: path(feature)
        };
        if (children) return children(mapFeature);
        return (
          <g key={`${projection}-${i}`}>
            <path
              className={cx(`vx-geo-${projection}`, className)}
              d={mapFeature.d}
              ref={innerRef && innerRef(mapFeature.feature, i)}
              {...restProps}
            />
            {centroid && centroid(c, mapFeature.feature)}
          </g>
        );
      })}

      {projectionFunc && projectionFunc(currProjection)}

      {graticule && graticule.foreground && <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines &&
        graticuleLines.foreground && <Graticule lines={g => path(g)} {...graticuleLines} />}
      {graticuleOutline &&
        graticuleOutline.foreground && <Graticule outline={g => path(g)} {...graticuleOutline} />}
    </Group>
  );
}

Projection.propTypes = {
  data: PropTypes.array.isRequired,
  projection: PropTypes.string,
  projectionFunc: PropTypes.func,
  clipAngle: PropTypes.number,
  clipExtent: PropTypes.array,
  scale: PropTypes.number,
  translate: PropTypes.array,
  center: PropTypes.array,
  rotate: PropTypes.array,
  precision: PropTypes.number,
  fitExtent: PropTypes.array,
  fitSize: PropTypes.array,
  centroid: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.func
};
