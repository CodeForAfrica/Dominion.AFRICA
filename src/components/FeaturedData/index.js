import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import withApollo from 'lib/withApollo';

import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';
import visualLoader from '@codeforafrica/hurumap-ui/factory/utils/visualLoader';

import { ThemeProvider } from '@material-ui/core/styles';

import config from 'config';
import logo from 'assets/images/logos/dominion-logo-small.png';
import useChartDefinitions from 'data/useChartDefinitions';
import featuredCharts from 'data/featuredCharts';

const COLOR_SCALE = ['#696969', '#8D8D8C', '#A9A9A9', '#C0C0C0', '#D3D3D3'];
const InsightContainer = dynamic(
  () => import('@codeforafrica/hurumap-ui/core/InsightContainer'),
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
  chartTitle: {
    fontFamily: typography.fontFamily,
    color: '#525e31',
    fontWeight: 'bold',
    fontSize: '0.929rem !important'
  },
  dullOrange: {
    color: '#de9f3a'
  },
  sourceLink: {
    fontSize: typography.caption.fontSize
  },
  descriptionWrapper: {
    backgroundColor: '#f1f1ed',
    padding: '3.42rem 0 0 !important',
    marginTop: '0 !important',
    '& div:first-child': {
      display: 'none'
    }
  },
  description: {
    fontWeight: '500',
    fontSize: '0.857rem',
    lineHeight: '1.92',
    marginLeft: '0 !important',
    width: '70%'
  },
  chartContainer: {
    backgroundColor: 'white'
  },
  hideHighlightGrid: {
    display: 'none'
  }
}));

function FeaturedData({ selectedCountry }) {
  const classes = useStyles();
  const theme = useTheme();
  const greyChartTheme = {
    ...theme,
    chart: {
      ...theme.chart,
      colorScale: COLOR_SCALE,
      pie: {
        ...theme.chart.pie,
        colorScale: COLOR_SCALE
      },
      area: {
        ...theme.chart.area,
        colorScale: COLOR_SCALE
      },
      group: {
        ...theme.chart.group,
        colorScale: COLOR_SCALE
      },
      bar: {
        ...theme.chart.bar,
        style: {
          ...theme.chart.bar.style,
          data: {
            ...theme.chart.bar.style.data,
            fill: COLOR_SCALE[0]
          }
        }
      }
    }
  };

  const sectionedCharts = useChartDefinitions();
  const countryFeaturedCharts = useMemo(() => {
    const countryFeaturedChartsByIds =
      featuredCharts[selectedCountry.slug] || [];

    const charts = countryFeaturedChartsByIds
      ? sectionedCharts
          .map(x => {
            const chart = x.charts.map(z => {
              return { ...z, sectionId: x.id };
            });
            return chart;
          })
          .reduce((a, b) => a.concat(b))
      : [];

    return countryFeaturedChartsByIds.map(f => {
      const chart = charts.find(c => c.id === f.id);
      return { ...chart, ...f };
    });
  }, [selectedCountry.slug, sectionedCharts]);

  const visuals = useMemo(
    () =>
      countryFeaturedCharts && countryFeaturedCharts.length !== 0
        ? countryFeaturedCharts
            .map(x => x.visuals)
            .reduce((a, b) => a.concat(b))
        : [],
    [countryFeaturedCharts]
  );

  const geoId = `country-${selectedCountry.code}`;

  const chartData = visualLoader({
    geoId,
    visuals
  });

  const chartComponents = useMemo(
    () =>
      countryFeaturedCharts &&
      countryFeaturedCharts.map((chart, index) => (
        <Grid key={chart.id} item sm={12} md={6}>
          <InsightContainer
            hideInsight
            logo={logo}
            key={chart.id}
            title={chart.title}
            subtitle={chart.subtitle}
            description={chart.description}
            source={{
              title: chart.sourceTitle,
              href: chart.sourceLink
            }}
            actions={{
              handleShare: () => {},
              handleShowData: () => {},
              handleCompare: () => {}
            }}
            classes={{
              highlightGrid: classes.hideHighlightGrid,
              containerRoot: classes.chartContainer,
              description: classes.description,
              title: classNames(classes.chartTitle, {
                [classes.dullOrange]: index !== 0
              }),
              descriptionWrapper: classes.descriptionWrapper,
              sourceLink: classes.sourceLink
            }}
            embedCode={`Embed code for this chart. \n Copy the code below, then paste into your own CMS or HTML.
             Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge. \n
              <iframe src='${config.url}/embed/${geoId}/${chart.sectionId}/${chart.id}'`}
            loading={chartData.isLoading}
          >
            <div />
            {!chartData.isLoading &&
              chart.visuals.map(visual => (
                <ChartFactory
                  key={visual.id}
                  definition={visual}
                  data={chartData.profileVisualsData[visual.queryAlias].nodes}
                />
              ))}
          </InsightContainer>
        </Grid>
      )),
    [chartData, classes, geoId, selectedCountry.slug]
  );

  if (visuals && visuals.length === 0) {
    return null;
  }

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
        <ThemeProvider theme={greyChartTheme}>
          <Grid item container spacing={4}>
            {chartComponents}
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}

FeaturedData.propTypes = {
  selectedCountry: PropTypes.shape({}).isRequired
};

export default withApollo(FeaturedData);