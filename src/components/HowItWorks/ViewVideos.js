import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography, makeStyles } from '@material-ui/core';

import blackArrow from 'assets/images/icons/black-combined-shape.svg';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '32.1719rem', // .75 of lg
      textAlign: 'right'
    },
    [theme.breakpoints.up('lg')]: {
      width: '41.375rem' // (188 + 36 + 192 + 37 + 209)px / 16
    }
  },
  viewLine: {
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily
  },
  button: {
    padding: 0,
    fontWeight: 700,
    border: 'none'
  },
  arrow: {
    paddingLeft: '1rem'
  }
}));

function ViewVideos({ onClick, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Button className={classes.button} onClick={onClick}>
        <Typography variant="h6" className={classes.viewLine}>
          View videos
          <img src={blackArrow} alt="Videos" className={classes.arrow} />
        </Typography>
      </Button>
    </div>
  );
}

ViewVideos.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ViewVideos;
