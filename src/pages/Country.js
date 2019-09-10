import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CountryPageHeader } from '../components/Header';
import HowItWorks from '../components/HowItWorks';
import { AboutCountry } from '../components/About';
import Showcase from '../components/Showcase';
import Video from '../components/Video';
import CountryPartners from '../components/CountryPartners';
import Page from '../components/Page';
import config from '../config';
import { AppContext } from '../AppContext';
import NotFound from './NotFound';

function Country({
  match: {
    params: { country }
  }
}) {
  const {
    state: { selectedCountry },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: 'selectedCountry',
      selectedCountry: config.countries[country]
    });
  }, [dispatch, country]);

  if (!selectedCountry) {
    return <NotFound />;
  }
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

Country.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({}).isRequired
  }).isRequired
};

export default Country;
