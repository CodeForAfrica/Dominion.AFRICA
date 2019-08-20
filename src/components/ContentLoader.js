import React from 'react';
import ContentLoader from 'react-content-loader';

export default function CustomContentLoader({ children, ...props }) {
  return (
    <ContentLoader
      primaryOpacity={0.01}
      secondaryOpacity={0.1}
      viewBox="0 0 100% 100%"
      {...props}
    >
      {children}
    </ContentLoader>
  );
}
