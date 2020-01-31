import React from 'react';

import config from 'config';
import { getShowcaseStories } from 'lib/api';
import { AboutDominion } from 'components/About';
import Data from 'components/Data';

import Header from 'components/Header';
import HomeHero from 'components/Hero/HomeHero';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

function Home({ showcaseStories }) {
  return (
    <Page>
      <Header {...config}>
        <HomeHero />
      </Header>
      <Showcase stories={showcaseStories} />
      <Video dominion={config} />
      <Data dominion={config} />
      <AboutDominion dominion={config} />
    </Page>
  );
}

Home.getInitialProps = async () => {
  const showcaseStories = await getShowcaseStories();
  return { showcaseStories };
};

export default Home;
