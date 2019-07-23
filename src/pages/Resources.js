import React from 'react';
import { Grid } from '@material-ui/core';
import { ResourcePageHeader } from '../components/Header';
import Page from '../components/Page';
import config from '../config';
import Section from '../components/Section';
import DocumentCard from '../components/Card/Document';
import DataCard from '../components/Card/Data';

function Resources() {
  return (
    <Page>
      <ResourcePageHeader dominion={config} profile={{}} />
      <Section
        title="Documents"
        subtitle="Powered by sourceAFRICA.net"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      >
        <Grid container justify="space-between">
          {[...new Array(10)].map(() => (
            <Grid item xs={12} md={6}>
              <DocumentCard
                title="Lorem ipsum dolor sit amet"
                description="rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..."
              />
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section
        light
        title="Data"
        subtitle="Powered by sourceAFRICA.net"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      >
        <Grid container justify="space-between">
          {[...new Array(10)].map(() => (
            <DataCard
              link="data.sfgtv-azokfv.ck"
              title="Lorem ipsum dolor sit amet"
              preview={Math.random() > 0.5 ? <div /> : null}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            />
          ))}
        </Grid>
      </Section>
    </Page>
  );
}

export default Resources;
