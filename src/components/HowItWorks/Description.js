import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PlayerModal from '../Video/PlayerModal';
import Steps from './Steps';
import ViewVideos from './ViewVideos';
import useToggleModal from '../../useToggleModal';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    padding: '1rem 0',
    textTransform: 'none'
  },
  steps: {
    paddingTop: '0.5625rem' // 9px / 16
  },
  viewVideos: {
    marginTop: '1.875rem',
    marginBottom: '3.875rem', // 62px / 16
    [theme.breakpoints.up('md')]: {
      marginTop: '5.875rem'
    }
  }
});

function Description({ classes, dominion }) {
  const { open, toggleModal } = useToggleModal('video');
  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        How <br />
        it works
      </Typography>

      <Steps />
      <div className={classes.viewVideos}>
        <ViewVideos onClick={toggleModal} />

        <PlayerModal
          dominion={dominion}
          open={open}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  );
}

Description.propTypes = {
  classes: PropTypes.shape().isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Description);
