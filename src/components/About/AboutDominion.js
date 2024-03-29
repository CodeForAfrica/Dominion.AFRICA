import React from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import A from '@hurumap-ui/core/A';

import land from 'assets/images/hero-image-3_2.png';

import Header from './Header';
import Info, { InfoSubtitle, InfoBody } from './Info';
import Land from './Land';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  layout: {
    padding: '50px 0',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  header: {
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 1
    }
  },
  info: {
    order: 3,
    [theme.breakpoints.up('md')]: {
      order: 2
    }
  },
  land: {
    order: 1,
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      order: 3
    }
  }
}));

function AboutDominion({ ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.layout}>
        <Grid item className={classes.header} md={4} lg={3}>
          <Header>
            About <br />
            Dominion
          </Header>
        </Grid>
        <Grid item className={classes.info} md={4}>
          <Info>
            <InfoSubtitle>
              <p>
                Land and how it is controlled shapes everything from our food
                security and geopolitics to national identity.
              </p>
              <p>
                The scramble for control of high value land (and its attributes
                such as water and mineral wealth), in the face of escalating
                climate change and urbanisation, underpins much of Africa’s
                fiercest conflicts and mass migrations.
              </p>
            </InfoSubtitle>

            <InfoBody>
              <p>
                Dominion is CfA’s attempt to inject data-driven evidence and
                analysis into public discourse policy-setting across the
                continent.
              </p>
              <p>
                Dominion is designed as an umbrella data visualisation portal,
                powered by the <A href="https://hurumap.org">HURUmap</A> stack
                of geo-data software tools, that aggregates land data so that
                journalists / researchers / policymakers can use it to explore
                comparisons, spot trends or find other insights.
              </p>
              <p>
                Dominion also aggregates the best journalistic stories and/or
                campaigns that partners create using our data / infographics.
              </p>
            </InfoBody>
          </Info>
        </Grid>
        <Grid container item className={classes.land} md={4} lg={5}>
          <Land imgSrc={land} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutDominion;
