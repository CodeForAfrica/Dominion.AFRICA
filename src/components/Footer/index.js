import React from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import About from './About';
import Community from './Community';
import Project from './Project';

import background from '../../assets/images/bg/background.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '3.64rem',
    paddingRight: '1.25rem',
    paddingBottom: '3.286rem',
    paddingLeft: '1.875rem',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '6rem',
      paddingRight: 0,
      paddingBottom: '3.857rem',
      paddingLeft: 0
    }
  },
  layout: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  about: {
    [theme.breakpoints.up('md')]: {
      paddingRight: 12
    }
  },
  organisation: {
    width: '100%',
    marginTop: '1.857rem',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      width: 'auto',
      marginTop: 0
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  },
  community: {
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  project: {
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}));

function Footer(props) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        container
        alignItems="flex-start"
        className={classes.layout}
      >
        <Grid item xs={12} sm={7} className={classes.about}>
          <About />
        </Grid>
        <Grid item xs={12} sm={5} container className={classes.organisation}>
          <Grid item className={classes.community}>
            <Community />
          </Grid>
          <Grid item className={classes.project}>
            <Project />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
