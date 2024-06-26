import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useProfileLoader from '@hurumap-ui/core/useProfileLoader';
import ChartFactory from '@hurumap-ui/charts/ChartFactory';

import config from '@/dominion/config';
import useChartDefinitions from 'data/useChartDefinitions';
import withApollo from 'lib/withApollo';

const ChartContainer = dynamic(
  () => import('@hurumap-ui/core/ChartContainer'),
  {
    ssr: false
  }
);

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

function Embed(props) {
  const classes = useStyles(props);
  const sectionedCharts = useChartDefinitions();
  const router = useRouter();
  const { geoId, sectionId, chartId } = router.query;
  const chart = useMemo(() => {
    const section = sectionedCharts.find(s => s.id === sectionId);
    return section ? section.charts.find(c => c.id === chartId) : null;
  }, [sectionedCharts, sectionId, chartId]);

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals: chart ? chart.visuals : [],
    populationTables: config.populationTables
  });

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

  const pageTitle = () => {
    const chartTitle = chart && chart.title ? `${chart.title} - ` : '';
    const profileName = profiles && profiles.profile && profiles.profile.name;
    const profileTitle = profileName ? `${profileName} - ` : '';
    return `${chartTitle}${profileTitle}Dominion`;
  };

  return (
    <>
      <Head>
        <title>{pageTitle()}</title>
        <link
          rel="preconnect"
          href={config.MAPIT.url}
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href={config.graphqlOrigin}
          crossOrigin="anonymous"
        />
      </Head>
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
            code: `<iframe src="https://dev.dominion.africa/embed/${geoId}/${sectionId}/${chartId}" />`
          }}
        >
          {!chartData.isLoading &&
            chart.visuals.map(visual => (
              <ChartFactory
                key={visual.id}
                definition={visual}
                profiles={profiles}
                data={chartData.profileVisualsData[visual.queryAlias].nodes}
              />
            ))}
        </ChartContainer>
      </div>
    </>
  );
}

export default withApollo(Embed);
