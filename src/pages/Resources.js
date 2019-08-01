import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TitlePageHeader } from '../components/Header';
import Page from '../components/Page';
import config from '../config';
import Section from '../components/Section';
import DocumentCard from '../components/Card/Document';
import DataCard from '../components/Card/Data';
import ArrowButton from '../components/ArrowButton';
import { AboutDominion } from '../components/About';
import { getOpenAfricaDominionGroupData } from '../lib/api';

function Resources() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    getOpenAfricaDominionGroupData().then(({ data: { result } }) => {
      setPackages(result);
    });
  }, []);

  let resources = packages.map(p => p.resources);
  if (resources.length) {
    resources = resources.reduce((a, b) => a.concat(b));
  }

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
          {resources.map(resource => (
            <DataCard
              link={resource.url}
              title={resource.name}
              description={resource.description}
            />
          ))}
        </Grid>
        <ArrowButton
          target="_blank"
          role="link"
          href="https://africaopendata.org/group/dominion"
        >
          View all
        </ArrowButton>
      </Section>
      <AboutDominion dominion={config} />
    </Page>
  );
}

export default Resources;
