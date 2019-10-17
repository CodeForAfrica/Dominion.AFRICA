import React from 'react';

import { makeStyles, Grid, Container } from '@material-ui/core';

import About from './About';
import Community from './Community';
import Project from './Project';

import background from '../../assets/images/bg/background.png';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '3.64rem',
    paddingBottom: '3.286rem'
  }
});

function Footer(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3} alignItems="flex-start">
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
