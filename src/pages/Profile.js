import React, { useEffect, useState, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import { Grid } from '@material-ui/core';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import ChartFactory from '../components/ChartFactory';
import ChartsContainer from '../components/ChartsContainer';
import slugify from '../utils/slugify';

import sectionedCharts from '../data/charts.json';
import { AppContext } from '../AppContext';
import ProfileRelease from '../components/ProfileReleases';
import ProfileSectionTitle from '../components/ProfileSectionTitle';

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
  shareDropDownExploreButton: {
    color: 'black'
  },
  embedDropDownModal: {
    [theme.breakpoints.up('sm')]: {
      width: '30rem'
    }
  }
}));

function Profile({
  match: {
    params: { geoId, comparisonGeoId }
  }
}) {
  const {
    state: { selectedCountry },
    dispatch
  } = useContext(AppContext);
  const head2head = Boolean(geoId && comparisonGeoId);
  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) ? window.location.hash.slice(1) : 'all'
  );
  const [chartData, setChartsData] = useState({
    isLoading: true
  });
  const [profiles, setProfiles] = useState({
    profile: {},
    parentProfile: {},
    comparisonProfile: {}
  });
  const client = useApolloClient();
  const classes = useStyles();

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

  // Flatten all charts
  const charts = sectionedCharts
    .map(x => x.charts)
    .reduce((a, b) => a.concat(b));
  const [visuals] = useState(
    charts.map(x => x.visuals).reduce((a, b) => a.concat(b))
  );

  useEffect(() => {
    const {
      parentProfile: { geoLevel: parentLevel, geoCode: parentCode }
    } = profiles;
    if (parentLevel && parentCode) {
      // Build chart data query
      const visualsQuery = gql`
query charts($geoCode: String!, $geoLevel: String!) {
  ${visuals
    .map(
      visual => `${visual.id}: ${visual.table} (
    condition: { geoCode: $geoCode, geoLevel: $geoLevel }
  ) {
    nodes {
      ${
        visual.label && visual.label[0] === '$'
          ? `label: ${visual.label.slice(1)}`
          : ''
      }
      ${visual.groupBy ? `groupBy: ${visual.groupBy}` : ''}
      x: ${visual.x}
      y: ${visual.y}
    }
  }
  ${
    visual.reference
      ? `${visual.id}Reference: ${visual.reference.table || visual.table} (
    condition: ${JSON.stringify(
      visual.reference.condition || {
        geoLevel: parentLevel,
        geoCode: parentCode
      }
    ).replace(/"([^(")"]+)":/g, '$1:')}
  ) {
    nodes {
      ${
        (visual.reference.label || visual.label) &&
        (visual.reference.label || visual.label)[0] === '$'
          ? `label: ${(visual.reference.label || visual.label).slice(1)}`
          : ''
      }
      x: ${visual.reference.x || visual.x}
      y: ${visual.reference.y || visual.y}
    }
  }`
      : ''
  }
  `
    )
    .join('')}
}
`;

      (async () => {
        setChartsData({
          isLoading: true
        });

        // Load profile chart data
        const { data: profileVisualsData } = await client.query({
          query: visualsQuery,
          variables: {
            geoCode: geoId.split('-')[1],
            geoLevel: geoId.split('-')[0]
          }
        });

        // Load comparison chart data
        let comparisonVisualsData;
        if (comparisonGeoId) {
          const { data } = await client.query({
            query: visualsQuery,
            variables: {
              geoCode: comparisonGeoId ? comparisonGeoId.split('-')[1] : '',
              geoLevel: comparisonGeoId ? comparisonGeoId.split('-')[0] : ''
            }
          });
          comparisonVisualsData = data;
        }

        setChartsData({
          isLoading: false,
          profileVisualsData,
          comparisonVisualsData
        });
      })();
    }
  }, [geoId, comparisonGeoId, client, profiles, visuals]);

  useEffect(() => {
    function workAroundFetchGeo({ geoCode, geoLevel }) {
      return client.query({
        query: gql`
          query profile($geoCode: String!, $geoLevel: String!) {
            geo: wazimapGeographyByGeoLevelAndGeoCodeAndVersion(
              geoLevel: $geoLevel
              geoCode: $geoCode
              version: "2009"
            ) {
              geoLevel
              geoCode
              squareKms
              parentLevel
              parentCode
              longName
              name
            }
          }
        `,
        variables: {
          geoCode,
          geoLevel
        }
      });
    }

    /*
     * Since we have no relationships in the database
     * we query all profiles in this work around solution
     * to have those profile data available to us.
     */
    async function workAroundFetchProfileGeos() {
      const profile = await workAroundFetchGeo({
        geoLevel: geoId.split('-')[0],
        geoCode: geoId.split('-')[1]
      });
      const {
        data: {
          geo: { parentLevel, parentCode }
        }
      } = profile;
      let parentProfile;
      if (parentLevel === 'continent') {
        parentProfile = profile;
      } else {
        parentProfile = await workAroundFetchGeo({
          geoLevel: parentLevel,
          geoCode: parentCode
        });
      }

      let comparisonProfile;
      if (comparisonGeoId) {
        comparisonProfile = await workAroundFetchGeo({
          geoLevel: comparisonGeoId.split('-')[0],
          geoCode: comparisonGeoId.split('-')[1]
        });
      }

      dispatch({
        type: 'selectedCountry',
        selectedCountry: {
          ...parentProfile.data.geo,
          ...Object.values(config.countries).find(
            c => c.code === parentProfile.data.geo.geoCode
          )
        }
      });

      setProfiles({
        loaded: true,
        profile: profile.data.geo,
        parentProfile: parentProfile.data.geo,
        comparisonProfile: comparisonProfile ? comparisonProfile.data.geo : {}
      });
    }

    workAroundFetchProfileGeos();
  }, [geoId, comparisonGeoId, client, dispatch]);

  // get all available profiletabs
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
                  visual =>
                    !chartData.profileVisualsData ||
                    chartData.profileVisualsData[visual.id].nodes.length === 0
                )
            ).length !== 0
        )
        .map(section => ({
          title: section.sectionTitle,
          slug: slugify(section.sectionTitle),
          icon: section.sectionIcon,
          index: section.index
        }))
    ],
    [chartData.isLoading, chartData.profileVisualsData]
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
          {sectionedCharts[tab.index].charts
            .filter(
              ({ visuals: v }) =>
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* data is not missing */
                  !v.find(
                    ({ id }) =>
                      chartData.profileVisualsData[id].nodes.length === 0
                  ))
            )
            .map(chart => (
              <Grid
                key={`${chart.id}grid`}
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
                    shareDropDown: {
                      explore: classes.shareDropDownExploreButton
                    },
                    embedDropDown: {
                      modal: {
                        root: classes.embedDropDownModal
                      }
                    }
                  }}
                >
                  {!chartData.isLoading &&
                    chart.visuals.map(
                      visual =>
                        profiles.loaded && (
                          <ChartFactory
                            key={visual.id}
                            visual={visual}
                            profiles={profiles}
                            data={chartData.profileVisualsData}
                            comparisonData={chartData.comparisonVisualsData}
                          />
                        )
                    )}
                </ChartContainer>
              </Grid>
            ))}
        </Grid>
      )),
    [chartData, classes, profileTabs, profiles]
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

  return (
    <Page>
      <ProfilePageHeader
        profile={comparisonGeoId ? [geoId, comparisonGeoId] : [geoId]}
        dominion={{
          ...config,
          selectedCountry,
          head2head
        }}
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
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired,
      anotherGeoId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Profile;
