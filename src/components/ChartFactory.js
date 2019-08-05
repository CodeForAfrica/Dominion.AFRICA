import React from 'react';
import {
  BarChart,
  PieChart,
  NestedProportionalAreaChart
} from '@codeforafrica/hurumap-ui';

export default class ChartFactory {
  static build(
    {
      id: visualId,
      type: visualType,
      label,
      reference: { label: referenceLabel } = {}
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
    const isComparison = datas && comparisonDatas;
    const comparisonData = comparisonDatas && comparisonDatas[visualId].nodes;
    const data = datas[visualId].nodes;
    const refrenceData =
      datas[`${visualId}Reference`] && datas[`${visualId}Reference`].nodes;
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
          <NestedProportionalAreaChart
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
        );
      }
      case 'pie':
        return <PieChart data={data} />;
      case 'grouped_column':
        return (
          <BarChart
            height={200}
            data={[...new Set(data.map(d => d.groupBy))].map(group => ({
              label: group,
              data: data.filter(d => d.groupBy === group)
            }))}
          />
        );
      case 'column':
        if (isComparison) {
          return (
            <BarChart
              height={200}
              data={data.map(d => ({
                label: d.x[0].toUpperCase() + d.x.slice(1),
                data: [
                  {
                    x: 'Country 1',
                    y: d.y
                  },
                  {
                    x: 'Country 2',
                    y: comparisonData.find(z => z.x === d.x).y
                  }
                ]
              }))}
            />
          );
        }
        return <BarChart height={200} data={data} />;
      default:
        return null;
    }
  }
}
