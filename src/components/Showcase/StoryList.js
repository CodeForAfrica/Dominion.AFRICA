import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core';

import config from 'config';
import StoryCard from './StoryCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    /**
     * The mixture of rem and px set by GridList is
     * causing height issues resulting in overflow.
     * Stick to px for this component to function correctly.
     */
    height: '370px', // 23.125rem
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    // TODO(nyokabi): Material-ui documentation for Grid list component
    //                Promote the list into its own layer on Chrome. This cost
    //                memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '100%',
    margin: '0 !important'
  }
}));

function StoryList({ stories, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  let cards = 4;
  if (useMediaQuery(theme.breakpoints.down('md'))) {
    cards = 2;
  }
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    cards = 1;
  }
  const {
    showcase: { storyFormat }
  } = config;

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <GridList cellHeight={320} className={classes.gridList} cols={cards}>
        {stories.map(story => (
          <GridListTile
            key={story[storyFormat.href] || story[storyFormat.media.href]}
          >
            <StoryCard story={story} />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default StoryList;
