import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  useMediaQuery,
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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

function StoryList({ storyData, width, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  let cards = 4;
  if (useMediaQuery(theme.breakpoints.down('md'))) {
    cards = 2;
  }
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    cards = 1;
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <GridList cellHeight={320} className={classes.gridList} cols={cards}>
        {storyData.map(story => (
          <GridListTile key={story.index}>
            <StoryCard story={story} />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
}

StoryList.propTypes = {
  storyData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  width: PropTypes.string.isRequired
};

export default StoryList;
