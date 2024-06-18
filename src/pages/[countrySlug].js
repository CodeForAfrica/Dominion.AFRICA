import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import config from '@/dominion/config';
import { getShowcaseStories } from 'lib/api';
import AppContext from '@/dominion/AppContext';
import { AboutCountry } from 'components/About';
import { CountryPageHeader } from 'components/Header';
import CountryPartners from 'components/CountryPartners';
import FeaturedData from 'components/FeaturedData';
import HowItWorks from 'components/HowItWorks';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

import Error from './_error';

const supportedCountriesSlug = Object.keys(config.countries);

function Country({ showcaseStories }) {
  const {
    state: { selectedCountry },
    dispatch
  } = useContext(AppContext);
  const router = useRouter();
  const { countrySlug } = router.query;
  useEffect(() => {
    dispatch({
      type: 'selectedCountry',
      selectedCountry: config.countries[countrySlug]
    });
  }, [dispatch, countrySlug]);

  if (!(countrySlug && selectedCountry?.name)) {
    return null;
  }
  if (!supportedCountriesSlug.includes(countrySlug)) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>
          {selectedCountry?.name ? `${selectedCountry.name} - ` : ''}Dominion
        </title>
        <link
          rel="preconnect"
          href="https://mapit.hurumap.org/graphql"
          crossOrigin="anonymous"
        />
      </Head>
      <Page key={countrySlug}>
        <CountryPageHeader
          dominion={{ ...config, selectedCountry }}
          profile={{}}
        />
        <FeaturedData selectedCountry={selectedCountry} />
        <AboutCountry dominion={{ ...config, selectedCountry }} />
        <HowItWorks dominion={config} />
        <Video dominion={config} />
        <Showcase stories={showcaseStories} />
        <CountryPartners dominion={{ ...config, selectedCountry }} />
      </Page>
    </>
  );
}

export async function getStaticPaths() {
  const { countries } = config;
  return {
    paths: Object.keys(countries).map(slug => ({
      params: { countrySlug: slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const showcaseStories = await getShowcaseStories(params.countrySlug);
  return { props: { showcaseStories } };
}

export default Country;
