import React from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import A from 'components/A';

import SocialMedia from './SocialMedia';

const useStyles = makeStyles(theme => ({
  listText: {
    color: theme.palette.primary.light,
    opacity: '0.6'
  },
  links: {
    color: theme.palette.primary.light
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '0'
  },
  socialMedia: {
    paddingTop: '1.5rem'
  }
}));

function Community(props) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root} justify="flex-start">
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          className={classes.listText}
          component="div"
        >
          A project by:
          <ul className={classes.list}>
            <li>
              <A href="https://codeforafrica.org/" className={classes.links}>
                Code for Africa
              </A>
            </li>
            <li>
              <A href="https://www.icfj.org/" className={classes.links}>
                ICFJ
              </A>
            </li>
          </ul>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.socialMedia}>
          <SocialMedia />
        </div>
      </Grid>
    </Grid>
  );
}

export default Community;
