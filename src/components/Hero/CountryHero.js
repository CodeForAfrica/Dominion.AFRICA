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
    margin: '0 9.375rem',
    [theme.breakpoints.down('md')]: {
      margin: '0 3.125rem'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
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

function CountryHero({ classes, history, toggleModal, dominion }) {
  const { selectedCountry = { name: '' } } = dominion;
  return (
    <Hero classes={{ root: classes.root }}>
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
            style={{
              pointerEvents: 'all'
            }}
            href={`/profile/country-${selectedCountry.code}`}
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
