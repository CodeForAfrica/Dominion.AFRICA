import React from 'react';
import ContentLoader from 'react-content-loader';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function TypographyLoader({ loading, children, ...props }) {
  return (
    <Typography {...props}>
      {loading ? (
        <ContentLoader
          primaryOpacity={0.01}
          secondaryOpacity={0.1}
          style={{ height: 25, width: '50%' }}
        >
          <rect x="0" y="0" width="100%" height="100%" />
        </ContentLoader>
      ) : (
        children
      )}
    </Typography>
  );
}

TypographyLoader.propTypes = {
  children: PropTypes.shape().isRequired,
  loading: PropTypes.bool
};

TypographyLoader.defaultProps = {
  loading: false
};
