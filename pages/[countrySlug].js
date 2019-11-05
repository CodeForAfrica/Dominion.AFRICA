import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import config from 'dominion.config';
import AppContext from 'AppContext';
import { AboutCountry } from 'components/About';
import { CountryPageHeader } from 'components/Header';
import CountryPartners from 'components/CountryPartners';
import HowItWorks from 'components/HowItWorks';
import Page from 'components/Page';
import Showcase from 'components/Showcase';
import Video from 'components/Video';

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

  return (
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
  );
}

export default Country;
