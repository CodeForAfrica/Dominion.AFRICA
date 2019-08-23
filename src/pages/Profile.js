import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

import sectionedCharts from '../data/charts.json';
import { AppContext } from '../AppContext';
import ProfileRelease from '../components/ProfileReleases';
import ProfileSectionTitle from '../components/ProfileSectionTitle';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Sans Serif'
  },
  subtitle: {
    fontFamily: 'Sans Serif'
  },
  chartGrid: {
    display: 'none'
  }
});

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
  const [activeTab, setActiveTab] = useState('all');
  const [chartData, setChartsData] = useState({});
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
  sectionedCharts.forEach(x =>
    x.charts.forEach(y =>
      y.visuals.forEach(z => {
        // eslint-disable-next-line no-param-reassign
        z.id = `viz${index}`;
        index += 1;
      })
    )
  );

  // Flatten all charts
  const charts = sectionedCharts
    .map(x => x.charts)
    .reduce((a, b) => a.concat(b));
  const visuals = charts.map(x => x.visuals).reduce((a, b) => a.concat(b));

  // get all available profiletabs
  const profileTabs = [
    {
      name: 'All',
      href: 'all'
    },
    ...sectionedCharts
      .filter(
        section =>
          section.charts.filter(
            chart =>
              !chart.visuals.find(
                visual =>
                  !chartData.profileVisualsData ||
                  chartData.profileVisualsData[visual.id].nodes.length === 0
              )
          ).length !== 0
      )
      .map(section => ({
        name: section.sectionTitle,
        href: section.sectionSlug,
        icon: section.sectionIcon
      }))
  ];

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
          profileVisualsData,
          comparisonVisualsData
        });
      })();
    }
  }, [profiles]);

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
  }, [geoId, comparisonGeoId]);

  console.log(activeTab);
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

      <ProfileTabs switchToTab={setActiveTab} tabs={profileTabs} />
      <ChartsContainer>
        {profileTabs.slice(1).map(tab => (
          <Grid
            container
            spacing={2}
            className={classNames({
              [classes.chartGrid]: activeTab !== tab.href && activeTab !== 'all'
            })}
          >
            <ProfileSectionTitle tab={tab} />
            {sectionedCharts
              .find(x => x.sectionTitle === tab.name)
              .charts.filter(
                ({ visuals: v }) =>
                  /* data is not missing */
                  !v.find(
                    x =>
                      !chartData.profileVisualsData ||
                      chartData.profileVisualsData[x.id].nodes.length === 0
                  )
              )
              .map(chart => (
                <Grid
                  item
                  xs={12}
                  md={
                    parseFloat(
                      chart.layout.split('/').reduce((a, b) => a / b)
                    ) * 12
                  }
                >
                  <ChartContainer
                    overflowX={
                      chart.visuals.find(visual => visual.type === 'pie')
                        ? 'visible'
                        : chart.visuals.find(visual => visual.horizontal)
                        ? 'hidden'
                        : 'auto'
                    }
                    overflowY={
                      chart.visuals.find(visual => visual.type === 'pie')
                        ? 'visible'
                        : chart.visuals.find(visual => visual.horizontal)
                        ? 'auto'
                        : 'hidden'
                    }
                    title={chart.title}
                    subtitle={chart.subtitle}
                    classes={{
                      title: classes.title,
                      subtitle: classes.subtitle
                    }}
                  >
                    {chart.visuals.map(
                      visual =>
                        profiles.loaded &&
                        ChartFactory.build(
                          visual,
                          chartData.profileVisualsData,
                          chartData.comparisonVisualsData,
                          profiles
                        )
                    )}
                  </ChartContainer>
                </Grid>
              ))}
          </Grid>
        ))}
      </ChartsContainer>
      <ProfileRelease />
      <CountryPartners dominion={{ ...config, selectedCountry }} />
    </Page>
  );
}

Profile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired,
      anotherGeoId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Profile;
