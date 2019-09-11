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
import CountryPartners from '../components/CountryPartners';

import {
  getSourceAfricaDominionData,
  getOpenAfricaDominionGroupData
} from '../lib/api';

function Resources() {
  const [packages, setPackages] = useState([]);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    function srcollSectionIntoView() {
      if (window.location.hash.slice(1)) {
        document.getElementById(window.location.hash.slice(1)).scrollIntoView();
      }
    }
    getOpenAfricaDominionGroupData().then(({ data: { result } }) => {
      setPackages(result);
      srcollSectionIntoView();
    });

    getSourceAfricaDominionData().then(({ data }) => {
      setDocuments(data.documents);
      srcollSectionIntoView();
    });
  }, []);

  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}}>
        Datasets
        <br /> and Documents
      </TitlePageHeader>
      <Section
        id="documents"
        title="Documents"
        subtitle="Powered by sourceAFRICA.net"
      >
        <Typography>
          Data for Dominion is aggregated from various authoritative sources.
          Below is a list of documents and datasets used for the project, which
          is hosted on sourceAFRICA.net and openAFRICA.net
        </Typography>
        <Grid container justify="space-between">
          {documents.map(document => (
            <Grid item xs={12} md={6} lg={6} xl={6} key={document.title}>
              <DocumentCard
                link={document.canonical_url}
                title={document.title}
                description={document.description}
                preview={
                  <img alt="" src={document.resources.thumbnail} width="100%" />
                }
              />
            </Grid>
          ))}
        </Grid>
        <ArrowButton
          target="_blank"
          role="link"
          href="https://dc.sourceafrica.net/public/search/projectid:462-Dominion-AFRICA"
        >
          View all
        </ArrowButton>
      </Section>
      <Section
        id="data"
        light
        title="Data"
        subtitle="Powered by openAfrica.net"
      >
        <Grid container justify="space-between">
          {packages.map(p => (
            <DataCard
              key={p.title}
              orgLink={`https://openafrica.net/organization/${p.organization.name}`}
              dataLink={`https://openafrica.net/dataset/${p.name}`}
              title={p.title}
              description={p.notes}
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
      <CountryPartners />
    </Page>
  );
}

export default Resources;
