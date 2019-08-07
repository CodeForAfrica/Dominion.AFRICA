import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Info, { InfoSubtitle, InfoBody } from './Info';
import Land from './Land';

import land from '../../assets/images/hero-image-3.png';
import config from '../../config';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  layout: {
    padding: '60px 0',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '58.265625rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem'
    }
  }
});

function AboutCountry({ classes, dominion }) {
  const { selectedCountry = {} } = dominion;
  const info = config.about[selectedCountry.slug] || {
    intro: 'Not found',
    other: 'Not found'
  };
  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.layout}>
        <Grid item md={3}>
          <Header>
            About <br />
            {selectedCountry.name}
          </Header>
        </Grid>
        <Grid item md={4}>
          <Info>
            <InfoSubtitle>{info.intro}</InfoSubtitle>
            <InfoBody>{info.other}</InfoBody>
          </Info>
        </Grid>
        <Grid item md={5} justify="flex-end">
          <Land imgSrc={land} />
        </Grid>
      </Grid>
    </div>
  );
}

AboutCountry.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(AboutCountry);
