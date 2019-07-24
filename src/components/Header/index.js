import React from 'react';

import Header from './Header';

import HomeHero from '../Hero/HomeHero';
import TitleHero from '../Hero/TitleHero';
import CountryHero from '../Hero/CountryHero';
import ProfileHero from '../Hero/ProfileHero';

export function HomePageHeader(props) {
  return (
    <Header {...props}>
      <HomeHero />
    </Header>
  );
}

export function TitlePageHeader({ children, ...props }) {
  return (
    <Header {...props}>
      <TitleHero>{children}</TitleHero>
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
