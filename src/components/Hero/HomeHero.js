import React from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import heroBg from 'assets/images/bg/hero_bg.png';
import smallScreenBackground from 'assets/images/bg/smallscreen_background.png';
import useToggleModal from 'components/Modal/useToggleModal';

import Hero, {
  HeroButton,
  HeroDescription,
  HeroTitle,
  HeroTitleGrid
} from './Hero';
import HomeHeroMap from './HomeHeroMap';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  heroContentGrid: {
    flexGrow: 1,
    backgroundImage: `url(${smallScreenBackground})`,
    backgroundPosition: 'right top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    width: '100%',
    height: 'auto',
    padding: 0,
    marginTop: '2rem',
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${heroBg})`,
      backgroundPosition: 'center',
      marginBottom: '6rem',
      padding: '4rem 0'
    }
  },
  heroTitle: {
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  }
}));

function HomeHero(props) {
  const classes = useStyles(props);
  const { toggleModal } = useToggleModal('portal');

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
          <HeroTitle classes={{ title: classes.heroTitle }}>
            Discover the stories behind the data
          </HeroTitle>

          <HeroDescription>
            Dominion gives you the data to add context and authority to public
            discourse and policy-making on vital issues of land ownership.
          </HeroDescription>

          <HeroButton onClick={toggleModal}>Select a Country</HeroButton>
        </HeroTitleGrid>
        <HomeHeroMap />
      </Grid>
    </Hero>
  );
}

export default HomeHero;
