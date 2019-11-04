import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { makeStyles, Button, Grid } from '@material-ui/core';

import arrow from '../assets/images/icons/combined-shape.svg';
import arrowBlack from '../assets/images/icons/black-combined-shape.svg';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '2rem'
  },
  button: {
    pointerEvents: 'all',
    textTransform: 'none',
    fontWeight: 800,
    fontSize: theme.typography.subtitle2.fontSize,
    color: 'black',
    height: '4rem',
    width: '100%',
    border: '2px solid black',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    [theme.breakpoints.up('sm')]: {
      width: 'unset'
    }
  },
  buttonSecondary: {
    color: 'white',
    border: '2px solid white'
  },
  arrow: {
    pointerEvents: 'all',
    marginLeft: -theme.spacing(4),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

function ArrowButton({ children, secondary, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid item sm={12} container alignItems="center" className={classes.root}>
      <Button
        variant="outlined"
        className={classNames(classes.button, {
          [classes.buttonSecondary]: secondary
        })}
        {...props}
      >
        {children}
      </Button>
      <img
        src={secondary ? arrow : arrowBlack}
        alt="Select Arrow"
        className={classes.arrow}
      />
    </Grid>
  );
}

ArrowButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  secondary: PropTypes.bool
};

ArrowButton.defaultProps = {
  secondary: false
};

export default ArrowButton;
