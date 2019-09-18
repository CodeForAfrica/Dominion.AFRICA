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
    reference: { label: referenceLabel } = {},
    aggregate,
    unit = '',
    subtitle,
    description,
    props = {}
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

  const numberFormatter = new Intl.NumberFormat('en-GB', {
    maximumSignificantDigits: 2
  });
  const { horizontal } = props;

  const formatLabelValue = value => {
    const [, format] = aggregate.split(':');
    return numberFormatter.format(value) + (format === 'percent' ? '%' : unit);
  };

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
            {...props}
          />
        </div>
      );
    }
    case 'pie': {
      const height = props.height || theme.chart.pie.height;

      return (
        <div style={{ height }}>
          <PieChart
            key={key}
            data={primaryData}
            donut
            donutLabelKey={{ dataIndex: 0, sortKey: '' }}
            style={{
              labels: {
                fontFamily: theme.typography.fontFamily,
                fill: 'black'
              }
            }}
            theme={theme.chart}
            {...props}
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
            {...props}
          />
        </div>
      );
    }
    case 'grouped_column': {
      const barCount = primaryData[0].length;
      const offset = props.offset || theme.chart.bar.offset;
      const { domainPadding } = theme.chart.bar;
      const computedSize =
        primaryData.length * barCount * offset +
        domainPadding.x[0] +
        domainPadding.x[1];
      const height = props.height || theme.chart.bar.height;
      const computedWidth = horizontal ? height : computedSize;
      const computedHeight = horizontal ? computedSize : height;

      return (
        <div style={{ width: computedWidth, height: computedHeight }}>
          <BarChart
            data={primaryData}
            domainPadding={domainPadding}
            key={key}
            height={computedHeight}
            horizontal={horizontal}
            labels={datum => formatLabelValue(datum.y)}
            offset={offset}
            parts={{
              axis: {
                independent: {
                  style: {
                    axis: {
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
            {...props}
          />
        </div>
      );
    }
    case 'column': {
      const barCount = isComparison ? 2 : 1;
      const offset = props.offset || theme.chart.bar.offset;
      const { domainPadding } = theme.chart.bar;
      const computedSize =
        primaryData.length * barCount * offset +
        domainPadding.x[0] +
        domainPadding.x[1];
      const height = props.height || theme.chart.height;
      const computedWidth = horizontal ? height : computedSize;
      const computedHeight = horizontal ? computedSize : height;
      if (isComparison) {
        const processedComparisonData = aggregate
          ? aggregateData(aggregate, comparisonData)
          : comparisonData;

        return (
          <div style={{ width: computedWidth, height: computedHeight }}>
            <BarChart
              data={[primaryData, processedComparisonData]}
              domainPadding={domainPadding}
              key={key}
              height={computedHeight}
              horizontal={horizontal}
              labels={datum => formatLabelValue(datum.y)}
              parts={{
                axis: {
                  independent: {
                    style: {
                      axis: {
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
              {...props}
            />
          </div>
        );
      }

      return (
        <div style={{ width: computedWidth, height: computedHeight }}>
          <BarChart
            data={primaryData}
            domainPadding={domainPadding}
            key={key}
            height={computedHeight}
            horizontal={horizontal}
            labels={datum => formatLabelValue(datum.y)}
            parts={{
              axis: {
                independent: {
                  style: {
                    axis: {
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
            {...props}
          />
        </div>
      );
    }
    default:
      return null;
  }
}
