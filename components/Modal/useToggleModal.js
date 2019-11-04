import { useContext } from 'react';

import AppContext from '../../AppContext';

export default function useToggleModal(modalName) {
  const {
    state: { openModal },
    dispatch
  } = useContext(AppContext);

  return {
    open: modalName === openModal,
    toggleModal: () => {
      if (openModal && openModal === modalName) {
        window.history.back();
      } else if (!openModal) {
        window.location = `#`;
      }

      dispatch({
        type: 'modal',
        openModal: openModal === modalName ? null : modalName
      });
    }
  };
}
