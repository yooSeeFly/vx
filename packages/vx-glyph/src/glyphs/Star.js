import cx from 'classnames';
import { symbol, symbolStar } from 'd3-shape';
import React from 'react';
import Glyph from './Glyph';

export default function GlyphStar({ children, className, top, left, size, ...restProps }) {
  const path = symbol();
  path.type(symbolStar);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <path className={cx('vx-glyph-star', className)} d={path()} {...restProps} />
      {children}
    </Glyph>
  );
}
