import { useMemo } from 'react';
import sectionedCharts from './charts.json';

export default () =>
  useMemo(() => {
    // Provide the visuals with unique ids for fetching
    // The unique ids will be used to set alias in graphql
    let index = 0;
    let chartIndex = 0;
    sectionedCharts.forEach(x =>
      x.charts.forEach(y => {
        // eslint-disable-next-line no-param-reassign
        y.id = `chart${chartIndex}`;
        chartIndex += 1;
        y.visuals.forEach(z => {
          // eslint-disable-next-line no-param-reassign
          z.id = `viz${index}`;
          index += 1;
        });
      })
    );
    return sectionedCharts;
  }, []);
