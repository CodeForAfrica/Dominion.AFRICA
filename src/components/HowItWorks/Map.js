import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import background from '../../assets/images/hero-image-3_2.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key //For ipad devices portrait: 768px
      width: '23.4375rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      width: '23.4375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '31.25rem' // 500px / 16
    }
  },
  map: {
    width: 0,
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key //For ipad devices portrait: 768px
      width: '23.4375rem' // .75 of lg // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      width: '23.4375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '31.25rem' // 500px / 16
    }
  },
  highlight: {
    marginLeft: 'auto',
    marginRight: 0,
    height: '2.5rem',
    background: '#e7e452',
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key //For ipad devices portrait: 768px
      width: '15.9375rem' // .75 of lg // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      width: '15.9375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '21.25rem'
    }
  },
  img: {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media (min-width:768px)': {
      // eslint-disable-line no-useless-computed-key //For ipad devices portrait: 768px
      height: '18.75rem', // 400px / 16
      width: '23.4375rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      height: '18.75rem', // 400px / 16
      width: '23.4375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      height: '25rem', // 400px / 16
      width: '31.25rem' // 500px / 16
    }
  }
});

function ImageContent({ classes }) {
  return (
    <div className={classes.root}>
      <div className={classes.highlight} />
      <div className={classes.img} />
    </div>
  );
}

ImageContent.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(ImageContent);
