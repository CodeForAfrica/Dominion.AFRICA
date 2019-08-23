import React from 'react';
import {
  BarChart,
  PieChart,
  NestedProportionalAreaChart
} from '@codeforafrica/hurumap-ui';
import aggregateData from '../utils/aggregateData';

export default class ChartFactory {
  static build(
    {
      id: visualId,
      type: visualType,
      label,
      horizontal,
      reference: { label: referenceLabel } = {},
      aggregate,
      width,
      height,
      barWidth
    },
    datas,
    comparisonDatas,
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
  ) {
    if (!datas) {
      return null;
    }
    const numberFormatter = new Intl.NumberFormat('en-IN');
    const key =
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36);
    const isComparison = datas && comparisonDatas;
    const comparisonData = comparisonDatas && comparisonDatas[visualId].nodes;
    const data = datas[visualId].nodes;
    const refrenceData = datas[`${visualId}Reference`]
      ? datas[`${visualId}Reference`].nodes
      : [];
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
          // Due to responsiveness of nstedchart
          <div>
            <NestedProportionalAreaChart
              key={key}
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
      case 'pie':
        return (
          // Due to responsiveness of piechart
          <div>
            <PieChart
              key={key}
              width={width}
              height={height}
              data={!aggregate ? data : aggregateData(aggregate, data)}
            />
          </div>
        );
      case 'grouped_column':
        return (
          <BarChart
            key={key}
            responsive
            width={width}
            height={height || 200}
            barWidth={barWidth || 50}
            horizontal={horizontal}
            labels={datum => numberFormatter.format(datum.y)}
            // Disable tooltip behaviour
            labelComponent={undefined}
            data={[...new Set(data.map(d => d.groupBy))].map(group => ({
              label: group,
              data: !aggregate
                ? data.filter(d => d.groupBy === group)
                : aggregateData(
                    aggregate,
                    data.filter(d => d.groupBy === group)
                  )
            }))}
          />
        );
      case 'column':
        if (isComparison) {
          const pData = !aggregate ? data : aggregateData(aggregate, data);
          const pComparisonData = !aggregate
            ? comparisonData
            : aggregateData(aggregate, comparisonData);
          return (
            <BarChart
              key={key}
              responsive
              width={width}
              height={height || 200}
              barWidth={barWidth || 100}
              horizontal={horizontal}
              labels={datum => numberFormatter.format(datum.y)}
              // Disable tooltip behaviour
              labelComponent={undefined}
              data={pData.map(d => ({
                label: d.x[0].toUpperCase() + d.x.slice(1),
                data: [
                  {
                    x: 'Country 1',
                    y: d.y
                  },
                  {
                    x: 'Country 2',
                    y: pComparisonData.find(z => z.x === d.x)
                      ? pComparisonData.find(z => z.x === d.x).y
                      : null
                  }
                ]
              }))}
            />
          );
        }
        return (
          <BarChart
            key={key}
            responsive
            width={width}
            height={height || 200}
            barWidth={barWidth || 100}
            labels={datum => numberFormatter.format(datum.y)}
            // Disable tooltip behaviour
            labelComponent={undefined}
            horizontal={horizontal}
            data={!aggregate ? data : aggregateData(aggregate, data)}
          />
        );
      default:
        return null;
    }
  }
}
