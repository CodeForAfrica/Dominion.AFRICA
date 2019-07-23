import React from 'react';

import Header from './Header';

import HomeHero from '../Hero/HomeHero';
import ResourceHero from '../Hero/ResourceHero';
import CountryHero from '../Hero/CountryHero';
import ProfileHero from '../Hero/ProfileHero';

export function HomePageHeader(props) {
  return (
    <Header {...props}>
      <HomeHero />
    </Header>
  );
}

export function ResourcePageHeader(props) {
  return (
    <Header {...props}>
      <ResourceHero />
    </Header>
  );
}

export function CountryPageHeader(props) {
  return (
    <Header {...props}>
      <CountryHero />
    </Header>
  );
}

export function ProfilePageHeader(props) {
  return (
    <Header {...props}>
      <ProfileHero />
    </Header>
  );
}
