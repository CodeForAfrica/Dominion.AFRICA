import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { withRouter } from 'react-router-dom';

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography
} from '@material-ui/core';

import { MapIt } from '@codeforafrica/hurumap-ui';

import config from '../../config';
import useToggleModal from '../../useToggleModal';
import Hero, {
  HeroButton,
  HeroDescription,
  HeroTitle,
  HeroTitleGrid
} from './Hero';

const useStyles = makeStyles(theme => ({
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
    [theme.breakpoints.up('lg')]: {
      whiteSpace: 'nowrap'
    }
  },
  description: {
    [theme.breakpoints.up('lg')]: {
      whiteSpace: 'nowrap'
    }
  },
  alink: {
    color: '#e7e452',
    pointerEvents: 'all'
  },
  heroButtonArray: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block'
    }
  },
  map: {
    zIndex: 0,
    position: 'relative !important',
    backgroundColor: 'grey',
    height: '15.625rem !important',
    left: 'unset !important',
    top: 'unset !important',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '72% !important',
      height: '28.75rem !important',
      maxHeight: '28.75rem !important',
      maxWidth: '51.8125rem !important'
    }
  }
}));

function CountryHero({ history, dominion, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
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
          Dominion gives you the data to add context and authority to{' '}
          {useMediaQuery(theme.breakpoints.up('md')) && <br />}
          public discourse and policy-making on vital issues of land ownership.
        </HeroDescription>

        <HeroButton
          classes={{ arrow: classes.heroButtonArray }}
          onClick={toggleModal}
        >
          Find a place
        </HeroButton>

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
  dominion: PropTypes.shape({}).isRequired
};

export default withRouter(CountryHero);
