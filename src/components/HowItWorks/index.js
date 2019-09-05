import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import databg from '../../assets/images/bg/databg.png';

import Map from './Map';
import Description from './Description';

// Use @media queries for ipad portait devices: 768px
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '2.286rem 0',
    paddingLeft: '2.143rem', // 30px / 16
    backgroundColor: '#fff',
    backgroundImage: `url(${databg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '80% 70%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0, // 30px / 16
      backgroundPosition: '0 5.143rem', // Match padding + highlight height
      backgroundSize: '62% 100%'
    },
    [theme.breakpoints.up('xl')]: {
      backgroundSize: '65% 100%'
    }
  },
  wrapper: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  description: {
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key
      maxWidth: '45%',
      marginRight: '2rem',
      marginLeft: '2rem'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '5.286rem', // 74px / 16
      paddingLeft: '5.286rem', // 74px / 16
      maxWidth: '66.59rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '81.3571429rem'
    }
  },
  imageAlign: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-9.07143rem'
    }
  }
});

function HowItWorks({ classes, dominion }) {
  return (
    <div className={classes.root}>
      <Grid container className={classes.wrapper}>
        <Grid item className={classes.imageAlign}>
          <Map />
        </Grid>

        <Grid item className={classes.description}>
          <Description dominion={dominion} />
        </Grid>
      </Grid>
    </div>
  );
}

HowItWorks.propTypes = {
  classes: PropTypes.shape().isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(HowItWorks);
