import React from 'react';
import { BarChart, PieChart } from '@codeforafrica/hurumap-ui';

export default class ChartFactory {
  static build(chart, geographies) {
    if (chart.table_data.is_missing) {
      return null;
    }
    const data = chart.table_data;
    const isComparison = geographies && geographies.length === 2;
    switch (chart.chart) {
      case 'pie':
        if (isComparison) {
          return (
            <PieChart
              data={[
                Object.keys(data)
                  .filter(key => key !== 'metadata')
                  .map(key => ({
                    x: key,
                    y: data[key].values.this || 0
                  })),
                Object.keys(data)
                  .filter(key => key !== 'metadata')
                  .map(key => ({
                    x: key,
                    y: data[key].values[geographies[1].this.short_name]
                  }))
              ]}
            />
          );
        }
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
              data={Object.keys(data)
                .filter(key => key !== 'metadata')
                .map(key => ({
                  label: key,
                  data: geographies.map((geography, index) => ({
                    x: geography.full_name,
                    y:
                      index === 0
                        ? data[key].values.this
                        : data[key].values[geography.this.short_name]
                  }))
                }))}
            />
          );
        }
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
