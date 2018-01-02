import React from 'react';
import { shallow } from 'enzyme';
import { Albers } from '../es/vx-geo.production';

describe('<Albers />', () => {
  test('it should be defined', () => {
    expect(Albers).toBeDefined();
  });
});
