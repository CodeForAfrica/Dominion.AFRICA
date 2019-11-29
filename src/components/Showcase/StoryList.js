import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, GridList, GridListTile } from '@material-ui/core';

import config from 'config';
import useColsMediaQuery from './useColsMediaQuery';
import StoryCard from './StoryCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    /**
     * The mixture of rem and px set by GridList is
     * causing height issues resulting in overflow.
     * Stick to px for this component to function correctly.
     */
    height: '370px' // 23.125rem
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
  const cols = useColsMediaQuery();
  const {
    showcase: { storyFormat }
  } = config;

  return (
    <div className={classes.root}>
      <GridList cellHeight={320} className={classes.gridList} cols={cols}>
        {stories.map(story => (
          <GridListTile
            key={story[storyFormat.href] || story[storyFormat.media.href]}
          >
            <StoryCard story={story} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default StoryList;
