import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, GridList, GridListTile } from '@material-ui/core';

import SimpleBarReact from 'simplebar-react';

import config from '@/dominion/config';
import useColsMediaQuery from './useColsMediaQuery';
import StoryCard from './StoryCard';

import 'simplebar/dist/simplebar.min.css';

const useStyles = makeStyles(({ breakpoints }) => ({
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
  simpleBar: {
    width: '100%',
    height: '370px', // 23.125rem
    '& .simplebar-track': {
      backgroundColor: '#f1f1ed', // off-white
      height: '4px'
    },
    '&  .simplebar-track.simplebar-horizontal': {
      [breakpoints.up('lg')]: {
        marginLeft: '25%'
      }
    },
    '&  .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      backgroundColor: '#2c2c2a', // charcoal
      height: '4px',
      top: 0
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    // TODO(nyokabi): Material-ui documentation for Grid list component
    //                Promote the list into its own layer on Chrome. This cost
    //                memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '100%',
    margin: '0 !important',
    overflow: 'initial',
    width: '100%'
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
      <SimpleBarReact autoHide={false} className={classes.simpleBar}>
        <GridList cellHeight={320} className={classes.gridList} cols={cols}>
          {stories.map(story => (
            <GridListTile
              key={story[storyFormat.href] || story[storyFormat.media.href]}
            >
              <StoryCard story={story} />
            </GridListTile>
          ))}
        </GridList>
      </SimpleBarReact>
    </div>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default StoryList;
