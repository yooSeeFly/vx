import cx from 'classnames';
import { symbol, symbolSquare } from 'd3-shape';
import React from 'react';
import Glyph from './Glyph';

export default function GlyphSquare({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolSquare);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-square', className)} d={path()} {...restProps} />
      {children}
    </Glyph>
  );
}
