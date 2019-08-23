import React, { useCallback, useContext } from 'react';

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
import { AppContext } from '../../../AppContext';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  titleGrid: {
    [theme.breakpoints.up('md')]: {
      marginTop: '-2rem',
      maxWidth: '35%'
    }
  },
  map: {
    zIndex: 0,
    position: 'relative !important',
    backgroundColor: 'grey',
    height: '15.625rem !important',
    width: '100%',
    left: 'unset !important',
    top: 'unset !important',
    [theme.breakpoints.up('md')]: {
      width: '65% !important',
      height: '28.75rem !important',
      maxHeight: '28.75rem !important',
      maxWidth: '46.25rem !important'
    }
  },
  h2hMap: {
    position: 'relative',
    height: '11.875rem !important',
    width: '100% !important',
    right: 'unset',
    [theme.breakpoints.up('md')]: {
      height: '16.875rem !important'
    }
  },
  caption: {
    color: '#8d8d8c',
    width: '100%',
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
  },
  alink: {
    color: '#e7e452'
  }
});
function Profile({ classes, dominion, geoId, history, ...props }) {
  const {
    state: { selectedCountry }
  } = useContext(AppContext);
  const { head2head } = dominion;
  const onClickGeoLayer = useCallback(
    area => {
      history.push(`/profile/${area.codes[config.MAPIT.codeType]}`);
    },
    [history]
  );
  return (
    <Query
      query={gql`
        query profile($geoCode: String!, $geoLevel: String!) {
          geo: wazimapGeographyByGeoLevelAndGeoCodeAndVersion(
            geoLevel: $geoLevel
            geoCode: $geoCode
            version: "2009"
          ) {
            geoLevel
            geoCode
            squareKms
            parentLevel
            parentCode
            shortName: name
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

        const {
          geoLevel,
          geoCode,
          shortName,
          parentCode,
          parentLevel
        } = data.geo;
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
        let { squareKms } = data.geo;
        const squareKmsFloat = parseFloat(squareKms);
        if (!Number.isNaN(squareKms)) {
          if (squareKmsFloat < 1.0) {
            const numberFormatter = new Intl.NumberFormat('en-GB', {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3
            });
            squareKms = numberFormatter.format(squareKmsFloat);
          } else {
            const numberFormatter = new Intl.NumberFormat('en-GB', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            });
            squareKms = numberFormatter.format(squareKmsFloat);
          }
        }

        let population;
        let populationDensity;
        if (totalPopulation) {
          let numberFormatter = new Intl.NumberFormat('en-GB');
          population = numberFormatter.format(totalPopulation.toFixed(0));
          numberFormatter = new Intl.NumberFormat('en-GB', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
          populationDensity = numberFormatter.format(
            totalPopulation / squareKmsFloat
          );
        }

        const countryConfig = Object.values(config.countries).find(c =>
          parentLevel === 'continent'
            ? c.code === geoCode
            : c.code === parentCode
        );
        return (
          <Hero classes={{ root: classes.root }} {...props}>
            <HeroTitleGrid
              quater
              head2head={head2head}
              classes={{ titleTextGrid: classes.titleGrid }}
            >
              <HeroTitle breakWord small>
                {shortName}
              </HeroTitle>
              <Typography
                variant="subtitile1"
                className={classes.caption}
                component="p"
              >
                {geoLevel}{' '}
                <Typography variant="body" className={classes.captionItem}>
                  in{' '}
                  <span>
                    <a
                      href={
                        parentLevel !== 'continent'
                          ? `/profile/${selectedCountry.geoLevel}-${selectedCountry.geoCode}`
                          : '#'
                      }
                      className={classes.alink}
                    >
                      {parentLevel !== 'continent'
                        ? selectedCountry.name
                        : 'Africa'}
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
                zoom={countryConfig.zoom}
                center={countryConfig.centre}
                id={geoId}
                drawProfile
                drawChildren
                url={config.MAPIT.url}
                codeType={config.MAPIT.codeType}
                geoLevel={geoLevel}
                geoCode={geoCode}
                geoLayerFocusStyle={{
                  fillColor: 'rgb(127, 148, 66)',
                  color: 'rgb(141, 141, 140)',
                  opacity: 0.3,
                  fillOpacity: 0.3
                }}
                onClickGeoLayer={onClickGeoLayer}
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
