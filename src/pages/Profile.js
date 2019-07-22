import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import { getProfile } from '../lib/api';

function Profile({
  match: {
    params: { geoId, anotherGeoId }
  }
}) {
  const head2head = Boolean(geoId && anotherGeoId);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [profile, setProfile] = useState();
  const [anotherProfile, setAnotherProfile] = useState();
  useEffect(() => {
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

    if (anotherGeoId) {
      getProfile(anotherGeoId).then(({ data }) => {
        setAnotherProfile({
          ...data,
          tabs: data.sections.map(section => ({
            name: section,
            href: `#${section}`
          }))
        });
      });
    }
  }, [geoId, anotherGeoId]);

  const getTabs = useCallback(() => {
    if (profile && anotherProfile) {
      return [...profile.tabs, ...anotherProfile.tabs];
    }
    if (profile) {
      return [...profile.tabs];
    }
    return [];
  }, [profile, anotherProfile]);
  return (
    <Page>
      <ProfilePageHeader
        profile={profile}
        anotherProfile={anotherProfile}
        dominion={{ ...config, selectedCountry, head2head }}
      />

      <ProfileTabs switchToTab={() => {}} tabs={getTabs()} />
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
