import React from 'react';
import { ResourcePageHeader } from '../components/Header';
import Page from '../components/Page';
import config from '../config';
import Section from '../components/Section';

function Resources() {
  return (
    <Page>
      <ResourcePageHeader dominion={config} profile={{}} />
      <Section
        title="Documents"
        subtitle="Powered by sourceAFRICA.net"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      >
        <div />
      </Section>
      <Section
        light
        title="Data"
        subtitle="Powered by sourceAFRICA.net"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      >
        <div />
      </Section>
    </Page>
  );
}

export default Resources;
