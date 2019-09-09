import React, { useMemo } from 'react';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ChartFactory from '../components/ChartFactory';

import slugify from '../utils/slugify';
import useChartDefinitions from '../data/useChartDefinitions';
import useProfileLoader from '../data/useProfileLoader';

function Embed({
  match: {
    params: { geoId, sectionTitleSlug, chartTitleSlug }
  }
}) {
  const sectionedCharts = useChartDefinitions();

  const chart = useMemo(() => {
    const section = sectionedCharts.find(
      s => slugify(s.sectionTitle) === sectionTitleSlug
    );
    return section
      ? section.charts.find(c => slugify(c.title) === chartTitleSlug)
      : null;
  }, [sectionedCharts, sectionTitleSlug, chartTitleSlug]);

  const { profiles, chartData } = useProfileLoader(
    geoId,
    null,
    chart ? chart.visuals : []
  );

  if (!chart) {
    return (
      <Typography variant="body1">
        The chart requested does not exist.
      </Typography>
    );
  }

  if (
    !chartData.isLoading &&
    chart.visuals.find(
      visual => chartData.profileVisualsData[visual.id].nodes.length === 0
    )
  ) {
    return (
      <Typography variant="body1">
        The chart is missing data to visualize.
      </Typography>
    );
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <ChartContainer
        key={chart.id}
        loading={chartData.isLoading}
        title={chart.title}
        source={{
          title: 'Community Survey 2016',
          href: 'http://dev.dominion.africa'
        }}
        embed={{
          title: 'Embed code for this chart',
          subtitle:
            'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
          code: `<iframe src="https://dev.takwimu.africa/embed/${geoId}/${sectionTitleSlug}/${chartTitleSlug}" />`
        }}
      >
        {!chartData.isLoading &&
          chart.visuals.map(visual => (
            <ChartFactory
              visual={visual}
              profiles={profiles}
              data={chartData.profileVisualsData}
            />
          ))}
      </ChartContainer>
    </div>
  );
}

Embed.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired,
      sectionTitleSlug: PropTypes.string.isRequired,
      chartTitleSlug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Embed;
