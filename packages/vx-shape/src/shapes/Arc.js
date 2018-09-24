import React from 'react';
import cx from 'classnames';
import { arc as d3Arc } from 'd3-shape';

export default function Arc({
  className,
  data,
  centroid,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  children,
  ...restProps
}) {
  const arc = d3Arc();
  if (centroid) arc.centroid(centroid);
  if (innerRadius) arc.innerRadius(innerRadius);
  if (outerRadius) arc.outerRadius(outerRadius);
  if (cornerRadius) arc.cornerRadius(cornerRadius);
  if (startAngle) arc.startAngle(startAngle);
  if (endAngle) arc.endAngle(endAngle);
  if (padAngle) arc.padAngle(padAngle);
  if (padRadius) arc.padRadius(padRadius);

  const path = arc(data);
  if (children) return children({ path });

  return <path className={cx('vx-arc', className)} d={path} {...restProps} />;
}
