import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Hero, { HeroTitle, HeroTitleGrid } from './Hero';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '0 9.375rem',
    height: '40vh',
    [theme.breakpoints.down('md')]: {
      margin: '0 3.125rem'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  }
});

function TitleHero({ classes, children }) {
  return (
    <Hero classes={{ root: classes.root }}>
      <HeroTitleGrid>
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
