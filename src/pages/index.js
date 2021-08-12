import React from 'react';

import config from 'config';
import { getShowcaseStories } from 'lib/api';
import { AboutDominion } from 'components/About';
import Data from 'components/Data';
import { HomePageHeader } from 'components/Header';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

function Home({ showcaseStories }) {
  return (
    <Page>
      <HomePageHeader dominion={config} profile={{}} />
      <Showcase stories={showcaseStories} />
      <Video dominion={config} />
      <Data dominion={config} />
      <AboutDominion dominion={config} />
    </Page>
  );
}

export async function getStaticProps() {
  const showcaseStories = await getShowcaseStories();
  return { props: { showcaseStories } };
}

export default Home;
