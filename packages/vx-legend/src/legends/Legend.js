import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import valueOrIdentity from '../util/valueOrIdentity';
import LegendItem from './LegendItem';
import LegendLabel from './LegendLabel';
import LegendShape from './LegendShape';

Legend.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  scale: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  shapeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shapeHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shapeMargin: PropTypes.string,
  labelMargin: PropTypes.string,
  itemMargin: PropTypes.string,
  direction: PropTypes.string,
  itemDirection: PropTypes.string,
  fill: PropTypes.func,
  shape: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  labelFormat: PropTypes.func,
  labelTransform: PropTypes.func,
  children: PropTypes.func
};

const defaultStyle = {
  display: 'flex'
};

export default function Legend({
  className,
  style = defaultStyle,
  shapeStyle,
  scale,
  shape,
  domain,
  fill = valueOrIdentity,
  size = valueOrIdentity,
  labelFormat = valueOrIdentity,
  labelTransform = defaultTransform,
  shapeWidth = 15,
  shapeHeight = 15,
  shapeMargin = '2px 4px 2px 0',
  labelAlign = 'left',
  labelMargin = '0 4px',
  itemMargin = '0',
  direction = 'column',
  itemDirection = 'row',
  children,
  ...restProps
}) {
  domain = domain || scale.domain();
  const labels = domain.map(labelTransform({ scale, labelFormat }));
  return (
    <div
      className={cx('vx-legend', className)}
      style={{
        ...style,
        flexDirection: direction
      }}
    >
      {labels.map((label, i) => {
        const { text } = label;
        const legendItem = {
          label,
          index: i,
          margin: itemMargin,
          direction: itemDirection
        };
        const legendShape = {
          shape,
          label,
          fill,
          size,
          height: shapeHeight,
          width: shapeWidth,
          margin: shapeMargin,
          style: shapeStyle
        };
        const legendLabel = {
          text,
          label,
          margin: labelMargin,
          align: labelAlign
        };
        if (children) return children({ legendItem, legendShape, legendLabel });
        return (
          <LegendItem
            key={`legend-${legendItem.label.text}-${legendItem.index}`}
            margin={legendItem.margin}
            flexDirection={legendItem.direction}
            label={legendItem.label}
            {...restProps}
          >
            <LegendShape
              shape={legendShape.shape}
              height={legendShape.height}
              width={legendShape.width}
              margin={legendShape.margin}
              label={legendShape.label}
              fill={legendShape.fill}
              size={legendShape.size}
              shapeStyle={legendShape.style}
            />
            <LegendLabel
              label={legendLabel.text}
              margin={legendLabel.margin}
              align={legendLabel.align}
            />
          </LegendItem>
        );
      })}
    </div>
  );
}

function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      datum: d,
      index: i,
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  };
}
