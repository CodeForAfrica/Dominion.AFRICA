import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { MapIt } from '@codeforafrica/hurumap-ui';
import Hero, { HeroTitle, HeroTitleGrid, HeroDetail } from '../Hero';

import Search from '../../Search';
import ReleaseDropdown from '../../ReleaseDropdown';
import searchIcon from '../../../assets/images/icons/location.svg';
import config from '../../../config';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  map: {
    position: 'relative',
    height: '250px',
    left: 'unset',
    top: 'unset',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: '50px',
      width: '50%',
      height: '460px',
      maxHeight: '460px',
      maxWidth: '829px'
    },
    [theme.breakpoints.up('lg')]: {
      right: '9.375rem'
    }
  },
  h2hMap: {
    position: 'relative',
    height: '270px',
    width: 'available',
    right: 'unset'
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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, dominion, profile, history, ...props } = this.props;

    if (!profile) {
      return <Hero classes={{ root: classes.root }} {...props} />;
    }

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
    const {
      geo_level: geoLevel,
      geo_code: geoCode,
      full_geoid: geoId
    } = geography.this;
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

    return (
      <Hero classes={{ root: classes.root }} {...props}>
        <HeroTitleGrid quater head2head={head2head}>
          <HeroTitle breakWord small>
            {profileName}
          </HeroTitle>
          <Typography variant="body2" className={classes.caption} component="p">
            {geoLevel}{' '}
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
              thisGeoId={geoId}
              icon={searchIcon}
            />
          )}
        </HeroTitleGrid>
        <div
          className={classNames(classes.map, { [classes.h2hMap]: head2head })}
        >
          <MapIt
            id={geoId}
            drawProfile
            drawChildren
            url={config.MAPIT.url}
            codeType={config.MAPIT.codeType}
            geoLevel={geoLevel}
            geoCode={geoCode}
            onClickGeoLayer={area => {
              history.push(`/profile/${area.codes[config.MAPIT.codeType]}`);
            }}
          />
        </div>
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

Profile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({})
};

Profile.defaultProps = {
  profile: null
};

export default withRouter(withStyles(styles)(Profile));
