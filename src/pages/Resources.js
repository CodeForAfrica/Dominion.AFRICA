import React from 'react';
import { ResourcePageHeader } from '../components/Header';
import Page from '../components/Page';
import config from '../config';

function Resources() {
  return (
    <Page>
      <ResourcePageHeader dominion={config} profile={{}} />
    </Page>
  );
}

export default Resources;
