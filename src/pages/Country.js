import React from 'react';
import PropTypes from 'prop-types';
import { CountryPageHeader } from '../components/Header';
import HowItWorks from '../components/HowItWorks';
import { AboutCountry } from '../components/About';
import Showcase from '../components/Showcase';
import Video from '../components/Video';
import Page from '../components/Page';
import config from '../config';

function Country({ country }) {
  const selectedCountry = config.countries[country];
  return (
    <Page>
      <CountryPageHeader dominion={config} profile={{}} />
      <AboutCountry dominion={{ ...config, selectedCountry }} />
      <HowItWorks dominion={config} />
      <Video dominion={config} />
      <Showcase
        dominion={{ ...config, selectedCountry }}
        showcaseStories={config.showCaseStories}
      />
    </Page>
  );
}

Country.propTypes = {
  country: PropTypes.string.isRequired
};

export default Country;
