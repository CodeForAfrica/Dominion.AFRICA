import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import { getProfile, getComparisonProfile } from '../lib/api';
import ChartFactory from '../components/ChartFactory';
import ChartsContainer from '../components/ChartsContainer';

function Profile({
  match: {
    params: { geoId, anotherGeoId }
  }
}) {
  const head2head = Boolean(geoId && anotherGeoId);
  const [activeTab, setActiveTab] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({});
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (geoId && anotherGeoId) {
      getComparisonProfile(geoId, anotherGeoId).then(({ data }) => {
        setProfile({
          ...data,
          tabs: data.sections.map(section => ({
            name: section,
            href: section
          }))
        });

        setActiveTab(data.sections[0]);
      });
    } else {
      getProfile(geoId).then(({ data }) => {
        setSelectedCountry(data.geography.parents.country);
        setProfile({
          ...data,
          tabs: data.sections.map(section => ({
            name: section,
            href: section
          }))
        });

        setActiveTab(data.sections[0]);
      });
    }
  }, [geoId, anotherGeoId]);

  return (
    <Page>
      <ProfilePageHeader
        profile={anotherGeoId ? [geoId, anotherGeoId] : [geoId]}
        dominion={{ ...config, selectedCountry, head2head }}
      />

      <ProfileTabs
        switchToTab={setActiveTab}
        tabs={profile ? profile.tabs : []}
      />
      <ChartsContainer>
        {profile &&
          Object.values(profile.charts)
            .filter(chart => !chart.table_data.is_missing)
            .filter(chart => chart.section === activeTab)
            .map(chart => (
              <ChartContainer
                item
                xs={12}
                md={8}
                overflowX="auto"
                style={{ marginBottom: 20 }}
                title={chart.title}
                subtitle={chart.section}
              >
                {ChartFactory.build(
                  chart,
                  [profile.geography, profile.comp_geography].filter(x => x)
                )}
              </ChartContainer>
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
