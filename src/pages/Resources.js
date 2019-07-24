import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TitlePageHeader } from '../components/Header';
import Page from '../components/Page';
import config from '../config';
import Section from '../components/Section';
import DocumentCard from '../components/Card/Document';
import DataCard from '../components/Card/Data';
import ArrowButton from '../components/ArrowButton';
import { AboutDominion } from '../components/About';

function Resources() {
  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}}>
        Datasets
        <br /> and Documents
      </TitlePageHeader>
      <Section title="Documents" subtitle="Powered by sourceAFRICA.net">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
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
        <ArrowButton>View all</ArrowButton>
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
        <ArrowButton>View all</ArrowButton>
      </Section>
      <AboutDominion dominion={config} />
    </Page>
  );
}

export default Resources;
