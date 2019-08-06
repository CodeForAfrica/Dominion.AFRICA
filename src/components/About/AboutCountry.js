import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Info, { InfoSubtitle, InfoBody } from './Info';
import Land from './Land';

import land from '../../assets/images/hero-image-3.png';
import config from '../../config';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  layout: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
      margin: '0 auto',
      padding: '50px 0'
    }
  }
});

function AboutCountry({ classes, dominion }) {
  const { selectedCountry = {} } = dominion;
  const info = config.about[selectedCountry.slug] || {
    intro: 'Not found',
    other: 'Not found'
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        className={classes.layout}
        alignItems="flex-start"
      >
        <Grid item>
          <Header>
            About <br />
            {selectedCountry.name}
          </Header>
        </Grid>
        <Grid item>
          <Info>
            <InfoSubtitle>{info.intro}</InfoSubtitle>
            <InfoBody>{info.other}</InfoBody>
          </Info>
        </Grid>
        <Grid item>
          <Land imgSrc={land} />
        </Grid>
      </Grid>
    </div>
  );
}

AboutCountry.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(AboutCountry);
