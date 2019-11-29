import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import useToggleModal from 'components/Modal/useToggleModal';
import PlayerModal from 'components/Video/PlayerModal';

import videos from 'data/videos';
import Steps from './Steps';
import ViewVideos from './ViewVideos';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '4.4286rem' // 62px / 14
  },
  title: {
    padding: '1.143rem 0',
    textTransform: 'none'
  },
  steps: {
    paddingTop: '0.6423rem' // 9px / 14
  },
  viewVideos: {
    marginTop: '2.143rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '6.7143rem'
    }
  }
});

function Description({ classes, dominion }) {
  const { open, toggleModal } = useToggleModal('video');
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        How <br />
        it works
      </Typography>

      <Steps />
      {videos && videos.length > 0 && (
        <div className={classes.viewVideos}>
          <ViewVideos onClick={toggleModal} />

          <PlayerModal
            dominion={dominion}
            open={open}
            toggleModal={toggleModal}
          />
        </div>
      )}
    </div>
  );
}

Description.propTypes = {
  classes: PropTypes.shape().isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Description);
