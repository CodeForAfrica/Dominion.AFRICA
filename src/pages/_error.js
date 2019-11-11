import React from 'react';

import NotFoundPage from 'components/NotFoundPage';
import ServerErrorPage from 'components/ServerErrorPage';

function CustomError({ statusCode }) {
  if (statusCode === 404) {
    return <NotFoundPage />;
  }
  return <ServerErrorPage />;
}

CustomError.getInitialProps = ({ res, err }) => {
  let statusCode;
  // If the res variable is defined it means server-side
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    // client-side
    statusCode = err.statusCode;
  } else {
    // Here be dragons
    statusCode = null;
  }
  return { statusCode };
};

export default CustomError;
