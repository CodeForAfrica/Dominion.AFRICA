import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';

export default function TypographyLoader({
  loading,
  loader,
  children,
  ...props
}) {
  return (
    <Typography {...props}>
      {loading ? (
        <ContentLoader style={{ height: loader.height, width: loader.width }}>
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
  loading: PropTypes.bool,
  loader: PropTypes.shape({
    width: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired
  })
};

TypographyLoader.defaultProps = {
  loading: false,
  loader: {
    width: '100%',
    height: '20px'
  }
};
