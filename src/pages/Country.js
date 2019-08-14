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

function Country({
  match: {
    params: { country }
  }
}) {
  const { dispatch } = useContext(AppContext);
  const selectedCountry = config.countries[country];

  useEffect(() => {
    dispatch({ type: 'selectedCountry', selectedCountry });
  }, []);

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
