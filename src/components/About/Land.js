import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useMediaQuery, useTheme, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    paddingTop: '10px',
    [theme.breakpoints.up('lg')]: {
      width: '26.25rem'
    }
  },
  img: {
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      width: '18.875rem',
      height: 'auto',

      // TODO(kilemens): There is a gap between the two components. This is a temporary fix.
      marginBottom: theme.spacing(-0.5)
    },
    [theme.breakpoints.up('lg')]: {
      width: '26.25rem'
    }
  },
  highlight: {
    width: '6.875rem',
    height: '1.25rem',
    background: '#e7e452'
  }
}));

function Land({ width, imgSrc, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  let direction = 'column';
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    direction = 'column-reverse';
  }

  return (
    <Grid
      container
      direction={direction}
      className={classes.root}
      alignItems="flex-end"
    >
      <Grid item xs={12}>
        <img src={imgSrc} alt="land" className={classes.img} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.highlight} />
      </Grid>
    </Grid>
  );
}

Land.propTypes = {
  width: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default Land;
