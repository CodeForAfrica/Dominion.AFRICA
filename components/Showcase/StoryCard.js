import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';

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
    justifyContent: 'flex-end'
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
  const { mediaSrc, date, title, brief, link, media } = story;

  return (
    <Card className={classes.root}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.cardLink}
      >
        <CardActionArea
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexFlow: 'column',
            height: '100%'
          }}
        >
          <CardMedia
            component={media}
            className={classes.media}
            image={mediaSrc}
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
              style={{ height: '100%' }}
            >
              <Typography variant="subtitle2" className={classes.overline}>
                {date}
              </Typography>
              <Typography variant="h5" className={classes.bodyTitle}>
                {title}
              </Typography>
              <Typography variant="body2" className={classes.bodyText}>
                {brief}{' '}
              </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </a>
    </Card>
  );
}

StoryCard.propTypes = {
  story: PropTypes.shape().isRequired
};

export default StoryCard;