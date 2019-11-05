import React from 'react';

import classNames from 'classnames';

import { makeStyles, Typography } from '@material-ui/core';

import A from 'components/A';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '7rem'
    },
    [theme.breakpoints.up('md')]: {
      width: '11rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '12.5625rem' // 201px
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
    marginTop: '1.5rem'
  }
}));

function Community(props) {
  const classes = useStyles(props);
  const joinClassName = classNames(classes.listText, classes.joinText);

  return (
    <div classes={classes.root}>
      <Typography
        variant="subtitle1"
        className={classes.listText}
        component="div"
      >
        Other openAFRICA Projects:
        <ul className={classes.list}>
          <li>
            <A
              href="https://taxclock.codeforkenya.org/"
              className={classes.links}
            >
              Tax Clock
            </A>
          </li>
          <li>
            <A href="https://hurumap.org/" className={classes.links}>
              HURUmap
            </A>
          </li>
        </ul>
      </Typography>
      <Typography variant="subtitle1" className={joinClassName} component="div">
        Join Our Community:
        <ul className={classes.list}>
          <li>
            <A
              href="https://www.facebook.com/HacksHackersAfrica"
              className={classes.links}
            >
              Hacks/Hackers Africa
            </A>
          </li>
        </ul>
      </Typography>
    </div>
  );
}

export default Community;
