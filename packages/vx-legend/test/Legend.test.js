import { mount, shallow } from 'enzyme';
import React from 'react';
import { scaleLinear } from '../../vx-scale';
import { Legend } from '../src';

const defaultProps = {
  scale: scaleLinear({
    rangeRound: [10, 0],
    domain: [0, 10]
  })
};

describe('<Legend />', () => {
  test('it should be defined', () => {
    expect(Legend).toBeDefined();
  });

  test('it should default style to display: flex, flex-direction: column ', () => {
    const wrapper = shallow(<Legend {...defaultProps} />);
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'column'
    });
  });

  test('it should extend style prop', () => {
    const wrapper = shallow(<Legend {...defaultProps} style={{ display: 'block' }} />);
    expect(wrapper.prop('style')).toEqual({
      display: 'block',
      flexDirection: 'column'
    });
  });

  test('it should pass through direction prop to style prop', () => {
    const wrapper = shallow(<Legend {...defaultProps} direction="row" />);
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'row'
    });
  });

  test('it should pass onClick prop to <LegendItem />', () => {
    const onClick = jest.fn(event => jest.fn());
    const wrapper = mount(<Legend {...defaultProps} onClick={onClick} />);
    wrapper
      .find('LegendItem')
      .last()
      .simulate('click');
    // called once
    expect(onClick.mock.calls.length).toEqual(1);
    // called with click event
    expect(onClick.mock.calls[0][0].type).toEqual('click');
  });
});
