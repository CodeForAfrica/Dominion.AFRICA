import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Grid } from '@material-ui/core';

import land from 'assets/images/hero-image-3.png';
import config from '@/dominion/config';

import Header from './Header';
import Info, { InfoSubtitle, InfoBody } from './Info';
import Land from './Land';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  layout: {
    padding: '60px 0',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  imgGrid: {
    alignItems: 'flex-start',
    [theme.breakpoints.up('lg')]: {
      // alignItems: 'flex-end'
    }
  },
  info: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-2.3rem'
    }
  },
  infoTitle: {
    marginBottom: '1.5rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '3rem'
    }
  }
}));

function AboutCountry({ dominion, ...props }) {
  const classes = useStyles(props);
  const { selectedCountry = {} } = dominion;
  const info = config.about[selectedCountry.slug] || {
    intro: 'Not Found',
    other: 'Not found'
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.layout}>
        <Grid item md={4}>
          <Header>
            About <br />
            {selectedCountry.name}
          </Header>
        </Grid>
        <Grid item md={4}>
          <Info classes={{ root: classes.info }}>
            <InfoSubtitle classes={{ subtitle: classes.infoTitle }}>
              {info.intro}
            </InfoSubtitle>
            <InfoBody>{info.other}</InfoBody>
          </Info>
        </Grid>
        <Grid container item md={4} className={classes.imgGrid}>
          <Land imgSrc={land} />
        </Grid>
      </Grid>
    </div>
  );
}

AboutCountry.propTypes = {
  dominion: PropTypes.shape({}).isRequired
};

export default AboutCountry;
