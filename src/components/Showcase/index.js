import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import arrowBlack from 'assets/images/icons/black-combined-shape.svg';
import useColsMediaQuery from './useColsMediaQuery';
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
  },
  showScroll: {
    color: '#222822',
    marginTop: '2rem',
    opacity: 0.6,
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
      paddingRight: '2rem'
    }
  },
  arrow: {
    paddingRight: '0.75rem'
  }
}));

function Showcase({ stories, ...props }) {
  const classes = useStyles(props);
  const cols = useColsMediaQuery();
  const showScroll = stories.length > cols;

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
          <StoryList stories={stories} />
        </Grid>
        {showScroll && (
          <Grid
            item
            xs={12}
            container
            justify="flex-end"
            className={classes.showScroll}
          >
            <img src={arrowBlack} alt="Scroll" className={classes.arrow} />{' '}
            <Typography variant="body2">Scroll</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

Showcase.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Showcase;
