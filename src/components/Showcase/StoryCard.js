import React from 'react';
import PropTypes from 'prop-types';

import config from 'config';

import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';

import A from '@codeforafrica/hurumap-ui/core/A';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '20rem',
    height: '100%',
    backgroundColor: '#fafafa',
    border: '1px solid #eeeeee',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      backgroundColor: '#fff'
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '1.25rem'
    }
  },
  contentRoot: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'flex-end'
  },
  CardActionArea: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'flex-end',
      flexFlow: 'column',
      height: '100%'
    }
  },
  cardContent: {
    alignItems: 'flex-end',
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    marginTop: '-100%',
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3)
  },
  media: {
    minHeight: '20rem',
    height: '100%',
    width: '100%'
  },
  cardLink: {
    textDecoration: 'none'
  },
  overline: {
    color: '#fff'
  },
  bodyTitle: {
    color: '#fff',
    fontWeight: 500,
    marginTop: '1rem'
  },
  bodyText: {
    color: '#fff',
    margin: '1rem 0'
  },
  componentStyle: {
    webkitFilter: 'brightness(40%)' /* Safari 6.0 - 9.0 */,
    filter: 'brightness(40%)'
  }
}));

function StoryCard({ story, ...props }) {
  const classes = useStyles(props);
  const {
    showcase: { storyFormat }
  } = config;
  const mediaLink = story[storyFormat.media.href];
  const storyLink = story[storyFormat.href] || mediaLink;

  return (
    <Card className={classes.root}>
      <A href={storyLink} className={classes.cardLink}>
        <Grid className={classes.CardActionArea}>
          <CardMedia
            component={story[storyFormat.media.type]}
            className={classes.media}
            image={mediaLink}
            classes={{ media: classes.componentStyle }}
            title="Story"
          />
          <CardContent className={classes.cardContent}>
            <Grid
              container
              item
              direction="column"
              className={classes.contentRoot}
              alignItems="flex-start"
            >
              <Typography variant="subtitle2" className={classes.overline}>
                {story[storyFormat.date]}
              </Typography>
              <Typography variant="h5" className={classes.bodyTitle}>
                {story[storyFormat.title]}
              </Typography>
              <Typography variant="body2" className={classes.bodyText}>
                {story[storyFormat.brief]}
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
      </A>
    </Card>
  );
}

StoryCard.propTypes = {
  story: PropTypes.shape().isRequired
};

export default StoryCard;
