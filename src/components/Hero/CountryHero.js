import React, { useCallback } from 'react';

import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MapIt } from '@codeforafrica/hurumap-ui';
import { Typography } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';

import Hero, {
  HeroTitle,
  HeroDescription,
  HeroTitleGrid,
  HeroButton
} from './Hero';
import config from '../../config';
import useToggleModal from '../../useToggleModal';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '32px',
    [theme.breakpoints.up('lg')]: {
      marginBottom: '80px'
    }
  },
  titleGrid: {
    pointerEvents: 'none',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '28%'
    }
  },
  countryName: {
    [theme.breakpoints.up('lg')]: {
      whiteSpace: 'nowrap'
    }
  },
  description: {
    [theme.breakpoints.up('lg')]: {
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
    height: '15.625rem !important',
    left: 'unset !important',
    top: 'unset !important',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '72% !important',
      height: '28.75rem !important',
      maxHeight: '28.75rem !important',
      maxWidth: '51.8125rem !important'
    }
  }
});

function CountryHero({ classes, width, history, dominion }) {
  const { selectedCountry = { name: '' } } = dominion;
  const { toggleModal } = useToggleModal('search');
  const onClickGeoLayer = useCallback(
    area => {
      history.push(`/profile/${area.codes[config.MAPIT.codeType]}`);
    },
    [history]
  );
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

        <HeroButton onClick={toggleModal}>Find a place</HeroButton>

        <Typography variant="subtitle2" style={{ marginTop: '2.5rem' }}>
          or view{' '}
          <a
            className={classes.alink}
            href={`/profile/country-${selectedCountry.code}`}
          >
            {selectedCountry.name}
          </a>
        </Typography>
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
  width: PropTypes.string.isRequired
};

export default withRouter(withWidth()(withStyles(styles)(CountryHero)));
