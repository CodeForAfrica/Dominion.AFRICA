import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Info, { InfoSubtitle, InfoBody } from './Info';
import Land from './Land';

import land from '../../assets/images/hero-image-3.png';
import config from '../../config';

// Use @media queries for ipad portait devices: 768px
const styles = theme => ({
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
  headerGrid: {
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key
      width: '25%'
    }
  },
  infoGrid: {
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key
      width: '35%'
    }
  },
  imgGrid: {
    alignItems: 'flex-start',
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-end'
    },
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key
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
});

function AboutCountry({ classes, dominion }) {
  const { selectedCountry = {} } = dominion;
  const info = config.about[selectedCountry.slug] || {
    intro: 'Not found',
    other: 'Not found'
  };
  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.layout} spacing={4}>
        <Grid item md={4} className={classes.headerGrid}>
          <Header>
            About <br />
            {selectedCountry.name}
          </Header>
        </Grid>
        <Grid item md={4} className={classes.infoGrid}>
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
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(AboutCountry);
