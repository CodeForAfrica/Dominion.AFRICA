import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Hero, { HeroTitle, HeroTitleGrid } from './Hero';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '4rem 0'
  }
}));

function TitleHero({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <Hero classes={{ root: classes.root }}>
      <HeroTitleGrid>
        <HeroTitle>{children}</HeroTitle>
      </HeroTitleGrid>
    </Hero>
  );
}

TitleHero.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

TitleHero.defaultProps = {
  children: undefined
};

export default TitleHero;
