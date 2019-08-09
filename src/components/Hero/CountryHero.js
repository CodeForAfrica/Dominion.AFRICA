import React from 'react';

import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MapIt } from '@codeforafrica/hurumap-ui';
import { withRouter } from 'react-router-dom';

import Hero, {
  HeroTitle,
  HeroDescription,
  HeroTitleGrid,
  HeroButton
} from './Hero';
import config from '../../config';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '2rem'
  },
  titleGrid: {
    pointerEvents: 'none',
    [theme.breakpoints.up('md')]: {
      marginTop: '-4rem',
      maxWidth: '28%'
    }
  },
  countryName: {
    [theme.breakpoints.up('md')]: {
      whiteSpace: 'nowrap'
    }
  },
  description: {
    fontSize: '0.6875rem',
    [theme.breakpoints.up('md')]: {
      whiteSpace: 'nowrap'
    }
  },
  alink: {
    color: '#e7e452',
    pointerEvents: 'all'
  },
  map: {
    zIndex: 0,
    position: 'relative !important',
    backgroundColor: 'grey',
    height: '250px !important',
    left: 'unset !important',
    top: 'unset !important',
    [theme.breakpoints.up('md')]: {
      width: '72% !important',
      height: '460px !important',
      maxHeight: '460px !important',
      maxWidth: '829px !important'
    }
  }
});

function CountryHero({ classes, history, toggleModal, dominion }) {
  const { selectedCountry = { name: '' } } = dominion;
  return (
    <Hero classes={{ root: classes.root }}>
      <HeroTitleGrid classes={{ titleTextGrid: classes.titleGrid }}>
        <HeroTitle classes={{ title: classes.countryName }}>
          {selectedCountry.name}
        </HeroTitle>
        <HeroDescription classes={{ body2: classes.description }}>
          Dominion makes data available to help add context and authority to{' '}
          <br />
          public discourse and policy-making on vital issues of land ownership.
        </HeroDescription>

        <HeroButton onClick={toggleModal('search')}>Find a place</HeroButton>

        <p style={{ marginTop: '40px' }}>
          or view{' '}
          <a
            className={classes.alink}
            href={`/profile/country-${selectedCountry.code}`}
          >
            {selectedCountry.name}
          </a>
        </p>
      </HeroTitleGrid>
      <div className={classes.map}>
        <MapIt
          url={config.MAPIT.url}
          zoom={selectedCountry.zoom}
          center={selectedCountry.centre}
          codeType={config.MAPIT.codeType}
          geoLevel="country"
          geoCode={selectedCountry.code}
          onClickGeoLayer={area => {
            history.push(`/profile/${area.codes[config.MAPIT.codeType]}`);
          }}
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

export default withRouter(withStyles(styles)(CountryHero));
