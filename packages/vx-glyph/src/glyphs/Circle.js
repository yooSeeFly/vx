import cx from 'classnames';
import { symbol, symbolCircle } from 'd3-shape';
import React from 'react';
import Glyph from './Glyph';

export default function GlyphCircle({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolCircle);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-circle', className)} d={path()} {...restProps} />
      {children}
    </Glyph>
  );
}
