import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Hero, { HeroTitle, HeroTitleGrid, HeroDetail } from './Hero';
import createAPI from '../../lib/api';

import Search from '../Search';
import ReleaseDropdown from '../ReleaseDropdown';
import searchIcon from '../../assets/images/icons/location.svg';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  map: {
    position: 'relative !important',
    height: '250px !important',
    left: 'unset !important',
    top: 'unset !important',
    [theme.breakpoints.up('md')]: {
      position: 'absolute !important',
      right: '50px',
      width: '50% !important',
      height: '460px !important',
      maxHeight: '460px !important',
      maxWidth: '829px !important'
    },
    [theme.breakpoints.up('lg')]: {
      right: '9.375rem'
    }
  },
  h2hMap: {
    order: 1,
    height: '270px !important'
  },
  caption: {
    color: '#8d8d8c',
    fontSize: '0.75em',
    textTransform: 'capitalize',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  captionItem: {
    display: 'inline-block'
  },
  release: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      color: '#8d8d8c',
      fontSize: '0.688em',
      position: 'absolute',
      bottom: '22%',
      display: 'inline-block',
      right: '4%'
    },
    [theme.breakpoints.up('lg')]: {
      right: '9.375rem'
    }
  },
  h2hRelease: {
    display: 'inline-block'
  }
});
class ProfileHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: '',
      geoid: ''
    };
  }

  async componentDidMount() {
    // get level from mapit
    const {
      profile: { geography = {} }
    } = this.props;
    const { full_geoid: geoid } = geography.this || {};
    const api = createAPI();
    const level = await api.getGeoLevel(geoid);

    this.setState({
      level,
      geoid
    });
  }

  render() {
    const { classes, dominion, profile } = this.props;
    const { head2head } = dominion;
    const {
      demographics = {},
      primary_releases: primaryReleases = {},
      geography = { this: {} }
    } = profile;
    let population;
    if (demographics.total_population && demographics.total_population.values) {
      population = demographics.total_population.values.this.toFixed(0);
    }
    let populationDensity;
    if (
      demographics.population_density &&
      demographics.population_density.values
    ) {
      populationDensity = demographics.population_density.values.this.toFixed(
        1
      );
    }
    const { active: activeRelease } = primaryReleases;
    const { parents: parentLinks } = geography;
    let { square_kms: squarekms } = geography.this;
    squarekms = parseFloat(squarekms);
    if (!Number.isNaN(squarekms)) {
      if (squarekms < 1.0) {
        squarekms = squarekms.toFixed(3);
      } else {
        squarekms = squarekms.toFixed(1);
      }
    }
    const { short_name: profileName } = geography.this;
    const { level, geoid } = this.state;

    return (
      <Hero>
        <HeroTitleGrid quater head2head={head2head}>
          <HeroTitle breakWord small>
            {profileName}
          </HeroTitle>
          <Typography variant="body2" className={classes.caption} component="p">
            {level}{' '}
            {parentLinks && Object.keys(parentLinks).length > 1 ? (
              <Typography variant="body" className={classes.captionItem}>
                in{' '}
                {Object.keys(parentLinks)
                  .slice(0, -1)
                  .map(item => (
                    <span>
                      <a href={`/profiles/${parentLinks[item].full_geoid}`}>
                        {parentLinks[item].name}
                      </a>
                      {', '}
                    </span>
                  ))}
              </Typography>
            ) : null}
          </Typography>
          {population && (
            <HeroDetail label="Population">{population}</HeroDetail>
          )}
          {squarekms && (
            <HeroDetail small label="square kilometers">
              {squarekms}
            </HeroDetail>
          )}
          {populationDensity && (
            <HeroDetail small label="people per square kilometer">
              {populationDensity}
            </HeroDetail>
          )}
          {!head2head && (
            <Search
              dominion={dominion}
              isComparisonSearch
              placeholder="Compare this with"
              thisGeoId={geoid}
              icon={searchIcon}
            />
          )}
        </HeroTitleGrid>
        <div
          id="slippy-map"
          className={classNames(classes.map, { [classes.h2hMap]: head2head })}
        />
        {activeRelease && (
          <Typography
            variant="body2"
            className={classNames(classes.release, {
              [classes.h2hRelease]: head2head
            })}
            component="div"
          >
            {activeRelease.citation}
            <ReleaseDropdown primaryReleases={primaryReleases} fromHero />
          </Typography>
        )}
      </Hero>
    );
  }
}

ProfileHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ProfileHero);
