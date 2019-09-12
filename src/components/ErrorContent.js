import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: '2rem',
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  },
  title: {
    margin: '1.5rem'
  },
  mainGrid: {
    paddingTop: '8rem',
    paddingBottom: '8rem'
  },
  subtitleGrid: {
    backgroundColor: '#F0F0F0'
  },
  subtitle: {
    padding: '2rem'
  }
});

function ErrorContent({ classes, title, description }) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid xs={12} md={8} className={classes.mainGrid}>
        <div className={classes.title}>
          <Typography variant="h2">{title}</Typography>
        </div>
        <div className={classes.subtitleGrid}>
          <Typography variant="body1" className={classes.subtitle}>
            {description}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

ErrorContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default withStyles(styles)(ErrorContent);
