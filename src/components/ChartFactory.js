import React, { useMemo } from 'react';
import {
  BarChart,
  PieChart,
  NestedProportionalAreaChart
} from '@codeforafrica/hurumap-ui';
import aggregateData from '../utils/aggregateData';

export default function ChartFactory({
  visual: {
    queryAlias,
    type: visualType,
    label,
    horizontal,
    reference: { label: referenceLabel } = {},
    aggregate,
    width,
    height,
    barWidth
  },
  data: datas,
  comparisonData: comparisonDatas,
  /*
   * Profiles are needed in the chart builder
   * since we have no relationships in the database
   * so we have to query profiles seperately and this is
   * a work around solution to have those profile data available to us
   * when we want to use the labels for the parent or profile.
   * This can further be used to refrence squareKms of a profile
   * but population is not available in the profile.
   */
  profiles
}) {
  const key =
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);
  const isComparison = datas && comparisonDatas;
  const comparisonData = comparisonDatas && comparisonDatas[queryAlias].nodes;
  const data = datas[queryAlias].nodes;
  const refrenceData = datas[`${queryAlias}Reference`]
    ? datas[`${queryAlias}Reference`].nodes
    : [];

  const primaryData = useMemo(() => {
    const numberFormatter = new Intl.NumberFormat('en-GB');
    if (visualType === 'column') {
      return aggregate ? aggregateData(aggregate, data) : data;
    }

    if (visualType === 'pie') {
      return (!aggregate ? data : aggregateData(aggregate, data)).map(d => ({
        ...d,
        name: d.x,
        label: `${d.x} ${numberFormatter.format(d.y)}`
      }));
    }

    let groupedData = [...new Set(data.map(d => d.groupBy))].map(group =>
      !aggregate
        ? data.filter(d => d.groupBy === group)
        : aggregateData(aggregate, data.filter(d => d.groupBy === group)).map(
            d => ({ ...d, x: group })
          )
    );

    groupedData = groupedData[0].map((_c, i) => groupedData.map(r => r[i]));
    return groupedData;
  }, [visualType, aggregate, data]);

  if (!datas) {
    return null;
  }

  const numberFormatter = new Intl.NumberFormat('en-GB');

  switch (visualType) {
    case 'square_nested_proportional_area':
    case 'circle_nested_proportional_area': {
      const dataLabel = data[0].label || profiles.profile[label];
      const summedData = data.reduce((a, b) => a + b.y, 0);
      let summedReferenceData = refrenceData.reduce((a, b) => a + b.y, 0);
      const refrenceLabel =
        (refrenceData.length && summedReferenceData
          ? refrenceData[0].label
          : dataLabel) ||
        // Default refrence label is the chart label
        profiles.parentProfile[referenceLabel || label] ||
        referenceLabel ||
        label;
      summedReferenceData =
        refrenceData.length && summedReferenceData
          ? summedReferenceData
          : summedData;
      return (
        <div style={{ width: !isComparison ? 200 : 650 }}>
          <NestedProportionalAreaChart
            key={key}
            formatNumberForLabel={x => numberFormatter.format(x)}
            square={visualType === 'square_nested_proportional_area'}
            height={isComparison && 500}
            width={!isComparison ? 200 : 650}
            groupSpacing={isComparison && 8}
            data={
              !isComparison
                ? [
                    {
                      x: summedData,
                      label: dataLabel
                    }
                  ]
                : [
                    {
                      x: summedData,
                      label: dataLabel
                    },
                    {
                      x: comparisonData.reduce((a, b) => a + b.y, 0),
                      label:
                        comparisonData[0].label ||
                        profiles.comparisonProfile[label] ||
                        label
                    }
                  ]
            }
            reference={[
              {
                x: summedReferenceData,
                label: refrenceLabel
              }
            ]}
          />
        </div>
      );
    }
    case 'pie': {
      return (
        // Due to responsiveness of piechart
        <div>
          <PieChart
            key={key}
            width={width || 400}
            height={height}
            data={primaryData}
            donutLabelKey={{ dataIndex: 0, sortKey: '' }}
          />
        </div>
      );
    }
    case 'grouped_column': {
      return (
        <div
          style={{
            width: primaryData.length * primaryData[0].length * 45,
            height: '300px'
          }}
        >
          <BarChart
            key={key}
            responsive
            offset={45}
            barWidth={40}
            width={primaryData.length * primaryData[0].length * 45}
            height={height || 300}
            horizontal={horizontal}
            labels={datum => numberFormatter.format(datum.y)}
            data={primaryData}
            parts={{
              axis: {
                labelWidth: 40,
                independent: {
                  style: {
                    tickLabels: {
                      display: 'block'
                    }
                  }
                }
              }
            }}
          />
        </div>
      );
    }
    case 'column': {
      if (isComparison) {
        const processedComparisonData = aggregate
          ? aggregateData(aggregate, comparisonData)
          : comparisonData;
        return (
          <div
            style={{
              width: primaryData.length * 2 * (barWidth || 40) + 5,
              height: '300px'
            }}
          >
            <BarChart
              key={key}
              responsive
              offset={45}
              barWidth={barWidth || 40}
              width={primaryData.length * 2 * ((barWidth || 40) + 5)}
              height={height || 300}
              horizontal={horizontal}
              labels={datum => numberFormatter.format(datum.y)}
              data={[primaryData, processedComparisonData]}
              parts={{
                axis: {
                  independent: {
                    style: {
                      axis: {
                        display: 'block'
                      },
                      ticks: {
                        display: 'block'
                      },
                      tickLabels: {
                        display: 'block'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        );
      }
      return (
        <div
          style={{
            width: primaryData.length * (barWidth || 80) + 5,
            height: '300px'
          }}
        >
          <BarChart
            key={key}
            horizontal={horizontal}
            barWidth={barWidth || 80}
            width={
              horizontal ? 200 : primaryData.length * ((barWidth || 80) + 5)
            }
            height={height || 300}
            labels={datum => numberFormatter.format(datum.y)}
            data={primaryData}
            parts={{
              axis: {
                independent: {
                  style: {
                    tickLabels: {
                      display: 'block'
                    }
                  }
                }
              }
            }}
          />
        </div>
      );
    }
    default:
      return null;
  }
}
