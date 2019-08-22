import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

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

function Header({ classes, history, children, dominion, ...props }) {
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    const dismissModal = e => {
      if (e.state && e.state.state === 'modal' && openModal) {
        setOpenModal(null);
      }
    };
    window.addEventListener('popstate', dismissModal);
    return () => {
      window.removeEventListener('popstate', dismissModal);
    };
  }, [openModal]);

  const toggleModal = modalName => () => {
    if (openModal && openModal === modalName) {
      history.goBack();
    } else if (!openModal) {
      history.push('#', 'modal');
    } else {
      //
    }
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

export default withRouter(withWidth()(withStyles(styles)(Header)));
