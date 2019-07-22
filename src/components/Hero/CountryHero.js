import React from 'react';

import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MapIt } from '@codeforafrica/hurumap-ui';

import Hero, {
  HeroTitle,
  HeroDescription,
  HeroTitleGrid,
  HeroButton
} from './Hero';
import config from '../../config';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  titleGrid: {
    pointerEvents: 'none'
  },
  map: {
    zIndex: 0,
    position: 'relative !important',
    backgroundColor: 'grey',
    height: '250px !important',
    left: 'unset !important',
    top: 'unset !important',
    [theme.breakpoints.up('md')]: {
      position: 'absolute !important',
      right: '50px',
      width: '70% !important',
      height: '460px !important',
      maxHeight: '460px !important',
      maxWidth: '829px !important'
    },
    [theme.breakpoints.up('lg')]: {
      right: '9.375rem'
    }
  }
});

function CountryHero({ classes, toggleModal, dominion }) {
  const { selectedCountry = { name: '' } } = dominion;
  return (
    <Hero>
      <HeroTitleGrid classes={{ titleTextGrid: classes.titleGrid }}>
        <HeroTitle>{selectedCountry.name}</HeroTitle>
        <HeroDescription>
          Dominion makes data available to help add context and authority to
          public discourse and policy-making on vital issues of land ownership.
        </HeroDescription>

        <HeroButton onClick={toggleModal('search')}>Find a place</HeroButton>

        <p style={{ marginTop: '40px' }}>
          or view{' '}
          <a
            href={`/profiles/country-${selectedCountry.code}-${selectedCountry.slug}`}
          >
            {selectedCountry.name}
          </a>
        </p>
      </HeroTitleGrid>
      <div className={classes.map}>
        <MapIt
          url={config.MAPIT.url}
          codeType={config.MAPIT.codeType}
          geoLevel="country"
          geoCode={selectedCountry.code}
        />
      </div>
    </Hero>
  );
}

CountryHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default withStyles(styles)(CountryHero);
