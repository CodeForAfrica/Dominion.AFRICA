import React from 'react';

import config from 'dominion.config';
import { AboutDominion } from 'components/About';
import Data from 'components/Data';
import { HomePageHeader } from 'components/Header';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

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
