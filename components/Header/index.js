import React from 'react';

import HomeHero from 'components/Hero/HomeHero';
import TitleHero from 'components/Hero/TitleHero';
import CountryHero from 'components/Hero/CountryHero';
import ProfileHero from 'components/Hero/ProfileHero';

import Header from './Header';

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
  const { dominion } = props;
  return (
    <Header {...props}>
      <CountryHero dominion={dominion} />
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
