import React from 'react';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: palette.primary.light
  },
  layout: {
    padding: '60px 0',
    margin: '0 auto',
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
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className={classes.layout}
      >
        <Grid item />
        <Grid item />
      </Grid>
    </div>
  );
}

export default FeaturedData;
