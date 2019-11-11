import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Partners from './Partners';

function Page({ children }) {
  return (
    <>
      {children}
      <Partners />
      <Footer />
    </>
  );
}
Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Page;
