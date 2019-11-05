import React from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import map from 'assets/images/bg/hero_map.png';

const useStyles = makeStyles(theme => ({
  verticalAlignText: {
    color: 'white',
    writingMode: 'vertical-lr',
    textOrientation: 'sideways-right',
    textDecoration: 'none'
  },
  mapSection: {
    color: 'white',
    textAlign: 'right',
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  mapImage: {
    display: 'block',
    paddingRight: theme.spacing(8)
  },
  lineSeparator: {
    display: 'inline-block',
    borderLeft: '1px solid #fff',
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(8),
    height: '4rem'
  }
}));

function HomeHeroMap(props) {
  const classes = useStyles(props);

  return (
    <Grid
      xs={12}
      md={4}
      item
      container
      justify="flex-end"
      alignItems="center"
      className={classes.mapSection}
    >
      <Typography
        variant="h6"
        className={classes.verticalAlignText}
        component="a"
        href="/south-africa"
      >
        <img src={map} alt="Country Map" className={classes.mapImage} />
        South Africa &nbsp;&nbsp;
        <div className={classes.lineSeparator} />
        02
      </Typography>
    </Grid>
  );
}

export default HomeHeroMap;
