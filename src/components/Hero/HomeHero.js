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
import useToggleModal from '../../useToggleModal';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heroContentGrid: {
    flexGrow: 1,
    backgroundImage: `url(${herobg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto',
    width: '100%',
    height: 'auto',
    padding: '4rem 0',
    marginTop: '2rem',
    marginBottom: '6rem',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${smallscreenbackground})`,
      backgroundPosition: 'right top',
      padding: 0,
      marginBottom: '3rem'
    }
  },
  herotitle: {
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  }
});

function HomeHero({ classes }) {
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
          <HeroTitle classes={{ title: classes.herotitle }}>
            Discover the stories behind the data.
          </HeroTitle>

          <HeroDescription>
            Dominion makes data available to help add context and authority to
            public discourse and policy-making on vital issues of land
            ownership.
          </HeroDescription>

          <HeroButton onClick={toggleModal}>Select a Country</HeroButton>
        </HeroTitleGrid>
        <HomeHeroMap />
      </Grid>
    </Hero>
  );
}

HomeHero.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(HomeHero);
