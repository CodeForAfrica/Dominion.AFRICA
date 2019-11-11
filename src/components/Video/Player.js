import React, { useState } from 'react';

import { makeStyles, Grid, IconButton } from '@material-ui/core';

import back from 'assets/images/icons/back.svg';
import useToggleModal from 'components/Modal/useToggleModal';
import IFrame from 'components/IFrame';

import Sources from './Sources';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: '-1.875rem 0',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 6.25em)'
    }
  },
  videoPlayer: {
    width: '100vw',
    marginBottom: '2rem',
    [theme.breakpoints.up('md')]: {
      width: '60vw'
    }
  },
  videoPlaylist: {
    width: '100vw',
    overflow: 'scroll',
    height: '85vw',
    scrollbarWidth: 'none', // Firefox
    '-ms-overflow-style': 'none', // IE
    [theme.breakpoints.up('md')]: {
      margin: '0 1.25rem',
      width: '12vw',
      height: '33.7vw'
    },
    '&::-webkit-scrollbar': {
      // Chrome + Safari
      width: 0,
      height: 0,
      background: 'transparent'
    }
  },
  thumbnail: {
    height: 200
  },
  closeButton: {
    padding: 0,
    position: 'absolute',
    right: '1.25rem',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      marginLeft: '2.5rem'
    }
  }
}));

function Player(props) {
  const classes = useStyles(props);
  const [videoId, setVideoId] = useState((Sources[0] && Sources[0].id) || null);
  const { toggleModal } = useToggleModal('video');

  const handleThumbnailClick = id => {
    if (id) {
      setVideoId(id);
    }
  };
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        justify="center"
        style={{
          marginTop: '2.5rem'
        }}
      >
        <Grid item>
          <div className={classes.videoPlayer}>
            <IFrame
              title="Dominion"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.videoPlaylist}
        >
          {Sources.map(source => (
            <Grid key={source.id} item>
              <Thumbnail
                videoId={source.id}
                videoTitle={source.title}
                className={classes.thumbnail}
                onClick={handleThumbnailClick}
                isSelected={source.id === videoId}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item container justify="flex-end" alignItems="flex-start">
          <IconButton
            className={classes.closeButton}
            aria-label="Close"
            onClick={toggleModal}
          >
            <img alt="Close" src={back} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Player;
