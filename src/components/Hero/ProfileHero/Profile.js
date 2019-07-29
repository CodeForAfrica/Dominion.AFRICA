import React from 'react';

import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { MapIt } from '@codeforafrica/hurumap-ui';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Hero, { HeroTitle, HeroTitleGrid, HeroDetail } from '../Hero';

import Search from '../../Search';
// import ReleaseDropdown from '../../ReleaseDropdown';
import searchIcon from '../../../assets/images/icons/location.svg';
import config from '../../../config';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  map: {
    zIndex: 0,
    position: 'relative',
    width: 'available',
    height: '11.875rem',
    left: 'unset',
    top: 'unset',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: '3.125rem',
      width: '50%',
      height: '28.75rem',
      maxHeight: '28.75rem',
      maxWidth: '51.8125rem'
    },
    [theme.breakpoints.up('lg')]: {
      right: '9.375rem'
    }
  },
  h2hMap: {
    position: 'relative',
    height: '11.875rem',
    width: 'available',
    right: 'unset',
    [theme.breakpoints.up('md')]: {
      height: '16.875rem'
    }
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
function Profile({ classes, dominion, geoId, history, ...props }) {
  const { head2head } = dominion;
  return (
    <Query
      query={gql`
        query profile($geoCode: String!, $geoLevel: String!) {
          geo: allWazimapGeographies(
            condition: { geoCode: $geoCode, geoLevel: $geoLevel }
          ) {
            nodes {
              geoLevel
              geoCode
              squareKms
              parentLevel
              parentCode
              shortName: name
            }
          }
          populationGroup: allPopulationGroup2016S(
            condition: { geoCode: $geoCode, geoLevel: $geoLevel }
          ) {
            nodes {
              total
            }
          }
          populationResidence: allPopulationResidence2009S(
            condition: { geoCode: $geoCode, geoLevel: $geoLevel }
          ) {
            nodes {
              total
            }
          }
        }
      `}
      variables={{
        geoLevel: geoId.split('-')[0],
        geoCode: geoId.split('-')[1]
      }}
    >
      {({ loading, error, data }) => {
        if (loading)
          return <Hero classes={{ root: classes.root }} {...props} />;
        if (error) return `Error! ${error.message}`;

        const geography = data.geo.nodes[0];
        const {
          geoLevel,
          geoCode,
          shortName,
          parentCode,
          parentLevel
        } = geography;
        // South Africa population data is in pupolation by group
        let totalPopulation = data.populationGroup.nodes.reduce(
          (a, b) => a + b.total,
          0
        );
        if (totalPopulation === 0) {
          // Kenya population data is in pupolation by residence
          totalPopulation = data.populationResidence.nodes.reduce(
            (a, b) => a + b.total,
            0
          );
        }
        let { squareKms } = geography;
        squareKms = parseFloat(squareKms);
        if (!Number.isNaN(squareKms)) {
          if (squareKms < 1.0) {
            squareKms = squareKms.toFixed(3);
          } else {
            squareKms = squareKms.toFixed(1);
          }
        }

        let population;
        let populationDensity;
        if (totalPopulation) {
          population = totalPopulation.toFixed(0);
          populationDensity = (totalPopulation / squareKms).toFixed(2);
        }
        return (
          <Hero classes={{ root: classes.root }} {...props}>
            <HeroTitleGrid quater head2head={head2head}>
              <HeroTitle breakWord small>
                {shortName}
              </HeroTitle>
              <Typography
                variant="body2"
                className={classes.caption}
                component="p"
              >
                {geoLevel}{' '}
                <Typography variant="body" className={classes.captionItem}>
                  in{' '}
                  <span>
                    <a href={`/profiles/${parentLevel}-${parentCode}`}>
                      {parentCode}
                    </a>
                    {', '}
                  </span>
                </Typography>
              </Typography>
              {population && (
                <HeroDetail label="Population">{population}</HeroDetail>
              )}
              {squareKms && (
                <HeroDetail small label="square kilometers">
                  {squareKms}
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
              className={classNames(classes.map, {
                [classes.h2hMap]: head2head
              })}
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
            {/* {activeRelease && (
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
        )} */}
          </Hero>
        );
      }}
    </Query>
  );
}

Profile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  geoId: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(Profile));
