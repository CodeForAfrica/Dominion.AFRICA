import React from 'react';

import config from 'config';
import Page from 'components/Page';
import ErrorContent from 'components/ErrorContent';
import TitlePageHeader from 'components/Header/TitlePageHeader';

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
