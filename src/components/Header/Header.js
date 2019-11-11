import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Grid } from '@material-ui/core';

import background from 'assets/images/bg/background.png';
import useCloseModalOnPopstate from 'components/Modal/useCloseModalOnPopstate';

import Navigation from './Navigation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  wrapper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  modalNavigation: {
    padding: '1.875rem 0',
    [theme.breakpoints.up('md')]: {
      padding: '1.875rem 0'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '3.125rem 0'
    },
    position: 'relative',
    width: '100%'
  }
}));

function Header({ children, dominion, ...props }) {
  const classes = useStyles(props);
  useCloseModalOnPopstate();

  return (
    <div className={classes.root}>
      <Grid container className={classes.wrapper}>
        <Navigation dominion={dominion} />

        {React.cloneElement(children, {
          ...props,
          dominion
        })}
      </Grid>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default Header;
