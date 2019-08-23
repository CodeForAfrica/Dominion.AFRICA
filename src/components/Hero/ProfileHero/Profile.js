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
import TypographyLoader from '../../TypographyLoader';
import ContentLoader from '../../ContentLoader';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  titleGrid: {
    [theme.breakpoints.up('md')]: {
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
    display: 'inline-flex',
    color: '#8d8d8c',
    width: '100%',
    textTransform: 'capitalize',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  captionItem: {
    display: 'inline-block',
    paddingLeft: 4
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
        if (error) return `Error! ${error.message}`;

        const {
          geoLevel,
          geoCode,
          shortName,
          parentCode,
          parentLevel
        } = loading ? {} : data.geo;
        // South Africa population data is in pupolation by group
        let totalPopulation = loading
          ? 0
          : data.populationGroup.nodes.reduce((a, b) => a + b.total, 0);
        if (totalPopulation === 0) {
          // Kenya population data is in pupolation by residence
          totalPopulation = loading
            ? 0
            : data.populationResidence.nodes.reduce((a, b) => a + b.total, 0);
        }
        let { squareKms } = loading ? {} : data.geo;
        const squareKmsFloat = parseFloat(squareKms);
        if (!Number.isNaN(squareKms)) {
          if (squareKmsFloat < 1.0) {
            const numberFormatter = new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3
            });
            squareKms = numberFormatter.format(squareKmsFloat);
          } else {
            const numberFormatter = new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            });
            squareKms = numberFormatter.format(squareKmsFloat);
          }
        }

        let population;
        let populationDensity;
        if (totalPopulation) {
          let numberFormatter = new Intl.NumberFormat('en-IN');
          population = numberFormatter.format(totalPopulation.toFixed(0));
          numberFormatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
          populationDensity = numberFormatter.format(
            totalPopulation / squareKmsFloat
          );
        }

        const countryConfig = loading
          ? {}
          : Object.values(config.countries).find(c =>
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
              <HeroTitle small breakWord loading={loading} loaderWidth={150}>
                {shortName}
              </HeroTitle>
              <TypographyLoader
                loading={loading}
                loader={{
                  width: 115,
                  height: 17
                }}
                variant="subtitile1"
                component="span"
                className={classes.caption}
              >
                {geoId.split('-')[0]} in{' '}
                <Typography
                  variant="body"
                  component="span"
                  className={classes.captionItem}
                >
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
                </Typography>
              </TypographyLoader>
              <HeroDetail
                loading={loading}
                loader={{
                  detailWidth: 117,
                  detailLabelWidth: 48
                }}
                label="Population"
                hidden={!population && !loading}
              >
                {population}
              </HeroDetail>
              <HeroDetail
                small
                loading={loading}
                loader={{
                  detailWidth: 84,
                  detailLabelWidth: 80
                }}
                label="Square kilometers"
                hidden={!squareKms && !loading}
              >
                {squareKms}
              </HeroDetail>
              <HeroDetail
                small
                loading={loading}
                loader={{
                  detailWidth: 51,
                  detailLabelWidth: '123px'
                }}
                label="People per square kilometer"
                hidden={!populationDensity && !loading}
              >
                {populationDensity}
              </HeroDetail>
              {/* Start search skeleton loader */}
              {!head2head && loading && (
                <ContentLoader style={{ width: '304px', height: '49px' }}>
                  <rect x="0" y="0" width="100%" height="100%" />
                </ContentLoader>
              )}
              {/* End search skeleton loader */}
              {!head2head && !loading && (
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
