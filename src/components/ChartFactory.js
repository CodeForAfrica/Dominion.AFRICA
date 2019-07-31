import React from 'react';
import {
  BarChart,
  PieChart,
  NestedProportionalAreaChart
} from '@codeforafrica/hurumap-ui';

export default class ChartFactory {
  static build(
    {
      id: chartId,
      type: chartType,
      label,
      reference: { label: referenceLabel }
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
    const comparisonData = comparisonDatas && comparisonDatas[chartId].nodes;
    const data = datas[chartId].nodes;
    const refrenceData =
      datas[`${chartId}Reference`] && datas[`${chartId}Reference`].nodes;
    switch (chartType) {
      case 'square_nested_proportional_area':
      case 'circle_nested_proportional_area':
        if (isComparison) {
          return (
            <NestedProportionalAreaChart
              square={chartType === 'square_nested_proportional_area'}
              width={650}
              height={500}
              groupSpacing={8}
              data={[
                {
                  x: data.reduce((a, b) => a + b.y, 0),
                  label: data[0].label || profiles.profile[label]
                },
                {
                  x: comparisonData.reduce((a, b) => a + b.y, 0),
                  label:
                    comparisonData[0].label ||
                    profiles.comparisonProfile[label] ||
                    label
                }
              ]}
              reference={[
                {
                  x: refrenceData.reduce((a, b) => a + b.y, 0),
                  label:
                    refrenceData[0].label ||
                    // Default refrence label is the chart label
                    profiles.parentProfile[referenceLabel || label] ||
                    referenceLabel ||
                    label
                }
              ]}
            />
          );
        }
        return (
          <NestedProportionalAreaChart
            square={chartType === 'square_nested_proportional_area'}
            width={200}
            data={[
              {
                x: data.reduce((a, b) => a + b.y, 0),
                label: data[0].label || profiles.profile[label]
              }
            ]}
            reference={[
              {
                x: refrenceData.reduce((a, b) => a + b.y, 0),
                label:
                  refrenceData[0].label ||
                  // Default refrence label is the chart label
                  profiles.parentProfile[referenceLabel || label] ||
                  referenceLabel ||
                  label
              }
            ]}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={Object.keys(data)
              .filter(key => key !== 'metadata')
              .map(key => ({
                x: key,
                y: data[key].values.this
              }))}
          />
        );
      case 'grouped_column':
        return (
          <BarChart
            height={200}
            data={Object.keys(data)
              .filter(key => key !== 'metadata')
              .map(key => ({
                label: key,
                data: Object.keys(data[key])
                  .filter(innerKey => innerKey !== 'metadata')
                  .map(innerKey => ({
                    x: `${innerKey}`,
                    y: data[key][innerKey].values.this
                  }))
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
