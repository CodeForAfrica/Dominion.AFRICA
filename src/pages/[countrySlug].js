import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import config from 'config';
import AppContext from 'AppContext';
import { AboutCountry } from 'components/About';
import { CountryPageHeader } from 'components/Header';
import CountryPartners from 'components/CountryPartners';
import HowItWorks from 'components/HowItWorks';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

import Error from './_error';

const supportedCountriesSlug = Object.keys(config.countries);

function Country() {
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

  if (!countrySlug) {
    return null;
  }
  if (!supportedCountriesSlug.includes(countrySlug)) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{selectedCountry && `${selectedCountry.name} - `}Dominion</title>
        <link
          rel="preconnect"
          href="https://mapit.hurumap.org/graphql"
          crossOrigin="anonymous"
        />
      </Head>
      <Page>
        <CountryPageHeader
          dominion={{ ...config, selectedCountry }}
          profile={{}}
        />
        <AboutCountry dominion={{ ...config, selectedCountry }} />
        <HowItWorks dominion={config} />
        <Video dominion={config} />
        <Showcase
          dominion={{ ...config, selectedCountry }}
          showcaseStories={config.showCaseStories}
        />
        <CountryPartners dominion={{ ...config, selectedCountry }} />
      </Page>
    </>
  );
}

export default Country;
