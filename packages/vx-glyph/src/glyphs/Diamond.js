import cx from 'classnames';
import { symbol, symbolDiamond } from 'd3-shape';
import React from 'react';
import Glyph from './Glyph';

export default function GlyphDiamond({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolDiamond);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-diamond', className)} d={path()} {...restProps} />
      {children}
    </Glyph>
  );
}
