import React, { useEffect, useState } from 'react';

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Grid,
  Typography
} from '@material-ui/core';

import config from 'dominion.config';
import {
  getOpenAfricaDominionGroupData,
  getSourceAfricaDominionData
} from 'lib/api';

import { AboutDominion } from 'components/About';
import ArrowButton from 'components/ArrowButton';
import CountryPartners from 'components/CountryPartners';
import DataCard from 'components/Card/Data';
import DocumentCard from 'components/Card/Document';
import Page from 'components/Page';
import Section from 'components/Section';
import { TitlePageHeader } from 'components/Header';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: '3rem'
  },
  sectionSubtitle: {
    fontWeight: 'bold',
    marginTop: '1rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '2rem'
    }
  },
  sectionContent: {
    [theme.breakpoints.up('md')]: {
      marginTop: '5.75rem'
    }
  }
}));

function Resources(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const [packages, setPackages] = useState([]);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    function scrollSectionIntoView() {
      if (window.location.hash.slice(1)) {
        document.getElementById(window.location.hash.slice(1)).scrollIntoView();
      }
    }
    getOpenAfricaDominionGroupData().then(({ data: { result } }) => {
      setPackages(result);
      scrollSectionIntoView();
    });

    getSourceAfricaDominionData().then(({ data }) => {
      setDocuments(data.documents);
      scrollSectionIntoView();
    });
  }, []);
  const titleVariant = useMediaQuery(theme.breakpoints.up('md')) ? 'h2' : 'h3';

  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}}>
        Datasets
        <br /> and Documents
      </TitlePageHeader>
      <Section
        classes={{
          content: classes.sectionContent,
          subtitle: classes.sectionSubtitle
        }}
        id="documents"
        title="Documents"
        titleVariant={titleVariant}
        subtitle="Powered by sourceAFRICA.net"
      >
        <Typography variant="body2">
          Data for Dominion is aggregated from various authoritative sources.
          Below is a list of documents and datasets used for the project, which
          is hosted on sourceAFRICA.net and openAFRICA.net
        </Typography>
        <Grid container justify="space-between" className={classes.content}>
          {documents.map(document => (
            <Grid item xs={12} md={6} key={document.title}>
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
          href="https://dc.sourceafrica.net/public/search/projectid:462-Dominion-AFRICA"
          rel="noopener noreferrer"
          role="link"
          target="_blank"
        >
          View all
        </ArrowButton>
      </Section>
      <Section
        classes={{
          content: classes.sectionContent,
          subtitle: classes.sectionSubtitle
        }}
        id="data"
        light
        title="Data"
        titleVariant={titleVariant}
        subtitle="Powered by openAfrica.net"
      >
        <Grid container justify="space-between" className={classes.content}>
          {packages.map(p => (
            <DataCard
              key={p.title}
              dataLink={`https://openafrica.net/dataset/${p.name}`}
              description={p.notes}
              title={p.title}
              orgLink={`https://openafrica.net/organization/${p.organization.name}`}
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
