import React, { useEffect, useState, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import { Grid } from '@material-ui/core';
import { ProfilePageHeader } from '../components/Header';
import ProfileTabs from '../components/ProfileTabs';
import Page from '../components/Page';
import CountryPartners from '../components/CountryPartners';
import config from '../config';
import ChartFactory from '../components/ChartFactory';
import ChartsContainer from '../components/ChartsContainer';
import slugify from '../utils/slugify';

import { AppContext } from '../AppContext';
import ProfileRelease from '../components/ProfileReleases';
import ProfileSectionTitle from '../components/ProfileSectionTitle';
import useProfileLoader from '../data/useProfileLoader';
import useChartDefinitions from '../data/useChartDefinitions';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '0.86px'
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    opacity: 0.4,
    fontSize: '12px'
  },
  chartsSection: {
    display: 'none'
  },
  shareDropDownExploreButton: {
    color: 'black'
  },
  embedDropDownModal: {
    [theme.breakpoints.up('sm')]: {
      width: '30rem'
    }
  }
}));

function Profile({
  match: {
    params: { geoId, comparisonGeoId }
  }
}) {
  const {
    state: { selectedCountry },
    dispatch
  } = useContext(AppContext);
  const head2head = Boolean(geoId && comparisonGeoId);
  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) ? window.location.hash.slice(1) : 'all'
  );
  const classes = useStyles();

  const sectionedCharts = useChartDefinitions();
  // Flatten all charts
  const charts = sectionedCharts
    .map(x => x.charts)
    .reduce((a, b) => a.concat(b));
  const [visuals] = useState(
    charts.map(x => x.visuals).reduce((a, b) => a.concat(b))
  );

  const { profiles, chartData } = useProfileLoader(
    geoId,
    comparisonGeoId,
    visuals
  );

  useEffect(() => {
    if (!profiles.isLoading) {
      dispatch({ type: 'selectedCountry', selectedCountry: profiles.profile });
    }
  }, [profiles]);

  // get all available profiletabs
  const profileTabs = useMemo(
    () => [
      {
        title: 'All',
        slug: 'all'
      },
      ...sectionedCharts
        .map((section, i) => ({
          ...section,
          index: i
        }))
        // Filter empty sections
        .filter(
          section =>
            section.charts.filter(
              chart =>
                chartData.isLoading ||
                !chart.visuals.find(
                  visual =>
                    !chartData.profileVisualsData ||
                    chartData.profileVisualsData[visual.id].nodes.length === 0
                )
            ).length !== 0
        )
        .map(section => ({
          title: section.sectionTitle,
          slug: slugify(section.sectionTitle),
          icon: section.sectionIcon,
          index: section.index
        }))
    ],
    [chartData.isLoading, chartData.profileVisualsData, sectionedCharts]
  );

  /**
   * Victory renders take alot of time
   * causing a few seconds UI block which is bad UX.
   * This caches the components so they do not have to render again.
   */
  const chartComponents = useMemo(
    () =>
      profileTabs.slice(1).map(tab => (
        <Grid
          container
          spacing={2}
          id={tab.slug}
          key={tab.slug}
          className={classes.chartsSection}
        >
          <ProfileSectionTitle loading={chartData.isLoading} tab={tab} />
          {sectionedCharts[tab.index].charts
            .filter(
              ({ visuals: v }) =>
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* data is not missing */
                  !v.find(
                    ({ id }) =>
                      chartData.profileVisualsData[id].nodes.length === 0
                  ))
            )
            .map(chart => (
              <Grid
                key={chart.id}
                item
                xs={12}
                md={
                  parseFloat(chart.layout.split('/').reduce((a, b) => a / b)) *
                  12
                }
              >
                <ChartContainer
                  key={chart.id}
                  loading={chartData.isLoading}
                  title={chart.title}
                  subtitle={chart.subtitle}
                  classes={{
                    title: classes.title,
                    subtitle: classes.subtitle,
                    shareDropDown: {
                      explore: classes.shareDropDownExploreButton
                    },
                    embedDropDown: {
                      modal: {
                        root: classes.embedDropDownModal
                      }
                    }
                  }}
                  embed={{
                    title: 'Embed code for this chart',
                    subtitle:
                      'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
                    code: `<iframe src="https://dev.takwimu.africa/embed/${geoId}/${slugify(
                      tab.title
                    )}/${slugify(chart.title)}" />`
                  }}
                >
                  {!chartData.isLoading &&
                    chart.visuals.map(
                      visual =>
                        !profiles.isLoading && (
                          <ChartFactory
                            key={visual.id}
                            visual={visual}
                            profiles={profiles}
                            data={chartData.profileVisualsData}
                            comparisonData={chartData.comparisonVisualsData}
                          />
                        )
                    )}
                </ChartContainer>
              </Grid>
            ))}
        </Grid>
      )),
    [chartData, classes, profileTabs, profiles, sectionedCharts]
  );

  // Show and hide sections
  useEffect(() => {
    if (activeTab === 'all') {
      profileTabs.slice(1).forEach(tab => {
        document.getElementById(tab.slug).style.display = 'flex';
      });
    } else {
      profileTabs.slice(1).forEach(tab => {
        if (tab.slug === activeTab) {
          document.getElementById(tab.slug).style.display = 'flex';
        } else {
          document.getElementById(tab.slug).style.display = 'none';
        }
      });
    }
  }, [profileTabs, activeTab]);

  return (
    <Page>
      <ProfilePageHeader
        profiles={profiles}
        dominion={{
          ...config,
          selectedCountry,
          head2head
        }}
      />

      <ProfileTabs
        loading={chartData.isLoading}
        activeTab={activeTab}
        switchToTab={setActiveTab}
        tabs={profileTabs}
      />

      <ChartsContainer>{chartComponents}</ChartsContainer>
      <ProfileRelease />
      <CountryPartners dominion={{ ...config, selectedCountry }} />
    </Page>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired,
      anotherGeoId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Profile;
