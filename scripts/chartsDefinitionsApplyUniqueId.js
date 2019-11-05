/** This file runs under node and hence shouldn't contain
 * any `processable` syntax
 */
/* eslint-disable module-resolver/use-alias */
const fs = require('fs');
const shortid = require('shortid');
const sectionedCharts = require('../data/charts.json');

sectionedCharts.forEach(section => {
  if (!section.id) {
    // eslint-disable-next-line no-param-reassign
    section.id = `section-${shortid.generate()}`;
  }
  section.charts.forEach(chart => {
    if (!chart.id) {
      // eslint-disable-next-line no-param-reassign
      chart.id = `chart-${shortid.generate()}`;
    }
    chart.visuals.forEach(visual => {
      if (!visual.id) {
        // eslint-disable-next-line no-param-reassign
        visual.id = `visual-${shortid.generate()}`;
      }
    });
  });
});

fs.writeFileSync(
  `${__dirname}/../data/charts.json`,
  JSON.stringify(sectionedCharts, null, 2)
);

// eslint-disable-next-line no-console
console.log('Done.');
