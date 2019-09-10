import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    height: '25rem',
    maxWidth: '100%',
    marginRight: '2rem',
    marginLeft: '2rem'
  },
  title: {
    margin: '2rem'
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
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Grid className={classes.title}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid className={classes.subtitleGrid}>
          <Typography variant="body1" className={classes.subtitle}>
            {description}
          </Typography>
        </Grid>
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
