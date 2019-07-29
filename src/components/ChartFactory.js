import React from 'react';
import { BarChart, PieChart } from '@codeforafrica/hurumap-ui';

export default class ChartFactory {
  static build(chartType, data, comparisonData) {
    if (!data || data.length === 0) {
      return null;
    }
    const isComparison = data && comparisonData;
    switch (chartType) {
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
