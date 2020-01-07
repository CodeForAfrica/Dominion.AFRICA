import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import withApollo from 'lib/withApollo';

import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';
import visualLoader from '@codeforafrica/hurumap-ui/factory/utils/visualLoader';

import config from 'config';
import logo from 'assets/images/logos/dominion-logo-small.png';

import theme from '../../theme';

const COLOR_SCALE = ['#696969', '#8D8D8C', '#A9A9A9', '#C0C0C0', '#D3D3D3'];

const ChartContainer = dynamic(
  () => import('@codeforafrica/hurumap-ui/core/ChartContainer'),
  {
    ssr: false
  }
);

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
  },
  descriptionWrapper: {
    width: '70%',
    marginTop: '3.42rem'
  },
  description: {
    fontWeight: '500',
    fontSize: '0.857rem',
    lineHeight: '1.92'
  }
}));

function FeaturedData({ selectedCountry }) {
  const classes = useStyles();
  theme.chart.colorScale = COLOR_SCALE;
  theme.chart.pie.colorScale = COLOR_SCALE;
  const featuredCharts = {
    kenya: [],
    'south-africa': [
      {
        title:
          "Number of people living in workers' hostels per population group",
        subtitle: '',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        sourceLink:
          'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
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
            id: 'visual-oSOUhVXyP',
            queryAlias: 'viz0'
          }
        ],
        id: 'chart-jLe6B2KjU',
        queryAlias: 'chart0',
        sectionId: 'section-K-fkSD-f'
      },
      {
        title: "Number of people living in workers' hostel per gender",
        subtitle: '',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        sourceLink:
          'http://www.statssa.gov.za/publications/P0318/P03182018.pdf',
        sourceTitle: 'General Household Survey, 2018',
        visuals: [
          {
            type: 'pie',
            table: 'allWorkersHostelGenders',
            x: 'workersHostelGender',
            y: 'total',
            aggregate: ':percent',
            customUnit: '%',
            id: 'visual-qNhYgZBE',
            queryAlias: 'viz1'
          }
        ],
        id: 'chart-HtZtHlMi',
        queryAlias: 'chart1',
        sectionId: 'section-K-fkSD-f'
      }
    ]
  };

  const visuals = useMemo(
    () =>
      featuredCharts[selectedCountry.slug]
        .map(x => x.visuals)
        .reduce((a, b) => a.concat(b)),
    [selectedCountry.slug]
  );

  const geoId = `country-${selectedCountry.code}`;
  const comparisonGeoId = null;
  const profile = null;

  const chartData = visualLoader({
    geoId,
    comparisonGeoId,
    visuals,
    profile
  });

  const chartComponents = useMemo(
    () =>
      featuredCharts[selectedCountry.slug].map(chart => (
        <Grid key={chart.id} item xs={12} md={6}>
          <ChartContainer
            key={chart.id}
            loading={chartData.isLoading}
            title={chart.title}
            subtitle={chart.subtitle}
            description={chart.description}
            sourceLink={chart.sourceLink}
            sourceTitle={chart.sourceTitle}
            classes={{
              title: classes.chartTitle,
              subtitle: classes.chartSubtitle,
              sourceLink: classes.sourceLink,
              descriptionWrapper: classes.descriptionWrapper,
              description: classes.description
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
                  theme={theme}
                  key={visual.id}
                  definition={visual}
                  data={chartData.profileVisualsData[visual.queryAlias].nodes}
                />
              ))}
          </ChartContainer>
        </Grid>
      )),
    [chartData, classes, geoId, selectedCountry.slug]
  );

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
        <Grid item container spacing={4}>
          {chartComponents}
        </Grid>
      </Grid>
    </div>
  );
}

FeaturedData.propTypes = {
  selectedCountry: PropTypes.shape({}).isRequired
};

export default withApollo(FeaturedData);
