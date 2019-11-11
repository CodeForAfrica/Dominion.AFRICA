import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import StoryList from './StoryList';

const useStyles = makeStyles(theme => ({
  showCaseContainer: {
    backgroundColor: 'white',
    display: 'inline-block',
    width: '100%'
  },
  root: {
    flexGrow: 1,
    padding: '3.1875rem 1.875rem',
    [theme.breakpoints.up('md')]: {
      padding: '3.1875rem 0',
      width: '75%',
      float: 'right'
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%'
    }
  },
  headline: {
    width: '100%',
    marginBottom: '2rem',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '79.5rem'
    }
  },
  headlineTitle: {
    textAlign: 'left',
    paddingBottom: '1rem'
  },
  headlineDescription: {
    textAlign: 'left'
  }
}));

function Showcase({
  showcaseStories,
  dominion: { selectedCountry },
  ...props
}) {
  const classes = useStyles(props);
  let stories = showcaseStories;
  if (selectedCountry) {
    stories = showcaseStories.filter(
      story => story.country === selectedCountry.code
    );
  }

  return (
    <div className={classes.showCaseContainer} id="showcase">
      <Grid
        container
        direction="column"
        className={classes.root}
        justify="center"
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          className={classes.headline}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.headlineTitle}>
              Showcase
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" className={classes.headlineDescription}>
              Explore how the control of land shapes everything from food
              security and geopolitics to national identity.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StoryList storyData={stories} />
        </Grid>
      </Grid>
    </div>
  );
}

Showcase.propTypes = {
  dominion: PropTypes.shape({
    selectedCountry: PropTypes.shape({})
  }).isRequired,
  showcaseStories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Showcase;
