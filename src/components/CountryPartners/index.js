import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PartnerContent from './PartnerContent';

import aul from '../../assets/images/logos/aul.png';
import A from '../A';
import rapport from '../../assets/images/logos/rapport.png';
import ourland from '../../assets/images/logos/onground.png';
import landbou from '../../assets/images/logos/landbou.png';
import citypress from '../../assets/images/logos/citypress.png';

const styles = theme => ({
  root: {
    flexRow: 1,
    backgroundColor: theme.palette.primary.light
  },
  layout: {
    padding: '1rem',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  img: {
    maxHeight: '6.88rem',
    maxWidth: '30vw',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      maxWidth: '11.423rem'
    }
  },
  logoGrid: {
    padding: '2.286rem',
    [theme.breakpoints.up('sm')]: {
      padding: '2.286rem 1.143rem',
      flexDirection: 'row'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingRight: '5rem',
      paddingLeft: '5rem'
    }
  },
  imageGrid: {
    padding: '1.143rem',
    [theme.breakpoints.up('md')]: {
      padding: '2.286rem 1.143rem'
    }
  }
});

function CountryPartners({ classes, dominion: { selectedCountry } }) {
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
            title="Our Partners"
            description="Dominion is made possible through support from the following partners:"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          spacing={6}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.logoGrid}
        >
          {((selectedCountry && selectedCountry.slug === 'kenya') ||
            selectedCountry === null) && (
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
          {((selectedCountry && selectedCountry.slug === 'south-africa') ||
            selectedCountry === null) && (
            <Fragment>
              <Grid item className={classes.imageGrid}>
                <A href="http://africauncensored.net/about/">
                  <img
                    src={citypress}
                    alt="City Press"
                    className={classes.img}
                  />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="http://africauncensored.net/about/">
                  <img
                    src={ourland}
                    alt="Africa Uncensored"
                    className={classes.img}
                  />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="http://africauncensored.net/about/">
                  <img
                    src={rapport}
                    alt="Africa Uncensored"
                    className={classes.img}
                  />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="http://africauncensored.net/about/">
                  <img
                    src={landbou}
                    alt="Africa Uncensored"
                    className={classes.img}
                  />
                </A>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

CountryPartners.defaultProps = {
  dominion: {
    selectedCountry: null
  }
};

CountryPartners.propTypes = {
  classes: PropTypes.shape().isRequired,
  dominion: PropTypes.shape({
    selectedCountry: PropTypes.object
  })
};

export default withStyles(styles)(CountryPartners);
