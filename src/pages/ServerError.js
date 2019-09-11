import React from 'react';
import Page from '../components/Page';

import config from '../config';
import { TitlePageHeader } from '../components/Header';
import ErrorContent from '../components/ErrorContent';

function ServerError() {
  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}} />
      <ErrorContent
        title="500 - Internal Server Error"
        description="We are having some trouble processing your request.
              We have logged the error and will investigate. You can try again later or if the issues persisit,
              please contact us"
      />
    </Page>
  );
}

export default ServerError;
