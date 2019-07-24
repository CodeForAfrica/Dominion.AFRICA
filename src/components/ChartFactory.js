import React from 'react';
import { BarChart, PieChart } from '@codeforafrica/hurumap-ui';

export default class ChartFactory {
  static build(chart) {
    if (chart.table_data.is_missing) {
      return null;
    }
    const data = chart.table_data;
    switch (chart.chart) {
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
        return (
          <BarChart
            height={200}
            data={Object.keys(data)
              .filter(key => key !== 'metadata')
              .map(key => ({
                x: key,
                y: data[key].values.this
              }))}
          />
        );
      default:
        return null;
    }
  }
}
