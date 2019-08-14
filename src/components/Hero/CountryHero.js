import React, { useCallback } from 'react';

import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MapIt } from '@codeforafrica/hurumap-ui';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
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
    marginTop: '2rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '5rem'
    }
  },
  titleGrid: {
    pointerEvents: 'none',
    [theme.breakpoints.up('md')]: {
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
      whiteSpace: 'nowrap',
      width: '100%'
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
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '72% !important',
      height: '460px !important',
      maxHeight: '460px !important',
      maxWidth: '829px !important'
    }
  }
});

function CountryHero({ classes, history, toggleModal, dominion, width }) {
  const { selectedCountry = { name: '' } } = dominion;
  const onClickGeoLayer = useCallback(area => {
    history.push(`/profile/${area.codes[config.MAPIT.codeType]}`);
  }, []);
  return (
    <Hero classes={{ root: classes.root }}>
      <HeroTitleGrid classes={{ titleTextGrid: classes.titleGrid }}>
        <HeroTitle classes={{ title: classes.countryName }}>
          {selectedCountry.name}
        </HeroTitle>
        <HeroDescription classes={{ body2: classes.description }}>
          Dominion makes data available to help add context and authority to{' '}
          {isWidthUp('md', width) && <br />}
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
          onClickGeoLayer={onClickGeoLayer}
        />
      </div>
    </Hero>
  );
}

CountryHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  toggleModal: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default withRouter(withWidth()(withStyles(styles)(CountryHero)));
