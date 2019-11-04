import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Navigation from '../Header/Navigation';
import Player from './Player';

function PlayerModal({ dominion, open, ...props }) {
  return (
    <Modal isOpen={open} {...props}>
      <Navigation dominion={dominion} />
      <Player />
    </Modal>
  );
}

PlayerModal.propTypes = {
  dominion: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired
};

export default PlayerModal;
