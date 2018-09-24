import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

Bar.propTypes = {
  innerRef: PropTypes.func,
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default function Bar({ className, innerRef, data, x, y, width, height, ...restProps }) {
  return (
    <rect
      ref={innerRef}
      className={cx('vx-bar', className)}
      x={x}
      y={y}
      width={width}
      height={height}
      {...restProps}
    />
  );
}
