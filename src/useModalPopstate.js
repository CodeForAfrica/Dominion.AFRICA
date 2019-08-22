import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

export default () => {
  const {
    state: { openModal },
    dispatch
  } = useContext(AppContext);
  useEffect(() => {
    function dismissModal(e) {
      if (e.state && e.state.state === 'modal' && openModal) {
        dispatch({ type: 'modal', openModal: null });
      }
    }
    window.addEventListener('popstate', dismissModal);
    return () => {
      window.removeEventListener('popstate', dismissModal);
    };
  }, [openModal]);
};
