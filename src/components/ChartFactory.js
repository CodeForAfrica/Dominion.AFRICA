import React, { useMemo } from 'react';

import { useTheme } from '@material-ui/core';

import {
  BarChart,
  PieChart,
  NestedProportionalAreaChart,
  NumberVisuals
} from '@codeforafrica/hurumap-ui';
import aggregateData from '../utils/aggregateData';

export default function ChartFactory({
  visual: {
    queryAlias,
    type: visualType,
    label,
    horizontal = true,
    reference: { label: referenceLabel } = {},
    aggregate,
    subtitle,
    description
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
  const theme = useTheme();
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
        <div>
          <PieChart
            key={key}
            data={primaryData}
            donut
            donutLabelKey={{ dataIndex: 0, sortKey: '' }}
            theme={theme.chart}
          />
        </div>
      );
    }
    case 'number': {
      const dataStat = data[0].y;
      return (
        <div>
          <NumberVisuals
            key={key}
            subtitle={subtitle}
            statistic={dataStat}
            description={description}
            comparisonData={[]} // TODO: pending NumberVisuals components (HURUmap-UI) fix on this proptypes
            classes={{}} // TODO: pending NumberVisuals style configurations - update root margin
          />
        </div>
      );
    }
    case 'grouped_column': {
      const barCount = primaryData[0].length;
      const computedSize =
        primaryData.length * barCount * (theme.chart.bar.barWidth + 2) +
        2 * theme.chart.bar.domainPadding.x;
      const computedWidth = horizontal ? theme.chart.bar.height : computedSize;
      const computedHeight = horizontal ? computedSize : theme.chart.bar.height;
      console.log('grouped_column', {
        barCount,
        computedSize,
        computedHeight,
        computedWidth
      });

      return (
        <BarChart
          data={primaryData}
          key={key}
          height={computedHeight}
          horizontal={horizontal}
          labels={datum => numberFormatter.format(datum.y)}
          offset={theme.chart.bar.barWidth + 2}
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
          theme={theme.chart}
          width={computedWidth}
        />
      );
    }
    case 'column': {
      const barCount = isComparison ? 2 : 1;
      const computedSize =
        primaryData.length * barCount * theme.chart.bar.offset +
        2 * theme.chart.bar.domainPadding.x;
      const computedWidth = horizontal ? theme.chart.bar.height : computedSize;
      const computedHeight = horizontal ? computedSize : theme.chart.bar.height;
      if (isComparison) {
        const processedComparisonData = aggregate
          ? aggregateData(aggregate, comparisonData)
          : comparisonData;

        return (
          <BarChart
            data={[primaryData, processedComparisonData]}
            key={key}
            height={computedHeight}
            horizontal={horizontal}
            labels={datum => numberFormatter.format(datum.y)}
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
            theme={theme.chart}
            width={computedWidth}
          />
        );
      }

      return (
        <BarChart
          data={primaryData}
          key={key}
          height={computedHeight}
          horizontal={horizontal}
          labels={datum => numberFormatter.format(datum.y)}
          parts={{
            axis: {
              independent: {
                style: {
                  axis: {
                    display: 'block'
                  },
                  grid: {
                    display: 'block'
                  },
                  tickLabels: {
                    display: 'block'
                  }
                }
              },
              dependent: {
                style: {
                  grid: {
                    display: 'block'
                  }
                }
              }
            }
          }}
          theme={theme.chart}
          width={computedWidth}
        />
      );
    }
    default:
      return null;
  }
}
