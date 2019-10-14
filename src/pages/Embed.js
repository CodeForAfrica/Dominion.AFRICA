import React, { useMemo } from 'react';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChartFactory from '../components/ChartFactory';

import useChartDefinitions from '../data/useChartDefinitions';
import useProfileLoader from '../data/useProfileLoader';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '0.86px'
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    opacity: 0.4,
    fontSize: '12px'
  },
  sourceLink: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function Embed({
  match: {
    params: { geoId, sectionId, chartId }
  }
}) {
  const classes = useStyles();
  const sectionedCharts = useChartDefinitions();

  const chart = useMemo(() => {
    const section = sectionedCharts.find(s => s.id === sectionId);
    return section ? section.charts.find(c => c.id === chartId) : null;
  }, [sectionedCharts, sectionId, chartId]);

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
      ({ queryAlias }) =>
        chartData.profileVisualsData[queryAlias].nodes.length === 0
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
        subtitle={chart.subtitle}
        classes={{
          title: classes.title,
          subtitle: classes.subtitle,
          sourceLink: classes.sourceLink
        }}
        source={{
          title: 'Community Survey 2016',
          href: 'http://dev.dominion.africa'
        }}
        embed={{
          title: 'Embed code for this chart',
          subtitle:
            'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
          code: `<iframe src="https://dev.takwimu.africa/embed/${geoId}/${sectionId}/${chartId}" />`
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
      sectionId: PropTypes.string.isRequired,
      chartId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Embed;
