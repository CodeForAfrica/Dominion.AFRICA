import React from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import cfa from 'assets/images/logos/codeforafrica.png';
import pulitzercenter from 'assets/images/logos/pulitzer.png';
import ancir from 'assets/images/logos/ancir.png';
import africadrone from 'assets/images/logos/africa-drone.png';
import oxpeckers from 'assets/images/logos/oxpeckers.png';
import A from 'components/A';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    padding: '1.5rem 0',
    [theme.breakpoints.up('sm')]: {
      padding: 0
    }
  },
  layout: {
    [theme.breakpoints.up('sm')]: {
      height: '14rem'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto',
      height: '11.423rem'
    }
  },

  // 6 rem image + 4 rem padding = 10rem = 160px
  img: {
    maxHeight: '4.288rem',
    maxWidth: '30vw',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: '15vw'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '11.423rem'
    }
  },
  imageGrid: {
    textAlign: 'center',
    width: '100%',
    padding: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      width: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '2.286rem 2.643rem'
    }
  }
}));

function Partners(props) {
  const classes = useStyles(props);

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
        <Grid item className={classes.imageGrid}>
          <A href="https://oxpeckers.org/">
            <img src={oxpeckers} alt="Oxpeckers" className={classes.img} />
          </A>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Partners;
