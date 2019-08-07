import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Hero, {
  HeroTitle,
  HeroDescription,
  HeroTitleGrid,
  HeroButton
} from './Hero';

import herobg from '../../assets/images/bg/hero_bg.png';
import smallscreenbackground from '../../assets/images/bg/smallscreen_background.png';

import HomeHeroMap from './HomeHeroMap';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // margin: '0 9.375rem',
    // [theme.breakpoints.down('md')]: {
    //   margin: '0 3.125rem'
    // },
    // [theme.breakpoints.down('sm')]: {
    //   margin: '0'
    // }
    [theme.breakpoints.up('md')]: {
      maxWidth: '71.1875rem',
      margin: '0 auto'
    }
  },
  heroContentGrid: {
    flexGrow: 1,
    backgroundImage: `url(${herobg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${smallscreenbackground})`,
      backgroundPosition: 'right top'
    }
  }
});

function HomeHero({ classes, toggleModal }) {
  return (
    <Hero classes={{ root: classes.root }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.heroContentGrid}
      >
        <HeroTitleGrid>
          <HeroTitle>Discover the stories behind the data.</HeroTitle>

          <HeroDescription>
            Dominion makes data available to help add context and authority to
            public discourse and policy-making on vital issues of land
            ownership.
          </HeroDescription>

          <HeroButton onClick={toggleModal('portal')}>
            Select a Country
          </HeroButton>
        </HeroTitleGrid>
        <HomeHeroMap />
      </Grid>
    </Hero>
  );
}

HomeHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default withStyles(styles)(HomeHero);
