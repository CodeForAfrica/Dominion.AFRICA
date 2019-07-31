import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import { Grid } from '@material-ui/core';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import ChartFactory from '../components/ChartFactory';
import ChartsContainer from '../components/ChartsContainer';

import sectionedCharts from '../data/charts.json';
import sections from '../data/sections.json';

function Profile({
  match: {
    params: { geoId, comparisonGeoId }
  }
}) {
  const head2head = Boolean(geoId && comparisonGeoId);
  const [activeTab, setActiveTab] = useState('All');
  const [profiles, setProfiles] = useState({
    profile: {},
    parentProfile: {},
    comparisonProfile: {}
  });
  const client = useApolloClient();

  // Flatten all charts
  const charts = Object.values(sectionedCharts).reduce((a, b) => a.concat(b));

  // Build chart data query
  const chartsQuery = gql`
  query charts($geoCode: String!, $geoLevel: String!) {
    ${charts
      .map(
        chart => `${chart.id}: ${chart.table} (
      condition: { geoCode: $geoCode, geoLevel: $geoLevel }
    ) {
      nodes {
        ${
          chart.label && chart.label[0] === '$'
            ? `label: ${chart.label.slice(1)}`
            : ''
        }
        ${chart.grouped_by ? `grouped_by: ${chart.grouped_by}` : ''}
        x: ${chart.x}
        y: ${chart.y}
      }
    }
    ${
      chart.reference
        ? `${chart.id}Reference: ${chart.reference.table || chart.table} (
      condition: ${JSON.stringify(
        chart.reference.condition || { geoLevel: 'country', geoCode: 'ZA' }
      ).replace(/"([^(")"]+)":/g, '$1:')}
    ) {
      nodes {
        ${
          (chart.reference.label || chart.label) &&
          (chart.reference.label || chart.label)[0] === '$'
            ? `label: ${(chart.reference.label || chart.label).slice(1)}`
            : ''
        }
        x: ${chart.reference.x || chart.x}
        y: ${chart.reference.y || chart.y}
      }
    }`
        : ''
    }
    `
      )
      .join('')}
  }
  `;

  // Load profile chart data
  const {
    data: profileChartsData,
    loading: loadingProfileCharts,
    error: profileChartsError
  } = useQuery(chartsQuery, {
    variables: {
      geoCode: geoId.split('-')[1],
      geoLevel: geoId.split('-')[0]
    }
  });

  // Load comparison chart data
  const {
    data: comparisonChartsData,
    loading: loadingComparisonProfileCharts,
    error: comparisonProfileChartsError
  } = useQuery(chartsQuery, {
    variables: {
      geoCode: comparisonGeoId ? comparisonGeoId.split('-')[1] : '',
      geoLevel: comparisonGeoId ? comparisonGeoId.split('-')[0] : ''
    },
    // Skip this query is we are not doing a comparison
    skip: !comparisonGeoId
  });

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
        {(activeTab === 'All' ? charts : sectionedCharts[activeTab] || [])
          .filter(
            ({ id }) =>
              /* data is not missing */
              profileChartsData && profileChartsData[id].nodes.length > 0
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
                {profiles.loaded &&
                  !loadingProfileCharts &&
                  !loadingComparisonProfileCharts &&
                  !profileChartsError &&
                  !comparisonProfileChartsError &&
                  ChartFactory.build(
                    chart,
                    profileChartsData,
                    comparisonChartsData,
                    profiles
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
