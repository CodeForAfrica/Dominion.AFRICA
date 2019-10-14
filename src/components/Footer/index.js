import React from 'react';

import { makeStyles, Grid, Container } from '@material-ui/core';

import About from './About';
import Community from './Community';
import Project from './Project';

import background from '../../assets/images/bg/background.png';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '3.64rem',
    paddingBottom: '3.286rem'
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
  }
}));

function Footer(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Container>
        <Grid item xs={12} container spacing={3} alignItems="flex-start">
          <Grid item xs={12} sm={7}>
            <About />
          </Grid>
          <Grid item xs={12} sm={1} />
          <Grid item xs={6} sm={2}>
            <Community />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Project />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
