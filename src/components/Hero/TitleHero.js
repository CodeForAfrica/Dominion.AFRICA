import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Hero, { HeroTitle, HeroTitleGrid } from './Hero';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '40vh',
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
      margin: '0 auto'
    }
  },
  titlegrid: {
    alignItems: 'center'
  }
});

function TitleHero({ classes, children }) {
  return (
    <Hero classes={{ root: classes.root }}>
      <HeroTitleGrid classes={{ titleTextGrid: classes.titlegrid }}>
        <HeroTitle>{children}</HeroTitle>
      </HeroTitleGrid>
    </Hero>
  );
}

TitleHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(TitleHero);
