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
  const [selectedCountry, setSelectedCountry] = useState({});
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (geoId && anotherGeoId) {
      getComparisonProfile(geoId, anotherGeoId).then(({ data }) => {
        setProfile({
          ...data,
          tabs: data.sections.map(section => ({
            name: section,
            href: `#${section}`
          }))
        });
      });
    } else {
      getProfile(geoId).then(({ data }) => {
        setSelectedCountry(data.geography.parents.country);
        setProfile({
          ...data,
          tabs: data.sections.map(section => ({
            name: section,
            href: `#${section}`
          }))
        });
      });
    }
  }, [geoId, anotherGeoId]);

  return (
    <Page>
      <ProfilePageHeader
        profile={profile}
        dominion={{ ...config, selectedCountry, head2head }}
      />

      <ProfileTabs switchToTab={() => {}} tabs={profile ? profile.tabs : []} />
      <ChartsContainer>
        {profile &&
          Object.values(profile.charts)
            .filter(chart => !chart.table_data.is_missing)
            .map(chart => (
              <ChartContainer
                item
                xs={12}
                md={8}
                title={chart.title}
                subtitle={chart.section}
              >
                {ChartFactory.build(chart)}
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
