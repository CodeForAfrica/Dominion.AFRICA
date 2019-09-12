import React from 'react';
import Page from '../components/Page';

import config from '../config';
import { TitlePageHeader } from '../components/Header';
import ErrorContent from '../components/ErrorContent';

function NotFound() {
  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}} />
      <ErrorContent
        title="404 - Page Not Found"
        description="The page you are looking for does not exist"
      />
    </Page>
  );
}

export default NotFound;
