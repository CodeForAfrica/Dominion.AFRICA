import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Grid } from '@material-ui/core';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import { getProfile } from '../lib/api';
import ChartFactory from '../components/ChartFactory';
import ChartsContainer from '../components/ChartsContainer';

import charts from '../data/charts.json';
import sections from '../data/sections.json';

function Profile({
  match: {
    params: { geoId, anotherGeoId }
  }
}) {
  const head2head = Boolean(geoId && anotherGeoId);
  const [activeTab, setActiveTab] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({});

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
        ? `${chart.id}Reference: ${chart.reference.table} (
      condition: ${JSON.stringify(chart.reference.condition).replace(
        /"([^(")"]+)":/g,
        '$1:'
      )}
    ) {
      nodes {
        ${
          chart.reference.label && chart.reference.label[0] === '$'
            ? `label: ${chart.reference.label.slice(1)}`
            : ''
        }
        x: ${chart.reference.x}
        y: ${chart.reference.y}
      }
    }`
        : ''
    }
    `
      )
      .join('')}
  }
  `;
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
  const {
    data: anotherProfileChartsData,
    loading: loadingAnotherProfileCharts,
    error: anotherProfileChartsError
  } = useQuery(chartsQuery, {
    variables: {
      geoCode: anotherGeoId ? anotherGeoId.split('-')[1] : '',
      geoLevel: anotherGeoId ? anotherGeoId.split('-')[0] : ''
    },
    skip: !anotherGeoId
  });

  useEffect(() => {
    getProfile(geoId).then(({ data }) => {
      setSelectedCountry(data.geography.parents.country);
      setActiveTab(data.sections[0]);
    });
  }, [geoId]);

  return (
    <Page>
      <ProfilePageHeader
        profile={anotherGeoId ? [geoId, anotherGeoId] : [geoId]}
        dominion={{ ...config, selectedCountry, head2head }}
      />

      <ProfileTabs
        switchToTab={setActiveTab}
        tabs={sections.map(section => ({
          name: section,
          href: section
        }))}
      />
      <ChartsContainer>
        {charts
          .filter(
            ({ id, section }) =>
              section === activeTab &&
              /* data is not missing */
              profileChartsData &&
              profileChartsData[id].nodes.length > 0
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
                {!loadingProfileCharts &&
                  !loadingAnotherProfileCharts &&
                  !profileChartsError &&
                  !anotherProfileChartsError &&
                  ChartFactory.build(
                    chart,
                    profileChartsData,
                    anotherProfileChartsData
                  )}
              </ChartContainer>
            </Grid>
          ))}
      </ChartsContainer>
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
