import React from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import A from '../A';
import SocialMedia from '../SocialMedia';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%', // 156px / 16
    [theme.breakpoints.up('sm')]: {
      width: '7rem'
    },
    [theme.breakpoints.up('md')]: {
      width: '7.5rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '12.5625rem' // 201px / 16
    }
  },
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
  joinText: {
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
        <div className={classes.joinText}>
          <SocialMedia />
        </div>
      </Grid>
    </Grid>
  );
}

export default Community;
