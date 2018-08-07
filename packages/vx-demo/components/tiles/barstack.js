import { AxisBottom } from '@vx/axis';
import { Grid } from '@vx/grid';
import { LegendOrdinal } from '@vx/legend';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarStack } from '@vx/shape';
import { Tooltip, withTooltip } from '@vx/tooltip';
import { max } from 'd3-array';
import { timeFormat, timeParse } from 'd3-time-format';
import React from 'react';

const data = cityTemperature.slice(0, 12);

const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const x = d => d.date;
const y = d => d.value;

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
    events = false,
    margin = {
      top: 40
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width;
    const yMax = height - margin.top - 100;

    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.2,
      tickFormat: () => val => formatDate(val)
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, max(totals)]
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ['#6c5efb', '#c998ff', '#a44afe']
    });

    let tooltipTimeout;

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={`#eaedff`} rx={14} />
          <Grid
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={'black'}
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          />
          <BarStack
            top={margin.top}
            data={data}
            keys={keys}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
          >
            {bar => {
              return (
                <rect
                  key={`bar-group-bar-${bar.index}-${bar.seriesIndex}`}
                  width={bar.barWidth}
                  height={bar.barHeight}
                  x={bar.x}
                  y={bar.y}
                  fill={bar.barColor}
                  onClick={event => {
                    if (!events) return;
                    alert(
                      `clicked: ${JSON.stringify({ date: bar.format(bar.x0), ...bar }, null, 4)}`
                    );
                  }}
                  onMouseLeave={event => {
                    tooltipTimeout = setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}
                  onMouseMove={event => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    const top = event.clientY - margin.top - bar.barHeight;
                    const left = bar.x + bar.barWidth + (bar.paddingInner * bar.step) / 2;
                    showTooltip({
                      tooltipData: bar,
                      tooltipTop: top,
                      tooltipLeft: left
                    });
                  }}
                />
              );
            }}
          </BarStack>
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            stroke="#a44afe"
            tickStroke="#a44afe"
            tickLabelProps={(value, index) => ({
              fill: '#a44afe',
              fontSize: 11,
              textAnchor: 'middle'
            })}
          />
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
            <div style={{ color: zScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.value}℉</div>
            <div>
              <small>{tooltipData.format(tooltipData.x0)}</small>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);
