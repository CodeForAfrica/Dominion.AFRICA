import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import withWidth from '@material-ui/core/withWidth';

import Navigation from './Navigation';

import background from '../../assets/images/bg/background.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  wrapper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
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
});

function Header({ classes, children, dominion, ...props }) {
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    const dismissModal = e => {
      if (e.state === 'modal') {
        setOpenModal(null);
      }
    };
    window.addEventListener('popstate', dismissModal);
    return () => {
      window.removeEventListener('popstate', dismissModal);
    };
  }, []);

  const toggleModal = modalName => () => {
    if (openModal || openModal === modalName) {
      window.history.back();
    }
    window.history.pushState('modal', modalName, '#');
    setOpenModal(openModal === modalName ? null : modalName);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.wrapper}>
        <Navigation
          toggleModal={toggleModal}
          openModal={openModal}
          dominion={dominion}
        />

        {React.cloneElement(children, {
          ...props,
          dominion,
          toggleModal
        })}
      </Grid>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({})
};

Header.defaultProps = {
  profile: null
};

export default withWidth()(withStyles(styles)(Header));
