import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Modal as MaterialModal } from '@material-ui/core';

import background from 'assets/images/bg/background.png';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 0,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  modal: {
    outline: 'none',
    height: 'auto',
    width: '100vw'
  }
}));

function Modal({ children, isOpen, onEscapeKeyDown, ...props }) {
  const classes = useStyles(props);

  return (
    <MaterialModal
      hideBackdrop
      open={isOpen}
      className={classes.root}
      onEscapeKeyDown={onEscapeKeyDown}
    >
      <div className={classes.modal}>{children}</div>
    </MaterialModal>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onEscapeKeyDown: PropTypes.func
};

Modal.defaultProps = {
  onEscapeKeyDown: () => {}
};

export default Modal;
