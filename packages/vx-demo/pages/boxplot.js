import React from 'react';
import Show from '../components/show';
import BoxPlot from '../components/tiles/boxplot';

export default () => {
  return (
    <Show events={true} margin={{ top: 80 }} component={BoxPlot} title="BoxPlot With ViolinPlot">
      {`import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { genStats } from '@vx/mock-data';
import { PatternLines } from '@vx/pattern';
import { scaleBand, scaleLinear } from '@vx/scale';
import { BoxPlot, ViolinPlot } from '@vx/stats';
import { Tooltip, withTooltip } from '@vx/tooltip';
import { format } from 'd3-format';
import React from 'react';

const data = genStats(5);
const twoDecimalFormat = format('.2f');

// accessors
const x = d => d.boxPlot.x;
const min = d => d.boxPlot.min;
const max = d => d.boxPlot.max;
const median = d => d.boxPlot.median;
const firstQuartile = d => d.boxPlot.firstQuartile;
const thirdQuartile = d => d.boxPlot.thirdQuartile;
const outliers = d => d.boxPlot.outliers;

export default withTooltip(
  ({
    width,
    height,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4
    });

    const values = data.reduce((r, { boxPlot: e }) => r.push(e.min, e.max) && r, []);
    const minYValue = Math.min(...values);
    const maxYValue = Math.max(...values);
    const yDomain = [minYValue - 0.1 * Math.abs(minYValue), maxYValue + 0.1 * Math.abs(minYValue)];

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [minYValue, maxYValue]
    });

    const boxWidth = xScale.bandwidth();
    const constrainedBoxWidth = Math.min(40, boxWidth);

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient id="boxplot" to="#8b6ce7" from="#87f2d4" />
          <rect x={0} y={0} width={width} height={height} fill={"url(#boxplot)"} rx={14} />
          <PatternLines
            id="hViolinLines"
            height={3}
            width={3}
            stroke="#ced4da"
            strokeWidth={1}
            fill="rgba(0,0,0,0.3)"
            orientation={['horizontal']}
          />
          <Group top={40}>
            {data.map((d, i) => {
              const tooltipOffset = xScale(x(d)) + constrainedBoxWidth + 3;
              return (
                <g key={i}>
                  <ViolinPlot
                    stroke="#dee2e6"
                    binData={d.binData}
                    left={xScale(x(d))}
                    width={constrainedBoxWidth}
                    valueScale={yScale}
                    fill="url(#hViolinLines)"
                  />
                  <BoxPlot
                    data={d}
                    min={min(d)}
                    max={max(d)}
                    left={xScale(x(d)) + 0.3 * constrainedBoxWidth}
                    firstQuartile={firstQuartile(d)}
                    thirdQuartile={thirdQuartile(d)}
                    median={median(d)}
                    boxWidth={constrainedBoxWidth * 0.4}
                    fill="#FFFFFF"
                    fillOpacity={0.3}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    valueScale={yScale}
                    outliers={outliers(d)}
                    minProps={{
                      onMouseOver: event => {
                        showTooltip({
                          tooltipTop: yScale(min(d)) + 40,
                          tooltipLeft: tooltipOffset,
                          tooltipData: {
                            min: min(d),
                            name: x(d)
                          }
                        });
                      },
                      onMouseLeave: event => {
                        hideTooltip();
                      }
                    }}
                    maxProps={{
                      onMouseOver: event => {
                        showTooltip({
                          tooltipTop: yScale(max(d)) + 40,
                          tooltipLeft: tooltipOffset,
                          tooltipData: {
                            max: max(d),
                            name: x(d)
                          }
                        });
                      },
                      onMouseLeave: event => {
                        hideTooltip();
                      }
                    }}
                    boxProps={{
                      onMouseOver: event => {
                        showTooltip({
                          tooltipTop: yScale(median(d)) + 40,
                          tooltipLeft: tooltipOffset,
                          tooltipData: {
                            max: max(d),
                            thirdQuartile: thirdQuartile(d),
                            median: median(d),
                            firstQuartile: firstQuartile(d),
                            min: min(d),
                            name: x(d)
                          }
                        });
                      },
                      onMouseLeave: event => {
                        hideTooltip();
                      }
                    }}
                    medianProps={{
                      style: {
                        stroke: 'white'
                      },
                      onMouseOver: event => {
                        showTooltip({
                          tooltipTop: yScale(median(d)) + 40,
                          tooltipLeft: tooltipOffset,
                          tooltipData: {
                            median: median(d),
                            name: x(d)
                          }
                        });
                      },
                      onMouseLeave: event => {
                        hideTooltip();
                      }
                    }}
                  />
                </g>
              );
            })}
          </Group>
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{ backgroundColor: '#283238', color: 'white' }}
          >
            <div>
              <strong>{tooltipData.name}</strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              {tooltipData.max && <div>max: {tooltipData.max}</div>}
              {tooltipData.thirdQuartile && <div>third quartile: {tooltipData.thirdQuartile}</div>}
              {tooltipData.median && <div>median: {tooltipData.median}</div>}
              {tooltipData.firstQuartile && <div>first quartile: {tooltipData.firstQuartile}</div>}
              {tooltipData.min && <div>min: {tooltipData.min}</div>}
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
