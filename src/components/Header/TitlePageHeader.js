import React from 'react';

import TitleHero from 'components/Hero/TitleHero';
import Header from '.';

export default function TitlePageHeader({ children, ...props }) {
  return (
    <Header {...props}>
      <TitleHero>{children}</TitleHero>
    </Header>
  );
}
