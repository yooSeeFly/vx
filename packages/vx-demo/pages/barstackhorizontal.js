import React from 'react';
import Show from '../components/show';
import BarStackHorizontal from '../components/tiles/barstackhorizontal';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 80,
        left: 80,
        right: 40,
        bottom: 100
      }}
      component={BarStackHorizontal}
      title="Bar Stack Horizontal"
    >
      {`import { AxisBottom, AxisLeft } from '@vx/axis';
import { Group } from '@vx/group';
import { LegendOrdinal } from '@vx/legend';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarStackHorizontal } from '@vx/shape';
import { Tooltip, withTooltip } from '@vx/tooltip';
import { max } from 'd3-array';
import { timeFormat, timeParse } from 'd3-time-format';
import React from 'react';

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  ret.push(t);
  return ret;
}, []);

export default withTooltip(
  ({
    width,
    height,
    margin = {
      top: 40,
      left: 50,
      right: 40,
      bottom: 100
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    // accessors
    const y = d => d.date;
    const x = d => d.value;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // // scales
    const xScale = scaleLinear({
      rangeRound: [0, xMax],
      domain: [0, max(totals)],
      nice: true
    });
    const yScale = scaleBand({
      rangeRound: [yMax, 0],
      domain: data.map(y),
      padding: 0.2,
      tickFormat: () => val => formatDate(val)
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ['#6c5efb', '#c998ff', '#a44afe']
    });

    let tooltipTimeout;

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="#eaedff" rx={14} />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={y}
              xScale={xScale}
              yScale={yScale}
              zScale={zScale}
            >
              {bar => {
                return (
                  <rect
                    key={\`bar-group-bar-horizontal-\${bar.index}-\${bar.seriesIndex}\`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.barWidth}
                    height={bar.barHeight}
                    fill={bar.barColor}
                    onClick={event => {
                      alert(
                        \`clicked: \${JSON.stringify({ date: bar.format(bar.y0), ...bar }, null, 4)}\`
                      );
                    }}
                    onMouseLeave={event => {
                      tooltipTimeout = setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={event => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: margin.top + bar.y,
                        tooltipLeft: margin.left + bar.barWidth + bar.x
                      });
                    }}
                  />
                );
              }}
            </BarStackHorizontal>
            <AxisLeft
              hideAxisLine={true}
              hideTicks={true}
              scale={yScale}
              stroke="#a44afe"
              tickStroke="#a44afe"
              tickLabelProps={(value, index) => ({
                fill: '#a44afe',
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em'
              })}
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
              stroke="#a44afe"
              tickStroke="#a44afe"
              tickLabelProps={(value, index) => ({
                fill: '#a44afe',
                fontSize: 11,
                textAnchor: 'middle'
              })}
            />
          </Group>
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top / 2 - 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          <LegendOrdinal scale={zScale} direction="row" labelMargin="0 15px 0 0" />
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white'
            }}
          >
            <div style={{ color: tooltipData.barColor }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.value}℉</div>
            <div>
              <small>{tooltipData.format(tooltipData.y0)}</small>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);`}
    </Show>
  );
};
