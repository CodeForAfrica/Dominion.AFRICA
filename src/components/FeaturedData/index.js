import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';
import visualLoader from '@codeforafrica/hurumap-ui';

import config from 'config';
import logo from 'assets/images/logos/dominion-logo-small.png';

const ChartContainer = dynamic(
  () => import('@codeforafrica/hurumap-ui/core/ChartContainer'),
  {
    ssr: false
  }
);

const featuredCharts = {
  kenya: [],
  'south-africa': [
    {
      title: "Number of people living in workers' hostels per population group",
      subtitle: '',
      sourceLink: 'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
      sourceTitle: 'General Household Survey, 2018',
      layout: '1',
      visuals: [
        {
          type: 'pie',
          table: 'allWorkersHostelPopulationGroups',
          label: '',
          x: 'workersHostelPopulationGroup',
          y: 'total',
          aggregate: ':percent',
          customUnit: '%',
          id: 'visual-oSOUhVXyP'
        }
      ],
      id: 'chart-jLe6B2KjU',
      sectionId: 'section-K-fkSD-f'
    },
    {
      title: "Number of people living in workers' hostels per population group",
      subtitle: '',
      sourceLink: 'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
      sourceTitle: 'General Household Survey, 2018',
      layout: '1',
      visuals: [
        {
          type: 'pie',
          table: 'allWorkersHostelPopulationGroups',
          label: '',
          x: 'workersHostelPopulationGroup',
          y: 'total',
          aggregate: ':percent',
          customUnit: '%',
          id: 'visual-oSOUhVXyP'
        }
      ],
      id: 'chart-jLe6B2KjU',
      sectionId: 'section-K-fkSD-f'
    }
  ]
};

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: palette.primary.light
  },
  layout: {
    padding: '60px 0',
    margin: '0 auto',
    [breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  title: {
    margin: '1.375rem 0',
    [breakpoints.up('md')]: {
      width: '51.125rem'
    }
  },
  chartTtitle: {
    fontFamily: typography.fontFamily,
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '0.86px'
  },
  chartSubtitle: {
    fontFamily: typography.fontFamily,
    opacity: 0.4,
    fontSize: '12px'
  },
  chartsSection: {
    display: 'none'
  },
  sourceLink: {
    fontSize: typography.caption.fontSize
  }
}));

function FeaturedData({ selectedCountry }) {
  const classes = useStyles();
  const [visuals] = useState(
    featuredCharts[selectedCountry.slug]
      .map(x => x.visuals)
      .reduce((a, b) => a.concat(b))
  );
  const geoId = `country-${selectedCountry.code}`;
  const chartData = visualLoader({
    geoId,
    visuals
  });

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className={classes.layout}
      >
        <Typography variant="h2" className={classes.title}>
          Featured Data
        </Typography>
        <Grid item container>
          {featuredCharts[selectedCountry.slug].map(chart => (
            <Grid key={chart.id} item xs={12} md={6} spacing={2}>
              <ChartContainer
                key={chart.id}
                loading={chartData.isLoading}
                title={chart.title}
                subtitle={chart.subtitle}
                sourceLink={chart.sourceLink}
                sourceTitle={chart.sourceTitle}
                classes={{
                  title: classes.chartTitle,
                  subtitle: classes.chartSubtitle,
                  sourceLink: classes.sourceLink
                }}
                embed={{
                  title: 'Embed code for this chart',
                  subtitle:
                    'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
                  code: `<iframe src="${config.url}/embed/${chart.geoId}/${chart.sectionId}/${chart.id}" />`
                }}
                logo={logo}
              >
                {!chartData.isLoading &&
                  chart.visuals.map(visual => (
                    <ChartFactory
                      key={visual.id}
                      definition={visual}
                      data={chartData.visualsData[visual.queryAlias].nodes}
                    />
                  ))}
              </ChartContainer>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

FeaturedData.propTypes = {
  selectedCountry: PropTypes.shape({}).isRequired
};

export default FeaturedData;
