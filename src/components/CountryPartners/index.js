import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PartnerContent from './PartnerContent';

import cfa from '../../assets/images/logos/codeforafrica.png';
import twaweza from '../../assets/images/logos/twaweza.png';
import aul from '../../assets/images/logos/aul.png';
import A from '../A';

const styles = theme => ({
  root: {
    flexRow: 1,
    backgroundColor: theme.palette.primary.light
  },
  layout: {
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
      margin: '0 auto'
    }
  },
  img: {
    maxHeight: '6rem',
    maxWidth: '30vw',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      maxWidth: '10rem'
    }
  },
  logoGrid: {
    padding: '2rem',
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  },
  imgCfa: {
    maxHeight: '6rem',
    padding: '1rem'
  },
  imageGrid: {
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 1rem'
    }
  }
});

function CountryPartners({ classes, dominion: { selectedCountry } }) {
  const cfaClassName = classNames(classes.img, classes.imgCfa);
  return (
    <Grid className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.layout}
      >
        <Grid item xs={12} sm={4}>
          <PartnerContent
            title="Partners"
            description="Dominion is made possible through support from the following partners:"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          spacing={24}
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.logoGrid}
        >
          {' '}
          <Grid item className={classes.imageGrid}>
            <A href="https://codeforafrica.org/">
              <img src={cfa} alt="Code for Africa" className={cfaClassName} />
            </A>
          </Grid>
          <Grid item className={classes.imageGrid}>
            <A href="https://www.twaweza.org/">
              <img src={twaweza} alt="Twaweza" className={classes.img} />
            </A>
          </Grid>
          {selectedCountry.slug === 'kenya' && (
            <Grid item className={classes.imageGrid}>
              <A href="http://africauncensored.net/about/">
                <img
                  src={aul}
                  alt="Africa Uncensored"
                  className={classes.img}
                />
              </A>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

CountryPartners.propTypes = {
  classes: PropTypes.shape().isRequired,
  dominion: PropTypes.shape({
    selectedCountry: PropTypes.shape({}).isRequired
  }).isRequired
};

export default withStyles(styles)(CountryPartners);
