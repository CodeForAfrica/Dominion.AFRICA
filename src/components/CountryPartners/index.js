import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Grid } from '@material-ui/core';

import A from '@codeforafrica/hurumap-ui/core/A';

import aul from 'assets/images/logos/aul.png';
import rapport from 'assets/images/logos/rapport.png';
import ourland from 'assets/images/logos/onground.png';
import landbou from 'assets/images/logos/landbou.png';
import citypress from 'assets/images/logos/citypress.png';

import PartnerContent from './PartnerContent';

const useStyles = makeStyles(theme => ({
  root: {
    flexRow: 1,
    backgroundColor: theme.palette.primary.light
  },
  layout: {
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  img: {
    maxHeight: '6.88rem',
    maxWidth: '30vw',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: '8vw'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '11.423rem'
    }
  },
  logoGrid: {
    padding: '2.286rem',
    [theme.breakpoints.up('md')]: {
      padding: '2.286rem 1.143rem'
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
      padding: '2.286rem 1.143rem'
    }
  }
}));

function CountryPartners({ dominion: { selectedCountry }, ...props }) {
  const classes = useStyles(props);

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
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.logoGrid}
        >
          {((selectedCountry && selectedCountry.slug === 'kenya') ||
            selectedCountry === null) && (
            <Grid item className={classes.imageGrid}>
              <A href="//africauncensored.net/about/">
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
            <>
              <Grid className={classes.imageGrid} item>
                <A href="//city-press.news24.com">
                  <img
                    src={citypress}
                    alt="City Press"
                    className={classes.img}
                  />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="//city-press.news24.com/News/land-cleveage-and-conflict-20180621">
                  <img src={ourland} alt="Our Land" className={classes.img} />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="//www.netwerk24.com/za/rapport">
                  <img src={rapport} alt="Rapport" className={classes.img} />
                </A>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <A href="//www.netwerk24.com/landbou/">
                  <img src={landbou} alt="Landbou" className={classes.img} />
                </A>
              </Grid>
            </>
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
  dominion: PropTypes.shape({
    selectedCountry: PropTypes.object
  })
};

export default CountryPartners;
