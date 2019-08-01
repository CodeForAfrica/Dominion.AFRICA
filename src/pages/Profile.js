import React, { useEffect, useState } from 'react';
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

import sectionedCharts from '../data/charts.json';

function Profile({
  match: {
    params: { geoId, comparisonGeoId }
  }
}) {
  const head2head = Boolean(geoId && comparisonGeoId);
  const [activeTab, setActiveTab] = useState('All');
  const [chartData, setChartsData] = useState({});
  const [profiles, setProfiles] = useState({
    profile: {},
    parentProfile: {},
    comparisonProfile: {}
  });
  const client = useApolloClient();

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

  const sections = ['All', ...sectionedCharts.map(x => x.sectionTitle)];

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
      ${visual.grouped_by ? `grouped_by: ${visual.grouped_by}` : ''}
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
          const { data } = client.query({
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

      const parentProfile = await workAroundFetchGeo({
        geoLevel: parentLevel,
        geoCode: parentCode
      });

      let comparisonProfile;
      if (comparisonGeoId) {
        comparisonProfile = await workAroundFetchGeo({
          geoLevel: comparisonGeoId.split('-')[0],
          geoCode: comparisonGeoId.split('-')[1]
        });
      }

      setProfiles({
        loaded: true,
        profile: profile.data.geo,
        parentProfile: parentProfile.data.geo,
        comparisonProfile: comparisonProfile ? comparisonProfile.data.geo : {}
      });
    }

    workAroundFetchProfileGeos();
  }, [geoId, comparisonGeoId]);

  return (
    <Page>
      <ProfilePageHeader
        profile={comparisonGeoId ? [geoId, comparisonGeoId] : [geoId]}
        dominion={{
          ...config,
          selectedCountry: profiles.parentProfile,
          head2head
        }}
      />

      <ProfileTabs
        switchToTab={setActiveTab}
        tabs={sections.map(section => ({
          name: section,
          href: section
        }))}
      />
      <ChartsContainer>
        {(activeTab === 'All'
          ? charts
          : sectionedCharts.find(x => x.sectionTitle === activeTab).charts
        )
          .filter(
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
                parseFloat(chart.layout.split('/').reduce((a, b) => a / b)) * 12
              }
            >
              <ChartContainer
                overflowX="auto"
                title={chart.title}
                subtitle={chart.subtitle}
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
      </ChartsContainer>
      <CountryPartners
        dominion={{ ...config, selectedCountry: profiles.parentProfile }}
      />
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
