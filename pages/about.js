import React from 'react';
import { Typography } from '@material-ui/core';

import config from 'dominion.config';
import CountryPartners from 'components/CountryPartners';
import Data from 'components/Data';
import Page from 'components/Page';
import Section from 'components/Section';
import { TitlePageHeader } from 'components/Header';

function About() {
  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}}>
        About
        <br /> Dominion
      </TitlePageHeader>
      <Section title="What's the data behind the story?" subtitle="">
        <Typography style={{ fontWeight: 800 }}>
          HURUmap Land is a joint project of City Press, Rapport, Landbou
          Weekblad and Code for Africa. The data site gives infomediaries like
          journalists and civic activists an easy toolkit for finding and
          embedding interactive data visualizations into their storytelling on
          land ownership in South Africa. The data that informs the land
          ownership debate is often contested and incomplete, We will keep
          sourcing, cleaning and adding data sets to this site, and work towards
          becoming the authoritative data source on this issue.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 800 }}>
          HURUmap Land provides useful facts and data about land ownership in
          South Africa. Compare places using tables and maps, download data, and
          embed charts on your site
        </Typography>
        <br />
        <Typography>
          HURUmap’s underlying data is quality-checked, from reputable official
          sources including the government Census, PEPFAR and Uwezo. This
          project is build on software originally created by the Knight Lab in
          the U.S.A. for their CensusReporter.org project, which has been
          repurposed by OpenUp and Media Monitoring Africa for Wazimap in South
          Africa and by Code for Africa for HURUmap in Kenya, Tanzania, Uganda
          and Zambia.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 800 }}>
          Code for Africa and its partners hate seeing civil society or anyone
          else being duped into wasting money unnecessarily on inappropriate
          technology or predatory consultancies.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 800 }}>
          There are thousands of civic apps and other technology solutions
          already available for reuse, free-of-charge, on communities such as
          GitHub.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 800 }}>
          Code for Africa is committed to help grow these resources and the
          global civic technology community, by making its code and data freely
          available. It is also committed to helping fellow African citizen
          agency organisations re-purpose and customise existing civic code as
          cost-effectively as possible.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 800 }}>
          The code for HURUmap Land is available here.
        </Typography>
      </Section>
      <Data />
      <CountryPartners />
    </Page>
  );
}

export default About;
