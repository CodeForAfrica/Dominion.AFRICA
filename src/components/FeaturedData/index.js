import React from 'react';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    flexGrow: 1,
    padding: '60px 0',
    margin: '0 auto',
    backgroundColor: palette.primary.light,
    [breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  content: {
    paddingBottom: '1rem'
  },
  list: {
    height: '100%'
  }
}));

function FeaturedData() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid item />
      <Grid item />
    </Grid>
  );
}

export default FeaturedData;
