import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import A from './A';

import cfa from '../assets/images/logos/codeforafrica.png';
import pulitzercenter from '../assets/images/logos/pulitzer.png';
import ancir from '../assets/images/logos/ancir.png';
import africadrone from '../assets/images/logos/africa-drone.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    height: '16.9375rem',
    [theme.breakpoints.up('md')]: {
      height: '10rem'
    }
  },
  layout: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
      margin: '0 auto'
    }
  },

  // 6 rem image + 4 rem padding = 10rem = 160px
  img: {
    maxHeight: '3.75rem',
    maxWidth: '30vw',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      maxWidth: '10rem'
    }
  },
  imageGrid: {
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 1rem'
    }
  }
});

function Partners({ classes }) {
  return (
    <Grid className={classes.root}>
      <Grid
        container
        className={classes.layout}
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.imageGrid}>
          <A href="https://codeforafrica.org/">
            <img src={cfa} alt="Code for Africa" className={classes.img} />
          </A>
        </Grid>
        <Grid item className={classes.imageGrid}>
          <A href="https://pulitzercenter.org/">
            <img
              src={pulitzercenter}
              alt="Pulitzer Center"
              className={classes.img}
            />
          </A>
        </Grid>
        <Grid item className={classes.imageGrid}>
          <A href="https://investigativecenters.org/">
            <img src={ancir} alt="ANCIR" className={classes.img} />
          </A>
        </Grid>
        <Grid item className={classes.imageGrid}>
          <A href="https://africandrone.org/">
            <img src={africadrone} alt="Africa Drone" className={classes.img} />
          </A>
        </Grid>
      </Grid>
    </Grid>
  );
}

Partners.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Partners);
