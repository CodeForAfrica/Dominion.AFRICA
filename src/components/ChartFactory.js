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
    comparisonDatas
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
        return (
          <NestedProportionalAreaChart
            square={chartType === 'square_nested_proportional_area'}
            height={450}
            data={[
              {
                x: data.reduce((a, b) => a + b.y, 0),
                label: data[0].label || label
              }
            ]}
            reference={[
              {
                x: refrenceData.reduce((a, b) => a + b.y, 0),
                label: refrenceData[0].label || referenceLabel
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
