import React, { useEffect, useState, useContext, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { makeStyles, Grid } from '@material-ui/core';

import useProfileLoader from '@hurumap-ui/core/useProfileLoader';
import ChartFactory from '@hurumap-ui/charts/ChartFactory';

import config from '@/dominion/config';
import slugify from 'lib/utils/slugify';
import logo from 'assets/images/logos/dominion-logo-small.png';
import useChartDefinitions from 'data/useChartDefinitions';
import withApollo from 'lib/withApollo';
import AppContext from '@/dominion/AppContext';
import ChartsContainer from 'components/ChartsContainer';
import CountryPartners from 'components/CountryPartners';
import Page from 'components/Page';
import { ProfilePageHeader } from 'components/Header';
import ProfileRelease from 'components/ProfileReleases';
import ProfileSectionTitle from 'components/ProfileSectionTitle';
import ProfileTabs from 'components/ProfileTabs';

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
  chartsSection: {
    display: 'none'
  },
  sourceLink: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function Profile(props) {
  const router = useRouter();
  const { geoId, comparisonGeoId } = router.query;
  const {
    state: { selectedCountry },
    dispatch
  } = useContext(AppContext);
  const head2head = Boolean(geoId && comparisonGeoId);
  const [activeTab, setActiveTab] = useState('all');
  useEffect(() => {
    const tab = window.location.hash.slice(1)
      ? window.location.hash.slice(1)
      : 'all';
    setActiveTab(tab);
  }, []);
  const classes = useStyles(props);

  const sectionedCharts = useChartDefinitions();
  // Flatten all charts
  const charts = sectionedCharts
    .map(x => x.charts)
    .reduce((a, b) => a.concat(b));
  const [visuals] = useState(
    charts.map(x => x.visuals).reduce((a, b) => a.concat(b))
  );

  const { profiles, chartData } = useProfileLoader({
    geoId,
    comparisonGeoId,
    visuals,
    populationTables: config.populationTables
  });

  useEffect(() => {
    if (!profiles.isLoading) {
      const { geoCode } =
        profiles.parent && profiles.parent.geoLevel === 'country'
          ? profiles.parent
          : profiles.profile;
      dispatch({
        type: 'selectedCountry',
        selectedCountry: Object.values(config.countries).find(
          country => country.code === geoCode
        )
      });
    }
  }, [profiles, dispatch]);

  // get all available profile tabs
  const profileTabs = useMemo(
    () => [
      {
        title: 'All',
        slug: 'all'
      },
      ...sectionedCharts
        .map((section, i) => ({
          ...section,
          index: i
        }))
        // Filter empty sections
        .filter(
          section =>
            section.charts.filter(
              chart =>
                chartData.isLoading ||
                !chart.visuals.find(
                  ({ queryAlias }) =>
                    !chartData.profileVisualsData ||
                    chartData.profileVisualsData[queryAlias].nodes.length === 0
                )
            ).length !== 0
        )
        .map(section => ({
          title: section.sectionTitle,
          description: section.sectionDescription,
          slug: slugify(section.sectionTitle),
          icon: section.sectionIcon,
          sectionIndex: section.index,
          sectionId: section.id
        }))
    ],
    [chartData.isLoading, chartData.profileVisualsData, sectionedCharts]
  );

  /**
   * Victory renders take alot of time
   * causing a few seconds UI block which is bad UX.
   * This caches the components so they do not have to render again.
   */
  const chartComponents = useMemo(
    () =>
      profileTabs.slice(1).map(tab => (
        <Grid
          container
          spacing={2}
          id={tab.slug}
          key={tab.slug}
          className={classes.chartsSection}
        >
          <ProfileSectionTitle loading={chartData.isLoading} tab={tab} />
          {sectionedCharts[tab.sectionIndex].charts
            .filter(
              ({ visuals: v }) =>
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* data is not missing */
                  !v.find(
                    ({ queryAlias }) =>
                      chartData.profileVisualsData[queryAlias].nodes.length ===
                      0
                  ))
            )
            .map(chart => (
              <Grid
                key={chart.id}
                item
                xs={12}
                md={
                  parseFloat(chart.layout.split('/').reduce((a, b) => a / b)) *
                  12
                }
              >
                <ChartContainer
                  key={chart.id}
                  loading={chartData.isLoading}
                  title={chart.title}
                  subtitle={chart.subtitle}
                  sourceLink={chart.sourceLink}
                  sourceTitle={chart.sourceTitle}
                  classes={{
                    title: classes.title,
                    subtitle: classes.subtitle,
                    sourceLink: classes.sourceLink
                  }}
                  embed={{
                    title: 'Embed code for this chart',
                    subtitle:
                      'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
                    code: `<iframe src="${config.url}/embed/${geoId}/${tab.sectionId}/${chart.id}" />`
                  }}
                  logo={logo}
                >
                  {!chartData.isLoading &&
                    chart.visuals.map(
                      visual =>
                        !profiles.isLoading && (
                          <ChartFactory
                            key={visual.id}
                            definition={visual}
                            profiles={profiles}
                            data={
                              chartData.profileVisualsData[visual.queryAlias]
                                .nodes
                            }
                            referenceData={(() => {
                              const temp =
                                chartData.profileVisualsData[
                                  `${visual.queryAlias}Reference`
                                ];
                              return temp ? temp.nodes : [];
                            })()}
                            comparisonData={chartData.comparisonVisualsData}
                          />
                        )
                    )}
                </ChartContainer>
              </Grid>
            ))}
        </Grid>
      )),
    [chartData, classes, geoId, profileTabs, profiles, sectionedCharts]
  );

  // Show and hide sections
  useEffect(() => {
    if (activeTab === 'all') {
      profileTabs.slice(1).forEach(tab => {
        document.getElementById(tab.slug).style.display = 'flex';
      });
    } else {
      profileTabs.slice(1).forEach(tab => {
        if (tab.slug === activeTab) {
          document.getElementById(tab.slug).style.display = 'flex';
        } else {
          document.getElementById(tab.slug).style.display = 'none';
        }
      });
    }
  }, [profileTabs, activeTab]);

  const pageTitle = () => {
    const profileName = profiles && profiles.profile && profiles.profile.name;
    const profileTitle = profileName ? ` - ${profileName} - ` : ' - ';
    return `Data${profileTitle}Dominion`;
  };

  // TODO(kilemensi) Handle unknown geo or geo with missing data
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
      <Page>
        <ProfilePageHeader
          profiles={profiles}
          dominion={{
            ...config,
            selectedCountry,
            head2head
          }}
          geoId={geoId}
          comparisonGeoId={comparisonGeoId}
        />

        <ProfileTabs
          loading={chartData.isLoading}
          activeTab={activeTab}
          switchToTab={setActiveTab}
          tabs={profileTabs}
        />

        <ChartsContainer>{chartComponents}</ChartsContainer>
        <ProfileRelease />
        <CountryPartners dominion={{ ...config, selectedCountry }} />
      </Page>
    </>
  );
}

export default withApollo(Profile);
