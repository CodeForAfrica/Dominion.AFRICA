import React from 'react';
import { HomePageHeader } from '../components/Header';
import Showcase from '../components/Showcase';
import Video from '../components/Video';
import Data from '../components/Data';
import { AboutDominion } from '../components/About';
import Page from '../components/Page';
import config from '../config';

function Home() {
  return (
    <Page>
      <HomePageHeader dominion={config} profile={{}} />
      <Showcase dominion={config} showcaseStories={config.showCaseStories} />
      <Video dominion={config} />
      <Data dominion={config} />
      <AboutDominion dominion={config} />
    </Page>
  );
}

export default Home;
